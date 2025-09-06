import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheckIcon,
  Users2Icon,
  FileCheck2Icon,
  PlayCircleIcon,
} from "lucide-react";

export default function ExecutiveWardenPage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Start Admission Session",
      route: "/ExecutiveWarden/AdmissionSession/ewAdmission",
      icon: PlayCircleIcon,
      color: "#022B60",
    },
    {
      title: "Admission Verification",
      route: "/ExecutiveWarden/AdmissionVerification",
      icon: ClipboardCheckIcon,
      color: "#022B60",
    },
    {
      title: "RC Management",
      route: "/ExecutiveWarden/RCManagement",
      icon: Users2Icon,
      color: "#022B60",
    },
    {
      title: "RC Leave Approvals",
      route: "/ExecutiveWarden/RcLeave",
      icon: FileCheck2Icon,
      color: "#022B60",
    },
    // {
    //   title: "Edit Declaration",
    //   route: "/ExecutiveWarden/Declaration",
    //   icon: FileEditIcon,
    //   color: "#022B60",
    // },
    {
      title: "View Room Details",
      route: "/ExecutiveWarden/Rooms",
      icon: Users2Icon,
      color: "#022B60",
    },
  ];

  return (
    <div className="h-screen bg-gray-50">
      <main className="p-6 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Executive Warden Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Button
                  key={idx}
                  onClick={() => navigate(item.route)}
                  className="h-40 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-12 h-12 text-white" />
                  <span className="mt-4 text-lg font-semibold text-white text-center px-2">
                    {item.title}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}