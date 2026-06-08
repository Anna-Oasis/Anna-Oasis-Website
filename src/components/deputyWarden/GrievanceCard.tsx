import {
  User,
  Building2,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

interface GrievanceCardProps {
  subject: string;
  type: string;
  status: string;
  studentName: string;
  rollNo: string;
  hostelBlock: string;
  floor: number;
  roomNumber: number;
  createdAt: string;
  description: string;
  onView: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "SUBMITTED":
      return "bg-amber-100 text-amber-700 border border-amber-200";

    case "RC":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    case "MANAGER":
      return "bg-green-100 text-green-700 border border-green-200";

    case "DECLINED":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

const GrievanceCard = ({
  subject,
  type,
  status,
  studentName,
  rollNo,
  hostelBlock,
  floor,
  roomNumber,
  createdAt,
  onView,
}: GrievanceCardProps) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
            {subject}
          </h3>

          <p className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {type}
          </p>
        </div>

        <span
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <User size={16} />
          <span>{studentName}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-medium">
            Roll No:
          </span>
          <span>{rollNo}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Building2 size={16} />
          <span>
            {hostelBlock} • Floor {floor} • Room{" "}
            {roomNumber}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <CalendarDays size={16} />
          <span>
            {new Date(
              createdAt
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <button
          onClick={onView}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#022B60] py-2.5 text-sm font-medium text-white transition hover:bg-[#033b83]"
        >
          View Details

          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

export default GrievanceCard;