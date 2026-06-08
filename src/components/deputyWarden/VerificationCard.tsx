import type { ReactNode } from "react";

interface VerificationCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  onClick: () => void;
}

const VerificationCard = ({
  title,
  description,
  icon,
  onClick,
}: VerificationCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#022B60]/20 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#022B60] transition-colors duration-200 group-hover:bg-[#022B60] group-hover:text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};

export default VerificationCard;
