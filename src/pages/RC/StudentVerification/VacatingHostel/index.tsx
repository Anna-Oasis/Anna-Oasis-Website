import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApprovalCard, { type BadgeStatusValue } from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";
import { getHostelVacationBadgeStatus } from "@/utils/getBadgeStatus";
import {
  approveRCVacatingApplication,
  fetchRCVacatingApplications,
  rejectRCVacatingApplication,
  type RCVacatingApplication,
} from "@/utils/RC/rcVacatingHostelApi";

export default function RCVacatingHostelApprovalPage() {
  const [applications, setApplications] = useState<RCVacatingApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [declineTarget, setDeclineTarget] = useState<number | null>(null);

  const loadApplications = async () => {
    setLoading(true);
    try {
      setApplications(await fetchRCVacatingApplications());
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch vacating applications");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleApprove = async (vacatingId: number) => {
    try {
      await approveRCVacatingApplication(vacatingId);
      toast.success("Vacating hostel application approved successfully");
      await loadApplications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to approve application");
    }
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (!declineTarget) return;
    try {
      await rejectRCVacatingApplication(declineTarget, `${comment.trim()} (Rejected by RC)`);
      toast.success("Vacating hostel application rejected successfully");
      setDeclineTarget(null);
      await loadApplications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to reject application");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Vacating Hostel Approvals</h1>
        <p className="mt-2 text-slate-600">Review hostel vacating requests before they move to the next approval stage.</p>
      </div>

      {loading ? (
        <div className="mt-24 text-center text-slate-500">Loading vacating applications...</div>
      ) : applications.length === 0 ? (
        <EmptyPage title="No applications pending approval" description="There are currently no hostel vacating applications awaiting your action." />
      ) : (
        <div className="space-y-4">
          {applications.map((item) => {
            const vacating = item.vacating;
            const student = item.student || {};
            return (
              <ApprovalCard
                key={vacating.id}
                title={`${student.name || "Student"} (${student.rollNo || vacating.roll_number})`}
                subTitle={`Vacating on ${vacating.vacating_date} at ${vacating.vacating_time}`}
                badge={getHostelVacationBadgeStatus(Number(vacating.status)) as BadgeStatusValue}
                data={{
                  "Student Name": student.name,
                  "Roll Number": student.rollNo || vacating.roll_number,
                  Course: student.course,
                  Branch: student.branch,
                  Semester: student.semester,
                  "Room Number": student.roomNumber,
                  Floor: student.floor,
                  Block: student.hostelBlock,
                  "Vacating Date": vacating.vacating_date,
                  "Vacating Time": vacating.vacating_time,
                  "Future Address": vacating.future_address,
                  "Returned Items": Array.isArray(vacating.returned_items) ? vacating.returned_items.join(", ") : "None",
                  Endeavour: vacating.endeavour,
                  Feedback: vacating.feedback,
                  Status: vacating.status === "-1" ? "Rejected" : vacating.status,
                  "Submitted At": vacating.created_at,
                }}
                onApprove={() => handleApprove(vacating.id)}
                onDecline={() => setDeclineTarget(vacating.id)}
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
        placeholder="Enter reason for rejecting this vacating request"
        submitLabel="Reject"
        cancelLabel="Cancel"
      />
    </div>
  );
}
