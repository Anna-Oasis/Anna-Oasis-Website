/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getRoomsByAcademicYear } from "@/utils/deputyWarden/dwRoomApi";

const ACADEMIC_YEARS = [
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
];

const RoomsPage = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    if (!academicYear) return;
    setLoading(true);
    setFetched(true);
    try {
      const data = await getRoomsByAcademicYear(academicYear);
      setRooms(Array.isArray(data) ? data : []);
    } catch {
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

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
        className="mb-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Fetch room data
      </button>

      {loading ? (
        <p className="text-center text-sm text-slate-400">Loading...</p>
      ) : fetched && rooms.length === 0 ? (
        <p className="text-center text-sm text-slate-400">
          No room data to display.
        </p>
      ) : !fetched ? (
        <p className="text-center text-sm text-slate-400">
          No room data to display.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {rooms.map((room: any, index: number) => (
            <div
              key={room.id || index}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-slate-900">
                Room {room.roomNumber ?? room.room_number ?? index + 1}
              </p>
              <p className="text-sm text-slate-500">
                {room.hostel ?? room.hostelBlock ?? "—"} · Floor{" "}
                {room.floor ?? "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
