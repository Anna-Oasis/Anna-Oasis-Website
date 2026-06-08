import { useState } from "react";

interface AddRCModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    hostel: string;
    floors: number[];
  }) => void;
}

const AddRCModal = ({
  open,
  onClose,
  onSubmit,
}: AddRCModalProps) => {
  const [name, setName] = useState("");
  const [hostel, setHostel] = useState("");
  const [floors, setFloors] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6">
        <h2 className="mb-5 text-2xl font-bold text-[#022B60]">
          Add RC
        </h2>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="RC Name"
            className="w-full rounded-xl border p-3"
          />

          <input
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            placeholder="Hostel"
            className="w-full rounded-xl border p-3"
          />

          <input
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            placeholder="Floors (1,2,3)"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit({
                name,
                hostel,
                floors: floors
                  .split(",")
                  .map((f) => Number(f.trim())),
              })
            }
            className="rounded-xl bg-[#022B60] px-5 py-2 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRCModal;