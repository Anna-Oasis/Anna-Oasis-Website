import { Formik } from "formik";
import { useState } from "react";
import TextField from "../formComponents/TextField";
import DateAndTimePicker from "../formComponents/DatePicker";
import CheckBoxField from "../formComponents/CheckboxField";
import {
  validationSchema,
  initialValues,
} from "../../constants/admissionSessionValidation";
import { createAdmissionSession } from "@/utils/executiveWarden/ewAdmissionSessionApi";
import useLoadingStore from "@/stores/loadingStore";
import ModalCallable from "@/components/modals/ModalCallable";
import { semesters } from "@/constants/details";

interface AdmissionSessionFormProps {
  initialValues?: typeof initialValues;
  onSubmit?: (values: any) => void;
  editMode?: boolean;
}

const AdmissionSessionForm = ({
  initialValues: customInitialValues,
  onSubmit,
  editMode = false,
}: AdmissionSessionFormProps) => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = async (values: any) => {
    const parsedSemesters = (values.semesters as string[])
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));

    const sessionData = {
      from: values.from,
      to: values.to,
      semesters: parsedSemesters,
      academic_year: values.academic_year,
    };

    try {
      setLoading(true);
      await createAdmissionSession(sessionData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to create admission session:", error);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6"
          >
            <DateAndTimePicker label="Admission open from" value="from" />
            <DateAndTimePicker label="To Date" value="to" />

            <CheckBoxField
              label="Open admission for semesters"
              value="semesters"
              options={semesters}
            />

            <TextField
              label="Academic Year"
              placeholder="e.g. 2025-2026"
              value="academic_year"
            />

            <button
              type="submit"
              className="mt-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              {editMode ? "Save Changes" : "Start Session"}
            </button>
          </form>
        )}
      </Formik>

      <ModalCallable
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success!"
        message="Admission session has been created successfully."
      />
    </>
  );
};

export default AdmissionSessionForm;
