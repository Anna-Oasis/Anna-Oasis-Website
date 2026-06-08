interface LeaveCardProps {
  rcName: string;
  hostel: string;
  leaving: string;
  arrival: string;
  reason: string;
  status: string;
  onView: () => void;
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-700";

    case "rejected":
      return "bg-red-100 text-red-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const LeaveCard = ({
  rcName,
  hostel,
  leaving,
  arrival,
  reason,
  status,
  onView,
}: LeaveCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#022B60]">
            {rcName}
          </h3>

          <p className="text-sm text-slate-500">
            {hostel}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">
            Leave From:
          </span>{" "}
          {new Date(leaving).toLocaleDateString()}
        </p>

        <p>
          <span className="font-semibold text-slate-800">
            Return On:
          </span>{" "}
          {new Date(arrival).toLocaleDateString()}
        </p>

        <p className="line-clamp-2">
          <span className="font-semibold text-slate-800">
            Reason:
          </span>{" "}
          {reason}
        </p>
      </div>

      <button
        onClick={onView}
        className="mt-6 w-full rounded-xl bg-[#022B60] px-4 py-2 text-white transition hover:bg-[#033b83]"
      >
        View Details
      </button>
    </div>
  );
};

export default LeaveCard;