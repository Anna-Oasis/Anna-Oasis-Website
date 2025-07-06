import * as React from "react";
import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

interface DateAndTimePickerProps {
  label?: string;
  value: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  showDate?: boolean;
  showTime?: boolean;
  props?: any;
}

const DateAndTimePicker = ({
  label,
  value,
  placeholder = "Select date",
  minimumDate,
  maximumDate,
  showDate = true,
  showTime = false,
  ...props
}: DateAndTimePickerProps) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();
  const [open, setOpen] = React.useState(false);

  // Parse value to Date and/or time string
  let dateValue: Date | undefined = undefined;
  if (values[value]) {
    if (showDate) {
      // Expecting YYYY-MM-DD string
      const d = new Date(values[value]);
      if (!isNaN(d.getTime())) {
        dateValue = d;
      }
    }
  }

  // Handle date change
  const handleDateChange = (selected: Date | undefined) => {
    setOpen(false);
    if (!selected) return;
    let newValue = "";
    if (showDate) {
      // Use local date, not UTC
      const year = selected.getFullYear();
      const month = String(selected.getMonth() + 1).padStart(2, "0");
      const day = String(selected.getDate()).padStart(2, "0");
      newValue = `${year}-${month}-${day}`;
    }
    setFieldValue(value, newValue);
  };

  return (
    <div className="mb-4">
      {label && <Label className="block mb-1 font-medium">{label}</Label>}
      <div className="flex gap-4">
        {showDate && (
          <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id={`${value}-date-picker`}
                  className="w-36 justify-between font-normal"
                  type="button"
                >
                  {dateValue ? dateValue.toLocaleDateString() : placeholder}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  captionLayout="dropdown"
                  onSelect={handleDateChange}
                  {...props}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
};

export default DateAndTimePicker;