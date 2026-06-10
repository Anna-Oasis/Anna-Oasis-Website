import { useNavigate } from "react-router";
import { Clipboard, CalendarDays, LogOut } from "lucide-react";
import VerificationCard from "@/components/deputyWarden/VerificationCard";

const DeputyWardenVerificationsPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Leave Form",
      icon: <Clipboard size={32} />,
      route: "/DeputyWarden/Verifications/Leave",
    },
    {
      title: "Summer Vacation",
      icon: <CalendarDays size={32} />,
      route: "/DeputyWarden/Verifications/SummerVacation",
    },
    {
      title: "Vacating Hostel",
      icon: <LogOut size={32} />,
      route: "/DeputyWarden/Verifications/VacatingHostel",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <VerificationCard
            key={card.title}
            title={card.title}
            icon={card.icon}
            onClick={() => navigate(card.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeputyWardenVerificationsPage;
