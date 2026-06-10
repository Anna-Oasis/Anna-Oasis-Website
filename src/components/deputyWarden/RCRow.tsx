interface RCRowProps {
  id: string;
  name: string;
  hostel: string;
  floors: number[];
  onEdit: () => void;
  onDelete: () => void;
}

const RCRow = ({
  name,
  hostel,
  floors,
  onEdit,
  onDelete,
}: RCRowProps) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-4">{name}</td>

      <td className="px-4 py-4">{hostel}</td>

      <td className="px-4 py-4">
        {floors.join(", ")}
      </td>

      <td className="px-4 py-4">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg bg-[#022B60] px-3 py-1 text-white"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-3 py-1 text-white"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RCRow;