"use client";

import type { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import type { FichaMatrimonialData } from "@/lib/schema";

interface PersonDetailsSectionProps {
  control: Control<FichaMatrimonialData>;
  part: "groomData" | "brideData";
  title: string;
}

const sacraments: { id: keyof FichaMatrimonialData['groomData']['sacraments']; label: string }[] = [
    { id: 'baptism', label: 'Bautismo' },
    { id: 'communion', label: 'Comunión' },
    { id: 'confirmation', label: 'Confirmación' },
];

export function PersonDetailsSection({ control, part, title }: PersonDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control} name={`${part}.name`} render={({ field }) => (<FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="Nombre completo" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`${part}.birthDate`} render={({ field }) => (<FormItem><FormLabel>Fecha de Nacimiento</FormLabel><FormControl><DatePicker value={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`${part}.phone`} render={({ field }) => (<FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="555-123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`${part}.email`} render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="ejemplo@correo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`${part}.occupation`} render={({ field }) => (<FormItem><FormLabel>Ocupación</FormLabel><FormControl><Input placeholder="Profesión" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name={`${part}.studies`} render={({ field }) => (<FormItem><FormLabel>Estudios</FormLabel><FormControl><Input placeholder="Nivel de estudios" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        <FormItem>
            <FormLabel>Sacramentos Recibidos</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {sacraments.map(sacrament => (
                     <FormField
                        key={sacrament.id}
                        control={control}
                        name={`${part}.sacraments.${sacrament.id}`}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">{sacrament.label}</FormLabel>
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </FormItem>
      </CardContent>
    </Card>
  );
}
