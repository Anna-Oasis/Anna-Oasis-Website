/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BedDouble } from "lucide-react";
import { getRoomsByAcademicYear } from "@/utils/deputyWarden/dwRoomApi";

const RoomsPage = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    try {
      const data = await getRoomsByAcademicYear("2025-2026");
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Room Management
        </h1>

        <p className="mt-2 text-slate-500">
          View room allocations and occupancy
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading rooms...
        </div>
      ) : rooms.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <BedDouble
            size={50}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No Rooms Found
          </h2>

          <p className="mt-2 text-slate-500">
            No room data is available for this academic year.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rooms.map((room, index) => (
            <div
              key={room.id || index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#022B60]">
                Room {room.roomNumber}
              </h3>

              <p className="text-slate-500">
                Floor {room.floor}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;