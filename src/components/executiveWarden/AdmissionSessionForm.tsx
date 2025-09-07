import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { validationSchema, initialValues } from "@/constants/admissionSessionValidation";
import { createAdmissionSession } from "@/utils/executiveWarden/ewAdmissionSessionApi";
import useLoadingStore from "@/stores/loadingStore";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert"; 
import DatePicker from "@/components/formComponents/DatePicker";
import CheckboxField from "@/components/formComponents/CheckboxField"; 
import TextField from "@/components/formComponents/TextField";

const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
  label: `Semester ${i + 1}`,
  value: `${i + 1}`,
}));

interface AdmissionSessionFormProps {
  initialValues?: typeof initialValues;
  onSubmit?: (values: any) => void;
  editMode?: boolean;
}

const AdmissionSessionForm: React.FC<AdmissionSessionFormProps> = ({
  initialValues: customInitialValues,
  onSubmit,
  editMode = false,
}) => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [showDialog, setShowDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleFormSubmit = async (values: any) => {
    const semesters = (values.semesters as string[])
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));

    const sessionData = {
      from: values.from,
      to: values.to,
      semesters,
      academic_year: values.academic_year,
    };

    try {
      setLoading(true);
      await createAdmissionSession(sessionData);
      setAlertMessage("Admission session has been created successfully.");
      setShowDialog(true);
    } catch (error) {
      console.error("Failed to create admission session:", error);
      setAlertMessage("Something went wrong while creating the session.");
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={customInitialValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit || handleFormSubmit}
      >
        {({ handleSubmit }) => (
          <Form className="bg-white p-6 rounded-2xl shadow-sm max-w-lg mx-auto space-y-6">
            <Field
              name="from"
              component={DatePicker}
              label="Admission open from"
            />
            <Field name="to" component={DatePicker} label="To Date" />
            <Field
              name="semesters"
              component={CheckboxField} 
              label="Open admission for semesters"
              options={semesterOptions}
            />
            <Field
              name="academic_year"
              component={TextField}
              label="Academic Year"
              placeholder="e.g. 2025-2026"
            />

            <Button type="submit" onClick={() => handleSubmit()} className="w-full bg-[#022B60] hover:bg-[#022B60] text-white">
              {editMode ? "Save Changes" : "Start Session"}
            </Button>
          </Form>
        )}
      </Formik>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        {alertMessage && <Alert>{alertMessage}</Alert>}
        <div className="flex justify-end mt-4">
          <Button onClick={() => setShowDialog(false)}>OK</Button>
        </div>
      </Dialog>
    </>
  );
};

export default AdmissionSessionForm;
