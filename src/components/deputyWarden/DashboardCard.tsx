import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

const DashboardCard = ({
  title,
  icon,
  onClick,
}: DashboardCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex h-40 w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="text-[#022B60]">
          {icon}
        </div>

        <ArrowRight
          size={18}
          className="text-slate-400 transition group-hover:translate-x-1"
        />
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>
    </button>
  );
};

export default DashboardCard;