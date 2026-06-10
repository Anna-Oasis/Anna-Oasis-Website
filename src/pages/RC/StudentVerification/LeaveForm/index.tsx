import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApprovalCard, { type BadgeStatusValue } from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";
import { getLeaveBadgeStatus } from "@/utils/getBadgeStatus";
import { fetchRCLeaveForms, updateRCLeaveFormStatus, type RCLeaveFormItem } from "@/utils/RC/rcLeaveFormApprovalApi";

export default function RCLeaveFormApprovalPage() {
  const [leaveForms, setLeaveForms] = useState<RCLeaveFormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [declineTarget, setDeclineTarget] = useState<number | null>(null);

  const loadLeaveForms = async () => {
    setLoading(true);
    try {
      setLeaveForms(await fetchRCLeaveForms());
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch leave forms");
      setLeaveForms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaveForms();
  }, []);

  const handleDecision = async (leaveFormId: number, approve: boolean, comment?: string) => {
    try {
      await updateRCLeaveFormStatus(leaveFormId, approve, comment);
      toast.success(approve ? "Leave form approved successfully" : "Leave form rejected successfully");
      await loadLeaveForms();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to update leave form");
    }
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (!declineTarget) return;
    await handleDecision(declineTarget, false, `${comment.trim()} (Rejected by RC)`);
    setDeclineTarget(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Leave Form Approvals</h1>
        <p className="mt-2 text-slate-600">Review student leave requests assigned to your hostel/floors.</p>
      </div>

      {loading ? (
        <div className="mt-24 text-center text-slate-500">Loading leave forms...</div>
      ) : leaveForms.length === 0 ? (
        <EmptyPage title="No leave forms" description="There are currently no leave forms pending approval." />
      ) : (
        <div className="space-y-4">
          {leaveForms.map((item) => {
            const leave = item.leave_form;
            const student = item.student || {};
            return (
              <ApprovalCard
                key={leave.id}
                title={`${student.name || "Student"} (${leave.roll_number})`}
                subTitle={`${leave.leave_type} | ${leave.from_date} to ${leave.to_date}`}
                badge={getLeaveBadgeStatus(leave.status) as BadgeStatusValue}
                data={{
                  "Student Name": student.name,
                  "Roll Number": leave.roll_number,
                  Course: student.course,
                  Branch: student.branch,
                  Semester: student.semester,
                  "Room Number": student.roomNumber,
                  Floor: student.floor,
                  Block: student.hostelBlock,
                  "Leave Type": leave.leave_type,
                  From: leave.from_date,
                  To: leave.to_date,
                  Reason: leave.reason,
                  "Address of Stay": leave.address_of_stay,
                  "Emergency Contact": leave.mobile,
                  Email: leave.email,
                  Status: leave.status === "0" ? "Pending" : leave.status,
                }}
                onApprove={() => handleDecision(leave.id, true)}
                onDecline={() => setDeclineTarget(leave.id)}
              />
            );
          })}
        </div>
      )}

      <DeclineComment
        visible={declineTarget !== null}
        onClose={() => setDeclineTarget(null)}
        onSubmit={handleDeclineSubmit}
        title="Reason for Rejection"
        placeholder="Enter reason for rejecting this leave form"
        submitLabel="Reject"
        cancelLabel="Cancel"
      />
    </div>
  );
}

