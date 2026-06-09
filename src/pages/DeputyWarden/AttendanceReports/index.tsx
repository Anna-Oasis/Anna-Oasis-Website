/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Users,
  UserX,
  Building2,
  Loader2,
} from "lucide-react";

import AttendanceCard from "@/components/deputyWarden/AttendanceCard";
import { getAttendanceReports } from "@/utils/deputyWarden/dwAttendanceApi";

function normalizeReport(raw: any) {
  return {
    id: raw.id,
    date:
      raw.date ??
      raw.attendance_date ??
      raw.attendanceDate ??
      raw.created_at ??
      "",
    hostel:
      raw.hostel ??
      raw.hostel_block ??
      raw.hostelBlock ??
      raw.block ??
      "",
    floor:
      raw.floor ??
      raw.floor_number ??
      raw.floorNumber ??
      raw.floor_id ??
      0,
    presentCount:
      raw.presentCount ??
      raw.present_count ??
      raw.present ??
      raw.totalPresent ??
      0,
    absentCount:
      raw.absentCount ??
      raw.absent_count ??
      raw.absent ??
      raw.totalAbsent ??
      0,
    absentees: Array.isArray(raw.absentees)
      ? raw.absentees.map((a: any) =>
          typeof a === "string"
            ? a
            : a.name ?? a.roll_number ?? a.rollNumber ?? String(a)
        )
      : Array.isArray(raw.absent_students)
        ? raw.absent_students.map((a: any) =>
            typeof a === "string" ? a : a.name ?? a.roll_number ?? String(a)
          )
        : [],
  };
}

const AttendanceReportsPage = () => {
  const [reports, setReports] = useState<ReturnType<typeof normalizeReport>[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const raw = await getAttendanceReports();
      const data = Array.isArray(raw) ? raw : [];
      setReports(data.map(normalizeReport));
    } catch {
      setError("Failed to load attendance reports. Please try refreshing.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const totalPresent = reports.reduce((sum, r) => sum + r.presentCount, 0);
  const totalAbsent = reports.reduce((sum, r) => sum + r.absentCount, 0);
  const totalHostels = new Set(reports.map((r) => r.hostel).filter(Boolean))
    .size;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Attendance Reports
        </h1>
        <p className="mt-2 text-slate-500">
          Daily hostel attendance monitoring and analytics
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <Users size={20} className="text-green-600" />
            </div>
            <span className="text-xs text-slate-400">Present</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-green-600">
            {totalPresent}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Students Present</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <UserX size={20} className="text-red-600" />
            </div>
            <span className="text-xs text-slate-400">Absent</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-red-600">
            {totalAbsent}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Students Absent</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Building2 size={20} className="text-[#022B60]" />
            </div>
            <span className="text-xs text-slate-400">Hostels</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {totalHostels}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Hostels Covered</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 shadow-sm">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#022B60]" />
          <p className="text-sm text-slate-500">Loading attendance reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <ClipboardCheck size={52} className="mx-auto mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-700">
            No Attendance Reports Available
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Attendance reports will appear here once records are generated.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <AttendanceCard
              key={report.id ?? `${report.date}-${report.hostel}-${report.floor}`}
              date={report.date}
              hostel={report.hostel}
              floor={report.floor}
              presentCount={report.presentCount}
              absentCount={report.absentCount}
              absentees={report.absentees}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceReportsPage;
