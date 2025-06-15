import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Dashboard from "./Layouts/Dashboard";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutUsPage";
import Register, { action as registerAction } from "./pages/account/Register";
import ServiceBookingPage from "./pages/ViewBookings";
import Login from "./pages/account/Login";
import { action as loginAction } from "./pages/account/Login";
import FileNotFound from "./pages/404Page";
import ServicesErrorPage from "./pages/ServicesErrorPage";
import BookingPage, { action as bookingAction } from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import BookingSuccess from "./pages/BookingSuccess";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import { ProviderDashboard } from "./pages/dashboard/ProviderDashboard";
import { ManageProvidersPage } from "./pages/dashboard/ManageProvidersPage";
import { ManageServicesPage } from "./pages/dashboard/ManageServicesPage";
import { ManageBookingsPage } from "./pages/dashboard/ManageBookingsPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { requireAuth } from "./utils";
import { checkUserRole } from "./utils";
import { action as ManageServiceAction } from "./pages/dashboard/ManageServicesPage";
import BecomeProviderPage from "./pages/BecomeProviderPage";
import { action as BecomeProviderAction } from "./pages/BecomeProviderPage";
import BecomeProviderSuccessPage from "./pages/BecomeProviderSuccessPage";
import MyServices from "./pages/dashboard/MyServicesPage";
import MyBookings from "./pages/dashboard/MyBookingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: checkUserRole,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "services",
        element: <ServicesPage />,
        errorElement: <ServicesErrorPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "services/booking/:sId/:spId",
        element: <BookingPage />,
        action: bookingAction,
        loader: requireAuth,
      },
      {
        path: "services/booking/success",
        element: <BookingSuccess />,
        loader: requireAuth,
      },
      {
        path: "becomeaprovider",
        element: <BecomeProviderPage />,
        action: BecomeProviderAction,
      },
      {
        path: "becomeaprovider/success",
        element: <BecomeProviderSuccessPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "provider",
        element: <ProviderDashboard />,
      },
      {
        path: "manage-service-providers",
        element: <ManageProvidersPage />,
      },
      {
        path: "manage-services",
        element: <ManageServicesPage />,
        action: ManageServiceAction,
      },
      {
        path: "manage-bookings",
        element: <ManageBookingsPage />,
      },
      {
        path: "my-services",
        element: <MyServices />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "*",
    element: <FileNotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
