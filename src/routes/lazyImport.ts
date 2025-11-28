import { lazy } from "react";
 

export const Dashboard = lazy(() =>
  import("@/pages/admin/users/LandingPage")
);