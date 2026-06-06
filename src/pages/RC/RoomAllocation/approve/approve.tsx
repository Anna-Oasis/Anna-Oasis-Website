import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import EmptyPage from "@/components/EmptyPage";
import { allocateRoomAdmission, getAdmissionSessions, getAllRooms, type AdmissionSession, type Room } from "@/utils/RC/rcAdimissionApi";

const ROOM_SIZE = 3;

export default function ApprovePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<AdmissionSession[]>([]);
  const [academicYear, setAcademicYear] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAdmissionSessions()
      .then((data) => {
        setSessions(data);
        if (data[0]?.academic_year) setAcademicYear(data[0].academic_year);
      })
      .catch((error) => toast.error(error.response?.data?.message || "Failed to fetch admission sessions"));
  }, []);

  const loadRooms = async () => {
    if (!academicYear) {
      toast.error("Select an academic year first");
      return;
    }
    setLoadingRooms(true);
    setSelectedRoom(null);
    try {
      setRooms(await getAllRooms(academicYear));
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to load room data");
      setRooms([]);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    if (academicYear) loadRooms();
  }, [academicYear]);

  const floors = useMemo(() => {
    return Array.from(new Set(rooms.map((room) => Number(room.floor ?? 0)))).sort((a, b) => a - b);
  }, [rooms]);

  useEffect(() => {
    if (selectedFloor === null && floors.length > 0) setSelectedFloor(floors[0]);
  }, [floors, selectedFloor]);

  const floorRooms = useMemo(() => {
    return selectedFloor === null ? [] : rooms.filter((room) => Number(room.floor) === selectedFloor);
  }, [rooms, selectedFloor]);

  const handleAllocation = async () => {
    if (!selectedRoom || !id) return;
    setSubmitting(true);
    try {
      await allocateRoomAdmission(id, {
        approve: true,
        comment: "Approved",
        room: selectedRoom.roomNumber,
        floor: selectedRoom.floor,
        hostel_block: selectedRoom.hostelBlock,
      });
      toast.success("Room allocated successfully");
      navigate("/RC/RoomAllocation");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong while allocating the room");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Approve Room Allocation</h1>
        <p className="mt-2 text-slate-600">Admission #{id}</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-slate-700">Academic Year</label>
          <select className="h-10 w-full rounded-md border bg-white px-3 text-sm" value={academicYear} onChange={(event) => setAcademicYear(event.target.value)}>
            <option value="">Select academic year</option>
            {sessions.map((session) => <option key={session.id} value={session.academic_year}>{session.academic_year}</option>)}
          </select>
        </div>
        <Button onClick={loadRooms} disabled={loadingRooms}>{loadingRooms ? "Fetching..." : "Fetch Rooms"}</Button>
      </div>

      {rooms.length === 0 && !loadingRooms ? (
        <EmptyPage title="No rooms loaded" description="Select an academic year and fetch rooms." />
      ) : (
        <>
          <div className="mb-5 flex flex-wrap gap-2">
            {floors.map((floor) => (
              <Button key={floor} variant={selectedFloor === floor ? "default" : "outline"} onClick={() => { setSelectedFloor(floor); setSelectedRoom(null); }}>
                Floor {floor}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {floorRooms.map((room) => {
              const occupants = room.rollNo || [];
              const full = occupants.length >= ROOM_SIZE;
              const selected = selectedRoom?.roomNumber === room.roomNumber && selectedRoom?.hostelBlock === room.hostelBlock;
              return (
                <button
                  key={`${room.hostelBlock}-${room.roomNumber}-${room.academicYear}`}
                  type="button"
                  disabled={full}
                  onClick={() => setSelectedRoom(room)}
                  className={`rounded-lg border p-4 text-left transition ${selected ? "border-[#022B60] bg-blue-50" : "bg-white hover:border-slate-400"} ${full ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-slate-900">Room {room.roomNumber}</div>
                    <div className="text-xs text-slate-500">{occupants.length}/{ROOM_SIZE}</div>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{room.hostelBlock}</div>
                  <div className="mt-3 text-sm text-slate-500">{occupants.length ? occupants.join(", ") : "Vacant"}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            <Button disabled={!selectedRoom || submitting} onClick={handleAllocation}>{submitting ? "Allocating..." : "Allocate Room"}</Button>
            <Button variant="outline" onClick={() => navigate("/RC/RoomAllocation")}>Cancel</Button>
          </div>
        </>
      )}
    </div>
  );
}
