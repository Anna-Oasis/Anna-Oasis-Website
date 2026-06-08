import {
  CalendarDays,
  Building2,
  Users,
  UserX,
} from "lucide-react";

interface AttendanceCardProps {
  date: string;
  hostel: string;
  floor: number;
  presentCount: number;
  absentCount: number;
  absentees: string[];
}

const AttendanceCard = ({
  date,
  hostel,
  floor,
  presentCount,
  absentCount,
  absentees,
}: AttendanceCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#022B60]">
            <CalendarDays size={18} />
            <span className="font-semibold">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Building2 size={16} />
            <span>
              {hostel} • Floor {floor}
            </span>
          </div>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          Attendance
        </span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <Users
              size={18}
              className="text-green-600"
            />
            <span className="text-xs text-green-700">
              Present
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-green-600">
            {presentCount}
          </p>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <UserX
              size={18}
              className="text-red-600"
            />
            <span className="text-xs text-red-700">
              Absent
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-red-600">
            {absentCount}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <h3 className="font-semibold text-[#022B60]">
          Absentees
        </h3>

        {absentees.length === 0 ? (
          <p className="mt-2 text-sm text-green-600">
            No absentees recorded.
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {absentees.map((student, index) => (
              <span
                key={index}
                className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
              >
                {student}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;