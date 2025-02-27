import PageHeader from "@/components/PageHeader";
import SupportCard from "@/components/SupportCard";
import OurStory from "@/components/OurStory";
import WhatWeOffer from "@/components/homepage/WhatWeOffer";
import ContactUs from "@/components/ContactUs";
import { ScrollRestoration } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      <ScrollRestoration />
      <PageHeader
        title="About us"
        backgroundImage="/images/page-header-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About us", href: "/about" },
        ]}
      />
      <div className="container mx-auto flex-col items-center py-12 md:py-16">
        <div className="grid place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SupportCard />
          </div>
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
              A Trusted Name in Home Services
            </h2>
            <p className="text-lg text-muted-foreground">
              HomeEase has grown into a reliable platform connecting you with
              skilled service providers for all your home needs. Choosing
              HomeEase means opting for quality, convenience, and professionals
              who prioritize your satisfaction.
            </p>
          </div>
        </div>
      </div>
      <OurStory />
      <WhatWeOffer />
      <ContactUs />
    </>
  );
}
