"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function Calendar(props: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays
      className="p-3"
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-4",

        caption: "relative flex items-center justify-center",
        caption_label: "text-sm font-medium",

        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 text-primary"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        
        head_row: "",
        head_cell:
          "text-muted-foreground text-center font-normal text-[0.8rem]",
        row: "w-full",
        cell: "h-9 w-9 text-center text-sm p-0 relative",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal"
        ),

        day_selected: "bg-primary text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
