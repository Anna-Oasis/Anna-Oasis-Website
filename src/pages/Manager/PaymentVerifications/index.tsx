import { useEffect, useState } from "react";
import {
  getAllManagerAdmissions,
  managerApprove,
  managerDecline,
} from "@/utils/manager/managerAdmissionApi";
import ApprovalCard from "@/components/approvalCard";
import { getAdmissionBadgeStatus } from "@/utils/getBadgeStatus";
import useLoadingStore from "@/stores/loadingStore";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";

export default function PaymentVerificationsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedAdmissionId, setSelectedAdmissionId] = useState<string | null>(
    null,
  );
  const setLoading = useLoadingStore((state) => state.setLoading);

  const fetchAdmissions = async () => {
    try {
      const data = await getAllManagerAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching manager admissions:", err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleApprove = async (admissionId: string) => {
    setLoading(true);
    try {
      await managerApprove(admissionId);
      await fetchAdmissions();
    } catch (err) {
      console.error("Error approving admission:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = (admissionId: string) => {
    setSelectedAdmissionId(admissionId);
    setShowDeclineModal(true);
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (!selectedAdmissionId) return;
    setLoading(true);
    try {
      await managerDecline(selectedAdmissionId, comment);
      setShowDeclineModal(false);
      setSelectedAdmissionId(null);
      await fetchAdmissions();
    } catch (err) {
      console.error("Error declining admission:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6">
      {/* Web Header Layout Banner */}
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Payment Verifications
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and verify pending student hostel fee deposits and admissions.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="overflow-y-auto max-h-[calc(100vh-140px)] heavy-scrollbar">
        {admissions.length === 0 ? (
          <EmptyPage
            title="No pending verifications"
            description="All admissions have been reviewed."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
            {admissions.map((item) => (
              <div key={item.admission?.id} className="w-full">
                <ApprovalCard
                  title={`${item.admission?.roll_number || "N/A"}`}
                  subTitle={`Block: ${item.admission?.hostelBlock || "N/A"}, Year: ${item.admission?.academicYear || "N/A"}`}
                  badge={getAdmissionBadgeStatus(item.admission?.status)}
                  data={{ ...item.admission, ...item.student }}
                  onApprove={() => handleApprove(item.admission.id)}
                  onDecline={() => handleDecline(item.admission.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decline Reason Web Modal Overrides */}
      <DeclineComment
        visible={showDeclineModal}
        onClose={() => {
          setShowDeclineModal(false);
          setSelectedAdmissionId(null);
        }}
        onSubmit={handleDeclineSubmit}
        title="Decline Admission"
        placeholder="Enter reason for declining..."
        submitLabel="Decline"
        cancelLabel="Cancel"
      />
    </div>
  );
}
