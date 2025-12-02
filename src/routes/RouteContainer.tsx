import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Suspense } from "react";
 
import App from "../App";
import AdminLayout from "@/components/layout/AdminLayout";
import { Dashboard } from "./lazyImport";
// import Loading from "./loading";

      
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
 
        <Route
          path="dashboard"
          element={
            // <Suspense fallback={<Loading />}>
              <AdminLayout />
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