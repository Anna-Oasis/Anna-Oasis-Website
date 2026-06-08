import { useNavigate } from "react-router";
import { Plane, Umbrella, LogOut } from "lucide-react";
import VerificationCard from "@/components/deputyWarden/VerificationCard";

const DeputyWardenVerificationsPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Leave Form",
      description: "Review and approve student leave requests",
      icon: <Plane size={22} />,
      route: "/DeputyWarden/Verifications/Leave",
    },
    {
      title: "Summer Vacation",
      description: "Approve student summer vacation forms",
      icon: <Umbrella size={22} />,
      route: "/DeputyWarden/Verifications/SummerVacation",
    },
    {
      title: "Vacating Hostel",
      description: "Process hostel vacating requests",
      icon: <LogOut size={22} />,
      route: "/DeputyWarden/Verifications/VacatingHostel",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          Verifications
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all verification workflows
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <VerificationCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={() => navigate(card.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeputyWardenVerificationsPage;
