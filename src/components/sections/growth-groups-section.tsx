"use client";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { PlusCircle, Trash2 } from "lucide-react";
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
      <CardHeader>
        <CardTitle>Grupos de Crecimiento</CardTitle>
        <CardDescription>
          Registre los grupos de crecimiento que han animado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border rounded-lg space-y-4 relative bg-card"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`growthGroups.${index}.groupName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Grupo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del grupo" {...field} />
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
                    <FormLabel>Encuentro</FormLabel>
                    <FormControl>
                      <Input placeholder="Encuentro No." {...field} />
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
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
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
                    <FormLabel>Fecha de Fin</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              groupName: "",
              encounter: "",
              startDate: new Date(),
              endDate: new Date(),
            })
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Grupo
        </Button>
      </CardContent>
    </Card>
  );
}
