"use client";

import {
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  ValidationResult,
} from 'react-aria-components';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateField,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date';
import { buttonVariants } from '@/components/ui/button';

interface RacDatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function RacDatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: RacDatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={cn('group flex flex-col gap-1', props.className)}
    >
      <Group className="relative flex h-10 w-full items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <DateField className="flex-1 px-3 py-2">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="rounded-sm caret-transparent text-foreground placeholder:text-muted-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
            />
          )}
        </DateField>
        <Button className="pr-2 text-muted-foreground hover:text-foreground">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </Group>
      <Popover placement="bottom start" className="w-auto">
        <Dialog className="p-3 border rounded-lg bg-popover text-popover-foreground shadow-md outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95">
          <Calendar>
            <header className="flex items-center justify-between px-1 pb-4">
              <Heading className="text-sm font-medium" />
              <div className="flex items-center gap-1">
                <Button
                  slot="previous"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  slot="next"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </header>
            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="w-9 text-center text-xs font-normal text-muted-foreground">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <tbody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="w-9 h-9 text-center p-0 rounded-md text-sm cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outside-days:text-muted-foreground/50 data-[disabled]:text-muted-foreground/50 data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[hovered]:bg-accent data-[hovered]:text-accent-foreground data-[unavailable]:line-through"
                  />
                )}
              </tbody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}

type FormDatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
};

function toCalendarDate(date: Date | undefined): CalendarDate | undefined {
  if (!date) return undefined;
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;
  return parseDate(dateStr);
}

export function DatePicker({
  value,
  onChange,
  className,
}: FormDatePickerProps) {
  const handleRacChange = (dateValue: DateValue | null) => {
    if (dateValue) {
      onChange(dateValue.toDate(getLocalTimeZone()));
    } else {
      onChange(undefined);
    }
  };

  return (
    <RacDatePicker
      className={className}
      value={toCalendarDate(value)}
      onChange={handleRacChange}
      granularity="day"
    />
  );
}
