/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Inbox, CheckCircle, XCircle } from "lucide-react";
import {
  fetchDeputyWardenLeaveForms,
  updateDeputyWardenLeaveFormStatus,
} from "@/utils/deputyWarden/dwLeaveVerificationApi";

const normalizeStatus = (status: any) => {
  const s = String(status ?? "").toLowerCase().trim();
  if (s === "approved" || s === "true" || status === true)
    return { label: "Approved", cls: "bg-green-100 text-green-700" };
  if (s === "rejected" || s === "declined" || s === "false" || status === false)
    return { label: "Rejected", cls: "bg-red-100 text-red-700" };
  return { label: "Pending", cls: "bg-amber-100 text-amber-700" };
};

const LeaveFormPage = () => {
  const [leaveForms, setLeaveForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectComment, setRejectComment] = useState("");

  const loadLeaveForms = async () => {
    try {
      const data = await fetchDeputyWardenLeaveForms();
      setLeaveForms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setLeaveForms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaveForms();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      setSubmitting(true);
      await updateDeputyWardenLeaveFormStatus(id, true);
      await loadLeaveForms();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRejectConfirm = async (id: number) => {
    try {
      setSubmitting(true);
      await updateDeputyWardenLeaveFormStatus(
        id,
        false,
        rejectComment.trim() || "Rejected by deputy warden"
      );
      setRejectingId(null);
      setRejectComment("");
      await loadLeaveForms();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const cancelReject = () => {
    setRejectingId(null);
    setRejectComment("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {loading ? (
        <div className="py-16 text-center text-slate-400">Loading...</div>
      ) : leaveForms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Inbox size={48} className="mb-4" />
          <p className="text-base">No leave forms found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {leaveForms.map((item: any, index: number) => {
            const { label, cls } = normalizeStatus(item.status ?? item.approved);
            const isPending =
              !item.status ||
              String(item.status).toLowerCase() === "pending" ||
              item.approved === null ||
              item.approved === undefined;
            const isRejecting = rejectingId === (item.id ?? index);

            return (
              <div
                key={item.id ?? index}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-bold text-slate-900">
                    {item.roll_number ?? item.rollNo ?? item.student_roll ?? "Unknown Student"}
                  </h3>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
                    {label}
                  </span>
                </div>

                {/* Detail fields */}
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  {(item.student_name ?? item.name) && (
                    <p>
                      <span className="font-medium text-slate-700">Name: </span>
                      {item.student_name ?? item.name}
                    </p>
                  )}
                  {item.from_date && (
                    <p>
                      <span className="font-medium text-slate-700">From: </span>
                      {new Date(item.from_date).toLocaleDateString()}
                    </p>
                  )}
                  {item.to_date && (
                    <p>
                      <span className="font-medium text-slate-700">To: </span>
                      {new Date(item.to_date).toLocaleDateString()}
                    </p>
                  )}
                  {(item.leaving ?? item.leaving_date) && (
                    <p>
                      <span className="font-medium text-slate-700">Leaving: </span>
                      {new Date(item.leaving ?? item.leaving_date).toLocaleDateString()}
                    </p>
                  )}
                  {(item.arrival ?? item.arrival_date) && (
                    <p>
                      <span className="font-medium text-slate-700">Return: </span>
                      {new Date(item.arrival ?? item.arrival_date).toLocaleDateString()}
                    </p>
                  )}
                  {item.reason && (
                    <p>
                      <span className="font-medium text-slate-700">Reason: </span>
                      {item.reason}
                    </p>
                  )}
                  {(item.hostelBlock ?? item.hostel_block ?? item.hostel) && (
                    <p>
                      <span className="font-medium text-slate-700">Hostel: </span>
                      {item.hostelBlock ?? item.hostel_block ?? item.hostel}
                    </p>
                  )}
                  {(item.dw_comment ?? item.comment) && (
                    <p>
                      <span className="font-medium text-slate-700">Comment: </span>
                      {item.dw_comment ?? item.comment}
                    </p>
                  )}
                </div>

                {/* Approve / Reject */}
                {isPending && !isRejecting && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      disabled={submitting}
                      className="flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                    >
                      <CheckCircle size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => { setRejectingId(item.id ?? index); setRejectComment(""); }}
                      disabled={submitting}
                      className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  </div>
                )}

                {/* Rejection comment */}
                {isPending && isRejecting && (
                  <div className="mt-4 space-y-2">
                    <textarea
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                      placeholder="Reason for rejection (optional)"
                      rows={2}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRejectConfirm(item.id)}
                        disabled={submitting}
                        className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        <XCircle size={14} />
                        Confirm Reject
                      </button>
                      <button
                        onClick={cancelReject}
                        disabled={submitting}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaveFormPage;
