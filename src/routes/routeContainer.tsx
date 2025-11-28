import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Suspense } from "react";

import App from "../App";
import DashboardLayout from "@/pages/dashboard/dashboardLayout";
import { Dashboard } from "./lazyImports";
// import Loading from "./loading";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>

        <Route
          path="dashboard"
          element={
            // <Suspense fallback={<Loading />}>
              <DashboardLayout />
            // </Suspense>
          }
        >
          <Route
            index
            element={
              // <Suspense fallback={<Loading />}>
                <Dashboard />
              // </Suspense>
            }
          />
        </Route>

      </Route>
    </>
  )
);

export default router;
