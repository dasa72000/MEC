"use client";

import type { Control } from "react-hook-form";
import { FilePenLine } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent }from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { FichaMatrimonialData } from "@/lib/schema";

interface ObservationsSectionProps {
  control: Control<FichaMatrimonialData>;
}

export function ObservationsSection({ control }: ObservationsSectionProps) {
  return (
    <Card>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FilePenLine className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Observaciones</h3>
                <p className="text-sm text-muted-foreground">Comentarios adicionales</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="pt-0">
              <FormField
                control={control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones o comentarios adicionales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escriba aquí cualquier información adicional que considere importante..."
                        className="resize-y min-h-[100px]"
                        {...field}
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
