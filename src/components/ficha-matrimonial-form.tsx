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
        memberCode: '006681074',
        encounterNumber: '123',
        community: '001 - Sede Central - Parroquia',
        country: 'El Salvador',
        affiliation: 'AS',
        correlative: '0082',
        encounterYear: '2007',
        civilMarriageDate: new Date('2000-05-20T00:00:00'),
        religiousMarriageDate: new Date('2000-05-28T00:00:00'),
        belongsToGroup: true,
        group: 'Grupo de Oración San Pío',
      },
      groomData: {
        names: 'Juan Alberto',
        lastNames: 'Pérez López',
        birthDate: new Date('1975-03-15T00:00:00'),
        dui: '12345678-9',
        nit: '1234-567890-123-4',
        occupation: 'Ingeniero de Software',
        email: 'juan.perez@example.com',
        cellPhone: '7777-8888',
        officePhone: '2222-3333',
      },
      brideData: {
        names: 'María Elena',
        lastNames: 'García de Pérez',
        birthDate: new Date('1978-08-22T00:00:00'),
        dui: '98765432-1',
        nit: '4321-098765-321-0',
        occupation: 'Doctora',
        email: 'maria.garcia@example.com',
        cellPhone: '6666-5555',
        officePhone: '4444-5555',
      },
      address: {
        fullAddress: 'Colonia San Benito, Calle Principal #123',
        municipality: 'San Salvador',
        department: 'San Salvador',
        homePhone: '2525-2525',
      },
      growthLadder: [
        { name: 'Diálogo', date: new Date('2008-02-10T00:00:00') },
        { name: 'Renovación Conyugal', date: new Date('2010-06-15T00:00:00') },
      ],
      serverRetreats: {
          Encuentro: [{ date: new Date('2012-11-20T00:00:00'), role: 'Coordinador', comments: 'Excelente experiencia' }]
      },
      secretariats: [{ name: 'Secretaría de Finanzas', year: 2015 }],
      attendsGeneralAssembly: true,
      growthGroups: [{ groupName: 'Grupo #15', startDate: new Date('2018-01-15T00:00:00'), endDate: new Date('2019-01-15T00:00:00'), encounter: '55' }],
      observations: 'Esta es una prueba de envío de datos completos desde la aplicación.',
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
