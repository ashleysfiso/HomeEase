import React, { useState, useEffect } from "react";
import {
  Calendar,
  Check,
  Filter,
  MoreHorizontal,
  Search,
  Star,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { MyPagination } from "../Pagination";
import MyLoader from "../MyLoader";
import { CreateReview } from "@/api";
import { useToast } from "@/hooks/use-toast";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { user } = useAuth();
  const customerId = user?.customerID;
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const [updatingReviews, setUpdatingReviews] = useState({});

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

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (bookingId) => {
    setUpdatingReviews((prev) => ({ ...prev, [bookingId]: true }));
    if (!rating || comment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    try {
      const result = await CreateReview({
        bookingId: bookingId,
        rating: rating,
        comment: comment,
      });
      toast({ description: "Thank you for your feedback!" });
      setUpdatingReviews((prev) => ({ ...prev, [bookingId]: false }));
    } catch (error) {
      alert(error.message);
      setUpdatingReviews((prev) => ({ ...prev, [bookingId]: false }));
    }
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
      !booking.serviceTypeName.toLowerCase().includes(searchTerm.toLowerCase())
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
      if (priceFilter === "under-500" && booking.totalCost >= 500) {
        return false;
      }
      if (
        priceFilter === "500-1500" &&
        (booking.totalCost < 500 || booking.totalCost > 1500)
      ) {
        return false;
      }
      if (priceFilter === "over-1500" && booking.totalCost <= 1500) {
        return false;
      }
    }

    return true;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

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
              <DropdownMenuItem onClick={() => setPriceFilter("under-500")}>
                Under R500{" "}
                {priceFilter === "under-500" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("500-1500")}>
                R500 - R1500{" "}
                {priceFilter === "500-1500" && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("over-1500")}>
                Over R1500{" "}
                {priceFilter === "over-1500" && (
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
                {paginatedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {booking.serviceName}
                        </span>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {booking.serviceTypeName}
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
                                Property Size:
                              </span>
                              <span>{booking.size}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Popover key={booking.id}>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={updatingReviews[booking.id]}
                            variant="outline"
                          >
                            {updatingReviews[booking.id] && <MyLoader />}Leave a
                            Review
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 space-y-4">
                          <div>
                            <Label className="mb-2 block">Your Rating</Label>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <Star
                                  key={value}
                                  size={24}
                                  className={`cursor-pointer ${
                                    rating && value <= rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() => handleRatingClick(value)}
                                  fill={
                                    rating && value <= rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="comment" className="mb-2 block">
                              Your Comment
                            </Label>
                            <Textarea
                              id="comment"
                              placeholder="Write your thoughts here..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => handleSubmit(booking.id)}
                            disabled={updatingReviews[booking.id]}
                          >
                            {updatingReviews[booking.id] && <MyLoader />} Submit
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile view - Cards */}
          <div className="grid gap-4 md:hidden">
            {paginatedBookings.map((booking) => (
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

                          <span className="font-medium">Property Size:</span>
                          <span>{booking.size}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={updatingReviews[booking.id]}
                        variant="outline"
                      >
                        {updatingReviews[booking.id] && <MyLoader />} Leave a
                        Review
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 space-y-4">
                      <div>
                        <Label className="mb-2 block">Your Rating</Label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <Star
                              key={value}
                              size={24}
                              className={`cursor-pointer ${
                                rating && value <= rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              onClick={() => handleRatingClick(value)}
                              fill={
                                rating && value <= rating
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="comment" className="mb-2 block">
                          Your Comment
                        </Label>
                        <Textarea
                          id="comment"
                          placeholder="Write your thoughts here..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => handleSubmit(booking.id)}
                        disabled={updatingReviews[booking.id]}
                      >
                        {updatingReviews[booking.id] && <MyLoader />} Submit
                      </Button>
                    </PopoverContent>
                  </Popover>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{paginatedBookings.length}</strong> of{" "}
              <strong>{bookings.length}</strong> bookings
            </div>
            <div
              className="flex items-center gap-2"
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <MyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
