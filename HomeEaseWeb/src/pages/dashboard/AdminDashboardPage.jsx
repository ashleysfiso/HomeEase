import React, { useState, useEffect } from "react";
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
  Clock,
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
import { ServiceProviderDashboardSkeleton } from "@/components/SkeletonLoader/ServiceProviderDashboardSkeleton";
import { GetAdminDashboard } from "@/api";
import EmptyState from "@/components/EmptyState";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAdminDashboard();
        setDashboardData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ServiceProviderDashboardSkeleton />
      ) : (
        <div className="max-w-full p-4 space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <p className="text-muted-foreground">
              Manage service providers, customers, and bookings across the
              platform.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="max-w-full grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              title="Total Booking Revenue"
              value={`R${dashboardData.totalRevenue}`}
              description={dashboardData.revenueDescription}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <MetricCard
              title="Total Bookings"
              value={dashboardData.totalBookings}
              description={dashboardData.totalBookingsDescription}
              icon={<Calendar className="h-4 w-4" />}
            />
            <MetricCard
              title="Active Providers"
              value={dashboardData.activeProviders}
              description={dashboardData.activeProvidersDescription}
              icon={<Users className="h-4 w-4" />}
            />
            <MetricCard
              title="Pending Approvals"
              value={dashboardData.pendingApprovals}
              description={dashboardData.pendingApprovalsDescription}
              icon={<UserPlus className="h-4 w-4" />}
            />
            <MetricCard
              title="Customer Feedback"
              value={dashboardData.averageRating}
              description={`(${dashboardData.reviewCount} reviews)`}
              icon={<Star className="h-4 w-4" />}
              showStars={true}
              starCount={dashboardData.averageRating}
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
                  <RevenueChart data={dashboardData.monthlyRevenues} />
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
                  <ServiceDemandChart data={dashboardData.serviceDemands} />
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
                  <BookingsChart data={dashboardData.statusCount} />
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
                  {dashboardData.recentBookings.length === 0 ? (
                    <EmptyState />
                  ) : (
                    dashboardData.recentBookings.map((booking) => (
                      <div key={booking.id} className="mb-4 last:mb-0">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {booking.customerName.split(" ").map((s) => s[0])}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <h4 className="font-semibold">
                                {booking.customerName}
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
                              {booking.serviceName} - {booking.serviceTypeName}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/manage-bookings" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Bookings
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle>New Provider Applications</CardTitle>
                <CardDescription>Pending approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {dashboardData.latestPendingApprovals.length === 0 ? (
                    <EmptyState />
                  ) : (
                    dashboardData.latestPendingApprovals.map((application) => (
                      <div key={application.id} className="mb-4 last:mb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {(
                                  application.firstName?.trim().charAt(0) ?? ""
                                ).toUpperCase()}
                                {(
                                  application.lastName?.trim().charAt(0) ?? ""
                                ).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="font-semibold">
                                {application.firstName} {application.lastName}{" "}
                                <Badge
                                  className={`ml-2 ${
                                    application.status === "Approved"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : application.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }`}
                                >
                                  {application.status}
                                </Badge>
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {application.companyName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Applied:{" "}
                                {application.createdAt &&
                                !isNaN(new Date(application.createdAt))
                                  ? formatDistanceToNow(
                                      new Date(application.createdAt),
                                      { addSuffix: true }
                                    )
                                  : "Unknown"}
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
                    ))
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Link
                  to="/dashboard/manage-service-providers"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    View All Applications
                  </Button>
                </Link>
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
                <Link
                  to="/dashboard/manage-service-providers"
                  className="w-full"
                >
                  <Button className="justify-start">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Approve/Reject Providers
                  </Button>
                </Link>
                <Link to="/dashboard/manage-services" className="w-full">
                  <Button className="justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Manage Services
                  </Button>
                </Link>

                <Button className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Resolve Customer Complaints
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
