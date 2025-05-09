import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollRestoration } from "react-router-dom";

export default function BecomeProviderSuccessPage() {
  return (
    <>
      <ScrollRestoration />
      <div className="container max-w-3xl my-32 py-30 mx-auto px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-green-600">
              Application Submitted
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">
                Thank you for your application!
              </h3>
              <p className="text-muted-foreground">
                We've received your service provider application. Our team will
                review your information and get back to you within 2-3 business
                days.
              </p>
            </div>
            <div className="pt-4">
              <Link to="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
