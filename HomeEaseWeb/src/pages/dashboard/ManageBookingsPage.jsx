import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export function ManageBookingsPage({ section }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          View and manage all service bookings on the platform.
        </p>
      </div>

      <Tabs defaultValue={section} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-bookings">All Bookings</TabsTrigger>
          <TabsTrigger value="pending-bookings">Pending Bookings</TabsTrigger>
          <TabsTrigger value="completed-services">
            Completed Services
          </TabsTrigger>
        </TabsList>

        {/* All Bookings Tab */}
        <TabsContent value="all-bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                View and manage all service bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="flex flex-1 max-w-sm relative">
                  <Input placeholder="Search bookings..." />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                  <DatePicker />
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
                      <th className="p-2 text-left font-medium">Date & Time</th>
                      <th className="p-2 text-left font-medium">Status</th>
                      <th className="p-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsData.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="p-2">#{booking.id}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {booking.customer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{booking.customer.name}</span>
                          </div>
                        </td>
                        <td className="p-2">{booking.service}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {booking.provider.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{booking.provider.name}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-col">
                            <span>{booking.date}</span>
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
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                            >
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Bookings Tab */}
        <TabsContent value="pending-bookings" className="space-y-4">
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
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {booking.customer.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">
                              {booking.customer.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {booking.service}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        >
                          Pending
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          Provider
                        </h5>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {booking.provider.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span>{booking.provider.name}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          Date & Time
                        </h5>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.date}</span>
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
                        <span className="font-medium">${booking.price}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/10 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                      >
                        Cancel Booking
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Services Tab */}
        <TabsContent value="completed-services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Services</CardTitle>
              <CardDescription>
                View all completed service bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-1 max-w-sm relative">
                  <Input placeholder="Search completed services..." />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <DatePicker />
              </div>

              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Booking ID</th>
                      <th className="p-2 text-left font-medium">Customer</th>
                      <th className="p-2 text-left font-medium">Service</th>
                      <th className="p-2 text-left font-medium">Provider</th>
                      <th className="p-2 text-left font-medium">
                        Completion Date
                      </th>
                      <th className="p-2 text-left font-medium">Rating</th>
                      <th className="p-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedServices.map((service) => (
                      <tr key={service.id} className="border-b">
                        <td className="p-2">#{service.id}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {service.customer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{service.customer.name}</span>
                          </div>
                        </td>
                        <td className="p-2">{service.service}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {service.provider.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{service.provider.name}</span>
                          </div>
                        </td>
                        <td className="p-2">{service.completionDate}</td>
                        <td className="p-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= service.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                        <td className="p-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data for all bookings
const bookingsData = [
  {
    id: 1001,
    customer: { name: "Sarah Johnson", initials: "SJ" },
    service: "House Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    date: "Mar 15, 2025",
    time: "2:00 PM",
    status: "Pending",
  },
  {
    id: 1002,
    customer: { name: "Michael Brown", initials: "MB" },
    service: "Plumbing Repair",
    provider: { name: "Robert Davis", initials: "RD" },
    date: "Mar 15, 2025",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: 1003,
    customer: { name: "Emily Wilson", initials: "EW" },
    service: "Electrical Work",
    provider: { name: "David Miller", initials: "DM" },
    date: "Mar 14, 2025",
    time: "3:30 PM",
    status: "Completed",
  },
  {
    id: 1004,
    customer: { name: "James Taylor", initials: "JT" },
    service: "Gardening",
    provider: { name: "Lisa Anderson", initials: "LA" },
    date: "Mar 14, 2025",
    time: "9:00 AM",
    status: "Canceled",
  },
  {
    id: 1005,
    customer: { name: "Olivia Martinez", initials: "OM" },
    service: "Deep Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    date: "Mar 13, 2025",
    time: "1:00 PM",
    status: "Completed",
  },
];

// Sample data for pending bookings
const pendingBookings = [
  {
    id: 1001,
    customer: { name: "Sarah Johnson", initials: "SJ" },
    service: "House Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    date: "Mar 15, 2025",
    time: "2:00 PM",
    price: 120,
  },
  {
    id: 1002,
    customer: { name: "Michael Brown", initials: "MB" },
    service: "Plumbing Repair",
    provider: { name: "Robert Davis", initials: "RD" },
    date: "Mar 15, 2025",
    time: "10:00 AM",
    price: 150,
  },
  {
    id: 1006,
    customer: { name: "Daniel Johnson", initials: "DJ" },
    service: "Window Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    date: "Mar 16, 2025",
    time: "11:30 AM",
    price: 80,
  },
];

// Sample data for completed services
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
