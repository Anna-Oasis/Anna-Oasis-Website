import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import RoleBasedSidebar from "./RoleBasedSidebar";

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 w-12 h-12 p-2" />
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <RoleBasedSidebar />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
