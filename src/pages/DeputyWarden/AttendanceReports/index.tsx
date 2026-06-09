/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
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
      setError("Failed to load attendance reports.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16">
          <Loader2 className="h-8 w-8 animate-spin text-[#022B60]" />
        </div>
      ) : reports.length === 0 ? (
        <div className="py-16 text-center text-slate-400">
          No attendance reports available.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reports.map((report) => (
            <AttendanceCard
              key={
                report.id ??
                `${report.date}-${report.hostel}-${report.floor}`
              }
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
