import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  HomeIcon,
  ArrowRight,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollRestoration, useSearchParams } from "react-router-dom";

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const address = searchParams.get("address");
  const service = searchParams.get("service");
  const details = searchParams.get("details");
  const total = searchParams.get("total");
  return (
    <>
      <ScrollRestoration />
      <div className="container mx-auto py-20 px-4 max-w-3xl">
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <div className="rounded-full bg-emerald-100 p-3">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md">
              Your booking has been successfully confirmed. We've sent a
              confirmation email with all the details.
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Booking Summary</h2>
                <p className="text-sm text-muted-foreground">Booking #{id}</p>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HomeIcon className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{service}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Service Details</h3>
                <div className="text-sm">
                  {details.replace(/\b\w/g, (char) => char.toUpperCase())}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Est Total Amount
                  </p>
                  <p className="text-2xl font-bold">R{total}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">What happens next?</h3>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-medium text-sm">
                1
              </div>
              <p>
                You'll receive the details of your assigned service provider 24
                hours before your scheduled service.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-medium text-sm">
                2
              </div>
              <p>
                You'll receive a reminder notification on the day of your
                booking.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-medium text-sm">
                3
              </div>
              <p>
                After the service is complete, you can rate your experience and
                provide feedback.
              </p>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gap-2" asChild>
            <Link to="/bookings">
              View My Bookings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
