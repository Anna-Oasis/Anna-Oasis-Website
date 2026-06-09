/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Inbox } from "lucide-react";
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
    } catch {
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {loading ? (
        <div className="py-16 text-center text-slate-400">Loading...</div>
      ) : leaves.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Inbox size={52} className="mb-4" />
          <p className="text-base font-medium text-slate-700">
            No RC Leave requests found.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            There are currently no RC Leave requests to review.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
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
                  { state: item }
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
