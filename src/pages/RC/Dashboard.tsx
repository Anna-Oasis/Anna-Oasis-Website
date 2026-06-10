import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CalendarCheck, ClipboardList, HomeIcon, Loader2, User, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRCDetails, type RCDetails } from "@/utils/RC/rcDetailsApi";

const cards = [
  { title: "Room Allocation", description: "Assign rooms for approved admissions.", path: "/RC/RoomAllocation", icon: HomeIcon },
  { title: "Student Verification", description: "Review leave, grievance, vacation, and vacating requests.", path: "/RC/StudentVerification", icon: UsersIcon },
  { title: "Attendance", description: "Mark floor-wise attendance and review submission history.", path: "/RC/Attendance", icon: ClipboardList },
  { title: "Leave", description: "Apply for RC leave and review your leave history.", path: "/RC/ApplyForLeave", icon: CalendarCheck },
  { title: "Personal Details", description: "View or update your RC profile.", path: "/RC/Details", icon: User },
];

export default function RCDashboard() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<RCDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getRCDetails()
      .then((data) => {
        if (!mounted) return;
        setDetails(data);
        if (!data) {
          toast.info("Please fill your RC details first.");
          navigate("/RC/Details/Edit");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load RC details");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const assignedFloors = useMemo(() => {
    if (!details?.floor) return "Not assigned";
    const floors = details.floor;
    return Array.isArray(floors) && floors.length ? floors.join(", ") : "Not assigned";
  }, [details]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading RC dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase text-slate-500">Resident Counsellor</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{details?.name || "RC Dashboard"}</h1>
          <p className="mt-2 text-slate-600">Manage room allocation, verification, attendance, and leave from one web workspace.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Dept: {details?.dept || "Not filled"}</Badge>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Floors: {assignedFloors}</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.path)}
              className="rounded-lg border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#022B60] text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
            </button>
          );
        })}
      </div>

      {!details && (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          Your RC profile is missing. <Button className="ml-3" onClick={() => navigate("/RC/Details/Edit")}>Fill details</Button>
        </div>
      )}
    </div>
  );
}



