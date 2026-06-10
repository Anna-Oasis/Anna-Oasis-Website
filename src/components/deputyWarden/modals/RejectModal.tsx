/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, X } from "lucide-react";

interface ApprovalCardProps {
  title: string;
  subTitle: string;
  badge?: React.ReactNode;
  onApprove: () => void;
  onDecline: () => void;
  data?: any;
}

const ApprovalCard = ({
  title,
  subTitle,
  badge,
  onApprove,
  onDecline,
}: ApprovalCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-slate-500 mt-1">
            {subTitle}
          </p>
        </div>

        {badge}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onApprove}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
        >
          <Check size={18} />
          Approve
        </button>

        <button
          onClick={onDecline}
          className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
        >
          <X size={18} />
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;