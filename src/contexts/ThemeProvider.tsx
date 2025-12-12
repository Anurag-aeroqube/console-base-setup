import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark-1" | "dark-2" | "dark-3" |"dark-recommended";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;

    const validThemes: Theme[] = ["light", "dark-1", "dark-2" , "dark-3" ,"dark-recommended"];

    return savedTheme && validThemes.includes(savedTheme)
      ? savedTheme
      : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

   
    root.classList.remove("light", "dark-1","dark-2","dark-3", "dark-recommended");


    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
