/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getToken, verifyToken, removeToken } from "@/utils/auth/authUtil";

import LogoutModal from "@/components/LogoutModal";
import useUserStore from "@/stores/userStore";

const studentLinks = [
  { label: "Admission", path: "/User/Student/admission" },
  { label: "Details", path: "/User/Student/details" },
  { label: "Leave", path: "/User/Student/leave" },
  {
    label: "Summer Vacation",
    path: "/User/Student/summer-vacation",
  },
  {
    label: "Admission",
    path: "/User/Student/admission",
  },
  {
    label: "Details",
    path: "/User/Student/details",
  },
  {
    label: "Hostel Vacation",
    path: "/User/Student/HostelVacation",
  },
  {
    label: "Grievances",
    path: "/User/Student/Grievances",
  },
];

const managerLinks = [
  { label: "Payment Verification", path: "/Manager/PaymentVerfication" },
];

const rcLinks = [
  { label: "Dashboard", path: "/RC" },
  { label: "Room Allocation", path: "/RC/RoomAllocation" },
  { label: "Room List", path: "/RC/Rooms" },
  { label: "Students", path: "/RC/Students" },
  { label: "Leave Forms", path: "/RC/StudentVerification/LeaveForm" },
  { label: "Grievances", path: "/RC/StudentVerification/Grievances" },
  { label: "Summer Vacation", path: "/RC/StudentVerification/SummerVacation" },
  { label: "Vacating Hostel", path: "/RC/StudentVerification/VacatingHostel" },
  { label: "Attendance", path: "/RC/Attendance" },
  { label: "RC Leave", path: "/RC/ApplyForLeave" },
  { label: "Details", path: "/RC/Details" },
];

const deputyWardenLinks = [
  { label: "Dashboard", path: "/DeputyWarden" },
  { label: "Admissions", path: "/DeputyWarden/AdmissionVerification" },
  { label: "Verifications", path: "/DeputyWarden/Verifications" },
  { label: "Grievances", path: "/DeputyWarden/Grievances" },
  { label: "RC Management", path: "/DeputyWarden/RCManagement" },
  { label: "Attendance", path: "/DeputyWarden/AttendanceReports" },
  { label: "RC Leave", path: "/DeputyWarden/RcLeave" },
  { label: "Rooms", path: "/DeputyWarden/Rooms" },
];

const executiveWardenLinks = [
  { label: "Admission Session", path: "/ExecutiveWarden/admission-session" },
  {
    label: "Admission Verification",
    path: "/ExecutiveWarden/admission-verification/all/2026",
  },
  { label: "Declaration", path: "/ExecutiveWarden/declaration" },
  { label: "RC Leave", path: "/ExecutiveWarden/rc-leave" },
  { label: "RC Management", path: "/ExecutiveWarden/rc-management" },
  { label: "Rooms", path: "/ExecutiveWarden/rooms" },
];

function getLinksByRole(role: string) {
  switch (role) {
    case "student":
      return studentLinks;
    case "manager":
      return managerLinks;
    case "rc":
      return rcLinks;
    case "deputyWarden":
      return deputyWardenLinks;
    case "executiveWarden":
      return executiveWardenLinks;
    default:
      return [];
  }
}

export default function RoleBasedSidebar() {
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(null);
  const [_user, setUser] = useState<any | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const setDetails = useUserStore((state) => state.setDetails);

  const handleLogout = async () => {
    await removeToken();
    setDetails(null);
    navigate("/login");
  };

  useEffect(() => {
    async function fetchRole() {
      const token = await getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      const user = await verifyToken(token);
      setRole(user?.role || "student");
      setUser(user);
    }
    fetchRole();
  }, [navigate]);

  if (!role) {
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300" />
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-3 w-16 rounded bg-slate-100" />
            </div>
          </div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  const links = getLinksByRole(role);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 border-b border-slate-200 p-4">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-slate-800">Anna Oasis</h2>
              <p className="text-xs text-slate-500">Hostel Portal</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase tracking-wider text-xs text-slate-400">
              Navigation
            </SidebarGroupLabel>

            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(link.path)}
                    className="rounded-xl px-4 py-2 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-[#022B60]"
                  >
                    {link.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setLogoutOpen(true)}
                  className="rounded-xl px-4 py-2 font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
                >
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

<LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
