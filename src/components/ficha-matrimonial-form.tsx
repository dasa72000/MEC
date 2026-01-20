"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  fichaMatrimonialSchema,
  type FichaMatrimonialData,
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
  const { toast } = useToast();

  const form = useForm<FichaMatrimonialData>({
    resolver: zodResolver(fichaMatrimonialSchema),
    defaultValues: {
      marriageData: {
        memberCode: "",
        encounterNumber: "",
        community: undefined,
        country: "El Salvador",
        affiliation: "",
        correlative: "",
        encounterYear: "",
        belongsToGroup: undefined,
        group: "",
        civilMarriageDate: undefined,
        religiousMarriageDate: undefined,
      },
      groomData: {
        names: "",
        lastNames: "",
        birthDate: undefined,
        dui: "",
        nit: "",
        occupation: "",
        email: "",
        cellPhone: "",
        officePhone: "",
      },
      brideData: {
        names: "",
        lastNames: "",
        birthDate: undefined,
        dui: "",
        nit: "",
        occupation: "",
        email: "",
        cellPhone: "",
        officePhone: "",
      },
      address: {
        fullAddress: "",
        municipality: "",
        department: undefined,
        homePhone: "",
      },
      growthLadder: [],
      serverRetreats: {
        Encuentro: [],
        Diálogo: [],
        "Fe y Conversión": [],
        Reencuentro: [],
        "Renovación Conyugal": [],
        "Escuela de Animadores": [],
      },
      secretariats: [],
      attendsGeneralAssembly: undefined,
      growthGroups: [],
      observations: "",
    },
  });

  async function onSubmit(data: FichaMatrimonialData) {
    setIsLoading(true);
    try {
      await submitToGoogleForm(data);
      toast({
        title: "✅ Formulario Enviado",
        description:
          "Gracias. Todos los datos han sido guardados correctamente.",
      });
      form.reset();
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "❌ Error al enviar",
            description: error.message || "No se pudo guardar el formulario. Por favor, intente de nuevo.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MarriageDetailsSection control={form.control} />

        <PersonDetailsSection control={form.control} />

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
