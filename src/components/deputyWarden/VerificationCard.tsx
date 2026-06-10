import type { ReactNode } from "react";

interface VerificationCardProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

const VerificationCard = ({ title, icon, onClick }: VerificationCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-44 w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[#022B60] p-6 text-center text-white transition-all duration-200 hover:brightness-110 active:scale-95"
    >
      <div className="text-white">{icon}</div>
      <h3 className="text-base font-semibold leading-tight text-white">{title}</h3>
    </button>
  );
};

export default VerificationCard;
