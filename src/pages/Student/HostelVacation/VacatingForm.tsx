import { Form } from "formik";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import TextField from "@/components/formComponents/TextField";
import TextAreaField from "@/components/formComponents/TextAreaField";
import SelectField from "@/components/formComponents/SelectField";
import CheckBoxField from "@/components/formComponents/CheckboxField";

const endeavourOptions = [
  { label: "Higher Studies", value: "HIGHER_STUDIES" },
  { label: "Job", value: "JOB" },
  { label: "Competitive Exams", value: "COMPETITIVE_EXAMS" },
  { label: "Others", value: "OTHERS" },
];

const vacatingOptions = [
  { label: "AC Remote", value: "AC Remote" },
  { label: "Room Keys", value: "Room Keys" },
  { label: "Cupboard Keys", value: "Cupboard Keys" },
  { label: "LAN Cable", value: "LAN Cable" },
  { label: "Fridge / Oven", value: "Fridge / Oven" },
  { label: "Caution Deposit Form", value: "Caution Deposit Form" },
];

export default function HostelVacationForm() {
  return (
    <Form>
      <div className="space-y-6">
        <Card className="shadow-sm border-slate-200 rounded-3xl">
          <CardContent className="p-6">
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

            <div className="mt-6">
              <TextField
                label="Future Address"
                value="future_address"
                placeholder="Enter your future address"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 rounded-3xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Future Plans
            </h2>

            <SelectField
              label="Future Endeavour"
              value="endeavour"
              options={endeavourOptions}
            />

            <div className="mt-6">
              <TextAreaField
                label="Endeavour Description"
                value="endeavourDescription"
                placeholder="Describe your future plans"
              />
            </div>

            <div className="mt-6">
              <TextAreaField
                label="Feedback"
                value="feedback"
                placeholder="Share your hostel experience"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 rounded-3xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#0F2F6E] mb-6">
              Returned Items
            </h2>

            <CheckBoxField value="returned_items" options={vacatingOptions} />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 rounded-3xl">
          <CardContent className="p-6">
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

            <div className="mt-6">
              <TextField
                label="Bank Address"
                value="addressOfTheBank"
                placeholder="Enter bank address"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#0F2F6E] hover:bg-[#0A2558]">
            Submit Request
          </Button>
        </div>
      </div>
    </Form>
  );
}
