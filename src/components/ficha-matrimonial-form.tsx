"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      address: { street: "", city: "", state: "", zip: "", homePhone: "" },
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

        <Card>
          <CardHeader>
            <CardTitle>Dirección</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="address.street" render={({ field }) => (<FormItem><FormLabel>Calle y Número</FormLabel><FormControl><Input placeholder="Av. Siempre Viva 123" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="address.city" render={({ field }) => (<FormItem><FormLabel>Ciudad</FormLabel><FormControl><Input placeholder="Springfield" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="address.state" render={({ field }) => (<FormItem><FormLabel>Estado/Provincia</FormLabel><FormControl><Input placeholder="Estado" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="address.zip" render={({ field }) => (<FormItem><FormLabel>Código Postal</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="address.homePhone" render={({ field }) => (<FormItem><FormLabel>Teléfono de Casa</FormLabel><FormControl><Input placeholder="555-1234" {...field} /></FormControl><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <GrowthLadderSection control={form.control} />

        <ServerRetreatsSection control={form.control} />
        <SecretariatsSection control={form.control} />
        <GrowthGroupsSection control={form.control} />

        <Card>
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones adicionales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escriba cualquier observación o comentario relevante aquí."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

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
