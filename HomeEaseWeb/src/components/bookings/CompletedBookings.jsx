import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Calendar, CheckCircle, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MyPagination } from "../Pagination";
import { DatePicker } from "@/components/ui/date-picker";

export default function CompletedBookings({ bookings }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const completedBooking = bookings.filter(
    (booking) => booking.status === "Completed"
  );

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteresBookings = completedBooking.filter((booking) => {
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
        <CardTitle>Completed Services</CardTitle>
        <CardDescription>View all completed service bookings.</CardDescription>
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

        <div className="border rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-2 text-left font-medium">Booking ID</th>
                <th className="p-2 text-left font-medium">Customer</th>
                <th className="p-2 text-left font-medium">Service</th>
                <th className="p-2 text-left font-medium">Provider</th>
                <th className="p-2 text-left font-medium">Completion Date</th>
                <th className="p-2 text-left font-medium">Rating</th>
                <th className="p-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-2">#{booking.id}</td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <span>{booking.customerName}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div>
                      <p>{booking.serviceName}</p>{" "}
                      <p className="text-muted-foreground">
                        {booking.serviceTypeName}
                      </p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <span>{booking.companyName}</span>
                    </div>
                  </td>
                  <td className="p-2">{booking.bookingDate}</td>
                  <td className="p-2">
                    {booking.rating ? (
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Star
                            key={value}
                            size={24}
                            className={`cursor-pointer ${
                              booking.rating && value <= booking.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleRatingClick(value)}
                            fill={
                              booking.rating && value <= booking.rating
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      "No Rating"
                    )}
                  </td>
                  <td className="p-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

const completedServices = [
  {
    id: 1003,
    customer: { name: "Emily Wilson", initials: "EW" },
    service: "Electrical Work",
    provider: { name: "David Miller", initials: "DM" },
    completionDate: "Mar 14, 2025",
    rating: 5,
  },
  {
    id: 1005,
    customer: { name: "Olivia Martinez", initials: "OM" },
    service: "Deep Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    completionDate: "Mar 13, 2025",
    rating: 4,
  },
  {
    id: 997,
    customer: { name: "William Davis", initials: "WD" },
    service: "House Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    completionDate: "Mar 12, 2025",
    rating: 5,
  },
  {
    id: 995,
    customer: { name: "Sophia Garcia", initials: "SG" },
    service: "Plumbing Repair",
    provider: { name: "Robert Davis", initials: "RD" },
    completionDate: "Mar 11, 2025",
    rating: 3,
  },
];
