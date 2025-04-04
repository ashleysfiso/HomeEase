import React from "react";
import { DollarSign, Calendar, CheckCircle, Star, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { ProviderEarningsChart } from "../../components/charts/ProviderEarningsChart";
import { ProviderBookingsChart } from "../../components/charts/ProviderBookingsChart";

export function ProviderDashboard() {
  return (
    <div className="w-full p-4 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Service Provider Dashboard
        </h2>
        <p className="text-muted-foreground">
          Manage your bookings, track earnings, and view customer feedback.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Earnings"
          value="$3,248.50"
          description="+15.3% from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Upcoming Bookings"
          value="8"
          description="Next booking in 2 hours"
          icon={<Calendar className="h-4 w-4" />}
        />
        <MetricCard
          title="Completed Services"
          value="124"
          description="+8 this week"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <MetricCard
          title="Customer Ratings"
          value="4.9/5"
          description="(87 reviews)"
          icon={<Star className="h-4 w-4" />}
          showStars={true}
          starCount={5}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="earnings">Earnings Over Time</TabsTrigger>
          <TabsTrigger value="bookings">Bookings Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Over Time</CardTitle>
              <CardDescription>Weekly/monthly income trend</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ProviderEarningsChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings Overview</CardTitle>
              <CardDescription>Status breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ProviderBookingsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {providerRecentBookings.map((booking) => (
                <div key={booking.id} className="mb-4 last:mb-0">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {booking.customer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h4 className="font-semibold">
                          {booking.customer.name}
                        </h4>
                        <Badge
                          className={`ml-2 ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {booking.service}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {booking.time}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Bookings
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Customer Feedback</CardTitle>
            <CardDescription>Recent ratings & reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {customerFeedback.map((feedback) => (
                <div key={feedback.id} className="mb-4 last:mb-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {feedback.customer.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {feedback.customer.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {feedback.service}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= feedback.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feedback.comment}
                    </p>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Feedback
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.time}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.customer}
                    </p>
                  </div>
                </div>
                <div>
                  <Badge variant="outline">{appointment.service}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample data for provider recent bookings
const providerRecentBookings = [
  {
    id: 1,
    customer: { name: "Sarah Johnson", initials: "SJ" },
    service: "House Cleaning",
    time: "Today, 2:00 PM",
    status: "Pending",
  },
  {
    id: 2,
    customer: { name: "Michael Brown", initials: "MB" },
    service: "House Cleaning",
    time: "Today, 5:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    customer: { name: "Emily Wilson", initials: "EW" },
    service: "House Cleaning",
    time: "Yesterday, 10:00 AM",
    status: "Completed",
  },
  {
    id: 4,
    customer: { name: "James Taylor", initials: "JT" },
    service: "House Cleaning",
    time: "Yesterday, 3:30 PM",
    status: "Completed",
  },
  {
    id: 5,
    customer: { name: "Sophia Garcia", initials: "SG" },
    service: "House Cleaning",
    time: "2 days ago, 1:00 PM",
    status: "Canceled",
  },
];

// Sample data for customer feedback
const customerFeedback = [
  {
    id: 1,
    customer: { name: "Sarah Johnson", initials: "SJ" },
    service: "House Cleaning",
    rating: 5,
    comment: "Excellent service! My house has never been cleaner.",
  },
  {
    id: 2,
    customer: { name: "Michael Brown", initials: "MB" },
    service: "House Cleaning",
    rating: 4,
    comment: "Very good service, arrived on time and did a thorough job.",
  },
  {
    id: 3,
    customer: { name: "Emily Wilson", initials: "EW" },
    service: "House Cleaning",
    rating: 5,
    comment: "Professional and efficient. Will definitely book again!",
  },
  {
    id: 4,
    customer: { name: "James Taylor", initials: "JT" },
    service: "House Cleaning",
    rating: 3,
    comment: "Good service but arrived a bit late.",
  },
];

// Sample data for today's schedule
const todaySchedule = [
  {
    time: "10:00 AM",
    customer: "Sarah Johnson",
    service: "House Cleaning",
  },
  {
    time: "1:30 PM",
    customer: "Michael Brown",
    service: "Deep Cleaning",
  },
  {
    time: "4:00 PM",
    customer: "Emily Wilson",
    service: "Window Cleaning",
  },
];
