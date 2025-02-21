import React from "react";
import { ScrollRestoration } from "react-router-dom";
import ContactUs from "@/components/ContactUs";

export default function ContactPage() {
  return (
    <div className="w-full py-20 lg:py-40">
      <ScrollRestoration />
      <ContactUs />
    </div>
  );
}
