import { useNavigate } from "react-router";
import { CalendarDays, Clipboard, FileText, LogOut } from "lucide-react";

const cards = [
  {
    title: "Leave Form",
    route: "/RC/StudentVerification/LeaveForm",
    icon: Clipboard,
  },
  {
    title: "Grievances",
    route: "/RC/StudentVerification/Grievances",
    icon: FileText,
  },
  {
    title: "Summer Vacation",
    route: "/RC/StudentVerification/SummerVacation",
    icon: CalendarDays,
  },
  {
    title: "Vacating Hostel",
    route: "/RC/StudentVerification/VacatingHostel",
    icon: LogOut,
  },
];

export default function RCStudentVerificationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Student Verification</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.route)}
              className="flex h-40 flex-col items-center justify-center rounded-lg bg-[#022B60] p-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon className="h-9 w-9" />
              <span className="mt-3 text-lg font-medium">{card.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
