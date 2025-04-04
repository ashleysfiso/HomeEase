import React from "react";
import {
  DollarSign,
  Users,
  Calendar,
  Star,
  UserPlus,
  CheckSquare,
  XSquare,
  MessageSquare,
  Edit,
} from "lucide-react";
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
import { RevenueChart } from "../../components/charts/RevenueChart";
import { ServiceDemandChart } from "../../components/charts/ServiceDemandChart";
import { BookingsChart } from "../../components/charts/BookingsChart";

export function AdminDashboard() {
  return (
    <div className="max-w-full p-4 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage service providers, customers, and bookings across the platform.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="max-w-full grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Bookings"
          value="1,234"
          description="+12.5% from last month"
          icon={<Calendar className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Providers"
          value="245"
          description="+8 new this week"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Pending Approvals"
          value="18"
          description="+5 new applications today"
          icon={<UserPlus className="h-4 w-4" />}
        />
        <MetricCard
          title="Customer Feedback"
          value="4.8/5"
          description="(432 reviews)"
          icon={<Star className="h-4 w-4" />}
          showStars={true}
          starCount={4}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="max-w-full space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Growth</TabsTrigger>
          <TabsTrigger value="services">Service Demand</TabsTrigger>
          <TabsTrigger value="bookings">Bookings Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly earnings trend</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Demand</CardTitle>
              <CardDescription>Most booked services</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ServiceDemandChart />
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
              <BookingsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest customer requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {recentBookings.map((booking) => (
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
                      <p className="text-xs text-muted-foreground">
                        Provider: {booking.provider}
                      </p>
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
            <CardTitle>New Provider Applications</CardTitle>
            <CardDescription>Pending approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {providerApplications.map((application) => (
                <div key={application.id} className="mb-4 last:mb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{application.initials}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="font-semibold">{application.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {application.service}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied: {application.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <CheckSquare className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <XSquare className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Applications
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="justify-start">
              <UserPlus className="mr-2 h-4 w-4" />
              Approve/Reject Providers
            </Button>
            <Button className="justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Manage Services
            </Button>
            <Button className="justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Resolve Customer Complaints
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample data for recent bookings
const recentBookings = [
  {
    id: 1,
    customer: { name: "Sarah Johnson", initials: "SJ" },
    service: "House Cleaning",
    provider: "John Smith",
    status: "Completed",
  },
  {
    id: 2,
    customer: { name: "Michael Brown", initials: "MB" },
    service: "Plumbing Repair",
    provider: "Robert Davis",
    status: "Pending",
  },
  {
    id: 3,
    customer: { name: "Emily Wilson", initials: "EW" },
    service: "Electrical Work",
    provider: "David Miller",
    status: "Canceled",
  },
  {
    id: 4,
    customer: { name: "James Taylor", initials: "JT" },
    service: "Gardening",
    provider: "Lisa Anderson",
    status: "Pending",
  },
  {
    id: 5,
    customer: { name: "Olivia Martinez", initials: "OM" },
    service: "House Cleaning",
    provider: "John Smith",
    status: "Completed",
  },
];

// Sample data for provider applications
const providerApplications = [
  {
    id: 1,
    name: "Thomas Wilson",
    initials: "TW",
    service: "Plumbing Services",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Jessica Martinez",
    initials: "JM",
    service: "House Cleaning",
    date: "3 days ago",
  },
  {
    id: 3,
    name: "Daniel Johnson",
    initials: "DJ",
    service: "Electrical Services",
    date: "5 days ago",
  },
  {
    id: 4,
    name: "Amanda Lee",
    initials: "AL",
    service: "Gardening Services",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Robert Chen",
    initials: "RC",
    service: "Painting Services",
    date: "1 week ago",
  },
];
