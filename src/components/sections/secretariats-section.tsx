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
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2 } from "lucide-react";
import type { FichaMatrimonialData } from "@/lib/schema";

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
      <CardHeader>
        <CardTitle>Secretarías y Áreas</CardTitle>
        <CardDescription>
          Registre la participación en secretarías y áreas.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <FormField
                control={control}
                name={`secretariats.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de Secretaría/Área</FormLabel>
                    <FormControl>
                      <Input placeholder="Secretaría de..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`secretariats.${index}.year`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={`secretariats.${index}.inAssembly`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <FormLabel>¿Participa en la asamblea?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({ name: "", year: new Date().getFullYear(), inAssembly: false })
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Secretaría
        </Button>
      </CardContent>
    </Card>
  );
}
