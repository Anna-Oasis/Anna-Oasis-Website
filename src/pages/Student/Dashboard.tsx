import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Home,
  MessageSquare,
  User,
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const links = [
    {
      label: "Admission",
      description:
        "Submit and manage your hostel admission application.",
      path: "/User/Student/admission",
      icon: FileText,
    },
    {
      label: "Details",
      description:
        "View and update your personal and hostel details.",
      path: "/User/Student/details",
      icon: User,
    },
    {
      label: "Leave",
      description:
        "Apply for leave and track approval status.",
      path: "/User/Student/leave",
      icon: Calendar,
    },
    {
      label: "Summer Vacation",
      description:
        "Submit summer vacation requests and view history.",
      path: "/User/Student/summer-vacation",
      icon: Calendar,
    },
    {
      label: "Hostel Vacation",
      description:
        "Apply for hostel vacating and caution deposit processing.",
      path: "/User/Student/HostelVacation",
      icon: Home,
    },
    {
      label: "Grievances",
      description:
        "Raise complaints and monitor grievance resolution.",
      path: "/User/Student/Grievances",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex-1 bg-background text-foreground p-6 md:p-10 min-h-screen">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full">
            Student Portal
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mt-2">
          Student Dashboard
        </h1>

        <p className="text-muted-foreground mt-1">
          Access all hostel-related services from one place.
        </p>
      </div>

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
                <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center border border-border">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold mt-4">
                  {link.label}
                </h3>

                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {link.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-semibold gap-1">
                Launch View →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}