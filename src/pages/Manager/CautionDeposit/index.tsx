import React, { useEffect, useState } from "react";
import ApprovalCard, { badgeStatus } from "@/components/approvalCard";
import RefundApprovalModal from "@/components/cautiondeposit/RefundApprovalModal";
import {
  fetchManagerVacatingForms,
  approveManagerVacatingForm,
  rejectManagerVacatingForm,
} from "@/utils/manager/managerCautionDepositAPI";
import { Spinner } from "@/components/ui/spinner";
import DeclineComment from "@/components/modals/declineComment";
import ModalCallable from "@/components/modals/ModalCallable";
import EmptyPage from "@/components/EmptyPage";

export default function CautionDepositPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const getApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchManagerVacatingForms();
      setApplications(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch forms");
      setApplications([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleApprove = (app: any) => {
    setSelectedApp(app);
    setRefundModalOpen(true);
  };

  const handleRefundSubmit = async (values: {
    refundAmount: string;
    deductionAmount: string;
    deductionReason: string;
    studentRollNumber: string;
  }) => {
    try {
      await approveManagerVacatingForm(
        selectedApp.vacating_hostel_id,
        values.deductionAmount,
        values.refundAmount,
        values.deductionReason,
      );
      setSuccessMsg("Form approved successfully!");
      setSuccessModalVisible(true);
      setRefundModalOpen(false);
      setSelectedApp(null);
      getApplications();
    } catch (err: any) {
      alert(err.message || "Failed to approve form");
    }
  };

  const handleReject = (app: any) => {
    setSelectedApp(app);
    setRejectModalOpen(true);
  };

  const submitRejection = async (reason: string) => {
    if (!reason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    try {
      await rejectManagerVacatingForm(
        selectedApp.vacating_hostel_id,
        reason.trim() + " (Rejected by Manager)",
        selectedApp.deductions || "0.00",
        selectedApp.refund_amount || "0.00",
        selectedApp.deduction_details || "None",
      );
      setSuccessMsg("Form rejected successfully!");
      setSuccessModalVisible(true);
      setRejectModalOpen(false);
      setSelectedApp(null);
      getApplications();
    } catch (err: any) {
      alert(err.message || "Failed to reject form");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6">
      {/* Header Info Banner */}
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Caution Deposits</h1>
        <p className="text-sm text-slate-500">
          Review and clear student checkout refund requests.
        </p>
      </div>

      {/* Refund Approval Modal */}
      <RefundApprovalModal
        isOpen={refundModalOpen}
        onClose={() => {
          setRefundModalOpen(false);
          setSelectedApp(null);
        }}
        onSubmit={handleRefundSubmit}
        application={
          selectedApp
            ? {
                id: selectedApp.vacating_hostel_id?.toString(),
                name: selectedApp.accountHolderName,
                rollNumber: selectedApp.accountNumber,
              }
            : null
        }
      />

      {/* Success Modal for both approval and rejection */}
      <ModalCallable
        show={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        title="Success"
        message={successMsg}
      />

      {/* Rejection Reason Modal */}
      <DeclineComment
        visible={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setSelectedApp(null);
        }}
        onSubmit={submitRejection}
        title="Reason for Rejection"
        placeholder="Enter reason for rejection"
        submitLabel="Submit"
        cancelLabel="Cancel"
      />

      {/* Main Content Area */}
      <div className="overflow-y-auto max-h-[calc(100vh-140px)] heavy-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="large" className="text-blue-600" />
          </div>
        ) : applications.length === 0 ? (
          <EmptyPage
            title="No forms pending approval"
            description="All caution deposit forms have been reviewed."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
            {applications.map((app) => (
              <div key={app.vacating_hostel_id} className="w-full">
                <ApprovalCard
                  title={`Vacating Hostel - ${app.accountHolderName}`}
                  subTitle={`Account: ${app.accountNumber} | Bank: ${app.bankName}`}
                  badge={badgeStatus.Pending}
                  data={{
                    "Account Holder": app.accountHolderName,
                    "Account Number": app.accountNumber,
                    "Bank Name": app.bankName,
                    "Bank Address": app.addressOfTheBank,
                    IFSC: app.IFSCode,
                    Deductions: app.deductions,
                    "Refund Amount": app.refund_amount,
                    "Deduction Details": app.deduction_details || "None",
                    "Submitted At": new Date(app.timestamp).toLocaleString(),
                  }}
                  onApprove={() => handleApprove(app)}
                  onDecline={() => handleReject(app)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
