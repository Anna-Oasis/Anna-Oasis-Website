import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  ShieldAlert,
  FileCheck,
  UserCheck,
  LayoutDashboard,
} from "lucide-react";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const links = [
    {
      label: "Payment Verification",
      description: "Review and verify pending student hostel fee deposits.",
      path: "/Manager/PaymentVerifications",
      icon: CreditCard,
    },
    {
      label: "Caution Deposit",
      description:
        "Process refunds and adjustment clearances for vacating students.",
      path: "/Manager/CautionDeposit",
      icon: ShieldAlert,
    },
    {
      label: "Grievances",
      description:
        "Track, inspect, and mark active student complaints as resolved.",
      path: "/Manager/Grievances",
      icon: FileCheck,
    },
    {
      label: "Profile Verification",
      description: "Audit pending student profile edits and credentials.",
      path: "/Manager/ProfileVerifications",
      icon: UserCheck,
    },
  ];

  return (
    <div className="flex-1 bg-background text-foreground p-6 md:p-10 min-h-screen">
      {/* Upper Header Frame Block */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full">
            Hostel Manager
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-foreground">
          Manager Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Select an administration category below to review active records.
        </p>
      </div>

      {/* Grid Dashboard Action Block */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                Open Queue{" "}
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
