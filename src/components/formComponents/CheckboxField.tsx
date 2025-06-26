import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFormikContext } from "formik";

interface CheckBoxFieldProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
}

/**
 * CheckBoxField component renders a group of checkboxes and integrates with Formik for form state management.
 *
 * @param {string} label
 * @param {string} value - The name of the field in Formik values.
 * @param {Array<{ label: string, value: string }>} options - An array of options for the checkboxes.
 */
const CheckBoxField = ({ label, value, options }: CheckBoxFieldProps) => {
  const { values, setFieldValue, touched, errors } =
    useFormikContext<Record<string, any>>();

  const handleCheckboxChange = (optionValue: string) => {
    const currentValue = values[value] || [];
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter((val: string) => val !== optionValue)
      : [...currentValue, optionValue];
    setFieldValue(value, newValue);
  };

  return (
    <div className="mb-4">
      {label && <Label className="block mb-1 font-medium">{label}</Label>}
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              id={`${value}-${option.value}`}
              checked={values[value]?.includes(option.value) || false}
              onCheckedChange={() => handleCheckboxChange(option.value)}
              aria-invalid={touched[value] && !!errors[value]}
              className={touched[value] && errors[value] ? "border-red-500" : ""}
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
};

export default CheckBoxField;
