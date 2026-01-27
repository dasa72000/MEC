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
        affiliation: 'Afiliación de prueba',
        encounterDate: '15/05/2010',
        civilMarriageDate: '20/03/2008',
        religiousMarriageDate: '25/03/2008',
        belongsToGroup: true,
        group: 'Grupo de Crecimiento "La Roca"',
      },
      groomData: {
        names: 'Juan Alberto',
        lastNames: 'Pérez Gómez',
        birthDate: '10/01/1980',
        dui: '12345678-9',
        nit: '0101-100180-101-1',
        occupation: 'Ingeniero de Software',
        email: 'juan.perez@example.com',
        cellPhone: '7777-8888',
        officePhone: '2222-3333',
      },
      brideData: {
        names: 'María Elena',
        lastNames: 'Rodríguez de Pérez',
        birthDate: '05/02/1982',
        dui: '98765432-1',
        nit: '0202-050282-102-2',
        occupation: 'Doctora en Medicina General',
        email: 'maria.rodriguez@example.com',
        cellPhone: '6666-5555',
        officePhone: '2222-4444',
      },
      address: {
        fullAddress: 'Calle de la Amargura #123, Residencial La Alegría, Bloque Z',
        municipality: 'San Salvador',
        department: 'San Salvador',
        homePhone: '2525-6565',
      },
      growthLadder: [
        { name: "Diálogo", date: '11/11/2011' },
        { name: "Renovación Conyugal", date: '12/12/2012' },
        { name: "Fe y Conversión", date: '10/10/2013' },
      ],
      serverRetreats: {
        Encuentro: [{ role: "Matrimonio Animador", date: "01/01/2015", comments: "Fue una gran experiencia de servicio." }],
        'Fe y Conversión': [{ role: "Encargado de Cocina", date: "", comments: "Se preparó la comida para 50 matrimonios." }],
        'Diálogo': [],
        'Reencuentro': [],
        'Renovación Conyugal': [],
        'Escuela de Animadores': [],
      },
      secretariats: [
        { name: "Secretaría de Finanzas", startYear: 2018, endYear: "2020" },
        { name: "Secretaría de Liturgia", startYear: 2021, endYear: "" }
      ],
      attendsGeneralAssembly: true,
      growthGroups: [
        { groupName: "Los Peregrinos", encounter: "45", startDate: "01/06/2019", endDate: "31/12/2021" }
      ],
      observations: 'Este es un formulario de prueba para verificar la correcta integración con Google Forms. Todos los datos son ficticios.',
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
      // form.reset(); // We keep the data for testing purposes
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
