import { useEffect } from "react";
import { useFormikContext } from "formik";
import ImagePickerField from "@/components/formComponents/ImagePickerField";
import SelectField from "@/components/formComponents/SelectField";
import TextField from "@/components/formComponents/TextField";
import RadioField from "@/components/formComponents/RadioField";
import { govtIdTypes } from "@/constants/details";
import useUserStore from "@/stores/userStore";

const FileUploads = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const details = useUserStore((state) => state.details);
  console.log("FileUploads component rendered with details:", details);
  console.log("FileUploads component values:", values);

  useEffect(() => {
    if (Array.isArray(details) && details.length > 0 ) {
      const isForeign = details[0].govtIdType === "Passport" ? "Yes" : "No";
      setFieldValue("isForeignNational", isForeign);
    } else {
      if (values.isForeignNational === undefined) {
        setFieldValue("isForeignNational", "No");
      }
    }
  }, [details, setFieldValue, values.isForeignNational, details?.govtIdType]);
   // Automatically set govtIdType to "Passport" if foreign national is "Yes"
  useEffect(() => {
    if (values.isForeignNational === "Yes") {
      setFieldValue("govtIdType", "Passport");
    }
  }, [values.isForeignNational, setFieldValue]);

  return (
    <>
      {(details === null || details.length === 0) && (
        <RadioField
          label="Are you a Foreign National?"
          value="isForeignNational"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />
      )}

      {values.isForeignNational === "No" ? (
        <div>
          <SelectField
            label="Government ID Type"
            value="govtIdType"
            options={govtIdTypes}
          />
          <TextField
            label="Government ID Number"
            value="govtId"
            placeholder="Enter ID number"
          />
          <ImagePickerField
            label={`${values.govtIdType || "Government ID"} Document`}
            value="categoryProofUrl"
            placeholder="Upload"
          />
        </div>
      ) : (
        <div>
          <TextField
            label="Passport Number"
            value="govtId"
            placeholder="Enter passport number"
          />
          <ImagePickerField
            label="Passport Document"
            value="categoryProofUrl"
            placeholder="Upload"
          />
        </div>
      )}

      <ImagePickerField label="Passport Photo" value="passportPhotoUrl" placeholder="Upload" />
      <ImagePickerField label="Student Signature" value="studentSignatureUrl" placeholder="Upload" />
      <ImagePickerField label="Parent/Guardian Signature" value="parentGuardianSignatureUrl" placeholder="Upload" />
      <ImagePickerField label="Admission Slip" value="admissionSlipUrl" placeholder="Upload" />
    </>
  );
};

export default FileUploads;