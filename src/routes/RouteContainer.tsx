import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// import { Suspense } from "react";
 
import App from "../App";
import AdminLayout from "@/components/layout/AdminLayout";
import { Dashboard, ServicePointListing,ServicePointDetails} from "./lazyImport";
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
         
            <Route path="service_points" element={<ServicePointListing />} />
                <Route path="service_points/details" element={<ServicePointDetails />} />
      

        </Route>
 
      </Route>
    </>
  )
);
 
export default router;