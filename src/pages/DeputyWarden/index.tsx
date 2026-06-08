import { useNavigate } from "react-router";
import {
  ClipboardCheck,
  ShieldCheck,
  TriangleAlert,
  Users,
  CalendarCheck,
  FileClock,
  BedDouble,
} from "lucide-react";
import DashboardCard from "@/components/deputyWarden/DashboardCard";

const DeputyWardenDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Admission Verification",
      icon: <ClipboardCheck size={32} />,
      route: "/DeputyWarden/AdmissionVerification",
    },
    {
      title: "Verifications",
      icon: <ShieldCheck size={32} />,
      route: "/DeputyWarden/Verifications",
    },
    {
      title: "Grievances",
      icon: <TriangleAlert size={32} />,
      route: "/DeputyWarden/Grievances",
    },
    {
      title: "RC Management",
      icon: <Users size={32} />,
      route: "/DeputyWarden/RCManagement",
    },
    {
      title: "Attendance Reports",
      icon: <CalendarCheck size={32} />,
      route: "/DeputyWarden/AttendanceReports",
    },
    {
      title: "RC Leave Approvals",
      icon: <FileClock size={32} />,
      route: "/DeputyWarden/RcLeave",
    },
    {
      title: "View Room Data",
      icon: <BedDouble size={32} />,
      route: "/DeputyWarden/Rooms",
    },
  ];

return (
  <div className="min-h-screen bg-slate-50 p-6">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#022B60]">
        Deputy Warden Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Hostel administration and verification portal
      </p>
    </div>

    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Admissions
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#022B60]">
          0
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Grievances
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#022B60]">
          0
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          RCs
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#022B60]">
          0
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Rooms
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#022B60]">
          0
        </h2>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {modules.map((module) => (
        <DashboardCard
          key={module.title}
          title={module.title}
          icon={module.icon}
          onClick={() => navigate(module.route)}
        />
      ))}
    </div>
  </div>
);
};

export default DeputyWardenDashboard;