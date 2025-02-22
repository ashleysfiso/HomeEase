import React from "react";
import { Target, Eye } from "lucide-react";

export default function OurStory() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Image Column */}
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="/images/our-story.jpg"
            alt="Student with headphones working on laptop"
            width={800}
            height={300}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Content Column */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            Our Vision & Mission
          </h2>
          {/* Mission Section */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-[52px]">
              To make education accessible and impactful, empowering individuals
              to achieve their dreams and create a better future through
              knowledge.
            </p>
          </div>

          {/* Vision Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-[52px]">
              To be a global leader in education, fostering innovation,
              collaboration, and excellence to transform lives and communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
