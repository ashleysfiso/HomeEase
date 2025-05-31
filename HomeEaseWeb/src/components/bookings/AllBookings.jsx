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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { MyPagination } from "../Pagination";

export default function AllBookings({ bookings }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteresBookings = bookings.filter((booking) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
        <CardDescription>View and manage all service bookings.</CardDescription>
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
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Provider</th>
                <th className="p-2 text-left font-medium">Date & Time</th>
                <th className="p-2 text-left font-medium">Status</th>
                <th className="p-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="p-2">#{booking.id}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <span>{booking.customerName}</span>
                      </div>
                    </td>
                    <td className="p-2">{booking.serviceName}</td>
                    <td className="p-2">{booking.serviceTypeName}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <span>{booking.companyName}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span>{booking.bookingDate}</span>
                        <span className="text-xs text-muted-foreground">
                          {booking.time}
                        </span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge
                        className={
                          booking.status === "Completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
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
