import { useLocation, useNavigate } from "react-router-dom";
// import { useSidebar } from "@/components/ui/sidebar";
import ThemeButton from "@/components/buttons/IconButton";
import LanguageSwitcher from "@/components/buttons/IconAndLabelButton";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useRBAC } from "@/contexts/RBACContext";
import { LOCALIZATION_KEYS } from "@/i18n/keys";

export default function Header() {
  const { user } = useRBAC();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const { NAV } = LOCALIZATION_KEYS;

function getPageTitle(pathname: string, t: any): string {
  const segments = pathname.split("/").filter(Boolean);

  // Special cases
  const specialMap: Record<string, string> = {
    "/dashboard": t("nav.dashboard"), // example for headerName on the basis of url
  };

  if (specialMap[pathname]) return specialMap[pathname];

  // Generic page title formatting
  // ignore segment[0] = dashboard
  const parent = segments[1] || "";
  const child = segments[2] || "";

  const format = (txt: string) =>
    txt
      .replace(/-|_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const translateOrFormat = (key: string) =>
    t(`nav.${key}`, { defaultValue: format(key) });

  if (parent && child) return `${translateOrFormat(parent)} ${translateOrFormat(child)}`;
  if (parent) return translateOrFormat(parent);

  return t("nav.dashboard", { defaultValue: "Dashboard" });
}


const displayTitle = getPageTitle(location.pathname, t);



  const userData = user || {
    fullName: "Apparent",
    email: "app@sample.com",
    role: "Admin",
    avatar_url: "",
  };

  const getInitials = (name?: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "A";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="2xl:h-[6vh] h-[10vh] border-b  flex items-center justify-between px-6 sticky top-0 z-10">
      <p className="text-xl font-bold capitalize">
       {displayTitle}
      </p>

      <div className="flex gap-5 items-center">
        <ThemeButton />
        <LanguageSwitcher />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 items-center border rounded-md py-1 px-2 cursor-pointer">
                {userData.avatar_url ? (
                  <img
                    className="size-7 rounded-full object-cover"
                    src={userData.avatar_url}
                  />
                ) : (
                  <div className="size-7 rounded-full  border bg-primary flex items-center justify-center">
                    {getInitials(userData.fullName)}
                  </div>
                )}

                <span className="capitalize max-w-[150px] truncate">
                  {userData.fullName ?? userData.email?.split("@")[0] ?? "User"}
                </span>

                <GiHamburgerMenu className="text-lg" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52 mr-5 bg-accent">
              <DropdownMenuLabel>{t(LOCALIZATION_KEYS.COMMON.MY_ACCOUNT)}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t(LOCALIZATION_KEYS.COMMON.SETTINGS)}</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                {t(LOCALIZATION_KEYS.COMMON.LOGOUT)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
