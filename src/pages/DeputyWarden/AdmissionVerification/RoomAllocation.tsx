/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  User,
  Building2,
  Search,
} from "lucide-react";
import { getRoomsByAcademicYear } from "@/utils/deputyWarden/dwRoomApi";

const RoomAllocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const admission: any = location.state;

  const [rooms, setRooms] = useState<any[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const year = admission?.academicYear || "2025-2026";
        const data = await getRoomsByAcademicYear(year);
        setRooms(Array.isArray(data) ? data : []);
      } catch {
        setRooms([]);
      } finally {
        setLoadingRooms(false);
      }
    }
    fetchRooms();
  }, [admission]);

  if (!admission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Admission not found
          </h2>
          <button
            onClick={() =>
              navigate("/DeputyWarden/AdmissionVerification")
            }
            className="mt-5 rounded-xl bg-[#022B60] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#033b83]"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const filteredRooms = rooms.filter(
    (r) =>
      String(r.roomNumber ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(r.floor ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (!selectedRoom) return;
    navigate(
      `/DeputyWarden/AdmissionVerification/${id}/FinalApproval`,
      { state: { admission, selectedRoom } }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Back */}
      <button
        onClick={() =>
          navigate(
            `/DeputyWarden/AdmissionVerification/${id}`,
            { state: admission }
          )
        }
        className="mb-6 flex items-center gap-2 text-sm font-medium text-[#022B60] transition hover:opacity-70"
      >
        <ArrowLeft size={18} />
        Back to Details
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Room Allocation
        </h1>
        <p className="mt-2 text-slate-500">
          Select a room for this student
        </p>
      </div>

      {/* Student summary */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Student Summary
        </h2>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#022B60]" />
            <span className="text-sm font-medium text-slate-700">
              {admission.roll_number || "Unknown"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-[#022B60]" />
            <span className="text-sm font-medium text-slate-700">
              Block: {admission.hostelBlock || "—"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BedDouble size={16} className="text-[#022B60]" />
            <span className="text-sm font-medium text-slate-700">
              Year: {admission.academicYear || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Room search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Available Rooms
        </h2>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search room or floor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#022B60]"
          />
        </div>
      </div>

      {loadingRooms ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          Loading available rooms...
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <BedDouble
            size={50}
            className="mx-auto mb-4 text-slate-300"
          />
          <h2 className="text-xl font-semibold text-slate-700">
            No Rooms Available
          </h2>
          <p className="mt-2 text-slate-500">
            No rooms found for the selected academic year. This may be a backend configuration issue.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRooms.map((room: any, index: number) => {
              const isSelected =
                selectedRoom?.id === room.id ||
                (selectedRoom?.roomNumber === room.roomNumber &&
                  selectedRoom?.floor === room.floor);

              return (
                <button
                  key={room.id || index}
                  onClick={() => setSelectedRoom(room)}
                  className={`group relative flex flex-col gap-2 rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-[#022B60] bg-[#022B60] text-white shadow-lg"
                      : "border-slate-200 bg-white shadow-sm hover:border-[#022B60]/40 hover:shadow-md"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2
                      size={18}
                      className="absolute right-3 top-3 text-white"
                    />
                  )}

                  <BedDouble
                    size={24}
                    className={
                      isSelected
                        ? "text-white"
                        : "text-[#022B60]"
                    }
                  />

                  <div>
                    <p
                      className={`font-semibold ${
                        isSelected
                          ? "text-white"
                          : "text-slate-800"
                      }`}
                    >
                      Room {room.roomNumber}
                    </p>
                    <p
                      className={`text-sm ${
                        isSelected
                          ? "text-blue-100"
                          : "text-slate-500"
                      }`}
                    >
                      Floor {room.floor}
                    </p>
                    {room.capacity && (
                      <p
                        className={`mt-1 text-xs ${
                          isSelected
                            ? "text-blue-200"
                            : "text-slate-400"
                        }`}
                      >
                        Capacity: {room.capacity}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Confirm bar */}
          <div className="sticky bottom-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                {selectedRoom ? (
                  <p className="text-sm text-slate-600">
                    Selected:{" "}
                    <span className="font-semibold text-[#022B60]">
                      Room {selectedRoom.roomNumber} — Floor{" "}
                      {selectedRoom.floor}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-slate-400">
                    No room selected
                  </p>
                )}
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedRoom}
                className="rounded-xl bg-[#022B60] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#033b83] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomAllocationPage;
