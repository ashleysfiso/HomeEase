import React from "react";
import { Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportCard() {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-center">
          <Headphones className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-bold">24/7 support</h3>
        <p className="text-muted-foreground">
          We provide 24/7 service to our customers
        </p>
      </CardContent>
    </Card>
  );
}
