/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import {
  ArrowLeft,
  User,
  Building2,
  CalendarDays,
  FileText,
  CheckCircle,
  XCircle,
  BedDouble,
} from "lucide-react";
import { handleUpdateAdmission } from "@/utils/deputyWarden/dwAdmissionApi";

const statusColors: Record<string, string> = {
  approved: "bg-green-100 text-green-700 border border-green-200",
  rejected: "bg-red-100 text-red-700 border border-red-200",
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
};

function getStatusClass(status: string) {
  return statusColors[status?.toLowerCase()] ?? statusColors.pending;
}

const AdmissionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const admission: any = location.state;

  const [submitting, setSubmitting] = useState(false);

  if (!admission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Admission not found
          </h2>
          <p className="mt-2 text-slate-500">
            Please go back and select an admission.
          </p>
          <button
            onClick={() =>
              navigate("/DeputyWarden/AdmissionVerification")
            }
            className="mt-5 rounded-xl bg-[#022B60] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#033b83]"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const handleApprove = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await handleUpdateAdmission(id || String(admission.id), {
        approve: true,
        comment: "Approved",
      });
      navigate("/DeputyWarden/AdmissionVerification");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await handleUpdateAdmission(id || String(admission.id), {
        approve: false,
        comment: "Rejected",
      });
      navigate("/DeputyWarden/AdmissionVerification");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAllocateRoom = () => {
    navigate(
      `/DeputyWarden/AdmissionVerification/${id || admission.id}/RoomAllocation`,
      { state: admission }
    );
  };

  const isPending =
    !admission.status ||
    admission.status?.toLowerCase() === "pending";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Back */}
      <button
        onClick={() =>
          navigate("/DeputyWarden/AdmissionVerification")
        }
        className="mb-6 flex items-center gap-2 text-sm font-medium text-[#022B60] transition hover:opacity-70"
      >
        <ArrowLeft size={18} />
        Back to Admissions
      </button>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#022B60]">
            Admission Details
          </h1>
          <p className="mt-2 text-slate-500">
            Review student admission information
          </p>
        </div>

        <span
          className={`ml-auto rounded-full px-4 py-1.5 text-sm font-semibold ${getStatusClass(
            admission.status
          )}`}
        >
          {admission.status ?? "Pending"}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Student Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
              <User size={20} className="text-[#022B60]" />
              Student Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Roll Number
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {admission.roll_number || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Academic Year
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {admission.academicYear || "—"}
                </p>
              </div>

              {admission.name && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Name
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.name}
                  </p>
                </div>
              )}

              {admission.email && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.email}
                  </p>
                </div>
              )}

              {admission.phone && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Phone
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.phone}
                  </p>
                </div>
              )}

              {admission.department && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Department
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.department}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hostel Preferences */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
              <Building2 size={20} className="text-[#022B60]" />
              Hostel Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Hostel Block
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {admission.hostelBlock || "—"}
                </p>
              </div>

              {admission.floor !== undefined && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Floor
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.floor}
                  </p>
                </div>
              )}

              {admission.roomNumber && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Room Number
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.roomNumber}
                  </p>
                </div>
              )}

              {admission.roomType && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Room Type
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {admission.roomType}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
              <FileText size={20} className="text-[#022B60]" />
              Uploaded Documents
            </h2>

            {admission.documents?.length > 0 ? (
              <div className="space-y-2">
                {admission.documents.map(
                  (doc: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm text-slate-700">
                        {doc.name || `Document ${i + 1}`}
                      </span>
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-[#022B60] hover:underline"
                        >
                          View
                        </a>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
                No documents uploaded
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: actions + timeline */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-800">
              Actions
            </h2>

            <div className="space-y-3">
              {isPending && (
                <>
                  <button
                    onClick={handleApprove}
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={handleAllocateRoom}
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#022B60] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#033b83] disabled:opacity-60"
                  >
                    <BedDouble size={16} />
                    Allocate Room
                  </button>

                  <button
                    onClick={handleReject}
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </>
              )}

              {!isPending && (
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-500">
                  This admission has been{" "}
                  <span className="font-medium">
                    {admission.status?.toLowerCase()}
                  </span>
                  .
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-800">
              Timeline
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#022B60] text-white">
                    <CalendarDays size={14} />
                  </div>
                  <div className="mt-1 h-full w-px bg-slate-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Application Submitted
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {admission.created_at
                      ? new Date(
                          admission.created_at
                        ).toLocaleDateString()
                      : "Date not available"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Deputy Warden Review
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {admission.status?.toLowerCase() === "pending"
                      ? "In progress"
                      : admission.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetails;
