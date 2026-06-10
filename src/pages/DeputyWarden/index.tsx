import { useNavigate } from "react-router";
import {
  FilePlus,
  ClipboardList,
  FileText,
  Users,
  BarChart2,
  FileClock,
  BedDouble,
} from "lucide-react";
import DashboardCard from "@/components/deputyWarden/DashboardCard";

const DeputyWardenDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Admission Verification",
      icon: <FilePlus size={32} />,
      route: "/DeputyWarden/AdmissionVerification",
    },
    {
      title: "Verifications",
      icon: <ClipboardList size={32} />,
      route: "/DeputyWarden/Verifications",
    },
    {
      title: "Grievances",
      icon: <FileText size={32} />,
      route: "/DeputyWarden/Grievances",
    },
    {
      title: "RC Management",
      icon: <Users size={32} />,
      route: "/DeputyWarden/RCManagement",
    },
    {
      title: "Attendance Reports",
      icon: <BarChart2 size={32} />,
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
    <div className="min-h-screen bg-white p-4">
      <div className="grid grid-cols-2 gap-4">
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
