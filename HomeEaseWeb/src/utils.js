import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export function requireAuth() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    console.log("Do give access");
    throw redirect("/login");
  }
}
