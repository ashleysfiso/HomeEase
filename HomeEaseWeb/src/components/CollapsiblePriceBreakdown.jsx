import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceBreakdown } from "./PriceBreakdown";

export function CollapsiblePriceBreakdown({ bookingDetails, prices }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="fixed pt-10 top-0 z-10 bg-background">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Total</p>
            <p>
              R{" "}
              {(
                prices.bookingPrice +
                prices.bookingCover +
                prices.serviceFee -
                prices.discount
              ).toFixed(2)}
            </p>
          </div>
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isOpen && (
          <div className="mt-4">
            <PriceBreakdown bookingDetails={bookingDetails} prices={prices} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
