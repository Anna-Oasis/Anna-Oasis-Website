import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import TextAreaField from "@/components/formComponents/TextAreaField";
import TextField from "@/components/formComponents/TextField";
import SelectField from "@/components/formComponents/SelectField";

import { handleGrievance } from "@/utils/student/studentGrievanceApi";
import { toast } from "sonner";

const grievanceValidationSchema = Yup.object({
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  grievance_type: Yup.string().required("Category is required"),
});

const initialValues = {
  grievance_type: "",
  subject: "",
  description: "",
};

export default function GrievanceForm() {
  const onSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    const success = await handleGrievance(values);

    if (success) {
      toast.success("Grievance submitted successfully");
      resetForm();
    } else {
      toast.error("Failed to submit grievance");
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 rounded-3xl">
      <CardHeader className="pb-6">
        <CardTitle>File a Grievance</CardTitle>

        <CardDescription>
          Raise hostel, mess, maintenance, or administrative concerns.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={grievanceValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <TextField
              label="Subject"
              value="subject"
              placeholder="Enter grievance title"
            />

            <TextAreaField
  label="Description"
  value="description"
  placeholder="Describe your grievance in detail"
/>

            <SelectField
              label="Category"
              value="grievance_type"
              options={[
                {
                  label: "Mess",
                  value: "MESS",
                },
                {
                  label: "Hostel",
                  value: "HOSTEL",
                },
                {
                  label: "Maintenance",
                  value: "MAINTENANCE",
                },
                {
                  label: "Other",
                  value: "OTHER",
                },
              ]}
            />

            <Button type="submit" className="bg-[#0F2F6E] hover:bg-[#0A2558]">
              Submit Grievance
            </Button>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
