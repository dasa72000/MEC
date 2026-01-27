"use client";

import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FichaMatrimonialData } from "@/lib/schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { DateSelector } from "@/components/ui/date-selector";

interface MarriageDetailsSectionProps {
    control: Control<FichaMatrimonialData>;
}

export function MarriageDetailsSection({ control }: MarriageDetailsSectionProps) {
    const belongsToGroup = useWatch({
        control,
        name: 'marriageData.belongsToGroup'
    });

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
                        <CardContent className="pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    name="marriageData.encounterDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Encuentro</FormLabel>
                                            <FormControl>
                                                <DateSelector value={field.value} onChange={field.onChange} />
                                            </FormControl>
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
                                    name="marriageData.civilMarriageDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Boda Civil</FormLabel>
                                            <FormControl>
                                                <DateSelector value={field.value} onChange={field.onChange} />
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
                                                <DateSelector value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-6">
                                <FormField
                                    control={control}
                                    name="marriageData.belongsToGroup"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>¿Pertenecen a algún grupo?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => field.onChange(value === 'true')}
                                                    value={field.value === undefined ? "" : String(field.value)}
                                                    className="flex items-center space-x-4"
                                                >
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem value="true" id="belongsToGroup-yes" />
                                                        </FormControl>
                                                        <FormLabel htmlFor="belongsToGroup-yes" className="font-normal cursor-pointer">Sí</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem value="false" id="belongsToGroup-no" />
                                                        </FormControl>
                                                        <FormLabel htmlFor="belongsToGroup-no" className="font-normal cursor-pointer">No</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {belongsToGroup && (
                                    <FormField
                                        control={control}
                                        name="marriageData.group"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre del grupo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Escriba el nombre del grupo" {...field} value={field.value ?? ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
