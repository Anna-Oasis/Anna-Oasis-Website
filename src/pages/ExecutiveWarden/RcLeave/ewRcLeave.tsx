import { useEffect, useState } from "react";
import ApprovalCard from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";
import {
  getRCLeavebyEw,
  updateRCLeaveStatusByEw,
} from "@/utils/executiveWarden/ewRCLeaveApi";
import { getRCLeaveBadgeStatus } from "@/utils/getBadgeStatus";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";

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
  const [successDialog, setSuccessDialog] = useState<{
    show: boolean;
    title?: string;
    message?: string;
  }>({ show: false });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const result = await getRCLeavebyEw();
      if (result.success && Array.isArray(result.data)) {
        setLeaves(result.data);
      }
    } catch (err: any) {
      console.error("Error fetching RC leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId: number) => {
    try {
      const result = await updateRCLeaveStatusByEw(leaveId, "true");
      if (result.success) {
        await fetchLeaves();
        setSuccessDialog({
          show: true,
          title: "Approved",
          message: "RC Leave approved successfully.",
        });
      } else {
        setSuccessDialog({
          show: true,
          title: "Error",
          message: result.message || "Approval failed.",
        });
      }
    } catch (err: any) {
      setSuccessDialog({
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
        const result = await updateRCLeaveStatusByEw(
          declineModal.leaveId,
          "false",
          comment
        );
        if (result.success) {
          await fetchLeaves();
          setSuccessDialog({
            show: true,
            title: "Rejected",
            message: "RC Leave has been rejected.",
          });
        } else {
          setSuccessDialog({
            show: true,
            title: "Error",
            message: result.message || "Rejection failed.",
          });
        }
      } catch (err: any) {
        setSuccessDialog({
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
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">Loading RC leave requests...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-4">
      {leaves.length === 0 ? (
        <EmptyPage
          title="No RC Leave requests found."
          description=""
        />
      ) : (
        <div className="space-y-4">
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
                  item.leave.created_at
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

      {/* Decline modal */}
      <DeclineComment
        visible={declineModal.open}
        onClose={() => setDeclineModal({ open: false, leaveId: undefined })}
        onSubmit={handleDeclineSubmit}
        title="Decline RC Leave"
        placeholder="Enter reason for declining..."
        submitLabel="Decline"
        cancelLabel="Cancel"
      />

      {/* Success / Error dialog */}
      <Dialog open={successDialog.show} onOpenChange={(o) => setSuccessDialog({ ...successDialog, show: o })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{successDialog.title}</DialogTitle>
          </DialogHeader>
          {successDialog.message && (
            <Alert>{successDialog.message}</Alert>
          )}
          <DialogFooter>
            <Button onClick={() => setSuccessDialog({ ...successDialog, show: false })}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
