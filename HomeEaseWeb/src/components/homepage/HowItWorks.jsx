import React from "react";
import {
  Check,
  SearchIcon,
  Calendar1Icon,
  DollarSignIcon,
  MessageSquareIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HowItWorks() {
  return (
    <div className="w-full p-5 sm:pb-10 lg:pb-10 justify-center">
      <div className=" rounded-lg bg-muted sm:mx-auto">
        <div className="flex gap-4 p-10 lg:p-10 flex-col items-center">
          <div className="flex gap-2 flex-col items-center">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              How It Works
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Keeping up with household tasks today is already tough.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <SearchIcon className="w-8 h-8 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Browse Services</p>
                  <p className="text-muted-foreground text-sm">
                    Explore a wide range of home services tailored to your
                    needs.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Calendar1Icon className="w-8 h-8 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Book Instantly</p>
                  <p className="text-muted-foreground text-sm">
                    Select a service, choose a provider, and book with just a
                    few clicks.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-8 h-8 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Get the Job Done</p>
                  <p className="text-muted-foreground text-sm">
                    Your trusted service provider will deliver high-quality
                    results at your scheduled time.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <DollarSignIcon className="w-8 h-8 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Pay Securely</p>
                  <p className="text-muted-foreground text-sm">
                    Convenient and secure payment options for a hassle-free
                    experience.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <MessageSquareIcon className="w-8 h-8 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Leave a Review</p>
                  <p className="text-muted-foreground text-sm">
                    Share feedback to help others make informed choices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
