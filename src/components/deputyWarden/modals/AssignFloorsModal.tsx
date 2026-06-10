import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

const FLOORS = [
  { label: "Ground Floor", value: 0, short: "GF" },
  { label: "First Floor", value: 1, short: "FF" },
  { label: "Second Floor", value: 2, short: "SF" },
  { label: "Third Floor", value: 3, short: "TF" },
];

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
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);

  useEffect(() => {
    if (open) setSelectedFloors([...currentFloors]);
  }, [currentFloors, open]);

  const toggleFloor = (val: number) => {
    setSelectedFloors((prev) =>
      prev.includes(val) ? prev.filter((f) => f !== val) : [...prev, val]
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Edit Floor Assignment
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Select floors to assign this RC
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Floor Toggles */}
        <div className="flex flex-col gap-2 px-6 py-5">
          {FLOORS.map((f) => {
            const active = selectedFloors.includes(f.value);
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => toggleFloor(f.value)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border-[#022B60]/40 bg-[#022B60]/5 text-[#022B60]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                    active
                      ? "border-[#022B60] bg-[#022B60]"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {active && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>

                <span className="font-bold">{f.short}</span>
                <span className={active ? "text-[#022B60]/70" : "text-slate-500"}>
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(selectedFloors)}
            className="rounded-xl bg-[#022B60] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#033c84]"
          >
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignFloorsModal;
