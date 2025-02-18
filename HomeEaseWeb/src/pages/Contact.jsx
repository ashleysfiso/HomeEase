import { Check, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollRestoration } from "react-router-dom";

export default function Contact() {
  return (
    <div className="w-full py-20 lg:py-40">
      <ScrollRestoration />
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Contact Us
                </h4>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                  We’re here to help with all your home service needs! Whether
                  you have a question, need assistance, or want to give
                  feedback, feel free to reach out to us.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Get in Touch</p>
                <p className="text-muted-foreground text-sm">
                  Have a query? Our team is ready to assist you every step of
                  the way.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Quick Support</p>
                <p className="text-muted-foreground text-sm">
                  We ensure fast responses to your inquiries because your time
                  matters.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Reach Us Anytime</p>
                <p className="text-muted-foreground text-sm">
                  We’re just a click away—connect with us
                </p>
              </div>
            </div>
          </div>

          <div className="justify-center flex items-center">
            <div className="rounded-md max-w-sm w-full flex flex-col border p-8 gap-4">
              <p>Contact Us</p>

              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="firstname">Full Name</Label>
                <Input id="firstname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="lastname">Email</Label>
                <Input id="lastname" type="email" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="message">Comment or message</Label>
                <Textarea id="message" />
              </div>

              <Button className="gap-4 w-full">
                Submit <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
