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
        memberCode: "001234567",
        encounterNumber: "150",
        community: "001 - Sede Central - Parroquia",
        country: "El Salvador",
        affiliation: "AS",
        correlative: "0099",
        encounterYear: "2010",
        belongsToGroup: true,
        group: "Grupo de la Esperanza",
        civilMarriageDate: new Date("2000-05-20T00:00:00-06:00"),
        religiousMarriageDate: new Date("2000-06-15T00:00:00-06:00"),
      },
      groomData: {
        names: "Juan José (Prueba)",
        lastNames: "Pérez Gómez",
        birthDate: new Date("1975-03-10T00:00:00-06:00"),
        dui: "01234567-8",
        nit: "0101-100375-101-9",
        occupation: "Ingeniero de Software",
        email: "juan.perez@example.com",
        cellPhone: "7777-8888",
        officePhone: "2233-4455",
      },
      brideData: {
        names: "María Elena (Prueba)",
        lastNames: "López de Pérez",
        birthDate: new Date("1978-08-25T00:00:00-06:00"),
        dui: "09876543-2",
        nit: "0101-250878-102-1",
        occupation: "Doctora en Medicina",
        email: "maria.lopez@example.com",
        cellPhone: "6666-5555",
        officePhone: "2244-5566",
      },
      address: {
        fullAddress: "Colonia Las Rosas, Pasaje 3, Casa #10",
        municipality: "San Salvador",
        department: "San Salvador",
        homePhone: "2211-2233",
      },
      growthLadder: [
        { name: "Diálogo", date: new Date("2011-02-15T00:00:00-06:00") },
        { name: "Renovación Conyugal", date: new Date("2012-07-20T00:00:00-06:00") },
        { name: "Fe y Conversión", date: new Date("2013-03-10T00:00:00-06:00") },
      ],
      serverRetreats: {
        Encuentro: [
          { date: new Date("2015-11-10T00:00:00-06:00"), role: "Coordinadores", comments: "Encuentro #180" }
        ],
        Diálogo: [],
        "Fe y Conversión": [],
        Reencuentro: [],
        "Renovación Conyugal": [],
        "Escuela de Animadores": [],
      },
      secretariats: [
        { name: "Secretaría de Finanzas", year: 2018 },
        { name: "Secretaría de Liturgia", year: 2019 },
      ],
      attendsGeneralAssembly: true,
      growthGroups: [
          {
              groupName: "Los Peregrinos",
              startDate: new Date("2013-01-15T00:00:00-06:00"),
              endDate: new Date("2015-12-20T00:00:00-06:00"),
              encounter: "165",
          }
      ],
      observations: "Esta es una prueba de envío de datos completos desde la aplicación.",
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
      // No resetear el formulario en modo de prueba
      // form.reset(); 
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
