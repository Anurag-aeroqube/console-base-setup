import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideNavView from "./SideNavView";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import { useRBAC } from "@/contexts/RBACContext";
import type { PermissionString } from "@/types/rbac";
 
const SideNavContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { canAccess } = useRBAC();
  const { NAV } = LOCALIZATION_KEYS;
 
 const navLinks = [
    {
      label: t(NAV.DASHBOARD),
      href: "/dashboard",
      permission: "dashboard:view" as PermissionString,
    },
    {
      label: t(NAV.USERS),
      children: [
          {
          label: t(NAV.SERVICE_POINTS),
          href: "/users/service_points",
          permission: "users:view" as PermissionString,
        },
        {
          label: t(NAV.MANAGE_USERS),
          href: "/users/manage_users",
          permission: "users:view" as PermissionString,
        },
        {
          label: t(NAV.ROLES),
          href: "/users/roles",
          permission: "roles:view" as PermissionString,
        },
        
      ],
    },
  ];

  const filteredNavLinks = navLinks
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) =>
          canAccess(child.permission)
        );
        return filteredChildren.length > 0
          ? { ...item, children: filteredChildren }
          : null;
      }
      return item.permission && !canAccess(item.permission) ? null : item;
    })
.filter((item): item is NonNullable<typeof item> => item !== null)

  return (
    <SideNavView location={location} navigate={navigate} navLinks={filteredNavLinks} />
  );
};
 
export default SideNavContainer;