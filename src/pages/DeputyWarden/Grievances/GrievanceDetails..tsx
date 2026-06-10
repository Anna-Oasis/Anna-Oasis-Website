/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { normalizeGrievanceStatus } from "@/utils/deputyWarden/grievanceStatusUtils";
import { updateDeputyWardenGrievanceStatus } from "@/utils/deputyWarden/dwGrievanceApi";

const GrievanceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const grievanceData = location.state as any;

  const [submitting, setSubmitting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  if (!grievanceData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="text-xl font-semibold text-red-600">
            Grievance not found
          </h2>
          <button
            onClick={() => navigate("/DeputyWarden/Grievances")}
            className="mt-4 rounded-xl bg-[#022B60] px-4 py-2 text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const { grievances, student } = grievanceData;
  const { label, className } = normalizeGrievanceStatus(grievances.status);

  const isPending =
    !grievances.status ||
    grievances.status === 0 ||
    grievances.status === 1 ||
    String(grievances.status).toUpperCase() === "SUBMITTED" ||
    String(grievances.status).toUpperCase() === "PENDING" ||
    String(grievances.status).toUpperCase() === "RC";

  const handleApprove = async () => {
    try {
      setSubmitting(true);
      setActionError(null);
      await updateDeputyWardenGrievanceStatus(grievances.id, true);
      navigate("/DeputyWarden/Grievances");
    } catch {
      setActionError("Failed to approve grievance. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRejectConfirm = async () => {
    try {
      setSubmitting(true);
      setActionError(null);
      await updateDeputyWardenGrievanceStatus(
        grievances.id,
        false,
        rejectComment.trim() || "Rejected by deputy warden"
      );
      navigate("/DeputyWarden/Grievances");
    } catch {
      setActionError("Failed to decline grievance. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <button
        onClick={() => navigate("/DeputyWarden/Grievances")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-[#022B60] transition hover:opacity-70"
      >
        <ArrowLeft size={18} />
        Back to Grievances
      </button>

      <div className="rounded-2xl bg-white p-6 shadow">
        {/* Title + status */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#022B60]">
              {grievances.subject}
            </h1>
            {grievances.grievance_type && (
              <p className="mt-1 text-sm text-slate-500">
                {grievances.grievance_type}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${className}`}
          >
            {label}
          </span>
        </div>

        {/* Student + grievance details */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Student Details
            </h3>
            <div className="space-y-1.5 text-sm text-slate-700">
              <p><span className="font-medium">Name:</span> {student.name}</p>
              <p><span className="font-medium">Roll No:</span> {student.rollNo}</p>
              <p><span className="font-medium">Hostel Block:</span> {student.hostelBlock}</p>
              <p><span className="font-medium">Floor:</span> {student.floor}</p>
              <p><span className="font-medium">Room Number:</span> {student.roomNumber}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Grievance Details
            </h3>
            <div className="space-y-1.5 text-sm text-slate-700">
              <p><span className="font-medium">Status:</span> {label}</p>
              <p>
                <span className="font-medium">Submitted:</span>{" "}
                {grievances.created_at
                  ? new Date(grievances.created_at).toLocaleString()
                  : "—"}
              </p>
              {grievances.dw_comment && (
                <p><span className="font-medium">DW Comment:</span> {grievances.dw_comment}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Description
          </h3>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            {grievances.description || "No description provided."}
          </div>
        </div>

        {/* Action error */}
        {actionError && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError}
          </div>
        )}

        {/* Actions — only for pending grievances */}
        {isPending && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            {!isRejecting ? (
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  disabled={submitting}
                  className="flex items-center gap-1.5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button
                  onClick={() => { setIsRejecting(true); setRejectComment(""); }}
                  disabled={submitting}
                  className="flex items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  <XCircle size={16} />
                  Decline
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  placeholder="Reason for declining (optional)"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleRejectConfirm}
                    disabled={submitting}
                    className="flex items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    <XCircle size={16} />
                    Confirm Decline
                  </button>
                  <button
                    onClick={() => { setIsRejecting(false); setRejectComment(""); }}
                    disabled={submitting}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceDetails;
