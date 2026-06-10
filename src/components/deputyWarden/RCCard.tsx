import { Edit2, Trash2, Building2, Layers3, Mail } from "lucide-react";

const FLOOR_LABELS: Record<number, string> = {
  0: "GF",
  1: "FF",
  2: "SF",
  3: "TF",
};

interface RCCardProps {
  id: string;
  name: string;
  email?: string;
  hostel: string;
  floors: number[];
  isOnLeave?: boolean;
  onEditFloors: () => void;
  onDelete: () => void;
}

const RCCard = ({
  name,
  email,
  hostel,
  floors,
  isOnLeave,
  onEditFloors,
  onDelete,
}: RCCardProps) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Avatar + Status */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#022B60] text-xl font-bold">
          {name?.[0]?.toUpperCase() ?? "R"}
        </div>

        {isOnLeave ? (
          <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            On Leave
          </span>
        ) : (
          <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            Active
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-base font-semibold text-slate-900">{name || "—"}</h3>

      {/* Email */}
      {email && (
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <Mail size={13} className="shrink-0" />
          <span className="truncate">{email}</span>
        </div>
      )}

      {/* Hostel + Floors */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Building2 size={14} className="shrink-0 text-slate-400" />
          <span className="font-medium">{hostel || "—"}</span>
        </div>

        <div className="flex items-start gap-2 text-sm text-slate-600">
          <Layers3 size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <div className="flex flex-wrap gap-1.5">
            {floors.length > 0 ? (
              floors.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                >
                  {FLOOR_LABELS[f] ?? `Floor ${f}`}
                </span>
              ))
            ) : (
              <span className="text-slate-400 text-xs">No floors assigned</span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
        <button
          onClick={onEditFloors}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#022B60]/40 hover:bg-blue-50 hover:text-[#022B60]"
        >
          <Edit2 size={14} />
          Edit Floors
        </button>

        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={14} />
          Remove
        </button>
      </div>
    </div>
  );
};

export default RCCard;
