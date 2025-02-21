import Hero from "@/components/homepage/Hero";
import React from "react";
import HowItWorks from "@/components/homepage/HowItWorks";
import Faq from "@/components/homepage/Faq";
import Cta from "@/components/homepage/Cta";
import { ScrollRestoration } from "react-router-dom";
import ServicesCase from "@/components/homepage/ServicesCase";
import WhatWeOffer from "@/components/homepage/WhatWeOffer";
import AboutSection from "@/components/homepage/AboutSection";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  return (
    <>
      <ScrollRestoration />
      <Hero />
      <WhatWeOffer />
      <AboutSection />
      <Faq />
      <ContactUs />
    </>
  );
}
