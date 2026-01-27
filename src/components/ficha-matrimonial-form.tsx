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
  const { toast } = useToast();

  const form = useForm<FichaMatrimonialData>({
    resolver: zodResolver(fichaMatrimonialSchema),
    defaultValues: {
      marriageData: {
        encounterNumber: '123',
        community: '001 - Sede Central - Parroquia',
        country: 'El Salvador',
        affiliation: 'Católica',
        encounterDate: '10/05/2010',
        civilMarriageDate: '20/12/2008',
        religiousMarriageDate: '20/12/2009',
        belongsToGroup: true,
        group: 'Grupo de Oración San Miguel',
      },
      groomData: {
        names: 'Juan Carlos',
        lastNames: 'Pérez Gómez',
        birthDate: '15/08/1985',
        dui: '12345678-9',
        nit: '0101-150885-101-1',
        occupation: 'Ingeniero de Software',
        email: 'juan.perez@email.com',
        cellPhone: '7777-8888',
        officePhone: '2222-3333',
      },
      brideData: {
        names: 'Ana María',
        lastNames: 'López de Pérez',
        birthDate: '25/11/1987',
        dui: '98765432-1',
        nit: '0101-251187-101-2',
        occupation: 'Doctora',
        email: 'ana.lopez@email.com',
        cellPhone: '6666-5555',
        officePhone: '2222-4444',
      },
      address: {
        fullAddress: 'Residencial Las Flores, Pol. B, #10',
        municipality: 'Santa Tecla',
        department: 'La Libertad',
        homePhone: '2525-6565',
      },
      growthLadder: [
        { name: "Diálogo", date: "15/07/2015" },
        { name: "Fe y Conversión", date: "" },
        { name: "Escuela de Animadores", date: "20/11/2021" },
      ],
      serverRetreats: {
        Encuentro: [{ role: "Animador de mesa", date: "10/02/2018", comments: "Fue una gran experiencia." }],
        'Fe y Conversión': [{ role: "Coordinador general", date: "", comments: "Mucha responsabilidad pero gratificante." }],
        'Diálogo': [],
        'Reencuentro': [],
        'Renovación Conyugal': [],
        'Escuela de Animadores': [],
      },
      secretariats: [{ name: "Secretaría de Finanzas", startYear: 2019, endYear: "2022" }],
      attendsGeneralAssembly: true,
      growthGroups: [{ groupName: "Los Peregrinos", encounter: "45", startDate: "01/01/2020", endDate: "31/12/2021" }],
      observations: 'Matrimonio muy comprometido con el movimiento. Participan activamente en todas las actividades.',
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
