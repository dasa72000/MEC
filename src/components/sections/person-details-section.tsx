"use client";

import type { Control } from "react-hook-form";
import { User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FichaMatrimonialData } from "@/lib/schema";

interface PersonDetailsSectionProps {
    control: Control<FichaMatrimonialData>;
}

function PersonFormFields({ control, personType }: { control: Control<FichaMatrimonialData>, personType: 'groomData' | 'brideData' }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={control} name={`${personType}.names`} render={({ field }) => (<FormItem><FormLabel>Nombres *</FormLabel><FormControl><Input placeholder="Nombres completos" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`${personType}.lastNames`} render={({ field }) => (<FormItem><FormLabel>Apellidos *</FormLabel><FormControl><Input placeholder="Apellidos" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`${personType}.birthDate`} render={({ field }) => (<FormItem><FormLabel>Fecha de Nacimiento</FormLabel><FormControl><DatePicker value={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`${personType}.dui`} render={({ field }) => (<FormItem><FormLabel>DUI</FormLabel><FormControl><Input placeholder="00000000-0" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`${personType}.nit`} render={({ field }) => (<FormItem><FormLabel>NIT</FormLabel><FormControl><Input placeholder="0000-000000-000-0" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`${personType}.occupation`} render={({ field }) => (<FormItem><FormLabel>Profesión</FormLabel><FormControl><Input placeholder="Profesión u oficio" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={control} name={`${personType}.email`} render={({ field }) => (<FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="correo@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={control} name={`${personType}.cellPhone`} render={({ field }) => (<FormItem><FormLabel>Celular</FormLabel><FormControl><Input placeholder="0000-0000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={control} name={`${personType}.officePhone`} render={({ field }) => (<FormItem><FormLabel>Teléfono Oficina</FormLabel><FormControl><Input placeholder="0000-0000" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
        </div>
    );
}

export function PersonDetailsSection({ control }: PersonDetailsSectionProps) {
    return (
        <Card>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-6 hover:no-underline">
                        <div className="flex flex-1 items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <User className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold">Datos Personales</h3>
                                <p className="text-sm text-muted-foreground">Información de Él y Ella</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className="pt-0">
                            <Tabs defaultValue="groom" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="groom">👨 Él</TabsTrigger>
                                    <TabsTrigger value="bride">👩 Ella</TabsTrigger>
                                </TabsList>
                                <TabsContent value="groom" className="pt-6">
                                    <PersonFormFields control={control} personType="groomData" />
                                </TabsContent>
                                <TabsContent value="bride" className="pt-6">
                                    <PersonFormFields control={control} personType="brideData" />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
