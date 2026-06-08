/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Umbrella, CheckCircle, XCircle } from "lucide-react";
import {
  getStudentVacationsByDw,
  updateVacationStatusByDw,
} from "@/utils/deputyWarden/dwSummerVacationApi";

const SummerVacationPage = () => {
  const [vacations, setVacations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVacations = async () => {
    try {
      const data = await getStudentVacationsByDw();
      setVacations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setVacations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await updateVacationStatusByDw(id, true);
      await loadVacations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateVacationStatusByDw(id, false, "Rejected by deputy warden");
      await loadVacations();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadVacations();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Summer Vacation Verification
        </h1>

        <p className="mt-2 text-slate-500">
          Review and approve student vacation requests
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading vacation requests...
        </div>
      ) : vacations.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Umbrella
            size={50}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No Vacation Requests
          </h2>

          <p className="mt-2 text-slate-500">
            No summer vacation requests are pending review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {vacations.map((item: any, index: number) => {
            const status = item.status?.toLowerCase();
            const isPending = status === "pending" || !item.status;

            return (
              <div
                key={item.id || index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-[#022B60]">
                        {item.roll_number || item.rollNo || "Unknown Student"}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          status === "approved"
                            ? "bg-green-100 text-green-700"
                            : status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </div>

                    <div className="mt-2 grid gap-1 text-sm text-slate-500 md:grid-cols-2">
                      {item.leaving_date && (
                        <p>
                          <span className="font-medium text-slate-700">Leaving:</span>{" "}
                          {new Date(item.leaving_date).toLocaleDateString()}
                        </p>
                      )}
                      {item.arrival_date && (
                        <p>
                          <span className="font-medium text-slate-700">Return:</span>{" "}
                          {new Date(item.arrival_date).toLocaleDateString()}
                        </p>
                      )}
                      {item.reason && (
                        <p className="md:col-span-2">
                          <span className="font-medium text-slate-700">Reason:</span>{" "}
                          {item.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  {isPending && (
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700"
                      >
                        <CheckCircle size={14} />
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(item.id)}
                        className="flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        <XCircle size={14} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SummerVacationPage;
