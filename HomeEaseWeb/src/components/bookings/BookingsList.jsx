import React, { useState, useEffect } from "react";
import { Calendar, Check, Filter, MoreHorizontal, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { GetBookingByCustomerId } from "@/api";
import BookingsListSkeleton from "../SkeletonLoader/BookingsListSkeleton";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const customerId = user?.customerID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await GetBookingByCustomerId(customerId);
        setBookings(results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status badge variant based on status
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter((booking) => {
    // Search term filter
    if (
      searchTerm &&
      !booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !booking.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !booking.additionalInformation
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Tab filter
    if (
      activeTab === "upcoming" &&
      new Date(booking.bookingDate) < new Date()
    ) {
      return false;
    }
    if (activeTab === "past" && new Date(booking.bookingDate) > new Date()) {
      return false;
    }
    if (
      activeTab === "cancelled" &&
      booking.status.toLowerCase() !== "cancelled"
    ) {
      return false;
    }

    // Status filter
    if (
      statusFilter &&
      booking.status.toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return false;
    }

    // Date filter
    if (dateFilter) {
      const bookingDate = new Date(booking.bookingDate);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);

      if (
        dateFilter === "today" &&
        bookingDate.toDateString() !== today.toDateString()
      ) {
        return false;
      }
      if (
        dateFilter === "this-week" &&
        (bookingDate < today || bookingDate > nextWeek)
      ) {
        return false;
      }
      if (
        dateFilter === "this-month" &&
        (bookingDate < today || bookingDate > nextMonth)
      ) {
        return false;
      }
    }

    // Price filter
    if (priceFilter) {
      if (priceFilter === "under-100" && booking.totalCost >= 100) {
        return false;
      }
      if (
        priceFilter === "100-500" &&
        (booking.totalCost < 100 || booking.totalCost > 500)
      ) {
        return false;
      }
      if (priceFilter === "over-500" && booking.totalCost <= 500) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="mx-auto px-4 py-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="w-full sm:w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses{" "}
                {!statusFilter && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                Confirmed{" "}
                {statusFilter === "confirmed" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending{" "}
                {statusFilter === "pending" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                Cancelled{" "}
                {statusFilter === "cancelled" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setDateFilter(null)}>
                All Dates {!dateFilter && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("today")}>
                Today{" "}
                {dateFilter === "today" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("this-week")}>
                This Week{" "}
                {dateFilter === "this-week" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("this-month")}>
                This Month{" "}
                {dateFilter === "this-month" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setPriceFilter(null)}>
                All Prices{" "}
                {!priceFilter && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("under-100")}>
                Under R100{" "}
                {priceFilter === "under-100" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("100-500")}>
                R100 - R500{" "}
                {priceFilter === "100-500" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("over-500")}>
                Over R500{" "}
                {priceFilter === "over-500" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <BookingsListSkeleton />
      ) : (
        <>
          {/* Desktop view - Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {booking.serviceName}
                        </span>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {booking.additionalInformation}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{formatDate(booking.bookingDate)}</span>
                        <span className="text-sm text-muted-foreground">
                          {booking.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{booking.companyName}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>R{booking.totalCost.toFixed(2)}</TableCell>
                    <TableCell>
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

                              <span className="font-medium">
                                Additional Info:
                              </span>
                              <span>{booking.additionalInformation}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Cancel booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile view - Cards */}
          <div className="grid gap-4 md:hidden">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        {booking.serviceName}
                      </CardTitle>
                      <CardDescription className="line-clamp-1">
                        {booking.additionalInformation}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDate(booking.bookingDate)} • {booking.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-medium">
                      ${booking.totalCost.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
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

                          <span className="font-medium">Additional Info:</span>
                          <span>{booking.additionalInformation}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Contact Provider</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Cancel booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredBookings.length}</strong> of{" "}
              <strong>{bookings.length}</strong> bookings
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
