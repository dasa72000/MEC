"use client";

import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  fichaMatrimonialSchema,
  type FichaMatrimonialData
} from "@/lib/schema";
import { PersonDetailsSection } from "./sections/person-details-section";
import { ServerRetreatsSection } from "./sections/server-retreats-section";
import { SecretariatsSection } from "./sections/secretariats-section";
import { GrowthGroupsSection } from "./sections/growth-groups-section";
import { MarriageDetailsSection } from "./sections/marriage-details-section";
import { GrowthLadderSection } from "./sections/growth-ladder-section";
import { ObservationsSection } from "./sections/observations-section";
import { AddressSection } from "./sections/address-section";
import { submitToGoogleForm } from "@/lib/google-form-helpers";

export function FichaMatrimonialForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('groom');
  const { toast } = useToast();

  const form = useForm<FichaMatrimonialData>({
    resolver: zodResolver(fichaMatrimonialSchema),
    defaultValues: {
      marriageData: {
        encounterNumber: '',
        community: '',
        country: 'El Salvador',
        affiliationNumber: '',
        encounterDate: '',
        civilMarriageDate: '',
        religiousMarriageDate: '',
        belongsToGroup: undefined,
        group: '',
      },
      groomData: {
        names: '',
        lastNames: '',
        birthDate: '',
        dui: '',
        nit: '',
        occupation: '',
        email: '',
        cellPhone: '',
        officePhone: '',
      },
      brideData: {
        names: '',
        lastNames: '',
        birthDate: '',
        dui: '',
        nit: '',
        occupation: '',
        email: '',
        cellPhone: '',
        officePhone: '',
      },
      address: {
        fullAddress: '',
        municipality: '',
        department: undefined,
        homePhone: '',
      },
      growthLadder: [],
      serverRetreats: {},
      secretariats: [],
      attendsGeneralAssembly: undefined,
      growthGroups: [],
      observations: '',
    },
  });
  
  function onSubmit(data: FichaMatrimonialData) {
    setIsLoading(true);
    try {
      submitToGoogleForm(data);
      toast({
        title: "✅ Formulario preparado",
        description: "Se ha abierto una nueva pestaña. Por favor, revisa los datos y haz clic en 'Enviar' en esa página para finalizar.",
        duration: 8000,
      });
      // No reseteamos el formulario para que el usuario pueda ver los datos.
      // form.reset(); 
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "❌ Error al preparar el formulario",
            description: error.message || "No se pudo generar la URL para el envío.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  const onInvalid = (errors: FieldErrors<FichaMatrimonialData>) => {
    const topLevelErrorKey = Object.keys(errors)[0] as keyof FichaMatrimonialData | 'groomData' | 'brideData';
    
    let sectionId: string | null = null;

    if (topLevelErrorKey === 'marriageData') {
      sectionId = 'marriage-details-section';
    } else if (topLevelErrorKey === 'groomData') {
      sectionId = 'person-details-section';
      setActiveTab('groom');
    } else if (topLevelErrorKey === 'brideData') {
      sectionId = 'person-details-section';
      setActiveTab('bride');
    } else if (topLevelErrorKey === 'address') {
      sectionId = 'address-section';
    } else if (topLevelErrorKey === 'growthLadder') {
      sectionId = 'growth-ladder-section';
    } else if (topLevelErrorKey === 'serverRetreats') {
      sectionId = 'server-retreats-section';
    } else if (topLevelErrorKey === 'secretariats' || topLevelErrorKey === 'attendsGeneralAssembly') {
      sectionId = 'secretariats-section';
    } else if (topLevelErrorKey === 'growthGroups') {
      sectionId = 'growth-groups-section';
    } else if (topLevelErrorKey === 'observations') {
      sectionId = 'observations-section';
    }

    if (sectionId) {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const trigger = sectionElement.querySelector<HTMLButtonElement>('[data-radix-collection-item]');
        
        if (trigger && trigger.getAttribute('data-state') === 'closed') {
          trigger.click();
        }

        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 250); 
      }
    }

    toast({
        variant: "destructive",
        title: "❌ Formulario incompleto",
        description: "Por favor, revisa los campos marcados en rojo.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
        <MarriageDetailsSection control={form.control} />

        <PersonDetailsSection 
          control={form.control} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <AddressSection control={form.control} />

        <GrowthLadderSection control={form.control} />

        <ServerRetreatsSection control={form.control} />
        <SecretariatsSection control={form.control} />
        <GrowthGroupsSection control={form.control} />
        <ObservationsSection control={form.control} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
