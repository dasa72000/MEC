"use client";

import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RETREAT_TYPES, type FichaMatrimonialData } from "@/lib/schema";
import { CheckCircle, PlusCircle, Trash2 } from "lucide-react";

interface ServerRetreatsSectionProps {
  control: Control<FichaMatrimonialData>;
}

function RetreatTypeSubSection({
  control,
  retreatType,
}: {
  control: Control<FichaMatrimonialData>;
  retreatType: (typeof RETREAT_TYPES)[number];
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `serverRetreats.${retreatType}`,
  });

  return (
    <Card className="bg-card shadow-inner">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium">{retreatType}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-2 items-start">
              <FormField
                control={control}
                name={`serverRetreats.${retreatType}.${index}.date`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker value={field.value} onChange={field.onChange} placeholder="mm/dd/yyyy" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`serverRetreats.${retreatType}.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl><Input placeholder="Rol" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`serverRetreats.${retreatType}.${index}.comments`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl><Input placeholder="Comentarios" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => append({ date: undefined, role: "", comments: "" })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar registro
        </Button>
      </CardContent>
    </Card>
  );
}

export function ServerRetreatsSection({ control }: ServerRetreatsSectionProps) {
  return (
    <Card>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Retiros como Servidores</h3>
                <p className="text-sm text-muted-foreground">Retiros en los que han servido</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="pt-0 space-y-6">
              <Alert>
                <AlertDescription>
                  Puede agregar múltiples registros por tipo de retiro. Cada registro guarda: <strong>Fecha, Rol</strong> y <strong>Comentarios</strong>.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {RETREAT_TYPES.map((retreatType) => (
                  <RetreatTypeSubSection key={retreatType} control={control} retreatType={retreatType} />
                ))}
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
