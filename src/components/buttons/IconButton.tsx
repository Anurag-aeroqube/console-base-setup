import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import type { Theme } from "@/contexts/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const options: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
    { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
    { value: "dark-1", label: "Dark - 1", icon: <Moon className="h-4 w-4" /> },
    { value: "dark-2", label: "Dark - 2", icon: <Moon className="h-4 w-4" /> },
    { value: "dark-3", label: "Dark - 3", icon: <Moon className="h-4 w-4" /> },
    { value: "dark-recommended", label: "Dark (Recommended)", icon: <Moon className="h-4 w-4" /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          {theme === "light" && <Sun className="h-5 w-5" />}
          {theme !== "light" && <Moon className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {options.map((opt) => (
          <DropdownMenuItem key={opt.value} onClick={() => setTheme(opt.value)} className="bg-background">
            <span className="mr-2">{opt.icon}</span>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
