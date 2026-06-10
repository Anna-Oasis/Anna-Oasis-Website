import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

function TextAreaField({
  label,
  placeholder,
  value,
  ...props
}: TextAreaFieldProps) {
  const { values, handleBlur, handleChange, touched, errors } =
    useFormikContext<Record<string, any>>();

  const hasError = touched[value] && typeof errors[value] === "string";

  return (
    <div className="mb-4">
      {label && (
        <Label htmlFor={value} className="block mb-1 font-medium">
          {label}
        </Label>
      )}

      <Textarea
        id={value}
        name={value}
        placeholder={placeholder}
        value={values[value] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={5}
        aria-invalid={!!hasError}
        className={`w-full resize-none min-h-[120px] ${
          hasError ? "border-red-500 focus-visible:ring-red-500" : ""
        }`}
        {...props}
      />

      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
}

export default TextAreaField;
