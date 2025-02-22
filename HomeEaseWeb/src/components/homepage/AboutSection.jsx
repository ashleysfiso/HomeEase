import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="/images/about-section.jpg"
            alt="Professional cleaning service"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy-900">
            About HomeEase Solutions
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            At HomeEase, we connect you with top-tier service providers to
            handle all your home needs effortlessly. With a network of
            experienced professionals, we ensure high-quality, reliable
            services, giving you peace of mind and convenience at your doorstep.
          </p>
          <Link to="/about">
            <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-6 text-lg rounded-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="text-center space-y-2">
          <h2 className="text-5xl lg:text-6xl font-bold text-navy-900">25+</h2>
          <p className="text-lg text-muted-foreground">Active Clients</p>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-5xl lg:text-6xl font-bold text-navy-900">5+</h2>
          <p className="text-lg text-muted-foreground">Glorious Years</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-navy-900">
            We put our customers at the heart of everything we do.
          </h3>
        </div>
      </div>
    </section>
  );
}
