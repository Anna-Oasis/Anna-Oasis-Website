import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/**
 * Props for the SelectField component
 */
interface SelectFieldProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
}

/**
 * SelectField component renders a select dropdown and integrates with Formik for form state management.
 */
const SelectField = ({ label, value, options }: SelectFieldProps) => {
  const { values, setFieldValue, touched, errors } =
    useFormikContext<Record<string, any>>();

  return (
    <div className="mb-4">
      {label && <Label className="block mb-1 font-medium">{label}</Label>}
      <Select value={values[value]} onValueChange={(val) => setFieldValue(value, val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
};

export default SelectField;
