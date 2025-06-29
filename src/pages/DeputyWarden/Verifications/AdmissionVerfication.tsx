import React, { useEffect, useState } from "react";
import { getAllDWAdmissions, handleUpdateAdmission } from "../../../utils/deputyWarden/dwAdmissionApi";
import ApprovalCard from "@/components/approvalCard";
import { getAdmissionBadgeStatus } from "@/utils/getBadgeStatus";
import DeclineComment from "@/components/modals/declineComment";
import { Inbox } from "lucide-react";

const DeputyWardenAdmissionsVerificationPage: React.FC = () => {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [declineModal, setDeclineModal] = useState<{ open: boolean; admissionId?: string }>({
    open: false,
  });

  const fetchAdmissions = async () => {
    try {
      const data = await getAllDWAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      setAdmissions([]);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleApprove = async (admissionId: string) => {
    await handleUpdateAdmission(admissionId, {
      approve: true,
      comment: "Approved",
    });
    fetchAdmissions();
  };

  const handleDecline = (admissionId: string) => {
    setDeclineModal({ open: true, admissionId });
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (declineModal.admissionId) {
      await handleUpdateAdmission(declineModal.admissionId, {
        approve: false,
        comment,
      });
      fetchAdmissions();
    }
    setDeclineModal({ open: false, admissionId: undefined });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <p className='text-2xl text-center'>DeputyWarden Room Allocation Verificationo</p>
      {admissions.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-20 text-center">
          <Inbox className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-500">No pending admissions</p>
          <p className="text-sm text-gray-400">All admissions have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {admissions.map((item: any, idx: number) => (
            <ApprovalCard
              key={item.id || idx}
              title={item.roll_number}
              subTitle={`Block: ${item.hostelBlock}, Year: ${item.academicYear}`}
              badge={getAdmissionBadgeStatus(item.status)}
              data={item}
              onApprove={() => handleApprove(String(item.id))}
              onDecline={() => handleDecline(String(item.id))}
            />
          ))}
        </div>
      )}

      <DeclineComment
        visible={declineModal.open}
        onClose={() => setDeclineModal({ open: false, admissionId: undefined })}
        onSubmit={handleDeclineSubmit}
        title="Decline Admission"
        placeholder="Enter reason for declining..."
        submitLabel="Decline"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default DeputyWardenAdmissionsVerificationPage;
