import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApprovalCard, { type BadgeStatusValue } from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import { getGrievanceBadgeStatus } from "@/utils/getBadgeStatus";
import { getAllRCGrievances, updateGrievanceStatus, type RCGrievanceItem } from "@/utils/RC/rcGrievanceApi";

export default function RCGrievanceApprovalPage() {
  const [grievances, setGrievances] = useState<RCGrievanceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGrievances = async () => {
    setLoading(true);
    try {
      setGrievances(await getAllRCGrievances());
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch grievances");
      setGrievances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGrievances();
  }, []);

  const handleDecision = async (grievanceId: number, approve: boolean) => {
    try {
      await updateGrievanceStatus(grievanceId, approve);
      toast.success(approve ? "Grievance approved successfully" : "Grievance declined successfully");
      await loadGrievances();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to update grievance");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Grievance Approvals</h1>
        <p className="mt-2 text-slate-600">Review grievances raised by students in your assigned hostel/floors.</p>
      </div>

      {loading ? (
        <div className="mt-24 text-center text-slate-500">Loading grievances...</div>
      ) : grievances.length === 0 ? (
        <EmptyPage title="No pending grievances" description="All grievances have been reviewed." />
      ) : (
        <div className="space-y-4">
          {grievances.map((item, idx) => {
            const grievance = item.grievances;
            const student = item.student || {};
            return (
              <ApprovalCard
                key={grievance.id || idx}
                title={grievance.subject}
                subTitle={`By ${student.name || "Student"} (${student.rollNo || grievance.roll_number})`}
                badge={getGrievanceBadgeStatus(grievance.status) as BadgeStatusValue}
                data={{
                  "Grievance Type": grievance.grievance_type,
                  Subject: grievance.subject,
                  Description: grievance.description,
                  "Student Name": student.name,
                  "Roll Number": student.rollNo || grievance.roll_number,
                  Course: student.course,
                  Branch: student.branch,
                  Semester: student.semester,
                  "Room Number": student.roomNumber,
                  Floor: student.floor,
                  Block: student.hostelBlock,
                  Status: grievance.status === "0" ? "Pending" : grievance.status,
                  "Created At": grievance.created_at,
                }}
                onApprove={() => handleDecision(grievance.id, true)}
                onDecline={() => handleDecision(grievance.id, false)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

