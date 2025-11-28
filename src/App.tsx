import { Outlet } from "react-router-dom";
import { RBACProvider } from "@/contexts/RBACContext";
// import AutoTranslateProvider from "./contexts/AutoTranslateProvider";
 
// import { ThemeProvider } from "./contexts/ThemeProvider";
 
function App() {
  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    //   <AutoTranslateProvider>
        <RBACProvider user={null} isLoading={false}>
        <div className="w-full ">
            <Outlet />
          </div>
        </RBACProvider>
    //   </AutoTranslateProvider>
    // </ThemeProvider>
  );
}
 
export default App;