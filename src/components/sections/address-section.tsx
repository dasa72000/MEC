"use client";

import type { Control } from "react-hook-form";
import { MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DEPARTMENTS, type FichaMatrimonialData } from "@/lib/schema";

interface AddressSectionProps {
    control: Control<FichaMatrimonialData>;
}

export function AddressSection({ control }: AddressSectionProps) {
    return (
        <Card>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-6 hover:no-underline">
                        <div className="flex flex-1 items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold">Dirección</h3>
                                <p className="text-sm text-muted-foreground">Ubicación del hogar</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className="pt-0 space-y-6">
                            <FormField
                                control={control}
                                name="address.fullAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dirección Completa</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Calle, número, colonia, residencial, etc."
                                                className="resize-y min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={control}
                                    name="address.municipality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Municipio</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: San José Villanueva" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="address.department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Departamento</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {DEPARTMENTS.map((dep) => (
                                                        <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="address.homePhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono Fijo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0000-0000" {...field} />
                                        </FormControl>
                                        <FormMessage />
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
