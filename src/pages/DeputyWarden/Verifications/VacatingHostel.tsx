/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { LogOut, CheckCircle, XCircle } from "lucide-react";
import {
  fetchDWVacatingForms,
  approveDWVacatingForm,
  rejectDWVacatingForm,
} from "@/utils/deputyWarden/dwVacatingHostelApi";

const VacatingHostelPage = () => {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadForms = async () => {
    try {
      const data = await fetchDWVacatingForms();
      setForms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveDWVacatingForm(id);
      await loadForms();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectDWVacatingForm(id, "Rejected by deputy warden");
      await loadForms();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadForms();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Vacating Hostel Verification
        </h1>

        <p className="mt-2 text-slate-500">
          Review and process hostel vacating requests
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading vacating requests...
        </div>
      ) : forms.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <LogOut
            size={50}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No Vacating Requests
          </h2>

          <p className="mt-2 text-slate-500">
            No students have submitted vacating requests.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {forms.map((item: any, index: number) => {
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
                      {item.vacating_date && (
                        <p>
                          <span className="font-medium text-slate-700">Vacating Date:</span>{" "}
                          {new Date(item.vacating_date).toLocaleDateString()}
                        </p>
                      )}
                      {item.hostelBlock && (
                        <p>
                          <span className="font-medium text-slate-700">Block:</span>{" "}
                          {item.hostelBlock}
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

export default VacatingHostelPage;
