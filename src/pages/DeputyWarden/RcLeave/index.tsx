/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FileClock } from "lucide-react";
import LeaveCard from "@/components/deputyWarden/LeaveCard";
import { getRCLeavebyDw } from "@/utils/deputyWarden/dwRCLeaveApi";

const RCLeavePage = () => {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLeaves = async () => {
    try {
      const data = await getRCLeavebyDw();
      setLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          RC Leave Approvals
        </h1>

        <p className="mt-2 text-slate-500">
          Manage resident counsellor leave requests
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading leave requests...
        </div>
      ) : leaves.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <FileClock
            size={50}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No Leave Requests Found
          </h2>

          <p className="mt-2 text-slate-500">
            All RC leave requests have been processed.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {leaves.map((item: any, index: number) => (
            <LeaveCard
              key={item.leave?.id || index}
              rcName={item.rc?.name || "-"}
              hostel={item.rc?.hostel || "-"}
              leaving={item.leave?.leaving || ""}
              arrival={item.leave?.arrival || ""}
              reason={item.leave?.reason || ""}
              status={item.leave?.approved || "pending"}
              onView={() =>
                navigate(
                  `/DeputyWarden/RcLeave/${item.leave.id}`,
                  {
                    state: item,
                  }
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RCLeavePage;