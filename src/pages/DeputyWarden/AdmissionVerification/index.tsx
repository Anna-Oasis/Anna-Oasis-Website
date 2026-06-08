/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { getAllDWAdmissions } from "@/utils/deputyWarden/dwAdmissionApi";

const statusColors: Record<string, string> = {
  approved: "bg-green-100 text-green-700 border border-green-200",
  rejected: "bg-red-100 text-red-700 border border-red-200",
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
};

function getStatusClass(status: string) {
  return statusColors[status?.toLowerCase()] ?? statusColors.pending;
}

const AdmissionVerificationPage = () => {
  const navigate = useNavigate();

  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filtered = admissions.filter((a) =>
    (a.roll_number ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pending = admissions.filter(
    (a) => a.status?.toLowerCase() === "pending" || !a.status
  ).length;
  const approved = admissions.filter(
    (a) => a.status?.toLowerCase() === "approved"
  ).length;
  const rejected = admissions.filter(
    (a) => a.status?.toLowerCase() === "rejected"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Admission Verification
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage student admission requests
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <ClipboardCheck className="text-[#022B60]" />
            <span className="text-xs text-slate-400">Total</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {admissions.length}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Admissions</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Clock3 className="text-amber-500" />
            <span className="text-xs text-slate-400">Pending</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-amber-600">
            {pending}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Awaiting Review</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="text-green-600" />
            <span className="text-xs text-slate-400">Approved</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-green-600">
            {approved}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Approved</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <XCircle className="text-red-500" />
            <span className="text-xs text-slate-400">Rejected</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-red-600">
            {rejected}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Rejected</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 shadow-sm outline-none transition focus:border-[#022B60]"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading admissions...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <ClipboardCheck
            size={56}
            className="mx-auto mb-4 text-slate-300"
          />
          <h2 className="text-xl font-semibold text-slate-700">
            No Admissions Found
          </h2>
          <p className="mt-2 text-slate-500">
            {search
              ? "No admissions match your search."
              : "All admissions have been processed."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item: any, index: number) => (
            <div
              key={item.id || index}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.roll_number || "Unknown Student"}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.academicYear || "—"}
                  </p>
                </div>

                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status ?? "Pending"}
                </span>
              </div>

              <div className="mb-6 space-y-2 text-sm text-slate-600">
                {item.hostelBlock && (
                  <p>
                    <span className="font-medium text-slate-700">
                      Block:
                    </span>{" "}
                    {item.hostelBlock}
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/DeputyWarden/AdmissionVerification/${item.id}`,
                    { state: item }
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#022B60] py-2.5 text-sm font-medium text-white transition hover:bg-[#033b83]"
              >
                View Details
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdmissionVerificationPage;
