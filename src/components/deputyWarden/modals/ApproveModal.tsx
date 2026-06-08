import { useState } from "react";

interface RejectModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const RejectModal = ({
  open,
  title = "Reject Request",
  onClose,
  onSubmit,
}: RejectModalProps) => {
  const [reason, setReason] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-[#022B60]">
          {title}
        </h2>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          className="h-40 w-full resize-none rounded-2xl border border-slate-300 p-4 outline-none focus:border-[#022B60]"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setReason("");
              onClose();
            }}
            className="rounded-xl border border-slate-300 px-5 py-2 font-medium text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;