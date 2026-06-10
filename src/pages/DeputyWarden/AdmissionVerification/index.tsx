/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Inbox } from "lucide-react";
import { getAllDWAdmissions } from "@/utils/deputyWarden/dwAdmissionApi";

const statusColors: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

function getStatusClass(status: string) {
  return statusColors[status?.toLowerCase()] ?? statusColors.pending;
}

const AdmissionVerificationPage = () => {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"allocation" | "approval">(
    "allocation"
  );

  const loadAdmissions = async () => {
    try {
      const data = await getAllDWAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch {
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  const allocationItems = admissions.filter(
    (a) => !a.status || a.status?.toLowerCase() === "pending"
  );
  const approvalItems = admissions.filter(
    (a) =>
      a.status?.toLowerCase() === "room_allocated" ||
      a.status?.toLowerCase() === "approved"
  );

  const currentItems =
    activeTab === "allocation" ? allocationItems : approvalItems;

  return (
    <div className="min-h-screen bg-white">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("allocation")}
          className={`flex-1 py-4 text-sm font-semibold transition ${
            activeTab === "allocation"
              ? "border-b-2 border-[#022B60] text-[#022B60]"
              : "text-slate-500"
          }`}
        >
          Room Allocation
        </button>
        <button
          onClick={() => setActiveTab("approval")}
          className={`flex-1 py-4 text-sm font-semibold transition ${
            activeTab === "approval"
              ? "border-b-2 border-[#022B60] text-[#022B60]"
              : "text-slate-500"
          }`}
        >
          Final Approval
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400">Loading...</div>
        ) : currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Inbox size={52} className="mb-4" />
            <p className="text-base">No pending admissions</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {currentItems.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.roll_number || "Unknown Student"}
                  </h3>
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status ?? "Pending"}
                  </span>
                </div>
                {item.hostelBlock && (
                  <p className="mt-1 text-sm text-slate-500">
                    Block: {item.hostelBlock}
                  </p>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      navigate(
                        `/DeputyWarden/AdmissionVerification/${item.id}`,
                        { state: item }
                      )
                    }
                    className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionVerificationPage;
