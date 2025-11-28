import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SideNavContainer from '@/pages/sidenav/sideNavContainer';
import AppBar from './AppBar';
import FiltersBar from './FiltersBar';
import ListView from './ListView';
import PaginationFooter from './PaginationFooter';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* Left Navigation Bar */}
        <SideNavContainer />
        
        {/* Right Main Content Area */}
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          {/* App Bar */}
          <AppBar />
          
          {/* Filters And Other Actions */}
          <FiltersBar />
          
          {/* List View - Main Content */}
          <div className="flex-1 overflow-auto">
            <ListView />
          </div>
          
          {/* Footer - Pagination */}
          <PaginationFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

