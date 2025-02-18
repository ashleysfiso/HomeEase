import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/AboutUs";
import Register, { action as registerAction } from "./pages/account/Register";
import ServiceBookingPage from "./pages/Bookings";
import Login from "./pages/account/Login";
import { action as loginAction } from "./pages/account/Login";
import FileNotFound from "./pages/404Page";
import ServicesErrorPage from "./pages/ServicesErrorPage";
import CleaningBookingPage, {
  action as bookingAction,
} from "./pages/CleaningBookingPage";
import { requireAuth } from "./utils";

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
        element: <Services />,
        errorElement: <ServicesErrorPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "bookings",
        element: <ServiceBookingPage />,
      },
      {
        path: "services/booking/:sId/:spId",
        element: <CleaningBookingPage />,
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
