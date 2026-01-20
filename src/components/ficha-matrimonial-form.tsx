"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { validateFormData } from "@/ai/flows/validate-form-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  fichaMatrimonialSchema,
  type FichaMatrimonialData,
  GROWTH_LADDER_STEPS,
} from "@/lib/schema";
import { PersonDetailsSection } from "./sections/person-details-section";
import { ServerRetreatsSection } from "./sections/server-retreats-section";
import { SecretariatsSection } from "./sections/secretariats-section";
import { GrowthGroupsSection } from "./sections/growth-groups-section";

export function FichaMatrimonialForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FichaMatrimonialData>({
    resolver: zodResolver(fichaMatrimonialSchema),
    defaultValues: {
      marriageData: {
        parish: "",
        priest: "",
      },
      groomData: {
        name: "",
        phone: "",
        email: "",
        occupation: "",
        studies: "",
        sacraments: { baptism: false, communion: false, confirmation: false },
      },
      brideData: {
        name: "",
        phone: "",
        email: "",
        occupation: "",
        studies: "",
        sacraments: { baptism: false, communion: false, confirmation: false },
      },
      address: { street: "", city: "", state: "", zip: "", homePhone: "" },
      growthLadder: [],
      serverRetreats: [],
      secretariats: [],
      growthGroups: [],
      observations: "",
    },
  });

  async function onSubmit(data: FichaMatrimonialData) {
    setIsLoading(true);
    try {
      const validationResult = await validateFormData(data);
      if (validationResult.isValid) {
        toast({
          title: "✅ Formulario Válido",
          description:
            "Todos los datos han sido validados correctamente por la IA.",
        });
        // Here you would typically send the data to your backend
        console.log("Form data submitted:", data);
      } else {
        toast({
          variant: "destructive",
          title: "❌ Errores de Validación de IA",
          description: (
            <ul className="list-disc pl-5">
              {validationResult.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          ),
          duration: 9000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description:
          "Ocurrió un error al validar el formulario. Inténtalo de nuevo.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Datos del Matrimonio</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="marriageData.marriageDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Matrimonio</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Seleccione la fecha de matrimonio"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marriageData.parish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parroquia</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la parroquia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marriageData.priest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sacerdote</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del sacerdote" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <PersonDetailsSection control={form.control} part="groomData" title="Datos Personales de Él" />
        <PersonDetailsSection control={form.control} part="brideData" title="Datos Personales de Ella" />

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

        <Card>
          <CardHeader>
            <CardTitle>Escalera de Crecimiento</CardTitle>
            <CardDescription>Marque los pasos que han completado.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
                control={form.control}
                name="growthLadder"
                render={() => (
                    <FormItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {GROWTH_LADDER_STEPS.map((item) => (
                            <FormField
                                key={item}
                                control={form.control}
                                name="growthLadder"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={item}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                    (value) => value !== item
                                                                )
                                                            )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {item}
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                    </FormItem>
                )}
            />
          </CardContent>
        </Card>

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
            Validar y Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
