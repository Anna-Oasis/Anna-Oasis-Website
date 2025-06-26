import { useRef } from "react";
import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
}

const ImagePickerField = ({ label, value, placeholder }: Props) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue(value, URL.createObjectURL(file));
    }
  };

  return (
    <div className="my-2 p-4 rounded-lg bg-black border border-white">
      <Label className="text-white text-base font-semibold mb-2">{label}</Label>
      {values[value] ? (
        <img
          src={values[value]}
          alt={label}
          className="w-24 h-24 object-cover rounded border border-white mb-2"
        />
      ) : (
        <div className="text-gray-400 mb-2">{placeholder}</div>
      )}
      <Button
        type="button"
        className="bg-white border border-black rounded px-4 py-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-black font-medium">Upload {label}</span>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {touched[value] && errors[value] && (
        typeof errors[value] === "string" ? (
          <div className="text-red-500 mt-2">{errors[value]}</div>
        ) : Array.isArray(errors[value]) ? (
          (errors[value] as string[]).map((err, idx) => (
            <div className="text-red-500 mt-2" key={idx}>{err}</div>
          ))
        ) : null
      )}
    </div>
  );
};

export default ImagePickerField;
