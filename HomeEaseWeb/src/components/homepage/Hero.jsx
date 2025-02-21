import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 shadow-sm border">
          <span role="img" aria-label="celebration">
            🎉
          </span>
          <span className="text-sm font-medium">We are live!</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl font-bold text-[#0a2242] tracking-tight">
          Home Services Made{" "}
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Simple & Hassle-Free!
          </span>
        </h1>

        {/* Subheadings */}
        <div className="space-y-4">
          <p className="text-2xl text-gray-600">
            Reliable. Efficient. Stress-Free.{" "}
            <span className="font-medium">Open Source.</span>
          </p>
          <p className="text-xl text-gray-500">
            Book trusted professionals and enjoy a cleaner, more comfortable
            home—effortlessly!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button size="lg" className="gap-2">
            Book a Service
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
