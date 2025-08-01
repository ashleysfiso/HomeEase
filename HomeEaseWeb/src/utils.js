import { redirect } from "react-router-dom";
import axios from "axios";

export function requireAuth() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    //console.log("Do give access");
    throw redirect("/login");
  }
}

export function checkUserRole() {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.role.includes("ServiceProvider")) {
      throw redirect("/dashboard");
    } else if (user.role.includes("Admin")) {
      throw redirect("/dashboard/admin");
    }
    //console.log(user.role);
  }
}

const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response Error:", error.response.data);
      return (
        error.response.data ||
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request Error:", error.request);
      return "No response received from the server. Please try again later.";
    } else {
      // Something happened in setting up the request
      console.error("Axios Error:", error.message);
      return `Request setup error: ${error.message}`;
    }
  }

  // Non-Axios error (fallback)
  console.error("Unknown Error:", error);
  return "An unexpected error occurred. Please try again.";
};

export function formatReadableDate(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-GB", options);
}

export default handleAxiosError;
