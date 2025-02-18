import Hero from "@/components/homepage/Hero";
import React from "react";
import HowItWorks from "@/components/homepage/HowItWorks";
import Faq from "@/components/homepage/Faq";
import Cta from "@/components/homepage/Cta";
import { ScrollRestoration } from "react-router-dom";
import ServicesCase from "@/components/homepage/ServicesCase";

export default function Home() {
  return (
    <>
      <ScrollRestoration />
      <Hero />
      <ServicesCase />
      <HowItWorks />
      <Faq />
      <Cta />
    </>
  );
}
