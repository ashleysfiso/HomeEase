import { Button } from "@/components/ui/button";

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
          <h1 className="text-4xl lg:text-5xl font-bold text-[#002B5B]">
            About UltraClean Solutions
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            At UltraClean Solutions, we are dedicated to providing top-tier
            cleaning services that exceed your expectations. With years of
            experience in the cleaning industry, we pride ourselves on our
            meticulous attention.
          </p>

          <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-6 text-lg rounded-lg">
            Learn More
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="text-center space-y-2">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#002B5B]">40+</h2>
          <p className="text-lg text-muted-foreground">Active Clients</p>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#002B5B]">12+</h2>
          <p className="text-lg text-muted-foreground">Glorious Years</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#002B5B]">
            We put our customers at the heart of everything we do.
          </h3>
          <p className="text-lg text-muted-foreground">
            Satisfied Users Over The Globe
          </p>
        </div>
      </div>
    </section>
  );
}
