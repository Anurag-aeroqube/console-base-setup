import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideNavView from "./SideNavView";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
 
const SideNavContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
 
  const { NAV } = LOCALIZATION_KEYS;
 
  const navLinks = [
    {
      label: t(NAV.DASHBOARD),
      href: "/dashboard",
    },
    {
      label: t(NAV.USERS),
      children: [
        { label: t(NAV.MANAGE_USERS), href: "/dashboard/users" },
        { label: t(NAV.ROLES), href: "/dashboard/roles" },
      ],
    },
  ];
 
  return (
    <SideNavView location={location} navigate={navigate} navLinks={navLinks} />
  );
};
 
export default SideNavContainer;