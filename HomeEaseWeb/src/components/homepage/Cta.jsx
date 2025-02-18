import React from "react";
import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="w-full p-5 pb-10 lg:pb-10">
      <div className="rounded-lg bg-muted mx-auto lg:mx-auto">
        <div className="flex flex-col text-center rounded-md sm:ml-4 p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>Get started</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Try our platform today!
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              Keeping your home in top shape can be overwhelming. With HomeEase,
              you can easily find and book trusted professionals for all your
              home service needs. We are here to simplify your life and bring
              convenience to your doorstep.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Link to="/register">
              <Button className="gap-4">
                Sign up here <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
