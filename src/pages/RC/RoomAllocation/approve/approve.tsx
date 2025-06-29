import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { allocateRoomAdmission, getAllRooms } from "../../../../utils/RC/rcAdimissionApi";
import { ChevronDown } from "lucide-react";

const ApprovePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<any>([]);
  const [hostelBlock, setHostelBlock] = useState<any>("Flora");

  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
        if (data && data.length > 0) setSelectedFloor(0);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        alert("Failed to load room data.");
      }
    };
    fetchRooms();
  }, []);

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const floor = parseInt(e.target.value);
    setSelectedFloor(floor);
    setSelectedRoom(null);
  };

  const handleRoomSelect = (roomNumber: number) => {
    setSelectedRoom({ roomNumber, floor: selectedFloor });
  };

  const handleAllocation = async () => {
    if (!selectedRoom || !id) return;

    try {
      await allocateRoomAdmission(id, {
        approve: true,
        comment: "Approved",
        room: selectedRoom.roomNumber,
        floor: selectedRoom.floor,
        hostel_block: hostelBlock,
      });
      alert("Room allocated successfully!");
      navigate("/RC/RoomAllocation");
    } catch (error: any) {
      console.error("Allocation error:", error);
      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while allocating the room."
      );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Approve Room Allocation - {id}</h1>

      {/* Floor Select */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Floor</label>
        <div className="relative w-full">
          <select
            value={selectedFloor ?? ""}
            onChange={handleFloorChange}
            className="w-full border border-gray-300 rounded px-4 py-2 appearance-none"
          >
            {rooms.map((_ : any, idx : number) => (
              <option key={idx} value={idx}>
                Floor {idx}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Room Buttons */}
      {selectedFloor !== null && rooms[selectedFloor] && (
        <div className="flex flex-wrap gap-4 mb-6">
          {rooms[selectedFloor].map((room: any) => {
            const isSelected =
              selectedRoom?.roomNumber === room.roomNumber &&
              selectedRoom?.floor === selectedFloor;

            return (
              <button
                key={room.roomNumber}
                onClick={() => handleRoomSelect(room.roomNumber)}
                className={`w-[30%] p-4 rounded-lg text-center transition ${
                  isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
                }`}
              >
                <div className="font-semibold text-base">
                  Room {room.roomNumber}
                </div>
                <div className="text-sm mt-1">
                  {room.rollNo ? `Roll No: ${room.rollNo}` : "Vacant"}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Allocate Button */}
      <button
        disabled={!selectedRoom}
        onClick={handleAllocation}
        className={`w-full py-3 rounded-lg font-semibold text-white ${
          selectedRoom
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Allocate Room
      </button>
    </div>
  );
};

export default ApprovePage;
