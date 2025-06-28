import { useFormikContext } from "formik";
import SelectField from "@/components/formComponents/SelectField";
import TextField from "@/components/formComponents/TextField";
import Text from "@/components/ui/text";
import { admissionCategories, messPreferences, previousResidentOptions } from "@/constants/admission";

const HOSTEL_FEES = [
  { label: "Admission Fee", amount: "₹2,000" },
  { label: "Hostel Rent (per semester)", amount: "₹15,000" },
  { label: "Mess Advance", amount: "₹12,000" },
  { label: "Caution Deposit (Refundable)", amount: "₹5,000" },
];

const UPI_ID = "salaikowshikan531@okicici";
const QR_IMAGE = "@/assets/react.svg"; // Place your QR image in public/images/upi.jpg

const AdmissionDetails = () => {
  const { values } = useFormikContext<any>();

  return (
    <div>
      <SelectField label="Mess Preference" value="messPreference" options={messPreferences} />
      <SelectField label="Previous Resident" value="previousResident" options={previousResidentOptions} />
      <SelectField label="Admission Category" value="admissionCategory" options={admissionCategories} />

      <div style={{ marginTop: 24 }}>
        <Text size="xl" bold className="mb-2 block">Hostel Fee Payment</Text>
        <div className="flex flex-col items-center mb-4">
          <img
            src={QR_IMAGE}
            alt="UPI QR"
            style={{ width: 200, height: 200, marginBottom: 8, objectFit: "contain" }}
          />
          <Text size="md" bold className="block">UPI ID: {UPI_ID}</Text>
        </div>
        <div className="mb-4">
          <Text size="lg" bold className="mb-2 block">Fee Structure</Text>
          {HOSTEL_FEES.map((fee, idx) => (
            <div key={idx} className="flex justify-between mb-1">
              <Text>{fee.label}</Text>
              <Text>{fee.amount}</Text>
            </div>
          ))}
        </div>
        <Text className="mb-2 block">
          Please scan the QR code above or use the UPI ID to pay the total hostel fees via Google Pay (GPay).
        </Text>
        <Text bold className="mb-1 block">After payment, enter your Transaction ID below to proceed.</Text>
        <TextField
          label="Transaction ID"
          value="transactionId"
          placeholder="Enter your Transaction ID"
        />
      </div>
    </div>
  );
};

export default AdmissionDetails;