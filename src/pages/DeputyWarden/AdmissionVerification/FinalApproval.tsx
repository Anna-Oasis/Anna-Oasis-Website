/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import {
  ArrowLeft,
  User,
  Building2,
  BedDouble,
  CheckCircle2,
} from "lucide-react";
import { handleUpdateAdmission } from "@/utils/deputyWarden/dwAdmissionApi";

const FinalApprovalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const state: { admission: any; selectedRoom: any } | null =
    location.state;

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!state?.admission || !state?.selectedRoom) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Missing data
          </h2>
          <p className="mt-2 text-slate-500">
            Please go through the room allocation flow again.
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

  const { admission, selectedRoom } = state;

  const handleFinalApprove = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await handleUpdateAdmission(id || String(admission.id), {
        approve: true,
        comment: `Approved — Room ${selectedRoom.roomNumber}, Floor ${selectedRoom.floor}`,
      });
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={44} className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Admission Approved!
          </h2>

          <p className="mt-3 text-slate-500">
            {admission.roll_number} has been approved and assigned to{" "}
            <span className="font-semibold text-[#022B60]">
              Room {selectedRoom.roomNumber}
            </span>{" "}
            on Floor {selectedRoom.floor}.
          </p>

          <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
            <div className="grid gap-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Student</span>
                <span className="font-medium text-slate-800">
                  {admission.roll_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Block</span>
                <span className="font-medium text-slate-800">
                  {admission.hostelBlock || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room</span>
                <span className="font-medium text-slate-800">
                  {selectedRoom.roomNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Floor</span>
                <span className="font-medium text-slate-800">
                  {selectedRoom.floor}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              navigate("/DeputyWarden/AdmissionVerification")
            }
            className="mt-8 w-full rounded-xl bg-[#022B60] py-3 text-sm font-medium text-white transition hover:bg-[#033b83]"
          >
            Back to Admissions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Back */}
      <button
        onClick={() =>
          navigate(
            `/DeputyWarden/AdmissionVerification/${id}/RoomAllocation`,
            { state: admission }
          )
        }
        className="mb-6 flex items-center gap-2 text-sm font-medium text-[#022B60] transition hover:opacity-70"
      >
        <ArrowLeft size={18} />
        Back to Room Selection
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Final Approval
        </h1>
        <p className="mt-2 text-slate-500">
          Confirm the room allocation and approve this admission
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Student card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
            <User size={20} className="text-[#022B60]" />
            Student
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

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Hostel Block
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {admission.hostelBlock || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Room card */}
        <div className="rounded-2xl border border-[#022B60]/20 bg-[#022B60]/5 p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-[#022B60]">
            <BedDouble size={20} />
            Allocated Room
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#022B60]/60">
                Room Number
              </p>
              <p className="mt-1 text-2xl font-bold text-[#022B60]">
                {selectedRoom.roomNumber}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#022B60]/60">
                Floor
              </p>
              <p className="mt-1 text-2xl font-bold text-[#022B60]">
                {selectedRoom.floor}
              </p>
            </div>

            {selectedRoom.capacity && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#022B60]/60">
                  Capacity
                </p>
                <p className="mt-1 text-2xl font-bold text-[#022B60]">
                  {selectedRoom.capacity}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hostel block summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
            <Building2 size={20} className="text-[#022B60]" />
            Approval Summary
          </h2>

          <div className="divide-y divide-slate-100">
            {[
              ["Student", admission.roll_number || "—"],
              ["Block", admission.hostelBlock || "—"],
              ["Room", `Room ${selectedRoom.roomNumber}`],
              ["Floor", `Floor ${selectedRoom.floor}`],
              ["Academic Year", admission.academicYear || "—"],
              ["Action", "Approve Admission"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between py-3 text-sm"
              >
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleFinalApprove}
          disabled={submitting}
          className="w-full rounded-2xl bg-green-600 py-4 text-base font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
        >
          {submitting ? "Approving..." : "Confirm & Approve"}
        </button>
      </div>
    </div>
  );
};

export default FinalApprovalPage;
