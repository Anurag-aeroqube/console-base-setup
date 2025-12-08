
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 " />
      ) : (
        <Sun className="h-5 w-5 " />
      )}
    </Button>
  );
}
