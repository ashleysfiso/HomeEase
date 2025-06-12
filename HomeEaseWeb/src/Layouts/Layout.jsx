import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}
