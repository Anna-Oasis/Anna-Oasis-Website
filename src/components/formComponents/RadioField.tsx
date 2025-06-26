import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

/**
 * Props for the RadioField component
 */
interface RadioFieldProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
}

/**
 * RadioField component renders a group of radio buttons and integrates with Formik for form state management.
 */
function RadioField({ label, value, options }: RadioFieldProps) {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();

  return (
    <div className="mb-4">
      {label && <Label className="block mb-1 font-medium">{label}</Label>}
      <RadioGroup
        value={values[value]}
        onValueChange={(val) => setFieldValue(value, val)}
      >
        {options.map((option) => (
          <div className="flex items-center gap-3" key={option.value}>
            <RadioGroupItem value={option.value} id={`${value}-${option.value}`} />
            <Label htmlFor={`${value}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
}

export default RadioField;
