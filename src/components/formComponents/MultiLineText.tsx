import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

/**
 * MultiLineText component renders a textarea input field and integrates with Formik for form state management.
 *
 * @param {string} placeholder - The placeholder text for the textarea.
 * @param {string} value - The name of the field in Formik values.
 * @param {any} props - Additional props for the textarea.
 */
function MultiLineText({ label, placeholder, value, ...props }: TextFieldProps) {
  const { values, handleBlur, handleChange, touched, errors } = useFormikContext<any>();

  return (
    <div className="mb-4">
      {label && <Label htmlFor={value} className="block mb-1 font-medium">{label}</Label>}
      <Textarea
        id={value}
        name={value}
        placeholder={placeholder}
        value={values[value]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full ${touched[value] && errors[value] ? "border-red-500" : ""}`}
        {...props}
      />
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
}

export default MultiLineText;
