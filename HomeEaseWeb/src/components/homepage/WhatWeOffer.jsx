import { ArrowRight, Building2, Home, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WhatWeOffer() {
  const services = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Residential Services",
      description:
        "From regular housekeeping to deep cleaning, we ensure your home is always welcoming and pristine.",
      iconBg: "bg-blue-50",
    },
    {
      icon: <Building2 className="w-8 h-8 text-yellow-500" />,
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
      iconBg: "bg-yellow-50",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "Specialized Cleaning:",
      description:
        "We offer specialized services, including carpet cleaning, window washing, and address specific cleaning needs.",
      iconBg: "bg-purple-50",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0a2242] leading-tight">
          We offer a wide variety of specialized Cleaning
        </h2>
        <p className="text-lg text-muted-foreground">
          We are committed to delivering exceptional cleaning services that
          leave your spaces sparkling clean and hygienic. Our professional team
          uses eco-friendly products to ensure a safe and healthy environment
          for you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <div
                className={`w-16 h-16 rounded-lg ${service.iconBg} flex items-center justify-center mb-6`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#0a2242] mb-4">
                {service.title}
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{service.description}</p>
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-600 p-0 h-auto font-semibold"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
