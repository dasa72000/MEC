"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DateSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// Helper function to parse a full date string
const getPartsFromValue = (value: string | undefined): [string, string, string] => {
  if (value && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [d, m, y] = value.split('/');
    return [String(Number(d)), String(Number(m)), y];
  }
  return ['', '', ''];
};

export function DateSelector({ value, onChange }: DateSelectorProps) {
  // Internal state for each part of the date
  const [day, setDay] = React.useState(() => getPartsFromValue(value)[0]);
  const [month, setMonth] = React.useState(() => getPartsFromValue(value)[1]);
  const [year, setYear] = React.useState(() => getPartsFromValue(value)[2]);

  // Ref to hold the latest `value` from props to avoid including it in the effect dependency array
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Sync state down from `value` prop, e.g., on form reset.
  React.useEffect(() => {
    if (value !== 'PARTIAL') {
        const [d, m, y] = getPartsFromValue(value);
        setDay(d);
        setMonth(m);
        setYear(y);
    }
  }, [value]);

  // Report state up to react-hook-form when any part changes.
  React.useEffect(() => {
    const newCompleteDate = day && month && year ? `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}` : null;
    const currentValue = valueRef.current;
    
    if (newCompleteDate) {
        // If a complete date is formed, report it if it's different.
        if (newCompleteDate !== currentValue) {
            onChange(newCompleteDate);
        }
    } else if (day || month || year) {
        // If date is partially filled, report 'PARTIAL' for validation.
        if (currentValue !== 'PARTIAL') {
            onChange('PARTIAL');
        }
    } else {
        // If all parts are empty, report empty string.
        if (currentValue) { // only call if there is a value to clear
            onChange('');
        }
    }
  }, [day, month, year, onChange]);

  const handleClear = () => {
    setDay('');
    setMonth('');
    setYear('');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-3 gap-2 grow">
        <Select value={day} onValueChange={setDay}>
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
        <Select value={month} onValueChange={setMonth}>
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
        <Select value={year} onValueChange={setYear}>
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
      {(day || month || year) ? (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={handleClear}
            aria-label="Limpiar fecha"
        >
            <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      ) : <div className="h-10 w-10 shrink-0" /> }
    </div>
  );
}
