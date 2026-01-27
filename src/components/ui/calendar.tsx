"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { es } from "date-fns/locale/es";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Calendar(props: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={es}
      ISOWeek
      showOutsideDays
      className="p-3"
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-4",

        caption: "relative flex items-center justify-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse",
        head_row: "",
        head_cell:
          "w-9 text-center font-normal text-xs text-muted-foreground",

        row: "",
        cell: "w-9 h-9 text-center p-0",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal"
        ),
        day_selected: "bg-primary text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
