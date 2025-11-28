import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex fixed  right-52 gap-4 p-4">
      <Button
        className="px-4 py-2 bg-foreground text-background cursor-pointer rounded"
        onClick={() => i18n.changeLanguage("en")}
      >
        English
      </Button>

      <Button
        className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded"
        onClick={() => i18n.changeLanguage("hi")}
      >
        हिंदी
      </Button>
    </div>
  );
}
