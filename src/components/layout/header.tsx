import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import ThemeButton from "@/contexts/ThemeButton";
import LanguageSwitcher from "@/i18n/languageSwitcher";
import { GiHamburgerMenu } from "react-icons/gi";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";


interface User {
  fullName?: string;
  email?: string;
  role?: string;
  avatar_url?: string;
}

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { open } = useSidebar();
  const { t } = useTranslation();
    const { NAV } = LOCALIZATION_KEYS;

  const currentPath =
    location.pathname.split("/")[2]?.toLowerCase() ??
    location.pathname.split("/")[1]?.toLowerCase() ??
    "";

  const displayTitle = currentPath.replace(/-/g, " ");

  const defaultUser: User = {
    fullName: "Apparent",
    email: "anuragm@aeroqube.com",
    role: "Admin",
    avatar_url:
      "https://bmp-profileimages.s3.us-east-2.amazonaws.com/1756881469346-avatar.jpg",
  };

  const userData = user || defaultUser;

  const getInitials = (fullName?: string) => {
    if (!fullName) return "A";
    const parts = fullName.trim().split(" ");
    return parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="2xl:h-[6vh] h-[10vh] border-b flex items-center justify-between px-6 sticky top-0 z-10 ">
  <p className="text-[28px] font-bold capitalize">
  {displayTitle !== "404"
    ? t(`nav.${displayTitle}`) || t(LOCALIZATION_KEYS.COMMON.COMING_SOON)
    : t(LOCALIZATION_KEYS.COMMON.COMING_SOON)}
</p>

      <div className="flex items-center gap-3">
        <ThemeButton />
        <LanguageSwitcher />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 items-center border rounded-md py-1 px-2 cursor-pointer ">
            <div>
              {userData?.avatar_url ? (
                <img
                  className="size-7 rounded-full object-cover"
                  src={userData.avatar_url}
                  alt="Avatar"
                />
              ) : (
                <div className="size-7 rounded-full uppercase bg-charcoal text-white flex items-center justify-center">
                  {getInitials(userData.fullName)}
                </div>
              )}
            </div>

            <span
              className="capitalize max-w-[150px] truncate"
              title={userData.fullName}
            >
              {userData.fullName ??
                userData.email?.split("@")[0] ??
                "User"}
            </span>

         
           <GiHamburgerMenu className="text-lg" />
          
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52 z-10 mr-5">
          <DropdownMenuLabel className=" text-[16px]">
            My Account
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className=" text-base">
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 text-base cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
