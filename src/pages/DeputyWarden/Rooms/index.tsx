/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getRoomsByAcademicYear } from "@/utils/deputyWarden/dwRoomApi";

const ACADEMIC_YEARS = [ "2026-2027","2027-2028"];

type RoomMap = Map<string | number, string[]>;
type FloorMap = Map<string | number, RoomMap>;
type HostelMap = Map<string, FloorMap>;

function extractStudents(item: any): string[] {
  if (Array.isArray(item.students)) {
    return item.students.map((s: any) =>
      typeof s === "string"
        ? s
        : s.rollNo ?? s.roll_number ?? s.rollNumber ?? s.name ?? String(s)
    );
  }
  if (Array.isArray(item.occupants)) {
    return item.occupants.map((s: any) =>
      typeof s === "string" ? s : s.rollNo ?? s.roll_number ?? String(s)
    );
  }
  if (Array.isArray(item.residents)) {
    return item.residents.map((s: any) =>
      typeof s === "string" ? s : s.rollNo ?? s.roll_number ?? String(s)
    );
  }
  const roll = item.rollNo ?? item.roll_number ?? item.rollNumber;
  if (roll) return [String(roll)];
  return [];
}

function buildHierarchy(raw: any[]): HostelMap {
  const hostelMap: HostelMap = new Map();

  for (const item of raw) {
    const hostel =
      item.hostelBlock ?? item.hostel_block ?? item.hostel ?? "Unknown";
    const floor =
      item.floor ?? item.floor_number ?? item.floorNumber ?? item.floor_id ?? 0;
    const room =
      item.roomNumber ?? item.room_number ?? item.room ?? "—";

    if (!hostelMap.has(hostel)) hostelMap.set(hostel, new Map());
    const floorMap = hostelMap.get(hostel)!;

    if (!floorMap.has(floor)) floorMap.set(floor, new Map());
    const roomMap = floorMap.get(floor)!;

    const existing = roomMap.get(room) ?? [];
    const students = extractStudents(item);
    roomMap.set(room, [...existing, ...students]);
  }

  return hostelMap;
}

const RoomsPage = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [hierarchy, setHierarchy] = useState<HostelMap>(new Map());
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    if (!academicYear) return;
    setLoading(true);
    setFetched(true);
    try {
      const data = await getRoomsByAcademicYear(academicYear);
      const raw = Array.isArray(data) ? data : [];
      setHierarchy(buildHierarchy(raw));
    } catch {
      setHierarchy(new Map());
    } finally {
      setLoading(false);
    }
  };

  const hasData = hierarchy.size > 0;

  return (
    <div className="min-h-screen bg-white p-4">
      <h2 className="mb-4 text-base font-semibold text-slate-700">RoomView</h2>

      <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
        This feature is in development, soon you will be able to have filters
        and search options to view room data for a specific academic year.
      </div>

      <p className="mb-2 text-sm font-semibold text-slate-700">Academic Year</p>

      <div className="relative mb-4">
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none focus:border-[#022B60]"
        >
          <option value="" disabled>
            Select option
          </option>
          {ACADEMIC_YEARS.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      <button
        onClick={handleFetch}
        disabled={!academicYear}
        className="mb-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Fetch room data
      </button>

      {loading ? (
        <p className="text-center text-sm text-slate-400">Loading...</p>
      ) : !fetched || !hasData ? (
        <p className="text-center text-sm text-slate-400">
          No room data to display.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {Array.from(hierarchy.entries()).map(([hostel, floorMap]) => (
            <div key={String(hostel)}>
              <h3 className="mb-3 text-base font-bold text-slate-900">
                {String(hostel)} Hostel
              </h3>

              <div className="flex flex-col gap-4">
                {Array.from(floorMap.entries()).map(([floor, roomMap]) => (
                  <div
                    key={String(floor)}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <p className="mb-3 text-sm font-semibold text-slate-700">
                      Floor {floor}
                    </p>

                    <div className="flex flex-col gap-3">
                      {Array.from(roomMap.entries()).map(
                        ([room, students]) => (
                          <div key={String(room)}>
                            <p className="text-sm font-medium text-slate-800">
                              Room {room}
                            </p>
                            {students.length > 0 ? (
                              <ul className="mt-1 space-y-0.5">
                                {students.map((s, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-slate-500"
                                  >
                                    - {s}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-1 text-sm text-slate-400">
                                No students assigned
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
