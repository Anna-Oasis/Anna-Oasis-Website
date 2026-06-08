import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { updateRCLeaveStatusByDw } from "@/utils/deputyWarden/dwRCLeaveApi";

const RCLeaveDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="text-xl font-semibold text-red-600">
            Leave request not found
          </h2>

          <button
            onClick={() => navigate("/DeputyWarden/RcLeave")}
            className="mt-4 rounded-xl bg-[#022B60] px-4 py-2 text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const { leave, rc } = data;

  const handleApprove = async () => {
    await updateRCLeaveStatusByDw(
      leave.id,
      "approved"
    );

    navigate("/DeputyWarden/RcLeave");
  };

  const handleReject = async () => {
    await updateRCLeaveStatusByDw(
      leave.id,
      "rejected"
    );

    navigate("/DeputyWarden/RcLeave");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <button
        onClick={() => navigate("/DeputyWarden/RcLeave")}
        className="mb-6 flex items-center gap-2 text-[#022B60]"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold text-[#022B60]">
          RC Leave Request
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              RC Details
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {rc.name}
              </p>

              <p>
                <strong>Hostel:</strong> {rc.hostel}
              </p>

              <p>
                <strong>Floors:</strong>{" "}
                {rc.floor?.join(", ")}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Leave Details
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Leaving:</strong>{" "}
                {new Date(
                  leave.leaving
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Arrival:</strong>{" "}
                {new Date(
                  leave.arrival
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {leave.approved}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold">
            Reason
          </h3>

          <div className="rounded-xl bg-slate-50 p-5">
            {leave.reason}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleApprove}
            className="rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Approve
          </button>

          <button
            onClick={handleReject}
            className="rounded-xl bg-red-600 px-6 py-3 text-white"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RCLeaveDetails;