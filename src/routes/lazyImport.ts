import { lazy } from "react";
 

export const Dashboard = lazy(() =>
  import("@/pages/admin/users/LandingPage")
);
export const ServicePointListing = lazy(() =>
  import("@/pages/admin/users/servicePoints/servicePointListing/servicePointListingContainer")
);
export const ServicePointDetails = lazy(() =>
  import("@/pages/admin/users/servicePoints/servicePointDetails")
);
