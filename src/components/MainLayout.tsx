import { SidebarProvider, useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import RoleBasedSidebar from "./RoleBasedSidebar";

function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  // state: "expanded" | "collapsed"
  return (
    <div
      className="flex-1 flex flex-col transition-all duration-200"
      style={{
        marginLeft: state === "expanded" ? "6rem" : "0rem", // match SIDEBAR_WIDTH and SIDEBAR_WIDTH_ICON
      }}
    >
    <div className="text-2xl">
      <SidebarTrigger className="w-8 h-8" />
    </div>
      <main className="flex-1 ">{children}</main>
    </div>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <RoleBasedSidebar />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}