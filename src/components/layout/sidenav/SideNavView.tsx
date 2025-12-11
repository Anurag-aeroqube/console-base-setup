"use client";
 
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Location, NavigateFunction } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
// import logo from "@/assets/images/logos/logo.png";


 
interface NavLink {
  label: string;
  href?: string;
  permission?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    permission?: string;
  }[];
}
 
interface SideNavViewProps {
  location: Location;
  navigate: NavigateFunction;
  navLinks: NavLink[];
}
 
export default function SideNavView({
  location,
  navigate,
  navLinks,
}: SideNavViewProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string | null>(null);
 
  const toggle = (label: string) => {
    setOpen(prev => (prev === label ? null : label));
  };
 
  return (
    <Sidebar className=" border-r flex flex-col">
      {/* <div className=" flex items-center w-[70%] 2xl:h-[10vh] h-[16vh]  mx-auto ">
        <img src={logo} alt="logo" className="w-40" />
      </div> */}
      <SidebarContent className="pt-4">
        <SidebarMenu className="flex flex-col gap-1">
 
          {navLinks.map((item, i) => {
            const isActive = location.pathname.includes(item.href ?? "");
            const isOpen = open === item.label;
 
            return (
              <SidebarMenuItem key={i}>
                {item.children ? (
                  <>
                    <SidebarMenuButton
                      onClick={() => toggle(item.label)}
                      className={cn(
                        "flex justify-between items-center px-6 py-2 w-[80%] mx-auto rounded-md font-medium text-base",
                        " cursor-pointer",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {item.label}
                      </div>
 
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4 transition" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition" />
                      )}
                    </SidebarMenuButton>
 
                    {isOpen && (
                      <SidebarMenuSub className="ml-6 mt-1 flex flex-col gap-1 pl-3 border-l border-gray-300">
                        {item.children.map((child, j) => {
                          const activeChild = location.pathname.includes(child.href);
 
                          return (
                            <SidebarMenuSubButton
                              key={j}
                              isActive={activeChild}
                              onClick={() => navigate(child.href)}
                              className={cn(
                                "px-2 py-2 rounded text-sm flex gap-3 h-auto cursor-pointer  font-medium",
                                activeChild
                                  ? "bg-[#f9fafb]"
                                  : "text-[#344054] "
                              )}
                            >
                              {child.icon}
                              {child.label}
                            </SidebarMenuSubButton>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={item.onClick ?? (() => navigate(item.href ?? "#"))}
                    className={cn(
                      "flex items-center gap-3 px-6 py-2 rounded-md w-[80%] mx-auto cursor-pointer font-medium text-[15px]",
                      isActive
                        ? "bg-[#f9fafb] text-[#101828]"
                        : "text-gray-700 "
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
 
        </SidebarMenu>
      </SidebarContent>
 
      <SidebarFooter className="p-4 border-t mt-auto">
        <SidebarMenuButton
          onClick={() => navigate("/")}
          className="flex justify-center items-center gap-3 px-6 py-2  hover:bg-accent cursor-pointer"
        >
       {t(LOCALIZATION_KEYS.COMMON.LOGOUT)}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}