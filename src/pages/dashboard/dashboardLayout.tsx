// DashboardLayout.tsx
import SideNavContainer from "@/pages/sidenav/sideNavContainer";
import Header from "@/components/layout/header"; // Import header
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <SideNavContainer />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}