import React from "react";
import { ScrollRestoration } from "react-router-dom";
import ContactUs from "@/components/ContactUs";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <>
      <ScrollRestoration />
      <PageHeader
        title="Contact us"
        backgroundImage="/images/page-header-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact us", href: "/contact" },
        ]}
      />
      <ContactUs />
    </>
  );
}
