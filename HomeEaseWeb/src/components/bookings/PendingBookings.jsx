import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UpdateBooking } from "@/api";
import { useToast } from "@/hooks/use-toast";
import MyLoader from "../MyLoader";
import DeleteAlertDialog from "../DeleteAlertDialog";

export default function PendingBookings({ bookings, setSubmitTrigger }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const pendingBookings = bookings.filter((booking) => {
    return booking.status.toLowerCase() === "pending";
  });

  const handleStatusUpdate = async (booking) => {
    setIsSubmitting(true);
    try {
      const result = await UpdateBooking(booking);
      toast({
        description: "Booking has been updated successfully.",
      });
      setSubmitTrigger((prev) => !prev);
      setIsSubmitting(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      setIsSubmitting(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Bookings</CardTitle>
        <CardDescription>
          View and manage bookings awaiting service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="p-4 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Booking ID: #{booking.id}
                      </p>
                      <h4 className="font-semibold">{booking.customerName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.serviceName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.serviceTypeName}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-1">
                    Provider
                  </h5>
                  <div className="flex items-center space-x-2">
                    <span>{booking.companyName}</span>
                  </div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-1">
                    Address
                  </h5>
                  <div className="flex items-center space-x-2">
                    <span>{booking.address}</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-1">
                    Date & Time
                  </h5>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.bookingDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-1">
                    Price
                  </h5>
                  <span className="font-medium">R{booking.totalCost}</span>
                </div>
              </div>
              <div className="p-4 bg-muted/10 flex justify-end space-x-2">
                <DeleteAlertDialog
                  isLoading={isSubmitting}
                  id={{ id: booking.id, status: "Cancelled" }}
                  handelAction={handleStatusUpdate}
                  message="This action cannot be undone. This will permanently cancel this
                           booking."
                  buttonText="Cancel"
                />
                <Button
                  size="sm"
                  disabled={isSubmitting}
                  onClick={() =>
                    handleStatusUpdate({ id: booking.id, status: "Completed" })
                  }
                >
                  {isSubmitting ? (
                    <MyLoader />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Mark as Completed
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
