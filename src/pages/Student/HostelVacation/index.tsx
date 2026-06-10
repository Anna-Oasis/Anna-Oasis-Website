import { useState } from "react";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import HostelVacationForm from "./VacatingForm";
import HostelVacationHistory from "./HostelVacationHistory";

import useUserStore from "@/stores/userStore";

import { submitStudentVacatingForm } from "@/utils/student/studentVacatingHostelApi";

import * as Yup from "yup";

const validationSchema = Yup.object({
  vacating_date: Yup.string().required("Vacating date is required"),
  vacating_time: Yup.string().required("Vacating time is required"),
  future_address: Yup.string().required("Future address is required"),

  returned_items: Yup.array().min(1, "Select at least one item").required(),

  accountHolderName: Yup.string().required("Account holder name is required"),

  accountNumber: Yup.string().required("Account number is required"),

  bankName: Yup.string().required("Bank name is required"),

  addressOfTheBank: Yup.string().required("Bank address is required"),

  IFSCode: Yup.string().required("IFSC code is required"),
});

const initialValues = {
  vacating_date: "",
  vacating_time: "",
  future_address: "",
  returned_items: [],

  endeavour: "",
  endeavourDescription: "",
  feedback: "",

  accountHolderName: "",
  accountNumber: "",
  bankName: "",
  addressOfTheBank: "",
  IFSCode: "",
};

export default function HostelVacationPage() {
  const [tab, setTab] = useState<"form" | "history">("form");

  const details = useUserStore((state) => state.details);

  const handleSubmit = async (values: any) => {
    try {
      const vacatingValues = {
        vacating_date: values.vacating_date,
        vacating_time: values.vacating_time,
        future_address: values.future_address,
        returned_items: values.returned_items,

        endeavour: values.endeavour,
        endeavourDescription: values.endeavourDescription,
        feedback: values.feedback,
      };

      const cautionValues = {
        accountHolderName: values.accountHolderName,
        accountNumber: values.accountNumber,
        bankName: values.bankName,
        addressOfTheBank: values.addressOfTheBank,
        IFSCode: values.IFSCode,
      };

      const result = await submitStudentVacatingForm(
        details?.rollNo || "",
        vacatingValues,
        cautionValues,
      );

      if (result) {
        toast.success("Hostel vacation request submitted successfully");

        setTab("history");
      } else {
        toast.error("Failed to submit hostel vacation request");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to submit hostel vacation request");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-[#0F2F6E]">
          Hostel Vacation Portal
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Submit hostel vacation requests and track approval status.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <Button
          variant={tab === "form" ? "default" : "outline"}
          onClick={() => setTab("form")}
          className={tab === "form" ? "bg-[#0F2F6E] hover:bg-[#0A2558]" : ""}
        >
          New Request
        </Button>

        <Button
          variant={tab === "history" ? "default" : "outline"}
          onClick={() => setTab("history")}
          className={tab === "history" ? "bg-[#0F2F6E] hover:bg-[#0A2558]" : ""}
        >
          History
        </Button>
      </div>

      {/* Content */}
      {tab === "history" ? (
        <HostelVacationHistory />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <HostelVacationForm />
        </Formik>
      )}
    </div>
  );
}
