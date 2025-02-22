import { ArrowRight, Building2, Home, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function WhatWeOffer() {
  const services = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Residential Services",
      description:
        "From home cleaning to handyman repairs, our platform connects you with trusted professionals to keep your space in top shape.",
      iconBg: "bg-blue-50",
    },
    {
      icon: <Building2 className="w-8 h-8 text-yellow-500" />,
      title: "Commercial Services",
      description:
        "Ensure your workplace runs smoothly with reliable service providers for office maintenance, cleaning, and repairs.",
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
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
          Expert Home Services at Your Fingertips
        </h2>
        <p className="text-lg text-muted-foreground">
          We connect you with skilled service providers who deliver top-quality
          home maintenance and cleaning solutions. From deep cleaning to
          repairs, our professionals ensure your space is well-maintained, using
          safe and efficient methods.
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
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                {service.title}
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{service.description}</p>
              <Link to="/services">
                <Button
                  variant="link"
                  className="text-blue-500 hover:text-blue-600 p-0 h-auto font-semibold"
                >
                  See What We Offer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
