import { useFormikContext } from "formik";
import PhoneInput from "react-phone-input-2";
import { Label } from "../ui/label";
import "react-phone-input-2/lib/style.css";

interface PhoneInputFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
}

const phoneRegex = /^\+[1-9]\d{1,14}$/;

function PhoneInputField({ label, value, placeholder }: PhoneInputFieldProps) {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();

  // Format to E.164 on every change
  const handleChange = (phone: string) => {
    let formatted = phone.replace(/[^\d+]/g, "");
    if (!formatted.startsWith("+")) {
      formatted = "+" + formatted.replace(/^(\d+)/, "$1");
    }
    if (formatted === "" || phoneRegex.test(formatted)) {
      setFieldValue(value, formatted);
    } else {
      setFieldValue(value, formatted);
    }
  };

  return (
    <div className="mb-4 w-full">
      {label && <Label htmlFor={value} className="block mb-1 font-medium">{label}</Label>}
      <div className="flex flex-col sm:flex-row w-full gap-2">
        <div className="w-full">
          <PhoneInput
            country={"in"}
            value={values[value] || ""}
            onChange={handleChange}
            inputProps={{
              name: value,
              id: value,
              required: true,
              autoFocus: false,
              placeholder: placeholder || "Phone number",
              autoComplete: "tel",
            }}
            inputClass={`w-full !pl-12 !pr-3 !py-2 sm:!text-base !text-sm ${touched[value] && errors[value] ? "border-red-500" : ""}`}
            containerClass="w-full"
            buttonClass="!bg-white !border-r !border-gray-300 !h-full"
            dropdownClass="!z-50"
            enableSearch
          />
        </div>
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