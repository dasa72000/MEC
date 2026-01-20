"use client";

import type { Control } from "react-hook-form";
import { Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FichaMatrimonialData } from "@/lib/schema";

interface MarriageDetailsSectionProps {
    control: Control<FichaMatrimonialData>;
}

export function MarriageDetailsSection({ control }: MarriageDetailsSectionProps) {
    return (
        <Card>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-6 hover:no-underline">
                        <div className="flex flex-1 items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Users className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold">Datos del Matrimonio</h3>
                                <p className="text-sm text-muted-foreground">Información general de la pareja</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className="grid grid-cols-1 gap-6 pt-0 md:grid-cols-2">
                            <FormField
                                control={control}
                                name="marriageData.memberCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código de Miembro</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: 006681074" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.encounterNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Encuentro *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.community"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comunidad *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione una comunidad" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="001 - Sede Central - Parroquia">001 - Sede Central - Parroquia</SelectItem>
                                                <SelectItem value="002 - Otra Comunidad">002 - Otra Comunidad</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>País</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione un país" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Guatemala">Guatemala</SelectItem>
                                                <SelectItem value="Mexico">Mexico</SelectItem>
                                                <SelectItem value="El Salvador">El Salvador</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.affiliation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Afiliación</FormLabel>
                                        <FormControl>
                                            <Input placeholder="as" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.correlative"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correla</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: 0082" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.encounterYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Año de Encuentro</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: 2007" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.group"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grupo al que pertenecen</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre del grupo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.civilMarriageDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Boda Civil</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="mm/dd/yyyy"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="marriageData.religiousMarriageDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Boda Religiosa</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="mm/dd/yyyy"
                                            />
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
