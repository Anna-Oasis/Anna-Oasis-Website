import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import countryData from "country-telephone-data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/**
 * Props for the PhoneInputField component
 */
interface PhoneInputFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
}

/**
 * PhoneInputField component provides a phone input with country selector
 * that integrates with Formik. Uses a select for country code and input for number.
 */
function PhoneInputField({ label, value, placeholder }: PhoneInputFieldProps) {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();
  const [countryCode, setCountryCode] = useState("+91");

  // Prepare country code options from library
  const countryOptions = countryData.allCountries.map((c) => ({
    name: c.name,
    dialCode: `+${c.dialCode}`,
    iso2: c.iso2,
  }));

  // Split value into country code and number if possible
  let phoneNumber = values[value] || "";
  if (phoneNumber.startsWith("+")) {
    const match = phoneNumber.match(/^(\+\d{1,4})\s?(.*)$/);
    if (match) {
      if (match[1] !== countryCode) setCountryCode(match[1]);
      phoneNumber = match[2];
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(value, `${countryCode}${e.target.value}`);
  };

  const handleCountryChange = (selected: string) => {
    setCountryCode(selected);
    console.log("Selected country code:", selected);
    // Update phone number with new country code
    if (phoneNumber.startsWith("+")) {
      phoneNumber = phoneNumber.replace(/^\+\d{1,4}\s?/, "");
    }
    console.log("Updated phone number:", phoneNumber);
    // Set the new value with selected country code and existing phone number
    setFieldValue(value, `${selected}${phoneNumber}`);
    console.log("Updated Formik value:", values[value]);
  };

  return (
    <div className="mb-4">
      {label && <Label className="block mb-1 font-medium">{label}</Label>}
      <div className="flex gap-2">
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((c) => (
              <SelectItem key={c.iso2} value={c.dialCode}>
                {c.name} {c.dialCode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          name={value}
          id={value}
          placeholder={placeholder || "Phone number"}
          value={phoneNumber}
          onChange={handleNumberChange}
          className={`w-full ${touched[value] && errors[value] ? "border-red-500" : ""}`}
        />
      </div>
      {touched[value] && errors[value] && (
        <div className="text-red-500 mt-1 italic text-sm">
          {typeof errors[value] === "string"
            ? errors[value]
            : Array.isArray(errors[value])
            ? (errors[value] as string[]).join(", ")
            : "Invalid value"}
        </div>
      )}
    </div>
  );
}

export default PhoneInputField;
