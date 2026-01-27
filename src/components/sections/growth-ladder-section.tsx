"use client";

import type { Control } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GROWTH_LADDER_STEPS, type FichaMatrimonialData } from "@/lib/schema";
import { ClipboardList } from "lucide-react";
import { DateSelector } from "../ui/date-selector";

interface GrowthLadderSectionProps {
  control: Control<FichaMatrimonialData>;
}

export function GrowthLadderSection({ control }: GrowthLadderSectionProps) {
  return (
    <Card>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Escalera de Crecimiento</h3>
                <p className="text-sm text-muted-foreground">Retiros a los que han asistido</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="pt-0 space-y-6">
              <Alert>
                <AlertDescription>
                  Seleccione los retiros a los que han asistido. Al marcar cada uno, aparecerá un campo para ingresar la fecha.
                </AlertDescription>
              </Alert>

              <FormField
                control={control}
                name="growthLadder"
                render={({ field }) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GROWTH_LADDER_STEPS.map((item) => {
                      const currentItemIndex = field.value.findIndex((v) => v.name === item);
                      const isChecked = currentItemIndex > -1;

                      return (
                        <Card key={item} className="p-4 flex flex-col justify-between space-y-4">
                            <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                <Checkbox
                                    id={`gl-${item}`}
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      const newValue = [...field.value];
                                      if (checked) {
                                          if (!isChecked) {
                                            newValue.push({ name: item, date: '' });
                                          }
                                      } else {
                                          const index = newValue.findIndex((v) => v.name === item);
                                          if (index > -1) {
                                            newValue.splice(index, 1);
                                          }
                                      }
                                      field.onChange(newValue.sort((a, b) => GROWTH_LADDER_STEPS.indexOf(a.name) - GROWTH_LADDER_STEPS.indexOf(b.name)));
                                    }}
                                />
                                </FormControl>
                                <FormLabel htmlFor={`gl-${item}`} className="font-normal text-sm">{item}</FormLabel>
                            </FormItem>
                            {isChecked && (
                                <FormField
                                    control={control}
                                    name={`growthLadder.${currentItemIndex}.date`}
                                    render={({ field: dateField }) => (
                                        <FormItem>
                                            <FormControl>
                                                <DateSelector value={dateField.value} onChange={dateField.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </Card>
                      );
                    })}
                  </div>
                )}
              />
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
