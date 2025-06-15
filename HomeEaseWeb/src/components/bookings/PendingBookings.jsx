import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, CheckCircle, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UpdateBooking } from "@/api";
import { useToast } from "@/hooks/use-toast";
import MyLoader from "../MyLoader";
import { MyPagination } from "../Pagination";
import DeleteAlertDialog from "../DeleteAlertDialog";

export default function PendingBookings({ bookings, setSubmitTrigger }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const pendingBookings = bookings.filter((booking) => {
    return booking.status.toLowerCase() === "pending";
  });

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteresBookings = pendingBookings.filter((booking) => {
    if (
      searchTerm &&
      !booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !booking.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    const bookingDate = new Date(booking.bookingDate);
    if (
      dateFilter &&
      bookingDate.toDateString() !== dateFilter.toDateString()
    ) {
      return false;
    }
    return true;
  });

  const paginatedBookings = filteresBookings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteresBookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex flex-1 max-w-sm relative">
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings..."
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <DatePicker
              mode="single"
              value={dateFilter}
              onChange={setDateFilter}
            />
            <Button
              variant="ghost"
              onClick={() => {
                setDateFilter(null);
              }}
            >
              Clear Date
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {paginatedBookings.map((booking) => (
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
                        Phone Number: {booking.customerPhone}
                      </p>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Details</DialogTitle>
                      <DialogDescription>
                        Booking #{booking.id} - {booking.serviceName}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="font-medium">Service:</span>
                        <span>{booking.serviceName}</span>

                        <span className="font-medium">Provider:</span>
                        <span>{booking.companyName}</span>

                        <span className="font-medium">Date:</span>
                        <span>{formatDate(booking.bookingDate)}</span>

                        <span className="font-medium">Time:</span>
                        <span>{booking.time}</span>

                        <span className="font-medium">Status:</span>
                        <span>{booking.status}</span>

                        <span className="font-medium">Amount:</span>
                        <span>R{booking.totalCost.toFixed(2)}</span>

                        <span className="font-medium">Address:</span>
                        <span>{booking.address}</span>

                        <span className="font-medium">Property Size:</span>
                        <span>{booking.size}</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
      <CardFooter>
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}
