import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApprovalCard, { type BadgeStatusValue } from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import DeclineComment from "@/components/modals/declineComment";
import { getSummerVacationBadgeStatus } from "@/utils/getBadgeStatus";
import { getStudentVacations, updateVacationStatus, type VacationForm } from "@/utils/RC/rcSummerVacationApi";

export default function RCSummerVacationApprovalPage() {
  const [vacations, setVacations] = useState<VacationForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [declineTarget, setDeclineTarget] = useState<number | null>(null);

  const loadVacations = async () => {
    setLoading(true);
    try {
      const response = await getStudentVacations();
      setVacations(response.success ? response.data : []);
      if (!response.success) toast.error(response.message || "Failed to fetch vacation requests");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch vacation requests");
      setVacations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVacations();
  }, []);

  const handleApprove = async (vacationId: number) => {
    try {
      await updateVacationStatus(vacationId, true);
      toast.success("Vacation request approved successfully");
      await loadVacations();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to approve vacation request");
    }
  };

  const handleDeclineSubmit = async (comment: string) => {
    if (!declineTarget) return;
    try {
      await updateVacationStatus(declineTarget, false, comment.trim());
      toast.success("Vacation request rejected successfully");
      setDeclineTarget(null);
      await loadVacations();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to reject vacation request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Summer Vacation Approvals</h1>
        <p className="mt-2 text-slate-600">Review summer vacation requests and returned item details.</p>
      </div>

      {loading ? (
        <div className="mt-24 text-center text-slate-500">Loading vacation requests...</div>
      ) : vacations.length === 0 ? (
        <EmptyPage title="No vacation requests" description="There are currently no summer vacation requests to review." />
      ) : (
        <div className="space-y-4">
          {vacations.map((item) => {
            const vacation = item.summer_vacation;
            const student = item.student || {};
            return (
              <ApprovalCard
                key={vacation.id}
                title={`${student.name || "Student"} (${vacation.roll_number})`}
                subTitle={`Vacation from: ${vacation.vacation_from}`}
                badge={getSummerVacationBadgeStatus(vacation.status) as BadgeStatusValue}
                data={{
                  ID: vacation.id,
                  "Roll Number": vacation.roll_number,
                  "Student Name": student.name,
                  Floor: student.floor,
                  Block: student.hostelBlock,
                  "Room Number": student.roomNumber,
                  "Vacation From": vacation.vacation_from,
                  "Address of Stay": vacation.address_of_stay,
                  "Returned Items": Array.isArray(vacation.returned_items) ? vacation.returned_items.join(", ") : "",
                  "Contact Email": vacation.email,
                  "Contact Mobile": vacation.mobile,
                  Status: vacation.status,
                  "Created At": vacation.created_at,
                }}
                onApprove={() => handleApprove(vacation.id)}
                onDecline={() => setDeclineTarget(vacation.id)}
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
        placeholder="Enter reason for rejecting this summer vacation request"
        submitLabel="Reject"
        cancelLabel="Cancel"
      />
    </div>
  );
}

