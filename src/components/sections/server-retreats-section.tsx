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
import { PlusCircle, Trash2 } from "lucide-react";
import type { FichaMatrimonialData } from "@/lib/schema";

interface ServerRetreatsSectionProps {
  control: Control<FichaMatrimonialData>;
}

export function ServerRetreatsSection({ control }: ServerRetreatsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "serverRetreats",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retiros como Servidores</CardTitle>
        <CardDescription>
          Agregue los retiros en los que han servido.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={control}
                name={`serverRetreats.${index}.year`}
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
              <FormField
                control={control}
                name={`serverRetreats.${index}.month`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes</FormLabel>
                    <FormControl>
                      <Input placeholder="Enero" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`serverRetreats.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Input placeholder="Coordinador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`serverRetreats.${index}.comments`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentarios</FormLabel>
                    <FormControl>
                      <Input placeholder="Opcional" {...field} />
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
              year: new Date().getFullYear(),
              month: "",
              role: "",
              comments: "",
            })
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Retiro
        </Button>
      </CardContent>
    </Card>
  );
}
