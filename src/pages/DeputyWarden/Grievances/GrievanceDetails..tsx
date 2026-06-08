import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const GrievanceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const grievanceData = location.state;

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <button
        onClick={() => navigate("/DeputyWarden/Grievances")}
        className="mb-6 flex items-center gap-2 text-[#022B60]"
      >
        <ArrowLeft size={18} />
        Back to Grievances
      </button>

      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#022B60]">
            {grievances.subject}
          </h1>

          <p className="mt-2 text-slate-500">
            {grievances.grievance_type}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-800">
              Student Details
            </h3>

            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {student.name}
              </p>

              <p>
                <span className="font-medium">Roll No:</span>{" "}
                {student.rollNo}
              </p>

              <p>
                <span className="font-medium">Hostel Block:</span>{" "}
                {student.hostelBlock}
              </p>

              <p>
                <span className="font-medium">Floor:</span>{" "}
                {student.floor}
              </p>

              <p>
                <span className="font-medium">Room Number:</span>{" "}
                {student.roomNumber}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-800">
              Grievance Details
            </h3>

            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">Status:</span>{" "}
                {grievances.status}
              </p>

              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(
                  grievances.created_at
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold text-slate-800">
            Description
          </h3>

          <div className="rounded-xl bg-slate-50 p-5 text-slate-700">
            {grievances.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDetails;