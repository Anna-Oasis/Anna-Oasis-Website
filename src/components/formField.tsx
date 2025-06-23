import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // or other input component
import { Textarea } from "@/components/ui/textarea"; // if needed
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

type FormFieldWrapperProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  isCountrySelect?: boolean;
};

export const FormFieldWrapper = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isTextArea = false,
  isCountrySelect = false
}: FormFieldWrapperProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>          <FormControl>
            {isCountrySelect ? (
              <CountrySelect
                onChange={(e: any) => {
                  const countryName = e?.name || "";
                  field.onChange(countryName);
                }}
                placeHolder={placeholder || "Select Country"}
              />
            ) : isTextArea ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
