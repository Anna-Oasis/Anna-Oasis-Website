/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Users,
  UserX,
  Building2,
} from "lucide-react";

import AttendanceCard from "@/components/deputyWarden/AttendanceCard";
import { getAttendanceReports } from "@/utils/deputyWarden/dwAttendanceApi";

const AttendanceReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      const data = await getAttendanceReports();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const totalPresent = reports.reduce(
    (sum, report) => sum + (report.presentCount || 0),
    0
  );

  const totalAbsent = reports.reduce(
    (sum, report) => sum + (report.absentCount || 0),
    0
  );

  const totalHostels = new Set(
    reports.map((r) => r.hostel)
  ).size;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Attendance Reports
        </h1>

        <p className="mt-2 text-slate-500">
          Daily hostel attendance monitoring and analytics
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Users className="text-green-600" />
            <span className="text-xs text-slate-400">
              Present
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-green-600">
            {totalPresent}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Students Present
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <UserX className="text-red-600" />
            <span className="text-xs text-slate-400">
              Absent
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-red-600">
            {totalAbsent}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Students Absent
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Building2 className="text-[#022B60]" />
            <span className="text-xs text-slate-400">
              Hostels
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {totalHostels}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Hostels Covered
          </p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading attendance reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <ClipboardCheck
            size={60}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No Attendance Reports Available
          </h2>

          <p className="mt-2 text-slate-500">
            Attendance reports will appear here once
            records are generated.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report, index) => (
            <AttendanceCard
              key={report.id || index}
              date={report.date || ""}
              hostel={report.hostel || ""}
              floor={report.floor || 0}
              presentCount={report.presentCount || 0}
              absentCount={report.absentCount || 0}
              absentees={report.absentees || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceReportsPage;