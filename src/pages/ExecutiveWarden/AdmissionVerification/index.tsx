import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Swapped out expo-router

import {
  getAllEWAdmissions,
  handleUpdateEWAdmission,
} from "@/utils/executiveWarden/ewAdmissionApi";
import ApprovalCard from "@/components/approvalCard";
import { getAdmissionBadgeStatus } from "@/utils/getBadgeStatus";
import DeclineComment from "@/components/modals/declineComment";
import EmptyPage from "@/components/EmptyPage";
import TabSwitch from "@/components/TabSwitch";

export default function AdmissionVerificationPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [declineModal, setDeclineModal] = useState<{
    open: boolean;
    admissionId?: string;
  }>({
    open: false,
  });
  const [activeTab, setActiveTab] = useState<"room" | "final">("room");
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
    try {
      await handleUpdateEWAdmission(admissionId, {
        approve: true,
        comment: "Approved",
      });
      fetchAdmissions();
    } catch (err) {
      console.error("Failed to approve admission", err);
    }
  };

  const handleDecline = (admissionId: string) => {
    setDeclineModal({ open: true, admissionId });
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (declineModal.admissionId) {
      try {
        await handleUpdateEWAdmission(declineModal.admissionId, {
          approve: false,
          comment,
        });
        fetchAdmissions();
      } catch (err) {
        console.error("Failed to decline admission", err);
      }
    }
    setDeclineModal({ open: false, admissionId: undefined });
  };

  // Use admission.status for filtering
  const roomAllocAdmissions = admissions.filter(
    (item) => item.admission.status === "1",
  );
  const finalApprovalAdmissions = admissions.filter(
    (item) => item.admission.status === "2",
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-gray-900">
      {/* Tab Controls Navigation view */}
      <TabSwitch
        tabs={[
          { label: "Room Allocation", value: "room" },
          { label: "Final Approval", value: "final" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mt-4 mb-2"
      />

      {/* Main Container replacing mobile ScrollView */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 overflow-y-auto">
        {activeTab === "room" ? (
          roomAllocAdmissions.length === 0 ? (
            <EmptyPage
              title="No pending admissions"
              description=""
              />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roomAllocAdmissions.map((item: any, idx: number) => (
                <ApprovalCard
                  key={item.admission.id || idx}
                  title={item.admission.roll_number}
                  subTitle={`Block: ${item.admission.hostelBlock}, Year: ${item.admission.academicYear}`}
                  badge={getAdmissionBadgeStatus(item.admission.status)}
                  data={{ ...item.admission, ...item.student }}
                  onApprove={() =>
                    navigate(
                      `/executive-warden/admission-verification/${item.admission.hostelBlock}/${item.admission.academicYear}/${item.admission.id}`,
                    )
                  }
                  onDecline={() => handleDecline(String(item.admission.id))}
                />
              ))}
            </div>
          )
        ) : finalApprovalAdmissions.length === 0 ? (
          <EmptyPage
            title="No pending admissions"
            description=""
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {finalApprovalAdmissions.map((item: any, idx: number) => (
              <ApprovalCard
                key={item.admission.id || idx}
                title={item.admission.roll_number}
                subTitle={`Block: ${item.admission.hostelBlock}, Year: ${item.admission.academicYear}`}
                badge={getAdmissionBadgeStatus(item.admission.status)}
                data={item}
                onApprove={() => handleApprove(String(item.admission.id))}
                onDecline={() => handleDecline(String(item.admission.id))}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Overlay Component */}
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
