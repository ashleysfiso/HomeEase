import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutUsPage";
import Register, { action as registerAction } from "./pages/account/Register";
import ServiceBookingPage from "./pages/ViewBookings";
import Login from "./pages/account/Login";
import { action as loginAction } from "./pages/account/Login";
import FileNotFound from "./pages/404Page";
import ServicesErrorPage from "./pages/ServicesErrorPage";
import CleaningBookingPage, {
  action as bookingAction,
} from "./pages/CleaningBookingPage";
import BookingPage from "./pages/BookingPage";
import { requireAuth } from "./utils";
import BExample from "./pages/BExample";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <ServiceBookingPage />,
      },
      {
        path: "services/booking/:sId/:spId",
        element: <BookingPage />,
        action: bookingAction,
        loader: requireAuth,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/Be",
    element: <BExample />,
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
  return <RouterProvider router={router} />;
}

export default App;
