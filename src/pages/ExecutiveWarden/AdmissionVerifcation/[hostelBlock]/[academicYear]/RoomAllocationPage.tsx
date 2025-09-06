import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomsByAcademicYear } from "@/utils/executiveWarden/ewRoomApi";
import {
  ewAllocateRoom,
  handleUpdateEWAdmission,
} from "@/utils/executiveWarden/ewAdmissionApi";
import useRoomStore from "@/stores/roomStore";
import useLoadingStore from "@/stores/loadingStore";

interface Room {
  roomNumber: number;
  rollNo?: string | null;
  floor: number;
  hostelBlock: string;
  academicYear: string;
}

export default function RoomAllocationPage() {
  const { academicYear, id, hostelBlock } = useParams<{
    academicYear: string;
    id: string;
    hostelBlock: string;
  }>();

  const setRooms = useRoomStore((state: { setRooms: any; }) => state.setRooms);
  const rooms = useRoomStore((state: { rooms: any; }) => state.rooms);
  const [floors, setFloors] = useState<number[]>([]);
  const [roomsByFloor, setRoomsByFloor] = useState<{ [floor: number]: Room[] }>(
    {}
  );
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<{
    roomNumber: number;
    floor: number;
  } | null>(null);

  const setLoading = useLoadingStore((state) => state.setLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (academicYear) {
      getRoomsByAcademicYear(String(academicYear))
        .then((roomList: Room[]) => {
          const filteredRooms = roomList.filter(
            (room) => room.hostelBlock === hostelBlock
          );
          setRooms(filteredRooms);

          const floorMap: { [floor: number]: Room[] } = {};
          filteredRooms.forEach((room) => {
            if (!floorMap[room.floor]) floorMap[room.floor] = [];
            floorMap[room.floor].push(room);
          });
          setRoomsByFloor(floorMap);

          const floorNumbers = Object.keys(floorMap)
            .map(Number)
            .sort((a, b) => a - b);
          setFloors(floorNumbers);
          setSelectedFloor(floorNumbers.length > 0 ? floorNumbers[0] : null);
        })
        .catch(() => {
          setRooms([]);
          setRoomsByFloor({});
          setFloors([]);
          setSelectedFloor(null);
        });
    }
  }, [academicYear, hostelBlock, setRooms]);

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFloor(Number(e.target.value));
    setSelectedRoom(null);
  };

  const handleRoomSelect = (roomNumber: number) => {
    if (selectedFloor !== null) {
      setSelectedRoom({ roomNumber, floor: selectedFloor });
    }
  };

  const handleAllocation = async () => {
    if (!selectedRoom) return;
    setLoading(true);
    try {
      await ewAllocateRoom(id as string, {
        room: selectedRoom.roomNumber,
        floor: selectedRoom.floor,
        hostel_block: String(hostelBlock),
      });
      await handleUpdateEWAdmission(id as string, {
        approve: true,
        comment: "Approved",
      });
      alert("Room Allocated successfully");
      navigate("/ExecutiveWarden/AdmissionVerification");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while allocating the room"
      );
      console.error("Error allocating room:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white p-4">
      <h1 className="mb-4 text-xl font-bold">Room Allocation - {id}</h1>

      {/* Floor Dropdown */}
      <div className="mb-4">
        <select
          value={selectedFloor ?? ""}
          onChange={handleFloorChange}
          className="w-full rounded border border-gray-300 p-2"
        >
          <option value="" disabled>
            Select Floor
          </option>
          {floors.map((floor) => (
            <option key={floor} value={floor}>
              Floor {floor}
            </option>
          ))}
        </select>
      </div>

      {/* Rooms */}
      {selectedFloor !== null && roomsByFloor[selectedFloor] && (
        <div className="flex flex-wrap gap-3">
          {roomsByFloor[selectedFloor].map((room: Room) => {
            const isSelected =
              selectedRoom?.roomNumber === room.roomNumber &&
              selectedRoom?.floor === selectedFloor;
            return (
              <button
                key={room.roomNumber}
                onClick={() => handleRoomSelect(room.roomNumber)}
                className={`w-[30%] rounded-lg p-3 text-center ${
                  isSelected ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                <p className="font-semibold">Room {room.roomNumber}</p>
                <p className="text-sm">
                  {room.rollNo ? `Roll No: ${room.rollNo}` : "Vacant"}
                </p>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={handleAllocation}
        disabled={!selectedRoom}
        className={`mt-6 rounded-lg px-4 py-2 font-semibold text-white ${
          selectedRoom ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
        }`}
      >
        Allocate
      </button>
    </div>
  );
}
