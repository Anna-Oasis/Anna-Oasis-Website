 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  TriangleAlert,
  FileWarning,
  Clock3,
  Tags,
} from "lucide-react";

import GrievanceCard from "@/components/deputyWarden/GrievanceCard";
import { getDeputyWardenGrievances } from "@/utils/deputyWarden/dwGrievanceApi";

const DeputyWardenGrievancesPage = () => {
  const navigate = useNavigate();

  const [grievances, setGrievances] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadGrievances = async () => {
    try {
      const data = await getDeputyWardenGrievances();

      setGrievances(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setGrievances([]);
    }
  };

  useEffect(() => {
    loadGrievances();
  }, []);

  const filtered = grievances.filter((item) => {
    const grievance = item.grievances;
    const student = item.student;

    return (
      grievance.subject
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.rollNo
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const pendingCount = filtered.filter(
    (g) =>
      g.grievances.status?.toLowerCase() ===
      "submitted"
  ).length;


  const grievanceTypes = new Set(
    filtered.map(
      (g) => g.grievances.grievance_type
    )
  ).size;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Grievance Management
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor and track all student grievances
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <FileWarning className="text-[#022B60]" />
            <span className="text-xs text-slate-400">
              Total
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {filtered.length}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Grievances
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Clock3 className="text-amber-500" />
            <span className="text-xs text-slate-400">
              Pending
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-amber-600">
            {pendingCount}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Awaiting Action
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Tags className="text-[#022B60]" />
            <span className="text-xs text-slate-400">
              Types
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {grievanceTypes}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Categories
          </p>
        </div>
      </div>

      <div className="relative mb-8 max-w-xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by subject, student name or roll number"
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 shadow-sm outline-none transition focus:border-[#022B60]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <TriangleAlert
            size={60}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No Grievances Available
          </h2>

          <p className="mt-2 text-slate-500">
            No student grievances match the
            current search.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <GrievanceCard
              key={item.grievances.id}
              subject={item.grievances.subject}
              type={item.grievances.grievance_type}
              status={item.grievances.status}
              studentName={item.student.name}
              rollNo={item.student.rollNo}
              hostelBlock={item.student.hostelBlock}
              floor={item.student.floor}
              roomNumber={item.student.roomNumber}
              createdAt={item.grievances.created_at}
              description={item.grievances.description}
              onView={() =>
                navigate(
                  `/DeputyWarden/Grievances/${item.grievances.id}`,
                  {
                    state: item,
                  }
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeputyWardenGrievancesPage;