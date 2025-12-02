import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { IoLanguage } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

export default function LanguageSwitcherButton() {
  const { i18n } = useTranslation();

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="flex items-center gap-2 cursor-pointer">
          <IoLanguage className="h-5 w-5" />
          <span className="text-sm font-medium">
            {
              LANGUAGES.find(l => l.code === i18n.language)?.label ||
              "Language"
            }
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLang(lang.code)}
            className="cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
