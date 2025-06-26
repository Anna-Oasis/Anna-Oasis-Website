import { Input } from "@/components/ui/input";
import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";

interface PasswordFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * PasswordField component renders a password input field and integrates with Formik for form state management.
 *
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The name of the field in Formik values.
 * @param {any} props - Additional props for the input field.
 */
function PasswordField({ label, placeholder, value, ...props }: PasswordFieldProps) {
  const { values, handleBlur, handleChange, touched, errors } = useFormikContext<any>();

  return (
    <div className="mb-4">
      {label && <Label htmlFor={value} className="block mb-1 font-medium">{label}</Label>}
      <Input
        id={value}
        name={value}
        type="password"
        placeholder={placeholder}
        value={values[value]}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={touched[value] && !!errors[value]}
        className={`w-full ${touched[value] && errors[value] ? "border-red-500" : ""}`}
        {...props}
      />
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
}

export default PasswordField;
