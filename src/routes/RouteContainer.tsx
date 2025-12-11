import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Suspense } from "react";
 
import App from "../App";
import AdminLayout from "@/components/layout/AdminLayout";
import { Dashboard, ServicePointListing,ServicePointDetails} from "./lazyImport";
import { Loader } from "@/components/Loader";

      
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
 
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
         
            <Route path="service_points" element={<ServicePointListing />} />
                <Route path="service_points/details" element={<ServicePointDetails />} />
      

        </Route>
 
      </Route>
    </>
  )
);
 
export default router;