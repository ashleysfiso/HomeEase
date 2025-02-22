import PageHeader from "@/components/PageHeader";
import SupportCard from "@/components/SupportCard";
import OurStory from "@/components/OurStory";
import WhatWeOffer from "@/components/homepage/WhatWeOffer";
import ContactUs from "@/components/ContactUs";

export default function AboutPage() {
  return (
    <>
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
              We have grown into a trusted name in the cleaning industry
            </h2>
            <p className="text-lg text-muted-foreground">
              Choosing UltraClean means a company that values your satisfaction
              and the cleanliness of your environment.
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
