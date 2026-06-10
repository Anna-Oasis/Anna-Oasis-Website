import { Form } from "formik";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import TextField from "@/components/formComponents/TextField";
import SelectField from "@/components/formComponents/SelectField";
import CheckBoxField from "@/components/formComponents/CheckboxField";

const endeavourOptions = [
  {
    label: "Higher Studies",
    value: "HIGHER_STUDIES",
  },
  {
    label: "Job",
    value: "JOB",
  },
  {
    label: "Competitive Exams",
    value: "COMPETITIVE_EXAMS",
  },
  {
    label: "Others",
    value: "OTHERS",
  },
];

const vacatingOptions = [
  {
    label: "AC Remote",
    value: "AC Remote",
  },
  {
    label: "Room Keys",
    value: "Room Keys",
  },
  {
    label: "Cupboard Keys",
    value: "Cupboard Keys",
  },
  {
    label: "LAN Cable",
    value: "LAN Cable",
  },
  {
    label: "Fridge / Oven",
    value: "Fridge / Oven",
  },
  {
    label: "Caution Deposit Form",
    value: "Caution Deposit Form",
  },
];

const declarationOptions = [
  {
    label:
      "I confirm that I am vacating the hostel room in good condition and agree to pay any applicable charges if damages are found.",
    value: "accepted",
  },
];

export default function HostelVacationForm() {
  return (
    <Form>
      <div className="space-y-8">
        {/* Header */}
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-[#0F2F6E]">
              Hostel Vacation Request
            </h1>

            <p className="text-slate-500 mt-2">
              Submit your hostel vacating request and provide caution deposit
              details for refund processing.
            </p>
          </CardContent>
        </Card>

        {/* Vacation Details */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Vacation Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <TextField
                label="Vacating Date"
                value="vacating_date"
                placeholder="YYYY-MM-DD"
              />

              <TextField
                label="Vacating Time"
                value="vacating_time"
                placeholder="HH:MM"
              />
            </div>

            <TextField
              label="Future Address"
              value="future_address"
              placeholder="Enter your future address"
            />
          </CardContent>
        </Card>

        {/* Future Plans */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Future Plans
            </h2>

            <SelectField
              label="Future Endeavour"
              value="endeavour"
              options={endeavourOptions}
            />

            <TextField
              label="Endeavour Description"
              value="endeavourDescription"
              placeholder="Describe your future plans"
            />

            <TextField
              label="Feedback"
              value="feedback"
              placeholder="Share your hostel experience"
            />
          </CardContent>
        </Card>

        {/* Returned Items */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Returned Items
            </h2>

            <CheckBoxField value="returned_items" options={vacatingOptions} />
          </CardContent>
        </Card>

        {/* Declaration */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Declaration
            </h2>

            <CheckBoxField
              value="declarationAccepted"
              options={declarationOptions}
            />
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Caution Deposit Refund Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <TextField
                label="Account Holder Name"
                value="accountHolderName"
                placeholder="Enter account holder name"
              />

              <TextField
                label="Account Number"
                value="accountNumber"
                placeholder="Enter account number"
              />

              <TextField
                label="Bank Name"
                value="bankName"
                placeholder="Enter bank name"
              />

              <TextField
                label="IFSC Code"
                value="IFSCode"
                placeholder="Enter IFSC code"
              />
            </div>

            <TextField
              label="Bank Address"
              value="addressOfTheBank"
              placeholder="Enter bank address"
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-[#0F2F6E] hover:bg-[#0c2558]">
            Submit Vacation Request
          </Button>
        </div>
      </div>
    </Form>
  );
}
