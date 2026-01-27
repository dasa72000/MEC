"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar(props: CalendarProps) {
  return (
    <DayPicker
      locale={es}
      weekStartsOn={1}
      showOutsideDays
      className="p-3"
      formatters={{
        formatWeekdayName: (day) =>
          ["lu", "ma", "mi", "ju", "vi", "sá", "do"][
            // Adjust for Sunday (0) being the last day
            (day.getDay() + 6) % 7
          ],
      }}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",

        caption: "relative flex items-center justify-center",
        caption_label: "text-sm font-medium",

        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse table-fixed",

        head_row: "table-row",
        head_cell:
          "table-cell w-9 text-center text-xs font-medium text-muted-foreground",

        row: "table-row",
        cell: "table-cell h-9 w-9 text-center align-middle p-0",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal"
        ),
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
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
  )
}
Calendar.displayName = "Calendar"

export { Calendar }