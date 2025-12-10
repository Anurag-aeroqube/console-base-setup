import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SideNavContainer from "@/components/layout/sidenav/SideNavContainer";
import AppBar from "./AppBar";

export default function AdminLayout() {
  return (
    <SidebarProvider
  style={
    {
      "--sidebar-width": "240px",
    
    } as React.CSSProperties
  }
  >
      <div className="flex w-full h-screen">    
       <SideNavContainer />
        <SidebarInset className=" flex flex-col overflow-hidden">
          <AppBar />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
