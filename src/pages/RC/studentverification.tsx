import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  {
    title: "Summer Vacation",
    path: "/RC/StudentVerification/summervacation",
    description: "Student summer vacation form verification.",
  },
  {
    title: "Hostel Vacation",
    path: "/RC/StudentVerification/hostelvacation",
    description: "Student hostel vacation form verification.",
  },
  {
    title: "Leave Form",
    path: "/RC/StudentVerification/leaveform",
    description: "Student leave form verification.",
  },
  {
    title: "Grievances",
    path: "/RC/StudentVerification/grievances",
    description: "Student grievances form verification.",
  },
];

const Tile: React.FC<{
  title: string;
  description: string;
  onClick: () => void;
}> = ({ title, description, onClick }) => (
  <div
    tabIndex={0}
    role="button"
    aria-label={title}
    onClick={onClick}
    onKeyPress={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    }}
    className="cursor-pointer border border-gray-200 rounded-2xl p-8 min-w-[220px] max-w-xs bg-gradient-to-br from-slate-50 to-indigo-100 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col items-start outline-none focus:ring-2 focus:ring-indigo-400"
  >
    <h2 className="mb-4 text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-gray-600 text-base">{description}</p>
  </div>
);

function RCStudentVerificationPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto my-12 p-4 md:p-8 bg-gradient-to-br from-slate-100 to-indigo-100 rounded-3xl shadow-lg">
      <h1 className="text-center mb-10 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-wide">
        Student Verification
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center items-stretch">
        {tiles.map((tile) => (
          <Tile
            key={tile.title}
            title={tile.title}
            description={tile.description}
            onClick={() => navigate(tile.path)}
          />
        ))}
      </div>
    </div>
  );
}

export default RCStudentVerificationPage;
