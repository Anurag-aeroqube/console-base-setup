import { Button } from "@/components/ui/button";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">

      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4 mr-1" />
        Light
      </Button>

      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4 mr-1" />
        Dark
      </Button>

      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4 mr-1" />
        System
      </Button>

    </div>
  );
}
