/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  BedDouble,
  Building2,
  Users,
  Search,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { getRoomsByAcademicYear } from "@/utils/deputyWarden/dwRoomApi";

const ACADEMIC_YEARS = [
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
];

function getOccupancyStatus(room: any): "available" | "partial" | "full" {
  const capacity =
    room.capacity ?? room.total_capacity ?? room.totalCapacity ?? 0;
  const occupied =
    room.occupiedCount ??
    room.occupied_count ??
    room.occupied ??
    room.occupiedBeds ??
    0;
  if (capacity === 0) return "available";
  if (occupied >= capacity) return "full";
  if (occupied > 0) return "partial";
  return "available";
}

const STATUS_CONFIG = {
  available: {
    label: "Available",
    badge: "border-green-100 bg-green-50 text-green-700",
    bar: "bg-green-500",
    dot: "bg-green-500",
  },
  partial: {
    label: "Partially Filled",
    badge: "border-amber-100 bg-amber-50 text-amber-700",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
  },
  full: {
    label: "Full",
    badge: "border-red-100 bg-red-50 text-red-600",
    bar: "bg-red-500",
    dot: "bg-red-500",
  },
};

const RoomsPage = () => {
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadRooms = async (year: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoomsByAcademicYear(year);
      setRooms(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Unable to load rooms. The backend route for this academic year may not be registered yet."
      );
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms(academicYear);
  }, [academicYear]);

  const filtered = rooms.filter((r) => {
    const num = String(r.roomNumber ?? r.room_number ?? "").toLowerCase();
    const host = String(r.hostel ?? r.hostelBlock ?? "").toLowerCase();
    const q = search.toLowerCase();
    return num.includes(q) || host.includes(q);
  });

  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => getOccupancyStatus(r) === "available").length,
    partial: rooms.filter((r) => getOccupancyStatus(r) === "partial").length,
    full: rooms.filter((r) => getOccupancyStatus(r) === "full").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#022B60]">Room Management</h1>
          <p className="mt-2 text-slate-500">
            View room allocations and occupancy status
          </p>
        </div>

        {/* Academic Year Selector */}
        <div className="relative">
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-[#022B60]"
          >
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
      </div>

      {/* Stats — only when data loaded */}
      {!loading && rooms.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Rooms", value: stats.total, color: "text-[#022B60]" },
            { label: "Available", value: stats.available, color: "text-green-600" },
            { label: "Partially Filled", value: stats.partial, color: "text-amber-600" },
            { label: "Full", value: stats.full, color: "text-red-600" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-400">{s.label}</p>
              <p className={`mt-2 text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by room number or hostel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#022B60]"
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 shadow-sm">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#022B60]" />
          <p className="text-sm text-slate-500">
            Loading rooms for {academicYear}...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <BedDouble size={52} className="mx-auto mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-700">No Rooms Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            {search
              ? "No rooms match your search."
              : `No room data available for ${academicYear}.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((room, index) => {
            const roomNum =
              room.roomNumber ?? room.room_number ?? `${index + 1}`;
            const hostel =
              room.hostel ?? room.hostelBlock ?? room.hostel_block ?? "—";
            const floor =
              room.floor ?? room.floorNumber ?? room.floor_number ?? "—";
            const capacity =
              room.capacity ?? room.total_capacity ?? room.totalCapacity ?? 0;
            const occupied =
              room.occupiedCount ??
              room.occupied_count ??
              room.occupied ??
              room.occupiedBeds ??
              0;
            const available = Math.max(0, capacity - occupied);
            const status = getOccupancyStatus(room);
            const cfg = STATUS_CONFIG[status];
            const fillPct =
              capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;

            return (
              <div
                key={room.id || index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Room header row */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <BedDouble size={22} className="text-[#022B60]" />
                  </div>
                  <span
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cfg.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Room {roomNum}
                </h3>

                <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-slate-400" />
                    <span>{hostel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-slate-400" />
                    <span>Floor {floor}</span>
                  </div>
                </div>

                {/* Occupancy bar */}
                {capacity > 0 && (
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {occupied} / {capacity} occupied
                      </span>
                      <span>
                        {available} bed{available !== 1 ? "s" : ""} free
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${cfg.bar}`}
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 text-center text-xs">
                  <div className="py-3">
                    <p className="font-bold text-slate-800">{capacity || "—"}</p>
                    <p className="text-slate-500">Capacity</p>
                  </div>
                  <div className="py-3">
                    <p className="font-bold text-slate-800">{occupied}</p>
                    <p className="text-slate-500">Occupied</p>
                  </div>
                  <div className="py-3">
                    <p
                      className={`font-bold ${
                        available > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {available}
                    </p>
                    <p className="text-slate-500">Free</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
