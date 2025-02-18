import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PriceBreakdown({ bookingDetails, prices }) {
  //const [voucherCode, setVoucherCode] = useState("");

  const subtotal = prices.bookingPrice + prices.bookingCover;
  const total = subtotal + prices.serviceFee - prices.discount;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-center">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {bookingDetails.location && (
            <>
              <h3 className="flex justify-center font-semibold">Address</h3>
              <p className="text-center">{bookingDetails.location} </p>
            </>
          )}
          <p className="text-center">{bookingDetails.duration}</p>
          <div className="flex justify-center">
            <p className="flex">
              {bookingDetails.date && (
                <p className="font-semibold">
                  {" "}
                  Date:{" "}
                  <span className="font-normal">{bookingDetails.date}</span>
                </p>
              )}{" "}
              {bookingDetails.time && <> @ {bookingDetails.time}</>}
            </p>
          </div>

          <p className="text-center">
            {bookingDetails.bedrooms && <>{bookingDetails.bedrooms} Bedrooms</>}{" "}
            {bookingDetails.bathrooms && (
              <>{bookingDetails.bathrooms} Bathroom</>
            )}
          </p>

          <div className="grid-cols-2 gap-2 place-items-center">
            {bookingDetails.extras.map((item, index) => (
              <>
                {index === 0 ? (
                  <>
                    <h3 key={index + 10} className="font-semibold">
                      Extras:{" "}
                    </h3>
                    <p key={index}>{item}</p>
                  </>
                ) : (
                  <p key={index}>{item}</p>
                )}
              </>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Service fee</span>
          <div className="text-right">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="ml-1">What is this?</TooltipTrigger>
                <TooltipContent>
                  <p>
                    Allocated to all one-time bookings. This fee helps us run
                    the platform.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p>R {prices.serviceFee.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>R {total.toFixed(2)}</span>
        </div>

        {/*<div>
          <Label htmlFor="voucher">Apply Voucher</Label>
          <div className="flex gap-2">
            <Input
              id="voucher"
              placeholder="Enter code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <Button>Apply</Button>
          </div>
        </div>*/}
      </CardContent>
    </Card>
  );
}
