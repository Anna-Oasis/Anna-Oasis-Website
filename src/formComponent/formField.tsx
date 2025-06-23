import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // or other input component
import { Textarea } from "@/components/ui/textarea"; // if needed

type FormFieldWrapperProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
};

export const FormFieldWrapper = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isTextArea = false
}: FormFieldWrapperProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextArea ? (
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
