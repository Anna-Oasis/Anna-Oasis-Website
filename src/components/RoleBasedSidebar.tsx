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
import { getToken, verifyToken } from "@/utils/auth/authUtil";
import LogoutModal from "@/components/LogoutModal";
import { removeToken } from "@/utils/auth/authUtil";
import useUserStore from "@/stores/userStore";


const studentLinks = [
  { label: "Admission", path: "/User/Student/admission" },
  { label: "Details", path: "/User/Student/details" },
];
const managerLinks = [
  { label: "Payment Verification", path: "/Manager/PaymentVerification" },
  { label: "Grievances", path: "/Manager/Grievances" },
  { label: "Student Details", path: "/Manager/Details" },
  { label: "Attendance", path: "/Manager/Attendance" },
  { label: "Vacating Hostel", path: "/Manager/VacatingHostel" },
  { label: "Declaration", path: "/Manager/Declaration" },
  { label: "Admission Verification", path: "/Manager/Verification/AdmissionVerification" },
  { label: "Admission Approvals", path: "/Manager/AdmissionApproval" }
];
const rcLinks = [
  { label: "Room Allocation", path: "/RC/RoomAllocation" },
];
const deputyWardenLinks = [
  { label: "Admission Verification", path: "/DeputyWarden/Verification/AdmissionVerification" },
];

function getLinksByRole(role: string) {
  switch (role) {
    case "student":
      return studentLinks;
    case "manager":
      return managerLinks;
    case "rc":
      return rcLinks;
    case "DeputyWarden":
      return deputyWardenLinks;
    default:
      return [];
  }
}

export default function RoleBasedSidebar() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [_user, setUser] = useState<any>(null);
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
          <div className="flex items-center gap-2 p-4">
            <div className="animate-pulse bg-gray-300 rounded-full w-10 h-10" />
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          </div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  const links = getLinksByRole(role);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full shadow"
          />
          <div>
            <div className="font-bold text-lg tracking-wide">Anna Oasis</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase tracking-wider text-xs text-gray-400 mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.path}>
                <SidebarMenuButton
                  className="transition-all duration-200 rounded-lg px-4 py-2 font-medium hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-200"
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
          <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="transition-all duration-200 rounded-lg px-4 py-2 font-medium hover:bg-red-100 hover:text-red-700 focus:bg-red-200 flex items-center gap-2"
                onClick={() => setLogoutOpen(true)}
              >
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </Sidebar>
  );
}