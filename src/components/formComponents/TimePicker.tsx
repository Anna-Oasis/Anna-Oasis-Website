import { useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimePickerFieldProps {
  label: string;
  value: string;
  placeholder?: string;
}

const TimePickerField = ({ label, value, placeholder }: TimePickerFieldProps) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();

  return (
    <div className="mb-4 flex flex-col gap-2">
      {label && <Label htmlFor={value} className="block mb-1 font-medium">{label}</Label>}
      <Input
        type="time"
        id={value}
        name={value}
        value={values[value] || ""}
        onChange={e => setFieldValue(value, e.target.value)}
        placeholder={placeholder || "Select Time"}
        className={`bg-background appearance-none w-36 ${touched[value] && errors[value] ? "border-red-500" : ""}`}
        step="60"
      />
      {touched[value] && typeof errors[value] === "string" && (
        <div className="text-red-500 mt-1 italic text-sm">{errors[value]}</div>
      )}
    </div>
  );
};

export default TimePickerField;
