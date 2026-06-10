import { useEffect, useState } from "react";
import {
  fetchStudentDetailsForVerification,
  updateStudentProfileApproval,
} from "@/utils/manager/managerDetailApi";
import ApprovalCard, { badgeStatus } from "@/components/approvalCard";
import useLoadingStore from "@/stores/loadingStore";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";
import ModalCallable from "@/components/modals/ModalCallable";

const ProfileVerifications = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedRollNo, setSelectedRollNo] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const setLoading = useLoadingStore((state) => state.setLoading);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const data = await fetchStudentDetailsForVerification();
      setProfiles(Array.isArray(data) ? data : []);
    } catch (err) {
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleApprove = async (rollNo: string) => {
    setLoading(true);
    try {
      await updateStudentProfileApproval(true, rollNo, "Approved");
      await fetchProfiles();
      setSuccessMessage("Profile approved successfully!");
      setShowSuccessModal(true);
    } catch (e) {
      alert("Failed to approve profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = (rollNo: string) => {
    setSelectedRollNo(rollNo);
    setShowDeclineModal(true);
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (!selectedRollNo) return;
    setLoading(true);
    try {
      await updateStudentProfileApproval(false, selectedRollNo, comment);
      setShowDeclineModal(false);
      setSelectedRollNo(null);
      await fetchProfiles();
      setSuccessMessage("Profile declined successfully!");
      setShowSuccessModal(true);
    } catch (e) {
      alert("Failed to decline profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6">
      {/* Web Header Layout Banner */}
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Profile Verifications
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Audit student registration information and identification credentials.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="overflow-y-auto max-h-[calc(100vh-140px)] heavy-scrollbar">
        {profiles.length === 0 ? (
          <EmptyPage
            title="No pending verifications"
            description="All profiles have been reviewed."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
            {profiles.map((profile) => (
              <div key={profile.id} className="w-full">
                <ApprovalCard
                  title={`${profile.name} (${profile.rollNo})`}
                  subTitle={`Course: ${profile.course}, Branch: ${profile.branch}`}
                  badge={
                    profile.approve === true
                      ? badgeStatus.Approved
                      : badgeStatus.Pending
                  }
                  data={profile}
                  onApprove={() => handleApprove(profile.rollNo)}
                  onDecline={() => handleDecline(profile.rollNo)}
                  DeclineButtonTitle="Suggest changes"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Web Overlay Modals */}
      <DeclineComment
        visible={showDeclineModal}
        onClose={() => {
          setShowDeclineModal(false);
          setSelectedRollNo(null);
        }}
        onSubmit={handleDeclineSubmit}
        title="Decline Profile"
        placeholder="Enter reason for declining..."
        submitLabel="Decline"
        cancelLabel="Cancel"
      />

      <ModalCallable
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message={successMessage}
      />
    </div>
  );
};

export default ProfileVerifications;
