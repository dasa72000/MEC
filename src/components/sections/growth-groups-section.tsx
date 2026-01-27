"use client";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Group, PlusCircle, X } from "lucide-react";
import type { FichaMatrimonialData } from "@/lib/schema";

interface GrowthGroupsSectionProps {
  control: Control<FichaMatrimonialData>;
}

export function GrowthGroupsSection({ control }: GrowthGroupsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "growthGroups",
  });

  return (
    <Card>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Group className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Grupos de Crecimiento</h3>
                <p className="text-sm text-muted-foreground">
                  Grupos que han animado
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="pt-0">
              <Card className="bg-card shadow-inner">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Grupos de Crecimiento que han Animado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-2 items-start"
                      >
                        <FormField
                          control={control}
                          name={`growthGroups.${index}.groupName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Nombre del grupo"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`growthGroups.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="dd/mm/yyyy" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`growthGroups.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="dd/mm/yyyy" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`growthGroups.${index}.encounter`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Enc. No." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => remove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() =>
                      append({
                        groupName: "",
                        encounter: "",
                        startDate: "",
                        endDate: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar grupo
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
