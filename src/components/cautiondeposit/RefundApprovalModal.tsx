import { Formik } from "formik";
import TextField from "@/components/formComponents/TextField";
import {
  RefundApprovalInitialValues,
  RefundApprovalValidationSchema,
} from "@/constants/validations/refundApprovalValidation";

interface RefundApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: {
    refundAmount: string;
    deductionAmount: string;
    deductionReason: string;
    studentRollNumber: string;
  }) => void;
  application: { id: string; name: string; rollNumber: string } | null;
}

export default function RefundApprovalModal({
  isOpen,
  onClose,
  onSubmit,
  application,
}: RefundApprovalModalProps) {
  // Return nothing if modal is not active
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Backdrop blur click-to-close overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content Shell */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Header wrapper context */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">
            Approve Refund
          </h3>
          {application && (
            <p className="text-xs text-slate-500 mt-0.5">
              Refunding: {application.name} ({application.rollNumber})
            </p>
          )}
        </div>

        {/* Form Management through Formik */}
        <Formik
          initialValues={RefundApprovalInitialValues}
          validationSchema={RefundApprovalValidationSchema}
          onSubmit={(values) => {
            onSubmit({
              ...values,
              studentRollNumber: application?.rollNumber || "",
            });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Body Form Layout Containers */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col gap-y-3">
                  <TextField
                    label="Refund Amount"
                    name="refundAmount" // React/Formik web inputs map fields using name instead of value strings
                    placeholder="Enter refund amount"
                  />
                  <TextField
                    label="Deduction Amount"
                    name="deductionAmount"
                    placeholder="Enter deduction amount"
                  />
                  <TextField
                    label="Reason for Deduction"
                    name="deductionReason"
                    placeholder="Enter reason"
                  />
                </div>
              </div>

              {/* Footer Control Panel Buttons */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl shadow-sm shadow-blue-100 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
