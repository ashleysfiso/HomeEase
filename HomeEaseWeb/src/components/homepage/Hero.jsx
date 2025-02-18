import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import bgImage from "@/assets/images/hero.png";

export default function Hero() {
  return (
    <div className="w-full">
      <div
        className="mx-auto rounded-lg mt-4 mb-4 filter bg-cover bg-center bg-"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="flex gap-8 p-20 lg:p-40 items-center justify-center flex-col">
          <div>
            <Badge variant="outline">We&apos;re live!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              Welcome to the Future of Home Services
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Managing household tasks today is already tough. Avoid further
              complications by ditching unreliable, time-consuming options. Our
              goal is to simplify home services, making them seamless and
              stress-free.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link to="/services">
              <Button size="lg" className="gap-4">
                Explore Services <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
