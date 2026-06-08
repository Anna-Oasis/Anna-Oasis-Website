interface RoomCardProps {
  roomNumber: string;
  block: string;
  floor: number;
  occupancy: number;
  capacity: number;
}

const RoomCard = ({
  roomNumber,
  block,
  floor,
  occupancy,
  capacity,
}: RoomCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-[#022B60]">
        Room {roomNumber}
      </h2>

      <div className="mt-4 space-y-2 text-slate-600">
        <p>
          <span className="font-semibold">Block:</span> {block}
        </p>

        <p>
          <span className="font-semibold">Floor:</span> {floor}
        </p>

        <p>
          <span className="font-semibold">Occupancy:</span>{" "}
          {occupancy}/{capacity}
        </p>
      </div>
    </div>
  );
};

export default RoomCard;