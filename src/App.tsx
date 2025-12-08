import { Outlet } from "react-router-dom";
import { RBACProvider } from "@/contexts/RBACContext";
import AutoTranslateProvider from "./contexts/AutoTranslateProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";

const mockUser = {
  id: "1",
  email: "anurag@example.com",
  fullName: "Anurag Dev",
  avatar_url: "",
  roles: ["admin"],
  permissions: [
    "dashboard:view",
    "users:view",
    "roles:view",
  ],
};
 
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AutoTranslateProvider>
        <RBACProvider  user={mockUser} isLoading={false}>
        <div className="w-full ">
            <Outlet />
          </div>
        </RBACProvider>
      </AutoTranslateProvider>
     </ThemeProvider>
  );
}
 
export default App;