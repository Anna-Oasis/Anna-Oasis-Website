import SelectField from "@/components/formComponents/SelectField";
import TextField from "@/components/formComponents/TextField";
import ImagePickerField from "@/components/formComponents/ImagePickerField";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { messPreferences, previousResidentOptions } from "@/constants/admission";

const HOSTEL_FEES = [
  { label: "Admission Fee (One Time)", amount: "₹5,000" },
  { label: "Caution Deposit (Refundable, One Time)", amount: "₹15,000" },
  { label: "Room Rent & Maintenance Charges (per semester)", amount: "₹43,500" },
  { label: "Clothes Washing & Drying Charges (per semester)", amount: "₹4,500" },
  { label: "Total Hostel Charges (per semester)", amount: "₹48,000" },
  { label: "Mess Charges (per semester)", amount: "₹48,300" },
];

const HOSTEL_TOTALS = [
  {
    label: "Total for 1st Semester (One Time + Semester + Mess)",
    amount: "₹1,16,300",
  },
  {
    label: "Total for Every Subsequent Semester (Semester + Mess)",
    amount: "₹96,300",
  },
];

const UPI_ID = "INTHOSTEL@SBI";
const QR_IMAGE = "/images/upi_qr.jpeg"; // Place your QR image in public/images/upi_qr.jpg

const AdmissionDetails = () => {

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-md transition-all duration-300">
      {/* Mess Preference & Previous Resident */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <SelectField label="Mess Preference" value="messPreference" options={messPreferences} />
        <SelectField label="Previous Resident" value="previousResident" options={previousResidentOptions} />
      </div>

      {/* Payment Section */}
      <div>
        <div className="text-2xl font-bold mb-2 mt-2 text-center text-blue-700">
          Hostel Fee Payment
        </div>
        <div className="mb-6 bg-gray-50 rounded-lg p-4 shadow-sm">
          <div className="text-lg font-semibold mb-2 text-center text-blue-700">
            Fee Structure
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Particulars</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HOSTEL_FEES.map((fee, idx) => (
                <TableRow key={idx}>
                  <TableCell>{fee.label}</TableCell>
                  <TableCell>{fee.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {HOSTEL_TOTALS.map((total, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-bold">{total.label}</TableCell>
                  <TableCell className="font-bold">{total.amount}</TableCell>
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img
            src={QR_IMAGE}
            alt="UPI QR"
            className="w-100 h-120 rounded-xl mb-4 object-contain border border-gray-200 shadow"
          />
          <div className="text-md font-semibold mb-2 text-blue-700">
            UPI ID: <span className="font-mono">{UPI_ID}</span>
          </div>
          <div className="mb-2 text-center text-gray-700">
            Please scan the QR code above or use the UPI ID to pay the total hostel fees via Google Pay (GPay).
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-1 font-medium text-gray-800">
            After payment, enter your Transaction ID below to proceed.
          </div>
          <TextField
            label="Transaction ID"
            value="transactionId"
            placeholder="Enter your Transaction ID"
          />
          <div className="mt-4" />
          <ImagePickerField
            label="Transaction Screenshot"
            value="transactionPhotoUrl"
            placeholder="Upload a screenshot of your payment"
          />
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetails;