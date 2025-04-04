import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProviderDashboard } from "./ProviderDashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <>
      <ProviderDashboard />
    </>
  );
}
