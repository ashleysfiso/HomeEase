import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import "@fontsource/montserrat";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <div style={{ fontFamily: "Montserrat, sans-serif" }}>
          <App />
        </div>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
