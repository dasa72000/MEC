"use client";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { FichaMatrimonialData } from "@/lib/schema";
import { Briefcase, PlusCircle, Trash2 } from "lucide-react";

interface SecretariatsSectionProps {
  control: Control<FichaMatrimonialData>;
}

export function SecretariatsSection({ control }: SecretariatsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "secretariats",
  });

  return (
    <Card>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Secretarías y Áreas</h3>
                <p className="text-sm text-muted-foreground">Áreas en las que sirven o han servido</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="pt-0 space-y-6">
              <Card className="bg-card shadow-inner p-4">
                <h4 className="text-sm font-medium mb-4">Secretarías o Áreas de Servicio</h4>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-[1fr,auto,auto,auto] gap-2 items-center">
                      <FormField
                        control={control}
                        name={`secretariats.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Nombre de la secretaría o área" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`secretariats.${index}.startYear`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" placeholder="Año inicio" {...field} value={field.value ?? ''} className="w-28"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`secretariats.${index}.endYear`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" placeholder="Año fin" {...field} value={field.value ?? ''} className="w-28"/>
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
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4 border-dashed"
                  onClick={() => append({ name: "", startYear: new Date().getFullYear(), endYear: "" })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar secretaría
                </Button>
              </Card>

              <div className="relative py-2">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-sm text-muted-foreground">
                        Asamblea General
                    </span>
                </div>
              </div>

              <FormField
                control={control}
                name="attendsGeneralAssembly"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-center block">¿Asisten regularmente a las Asambleas Generales?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === 'true')}
                        value={field.value === undefined ? "" : String(field.value)}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormLabel className="cursor-pointer flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="true" className="sr-only" />
                            </FormControl>
                            Sí
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                           <FormLabel className="cursor-pointer flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <FormControl>
                              <RadioGroupItem value="false" className="sr-only" />
                            </FormControl>
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-center"/>
                  </FormItem>
                )}
              />
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
