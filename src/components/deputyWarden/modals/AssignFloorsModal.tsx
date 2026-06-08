import { useEffect, useState } from "react";

interface AssignFloorsModalProps {
  open: boolean;
  currentFloors?: number[];
  onClose: () => void;
  onSubmit: (floors: number[]) => void;
}

const AssignFloorsModal = ({
  open,
  currentFloors = [],
  onClose,
  onSubmit,
}: AssignFloorsModalProps) => {
  const [floors, setFloors] = useState("");

  useEffect(() => {
    setFloors(currentFloors.join(", "));
  }, [currentFloors]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6">
        <h2 className="mb-5 text-2xl font-bold text-[#022B60]">
          Assign Floors
        </h2>

        <input
          value={floors}
          onChange={(e) => setFloors(e.target.value)}
          placeholder="1,2,3"
          className="w-full rounded-xl border p-3"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(
                floors
                  .split(",")
                  .map((f) => Number(f.trim()))
                  .filter((f) => !isNaN(f))
              )
            }
            className="rounded-xl bg-[#022B60] px-5 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignFloorsModal;