import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ApprovalCard, { type BadgeStatusValue } from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import { getAdmissionBadgeStatus } from "@/utils/getBadgeStatus";
import { getAllRCAdmissions, type RCAdmission } from "@/utils/RC/rcAdimissionApi";

export default function RoomAllocationPage() {
  const [admissions, setAdmissions] = useState<RCAdmission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const data = await getAllRCAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch RC admissions");
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Room Allocation</h1>
        <p className="mt-2 text-slate-600">Allocate rooms for admissions waiting for RC approval.</p>
      </div>

      {loading ? (
        <div className="mt-24 text-center text-slate-500">Loading room allocation requests...</div>
      ) : admissions.length === 0 ? (
        <EmptyPage title="No pending room allocations" description="All admissions have been reviewed." />
      ) : (
        <div className="space-y-4">
          {admissions.map((item, idx) => {
            const admission = item.admission || {};
            const student = item.student || {};
            return (
              <ApprovalCard
                key={admission.id || idx}
                title={student.name || admission.roll_number || "Admission"}
                subTitle={`Roll: ${admission.roll_number}, Block: ${admission.hostelBlock}, Year: ${admission.academicYear}`}
                badge={getAdmissionBadgeStatus(admission.status) as BadgeStatusValue}
                data={{ ...admission, ...student }}
                onApprove={() => navigate(`/RC/RoomAllocation/Approve/${admission.id}`)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
