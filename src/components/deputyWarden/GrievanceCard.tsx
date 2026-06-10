interface GrievanceCardProps {
  subject: string;
  status: string;
  rollNo: string;
  onView: () => void;
}

const getStatusStyle = (status: string) => {
  const s = status?.toUpperCase().trim();
  if (s === "APPROVED" || s === "MANAGER") {
    return { label: "APPROVED", className: "bg-green-500 text-white" };
  }
  if (s === "DECLINED" || s === "REJECTED") {
    return { label: "DECLINED", className: "bg-red-500 text-white" };
  }
  return { label: "PENDING", className: "bg-[#022B60] text-white" };
};

const GrievanceCard = ({ subject, status, rollNo, onView }: GrievanceCardProps) => {
  const { label, className } = getStatusStyle(status);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-900">{subject}</h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${className}`}
        >
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-500">By {rollNo}</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onView}
          className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default GrievanceCard;
