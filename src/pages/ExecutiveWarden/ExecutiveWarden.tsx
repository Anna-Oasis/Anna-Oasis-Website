import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ClipboardCheck,
  FileText,
  Briefcase,
  Users,
  Home,
  LayoutDashboard,
} from "lucide-react";

export default function EWDashboard() {
  const navigate = useNavigate();

  const links = [
    {
      label: "Admission Session",
      description:
        "Configure timelines and activate registration frameworks for entry batches.",
      path: "/ExecutiveWarden/admission-session",
      icon: Calendar,
    },
    {
      label: "Admission Verification",
      description:
        "Oversee top-level student admission verification status across modules.",
      path: "/ExecutiveWarden/admission-verification/all/2026",
      icon: ClipboardCheck,
    },
    {
      label: "Declaration",
      description:
        "Publish and modify official rules, mandates, and declaration documents.",
      path: "/ExecutiveWarden/declaration",
      icon: FileText,
    },
    {
      label: "RC Leave",
      description:
        "Review and approve temporary leave submissions from Resident Counselors.",
      path: "/ExecutiveWarden/rc-leave",
      icon: Briefcase,
    },
    {
      label: "RC Management",
      description:
        "Manage tracking, assignments, and structural logs of Resident Counselors.",
      path: "/ExecutiveWarden/rc-management",
      icon: Users,
    },
    {
      label: "Rooms",
      description:
        "Review capacity maps, room inventory tallies, and hostel blocks.",
      path: "/ExecutiveWarden/rooms",
      icon: Home,
    },
  ];

  return (
    <div className="flex-1 bg-background text-foreground p-6 md:p-10 min-h-screen">
      {/* Upper Header Frame Block */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full">
            Executive Control
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-foreground">
          Executive Warden Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Central gateway to oversee broad residential operations and global
          configurations.
        </p>
      </div>

      {/* Grid Dashboard Action Block */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="group bg-card text-card-foreground border border-border rounded-lg p-6 text-left shadow-sm hover:shadow-md hover:border-ring/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center border border-border group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mt-4 group-hover:text-muted-foreground transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {link.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-muted-foreground group-hover:text-foreground gap-1 transition-colors">
                Launch View{" "}
                <span className="transform group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
