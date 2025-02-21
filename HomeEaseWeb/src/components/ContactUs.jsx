import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a2242] mb-4">
          Get in touch with us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We would love to hear from you! Whether you have questions, need a
          quote, or want to schedule a service, our team is here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="/images/contact-us-cleaning-guy.jpg"
            alt="Cleaning service professional"
            width={800}
            height={900}
            className="w-full"
          />
          <div className=" bottom-0 left-0 right-0 p-4 space-y-4 rounded-t-3xl">
            <a
              href="tel:+4725357456"
              className="flex items-center gap-3 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="font-medium">+4725 357 456</span>
            </a>
          </div>
        </div>

        <Card>
          <CardContent className="py-8">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write Message..."
                  className="min-h-[150px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree that my submitted data is being collected and stored.
                </Label>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
