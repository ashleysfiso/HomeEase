import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Cta from "@/components/homepage/Cta";
import AboutImg from "@/assets/images/about-us.jpg";
import MissionImg from "@/assets/images/our-mission.jpg";
import StoryImg from "@/assets/images/our-story.jpg";
import { ScrollRestoration } from "react-router-dom";

export default function About() {
  return (
    <>
      <ScrollRestoration />
      <div className="w-full pt-20 lg:py-10">
        <div className="container mx-4 sm:mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
            <div className="flex gap-4 flex-col flex-1">
              <div className="flex gap-2 flex-col">
                <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left">
                  About Us
                </h2>
                <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                  Welcome to HomeEase, where home services meet innovation and
                  convenience. We are dedicated to transforming how you manage
                  your household tasks by connecting you with trusted service
                  providers quickly and effortlessly.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md w-full aspect-video h-full flex-1">
              <img src={AboutImg} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-5 lg:py-10">
        <div className="container mx-4 sm:mx-auto">
          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
            <div className="bg-muted rounded-md w-full aspect-video h-full flex-1">
              <img src={MissionImg} className="h-full w-full object-cover" />
            </div>
            <div className="flex gap-4 pl-0 lg:pl-20 flex-col  flex-1">
              <div className="flex gap-2 flex-col">
                <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left">
                  Our Mission
                </h2>
                <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                  To simplify home services and make every household task
                  seamless, stress-free, and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-5 lg:py-10">
        <div className="container mx-4 sm:mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
            <div className="flex gap-4 flex-col flex-1">
              <div className="flex gap-2 flex-col">
                <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left">
                  Our Story
                </h2>
                <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                  Founded with a vision to redefine home services, HomeEase was
                  built to address the common frustrations of unreliable
                  providers, complicated processes, and limited access to
                  quality services. Today, we proudly serve thousands of
                  households, making life easier for families and individuals.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md max-w-xl aspect-video h-full flex-1">
              <img src={StoryImg} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-5 lg:py-10">
        <div className="container mx-4 sm:mx-auto">
          <div className="flex gap-4 py-5 lg:py-10 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                What We Offer
              </h2>
            </div>
            <div className="flex gap-10 pt-12 flex-col w-full">
              <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                <div className="flex flex-row gap-6 w-full items-start">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Home Cleaning</p>
                    <p className="text-muted-foreground text-sm">
                      Keep your living spaces spotless and tidy.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 items-start">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Handyman Services:</p>
                    <p className="text-muted-foreground text-sm">
                      Quick fixes and repairs for your home.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 items-start">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Laundry</p>
                    <p className="text-muted-foreground text-sm">
                      Fresh, clean clothes
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 w-full items-start">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Pest Control</p>
                    <p className="text-muted-foreground text-sm">
                      Effective treatments to keep your home pest-free.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 items-start">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Car Washing</p>
                    <p className="text-muted-foreground text-sm">
                      Professional cleaning to keep your vehicle shining.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 items-start">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Lawn Care</p>
                    <p className="text-muted-foreground text-sm">
                      Ensure your garden and lawn look lush and well-maintained.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cta />
    </>
  );
}
