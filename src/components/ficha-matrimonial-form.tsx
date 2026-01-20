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
  GROWTH_LADDER_STEPS,
  RETREAT_TYPES,
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
        memberCode: '007-DEMO',
        encounterNumber: '150',
        community: '001 - Sede Central - Parroquia',
        country: 'El Salvador',
        affiliation: 'AS',
        correlative: '0099',
        encounterYear: '2010',
        belongsToGroup: true,
        group: 'Grupo de Prueba "San Pablo"',
        civilMarriageDate: new Date('2000-05-20T00:00:00'),
        religiousMarriageDate: new Date('2000-06-15T00:00:00'),
      },
      groomData: {
        names: 'Juan Alberto',
        lastNames: 'Pérez López',
        birthDate: new Date('1978-03-10T00:00:00'),
        dui: '01234567-8',
        nit: '0101-100378-101-1',
        occupation: 'Ingeniero de Software',
        email: 'juan.perez.demo@example.com',
        cellPhone: '7777-1111',
        officePhone: '2222-3333',
      },
      brideData: {
        names: 'María Elena',
        lastNames: 'González de Pérez',
        birthDate: new Date('1980-08-25T00:00:00'),
        dui: '09876543-2',
        nit: '0101-250880-101-2',
        occupation: 'Doctora en Medicina',
        email: 'maria.gonzalez.demo@example.com',
        cellPhone: '7777-2222',
        officePhone: '2222-4444',
      },
      address: {
        fullAddress: 'Residencial Las Flores, Polígono G, #25',
        municipality: 'Santa Tecla',
        department: 'La Libertad',
        homePhone: '2288-5555',
      },
      growthLadder: [
        { name: 'Diálogo', date: new Date('2011-02-15T00:00:00') },
        { name: 'Fe y Conversión', date: new Date('2012-09-20T00:00:00') },
      ],
      serverRetreats: {
        Encuentro: [
          { date: new Date('2015-11-10T00:00:00'), role: 'Coordinadores', comments: 'Encuentro #180' }
        ],
        'Fe y Conversión': [
          { date: new Date('2018-04-05T00:00:00'), role: 'Charlistas', comments: '' }
        ],
      },
      secretariats: [
        { name: 'Secretaría de Finanzas', year: 2019 },
        { name: 'Secretaría de Liturgia', year: 2021 },
      ],
      attendsGeneralAssembly: true,
      growthGroups: [
        { groupName: 'Discípulos de Emaús', startDate: new Date('2016-01-01T00:00:00'), endDate: new Date('2017-12-31T00:00:00'), encounter: '190' }
      ],
      observations: 'Matrimonio muy comprometido con el movimiento. Él tiene habilidades de liderazgo y ella es muy servicial.',
    },
  });

  function onSubmit(data: FichaMatrimonialData) {
    setIsLoading(true);
    try {
      submitToGoogleForm(data);
      toast({
        title: "✅ Formulario listo para enviar",
        description:
          "Se ha abierto una nueva pestaña. Por favor, revisa los datos y presiona 'Enviar' en esa página.",
      });
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
