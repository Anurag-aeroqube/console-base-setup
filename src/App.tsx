import { Outlet } from "react-router-dom";
import AutoTranslateProvider from "./contexts/AutoTranslateProvider";

import { ThemeProvider } from "./contexts/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AutoTranslateProvider>
        <div className="w-full ">
          <Outlet />
        </div>
      </AutoTranslateProvider>
    </ThemeProvider>
  );
}

export default App;
