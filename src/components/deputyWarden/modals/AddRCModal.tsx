import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const HOSTELS = ["Flora", "Lavender"];

const FLOORS = [
  { label: "Ground Floor", value: 0, short: "GF" },
  { label: "First Floor", value: 1, short: "FF" },
  { label: "Second Floor", value: 2, short: "SF" },
  { label: "Third Floor", value: 3, short: "TF" },
];

interface AddRCModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    hostel: string;
    floors: number[];
  }) => void;
}

const AddRCModal = ({ open, onClose, onSubmit }: AddRCModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hostel, setHostel] = useState("");
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);

  const toggleFloor = (val: number) => {
    setSelectedFloors((prev) =>
      prev.includes(val) ? prev.filter((f) => f !== val) : [...prev, val]
    );
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !hostel.trim()) return;
    onSubmit({ name: name.trim(), email: email.trim(), password, hostel: hostel.trim(), floors: selectedFloors });
    setName("");
    setEmail("");
    setPassword("");
    setHostel("");
    setSelectedFloors([]);
  };

  const isValid = name.trim() && email.trim() && password.trim() && hostel.trim();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create Resident Counsellor
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Add a new RC account to the system
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Anitha Kumar"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#022B60] focus:ring-1 focus:ring-[#022B60]/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. anitha@college.ac.in"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#022B60] focus:ring-1 focus:ring-[#022B60]/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set account password"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pr-11 text-sm outline-none transition focus:border-[#022B60] focus:ring-1 focus:ring-[#022B60]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Hostel */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Hostel
            </label>
            <select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#022B60] focus:ring-1 focus:ring-[#022B60]/20"
            >
              <option value="" disabled>Select hostel</option>
              {HOSTELS.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          {/* Floors */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Assigned Floors
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FLOORS.map((f) => {
                const active = selectedFloors.includes(f.value);
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => toggleFloor(f.value)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? "border-[#022B60] bg-[#022B60] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#022B60]/50 hover:text-[#022B60]"
                    }`}
                  >
                    <span className="font-bold">{f.short}</span>
                    <span className={active ? "text-white/80" : "text-slate-500"}>
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
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
            onClick={handleSubmit}
            disabled={!isValid}
            className="rounded-xl bg-[#022B60] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#033c84] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create RC Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRCModal;
