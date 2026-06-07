import { useEffect, useState } from "react";
import { Inbox, Loader2 } from "lucide-react"; // Swapped out lucide-react-native
import {
  getRCLeavebyEw,
  updateRCLeaveStatusByEw,
} from "@/utils/executiveWarden/ewRCLeaveApi";
import { getRCLeaveBadgeStatus } from "@/utils/getBadgeStatus";
import ApprovalCard from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";
import ModalCallable from "@/components/modals/ModalCallable";

type RcLeaveApiItem = {
  leave: {
    id: number;
    rc_id: number;
    leaving: string;
    arrival: string;
    reason: string;
    approved: string;
    created_at: string;
    dw_approved_at?: string;
    ew_updated_at?: string;
  };
  rc: {
    id: number;
    userId: number;
    name: string;
    hostel: string;
    onLeave: boolean;
    floor: number[];
    alternatingToRCId: number | null;
    createdAt: string;
    updatedAt: string;
  };
};

export default function RcLeavePage() {
  const [leaves, setLeaves] = useState<RcLeaveApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [declineModal, setDeclineModal] = useState<{
    open: boolean;
    leaveId?: number;
  }>({ open: false });
  const [successModal, setSuccessModal] = useState<{
    show: boolean;
    title?: string;
    message?: string;
  }>({ show: false });
  const [errorContext, setErrorContext] = useState<string | null>(null);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setErrorContext(null);
      const result = await getRCLeavebyEw();
      if (result.success && Array.isArray(result.data)) {
        setLeaves(result.data);
      }
    } catch (err: any) {
      console.error("Error fetching RC leaves:", err);
      setErrorContext("Failed to load leave requests. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId: number) => {
    try {
      setErrorContext(null);
      const result = await updateRCLeaveStatusByEw(leaveId, "true");
      if (result.success) {
        await fetchLeaves();
        setSuccessModal({
          show: true,
          title: "Approved",
          message: "RC Leave approved successfully.",
        });
      } else {
        setSuccessModal({
          show: true,
          title: "Error",
          message: result.message || "Approval failed.",
        });
      }
    } catch (err: any) {
      setSuccessModal({
        show: true,
        title: "Error",
        message: err?.message || "Error approving leave.",
      });
    }
  };

  const handleDecline = (leaveId: number) => {
    setDeclineModal({ open: true, leaveId });
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (declineModal.leaveId) {
      try {
        setErrorContext(null);
        const result = await updateRCLeaveStatusByEw(
          declineModal.leaveId,
          "false",
          comment,
        );
        if (result.success) {
          await fetchLeaves();
          setSuccessModal({
            show: true,
            title: "Rejected",
            message: "RC Leave has been rejected.",
          });
        } else {
          setSuccessModal({
            show: true,
            title: "Error",
            message: result.message || "Rejection failed.",
          });
        }
      } catch (err: any) {
        setSuccessModal({
          show: true,
          title: "Error",
          message: err?.message || "Error rejecting leave.",
        });
      }
    }
    setDeclineModal({ open: false, leaveId: undefined });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-[60vh] w-full justify-center items-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 font-medium text-sm">
          Loading RC leave requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <main className="w-full max-w-7xl mx-auto px-4 py-6">
        {/* Web Top Section Title header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            RC Leave Verification
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and action leave configurations requested by Resident
            Counselors.
          </p>
        </div>

        {errorContext && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
            {errorContext}
          </div>
        )}

        {leaves.length === 0 ? (
          <EmptyPage
            title="No RC Leave requests found."
            description="All incoming Resident Counselor leaves are completely cleared up!"
            icon={Inbox}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {leaves.map((item) => (
              <ApprovalCard
                key={item.leave.id}
                title={`${item.rc.name} (${item.rc.hostel})`}
                subTitle={`Leave: ${item.leave.leaving} → ${item.leave.arrival}`}
                data={{
                  "RC Name": item.rc.name,
                  Hostel: item.rc.hostel,
                  Floors: Array.isArray(item.rc.floor)
                    ? item.rc.floor
                        .map((f) => ["GF", "FF", "SF", "TF"][f] ?? f)
                        .join(", ")
                    : "",
                  Reason: item.leave.reason,
                  Leaving: item.leave.leaving,
                  Arrival: item.leave.arrival,
                  "Created At": new Date(
                    item.leave.created_at,
                  ).toLocaleString(),
                  Status:
                    item.leave.approved === "1"
                      ? "Pending"
                      : item.leave.approved === "-1"
                        ? "Rejected"
                        : item.leave.approved === "2"
                          ? "Approved"
                          : "Pending",
                }}
                badge={getRCLeaveBadgeStatus(item.leave.approved)}
                onApprove={() => handleApprove(item.leave.id)}
                onDecline={() => handleDecline(item.leave.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Rejection Wrapper */}
      <DeclineComment
        visible={declineModal.open}
        onClose={() => setDeclineModal({ open: false, leaveId: undefined })}
        onSubmit={handleDeclineSubmit}
        title="Decline RC Leave"
        placeholder="Enter reason for declining..."
        submitLabel="Decline"
        cancelLabel="Cancel"
      />

      {/* Reusable Alert notification feedback modal */}
      <ModalCallable
        show={successModal.show}
        onClose={() => setSuccessModal({ show: false })}
        title={successModal.title}
        message={successModal.message}
      />
    </div>
  );
}
