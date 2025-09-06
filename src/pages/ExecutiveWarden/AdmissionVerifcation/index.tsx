import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEWAdmissions,
  handleUpdateEWAdmission,
} from "@/utils/executiveWarden/ewAdmissionApi";
import ApprovalCard from "@/components/approvalCard";
import { getAdmissionBadgeStatus } from "@/utils/getBadgeStatus";
import DeclineComment from "@/components/modals/declineComment";
import EmptyPage from "@/components/EmptyPage";

export default function AdmissionVerificationPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [declineModal, setDeclineModal] = useState<{
    open: boolean;
    admissionId?: string;
  }>({ open: false });

  const navigate = useNavigate();

  const fetchAdmissions = async () => {
    try {
      const data = await getAllEWAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      setAdmissions([]);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleApprove = async (admissionId: string) => {
    await handleUpdateEWAdmission(admissionId, {
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
      await handleUpdateEWAdmission(declineModal.admissionId, {
        approve: false,
        comment,
      });
      fetchAdmissions();
    }
    setDeclineModal({ open: false, admissionId: undefined });
  };

  // Combine both statuses into one list
  const pendingAdmissions = admissions.filter(
    (item) =>
      item.admission.status === "1" || item.admission.status === "2"
  );

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="space-y-4">
        {pendingAdmissions.length === 0 ? (
          <EmptyPage title="No pending admissions" description="" />
        ) : (
          pendingAdmissions.map((item: any, idx: number) => (
            <ApprovalCard
              key={item.admission.id || idx}
              title={item.admission.roll_number}
              subTitle={`Block: ${item.admission.hostelBlock}, Year: ${item.admission.academicYear}`}
              badge={getAdmissionBadgeStatus(item.admission.status)}
              data={{ ...item.admission, ...item.student }}
              onApprove={() => {
                if (item.admission.status === "1") {
                  // Navigate to details page
                  navigate(
                    `/ExecutiveWarden/AdmissionVerification/${item.admission.hostelBlock}/${item.admission.academicYear}/${item.admission.id}`
                  );
                } else {
                  // Final approval directly
                  handleApprove(String(item.admission.id));
                }
              }}
              onDecline={() => handleDecline(String(item.admission.id))}
            />
          ))
        )}
      </div>

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
}
