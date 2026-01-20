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
        affiliation: "AF",
        correlative: "0123",
        encounterYear: "2010",
        belongsToGroup: true,
        group: "Grupo de la Amistad",
        civilMarriageDate: new Date(2000, 4, 20),
        religiousMarriageDate: new Date(2000, 5, 17),
      },
      groomData: {
        names: "Juan Carlos",
        lastNames: "Pérez Gómez",
        birthDate: new Date(1975, 9, 15),
        dui: "01234567-8",
        nit: "0614-151075-101-9",
        occupation: "Ingeniero de Sistemas",
        email: "juan.perez@example.com",
        cellPhone: "7888-9999",
        officePhone: "2222-3333",
      },
      brideData: {
        names: "Ana María",
        lastNames: "López de Pérez",
        birthDate: new Date(1978, 2, 22),
        dui: "08765432-1",
        nit: "0614-220378-102-5",
        occupation: "Doctora en Medicina",
        email: "ana.lopez@example.com",
        cellPhone: "7999-8888",
        officePhone: "2555-4444",
      },
      address: {
        fullAddress: "Residencial Las Flores, Pol. B, Casa #10",
        municipality: "Santa Tecla",
        department: "La Libertad",
        homePhone: "2288-7777",
      },
      growthLadder: [
        { name: "Diálogo", date: new Date(2011, 1, 12) },
        { name: "Renovación Conyugal", date: new Date(2013, 7, 20) },
      ],
      serverRetreats: {
        Encuentro: [{ date: new Date(2015, 10, 5), role: "Coordinadores", comments: "Fue una gran experiencia" }],
        Diálogo: [],
        "Fe y Conversión": [],
        Reencuentro: [],
        "Renovación Conyugal": [],
        "Escuela de Animadores": [],
      },
      secretariats: [
        { name: "Secretaría de Finanzas", year: 2018 },
      ],
      attendsGeneralAssembly: true,
      growthGroups: [
        { groupName: "Los Peregrinos", startDate: new Date(2019, 0, 15), endDate: new Date(2020, 11, 15), encounter: "165" },
      ],
      observations: "Matrimonio muy comprometido con el movimiento.",
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
