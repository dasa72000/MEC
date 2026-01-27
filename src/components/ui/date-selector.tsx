"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export function DateSelector({ value, onChange }: DateSelectorProps) {
  const [day, setDay] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");

  React.useEffect(() => {
    if (value && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [d, m, y] = value.split("/");
      setDay(String(Number(d)));
      setMonth(String(Number(m)));
      setYear(y);
    } else if (!value) {
      setDay("");
      setMonth("");
      setYear("");
    }
  }, [value]);

  const triggerChange = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      const formattedDay = String(newDay).padStart(2, "0");
      const formattedMonth = String(newMonth).padStart(2, "0");
      onChange(`${formattedDay}/${formattedMonth}/${newYear}`);
    } else if (!newDay && !newMonth && !newYear) {
      onChange('');
    } else {
      onChange('PARTIAL');
    }
  };
  
  const handleDayChange = (d: string) => {
    setDay(d);
    triggerChange(d, month, year);
  };
  const handleMonthChange = (m: string) => {
    setMonth(m);
    triggerChange(day, m, year);
  };
  const handleYearChange = (y: string) => {
    setYear(y);
    triggerChange(day, month, y);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select value={day} onValueChange={handleDayChange}>
        <SelectTrigger>
          <SelectValue placeholder="Día" />
        </SelectTrigger>
        <SelectContent>
          {DAYS.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={month} onValueChange={handleMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="Mes" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => {
            const monthName = new Date(2000, m - 1, 1).toLocaleString('es', { month: 'long' });
            return (
                <SelectItem key={m} value={String(m)}>
                    {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
                </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={handleYearChange}>
        <SelectTrigger>
          <SelectValue placeholder="Año" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
