import { useEffect, useState } from "react";
import {
  getAllManagerGrievances,
  updateManagerGrievanceState,
} from "@/utils/manager/managerGrievanceApi";
import ApprovalCard from "@/components/approvalCard";
import { getGrievanceBadgeStatus } from "@/utils/getBadgeStatus";
import useLoadingStore from "@/stores/loadingStore";
import EmptyPage from "@/components/EmptyPage";

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState<any[]>([]);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const fetchGrievances = () => {
    setLoading(true);
    getAllManagerGrievances()
      .then((data) => {
        setGrievances(data || []);
      })
      .catch((error) => {
        console.error("Error fetching Manager grievances:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      setLoading(true);
      await updateManagerGrievanceState(id);
      fetchGrievances();
    } catch (error) {
      console.error("Error approving grievance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6">
      {/* Web Header Layout Banner */}
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Grievance Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Please approve the grievances once they are resolved.
        </p>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="overflow-y-auto max-h-[calc(100vh-140px)] heavy-scrollbar">
        {grievances.length === 0 ? (
          <EmptyPage
            title="No pending grievances"
            description="All grievances have been reviewed."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
            {grievances.map((item, idx) => (
              <div key={item.grievances?.id || idx} className="w-full">
                <ApprovalCard
                  title={item.grievances?.subject || "No Subject Specified"}
                  subTitle={`By ${item.student?.rollNo || item.grievances?.roll_number || "Unknown"}`}
                  badge={getGrievanceBadgeStatus(item.grievances?.status)}
                  onApprove={() => handleApprove(item.grievances?.id)}
                  data={{
                    ...item.grievances,
                    ...(item.student || {}),
                  }}
                  ApproveButtonTitle="Mark as Resolved"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
