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
        affiliation: 'Afiliación de Prueba',
        encounterDate: new Date('2022-10-15T06:00:00.000Z'),
        civilMarriageDate: new Date('2010-05-20T06:00:00.000Z'),
        religiousMarriageDate: new Date('2010-06-12T06:00:00.000Z'),
        belongsToGroup: true,
        group: 'Grupo de prueba San Benito',
      },
      groomData: {
        names: 'Juan Alberto',
        lastNames: 'Pérez López',
        birthDate: new Date('1985-02-20T06:00:00.000Z'),
        dui: '12345678-9',
        nit: '0101-200285-101-1',
        occupation: 'Ingeniero de Software',
        email: 'juan.perez@example.com',
        cellPhone: '7890-1234',
        officePhone: '2233-4455',
      },
      brideData: {
        names: 'María Elena',
        lastNames: 'González de Pérez',
        birthDate: new Date('1987-07-30T06:00:00.000Z'),
        dui: '87654321-0',
        nit: '0202-300787-102-2',
        occupation: 'Doctora',
        email: 'maria.gonzalez@example.com',
        cellPhone: '7123-4567',
        officePhone: '2244-5566',
      },
      address: {
        fullAddress: 'Calle La Mascota, #52, Colonia San Benito',
        municipality: 'San Salvador',
        department: 'San Salvador',
        homePhone: '2264-0000',
      },
      growthLadder: [
        { name: 'Diálogo', date: new Date('2023-01-10T06:00:00.000Z') },
        { name: 'Renovación Conyugal', date: new Date('2023-05-22T06:00:00.000Z') },
      ],
      serverRetreats: {
        Encuentro: [
          { date: new Date('2023-08-01T06:00:00.000Z'), role: 'Cocinero', comments: 'Mucha comida' }
        ],
        'Fe y Conversión': [],
        'Reencuentro': [],
        'Renovación Conyugal': [],
        'Escuela de Animadores': [],
        'Diálogo': [],
      },
      secretariats: [
        { name: 'Secretaría de Finanzas', year: 2023 }
      ],
      attendsGeneralAssembly: true,
      growthGroups: [
        { groupName: 'Los Peregrinos', startDate: new Date('2023-02-01T06:00:00.000Z'), endDate: new Date('2023-12-01T06:00:00.000Z'), encounter: '125' }
      ],
      observations: 'Esta es una observación de prueba para validar el funcionamiento del formulario completo.',
    },
  });

  function onSubmit(data: FichaMatrimonialData) {
    setIsLoading(true);
    try {
      submitToGoogleForm(data);
      toast({
        title: "✅ URL Generada para prueba",
        description:
          "Revisa la consola del navegador para ver el enlace de pre-rellenado y verificarlo.",
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
