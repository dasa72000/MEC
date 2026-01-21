"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  className?: string
  placeholder?: string
}

export function DatePicker({ value, onChange, className, placeholder = "dd/mm/yyyy" }: DatePickerProps) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const dateFormat = "dd/MM/yyyy";

  React.useEffect(() => {
    if (value && isValid(value)) {
      setInputValue(format(value, dateFormat));
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const text = inputValue.trim();

    if (text === "") {
      if (value) {
        onChange(undefined);
      }
      return;
    }

    // Auto-format ddmmyyyy to dd/mm/yyyy
    let dateStringToParse = text;
    if (/^\d{8}$/.test(text)) {
      dateStringToParse = `${text.slice(0, 2)}/${text.slice(2, 4)}/${text.slice(4, 8)}`;
    }

    const parsedDate = parse(dateStringToParse, dateFormat, new Date());

    if (isValid(parsedDate)) {
      // If date is valid, update the form and format the input
      setInputValue(format(parsedDate, dateFormat));
      if (!value || value.getTime() !== parsedDate.getTime()) {
        onChange(parsedDate);
      }
    } else {
      // If date is invalid, revert to the last valid value or clear the input
      if (value && isValid(value)) {
        setInputValue(format(value, dateFormat));
      } else {
        setInputValue("");
        onChange(undefined);
      }
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    onChange(selectedDate);
    if (selectedDate && isValid(selectedDate)) {
      setInputValue(format(selectedDate, dateFormat));
    }
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <div className="relative flex items-center">
        <Input
          type="text"
          className={cn("w-full pr-10 justify-start text-left font-normal", className)}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
        />
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="absolute right-0 h-full p-2 text-muted-foreground hover:text-foreground">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleCalendarSelect}
          initialFocus
          locale={es}
          captionLayout="dropdown-buttons"
          fromYear={1920}
          toYear={new Date().getFullYear() + 10}
        />
      </PopoverContent>
    </Popover>
  );
}
