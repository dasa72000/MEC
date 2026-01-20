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

export function FichaMatrimonialForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FichaMatrimonialData>({
    resolver: zodResolver(fichaMatrimonialSchema),
    defaultValues: {
      marriageData: {
        memberCode: "",
        encounterNumber: "",
        community: "",
        country: "",
        affiliation: "",
        correlative: "",
        encounterYear: "",
        group: "",
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
      serverRetreats: {},
      secretariats: [],
      attendsGeneralAssembly: undefined,
      growthGroups: [],
      observations: "",
    },
  });

  async function onSubmit(data: FichaMatrimonialData) {
    setIsLoading(true);
    // Here you would typically send the data to your backend
    console.log("Form data submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
    toast({
      title: "✅ Formulario Guardado",
      description:
        "Todos los datos han sido guardados correctamente.",
    });
    setIsLoading(false);
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
