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
import { CheckSquare, XSquare, UserPlus, Link } from "lucide-react";
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

export function ManageProvidersPage({ section }) {
  return (
    <div className="flex-row items-center w-full p-4 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Manage Service Providers
        </h2>
        <p className="text-muted-foreground">
          View, approve, and manage service providers on the platform.
        </p>
      </div>

      <Tabs defaultValue={section} className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="all-providers">All Providers</TabsTrigger>
          <TabsTrigger value="pending-approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="assign-services">Assign Services</TabsTrigger>
        </TabsList>

        {/* All Providers Tab */}
        <TabsContent value="all-providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Service Providers</CardTitle>
              <CardDescription>
                View and manage all service providers on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input className="max-w-sm" placeholder="Search providers..." />
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Provider
                </Button>
              </div>

              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Provider</th>
                      <th className="p-2 text-left font-medium">Services</th>
                      <th className="p-2 text-left font-medium">Rating</th>
                      <th className="p-2 text-left font-medium">Status</th>
                      <th className="p-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providersData.map((provider) => (
                      <tr key={provider.id} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {provider.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{provider.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {provider.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {provider.services.map((service, index) => (
                              <Badge key={index} variant="outline">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center">
                            <span className="font-medium">
                              {provider.rating}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              ({provider.reviewCount})
                            </span>
                          </div>
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              provider.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : provider.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {provider.status}
                          </span>
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
                              Suspend
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

        {/* Pending Approvals Tab */}
        <TabsContent value="pending-approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Review and approve new service provider applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((application) => (
                  <Card key={application.id} className="overflow-hidden">
                    <div className="p-4 border-b bg-muted/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {application.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">
                              {application.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {application.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            Applied: {application.date}
                          </Badge>
                          <Badge>{application.service}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Experience</h5>
                        <p className="text-sm text-muted-foreground">
                          {application.experience}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Qualifications</h5>
                        <p className="text-sm text-muted-foreground">
                          {application.qualifications}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/10 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <XSquare className="mr-2 h-4 w-4 text-red-500" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assign Services Tab */}
        <TabsContent value="assign-services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assign Services</CardTitle>
              <CardDescription>
                Assign services to qualified providers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Select Provider
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providersData
                          .filter((provider) => provider.status === "Active")
                          .map((provider) => (
                            <SelectItem
                              key={provider.id}
                              value={provider.id.toString()}
                            >
                              {provider.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Select Service
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesData.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.id.toString()}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-md p-4 bg-muted/20">
                  <h4 className="font-medium mb-2">Current Assignments</h4>
                  <div className="space-y-4">
                    {serviceAssignments.map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {assignment.providerInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {assignment.providerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {assignment.providerEmail}
                            </p>
                          </div>
                        </div>
                        <Badge>{assignment.service}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Link className="mr-2 h-4 w-4" />
                    Assign Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data for providers
const providersData = [
  {
    id: 1,
    name: "John Smith",
    initials: "JS",
    email: "john.smith@example.com",
    services: ["House Cleaning", "Deep Cleaning"],
    rating: 4.8,
    reviewCount: 124,
    status: "Active",
  },
  {
    id: 2,
    name: "Robert Davis",
    initials: "RD",
    email: "robert.davis@example.com",
    services: ["Plumbing Repair"],
    rating: 4.6,
    reviewCount: 87,
    status: "Active",
  },
  {
    id: 3,
    name: "David Miller",
    initials: "DM",
    email: "david.miller@example.com",
    services: ["Electrical Work"],
    rating: 4.9,
    reviewCount: 56,
    status: "Active",
  },
  {
    id: 4,
    name: "Lisa Anderson",
    initials: "LA",
    email: "lisa.anderson@example.com",
    services: ["Gardening"],
    rating: 4.7,
    reviewCount: 42,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Thomas Wilson",
    initials: "TW",
    email: "thomas.wilson@example.com",
    services: ["Plumbing Services"],
    rating: 0,
    reviewCount: 0,
    status: "Pending",
  },
];

// Sample data for pending applications
const pendingApplications = [
  {
    id: 1,
    name: "Thomas Wilson",
    initials: "TW",
    email: "thomas.wilson@example.com",
    service: "Plumbing Services",
    date: "2 days ago",
    experience:
      "5 years of experience as a licensed plumber with expertise in residential and commercial plumbing systems.",
    qualifications:
      "Licensed Plumber, Certified by National Plumbing Association",
  },
  {
    id: 2,
    name: "Jessica Martinez",
    initials: "JM",
    email: "jessica.martinez@example.com",
    service: "House Cleaning",
    date: "3 days ago",
    experience:
      "3 years working with a professional cleaning company and 2 years of independent house cleaning services.",
    qualifications: "Certified in eco-friendly cleaning techniques",
  },
  {
    id: 3,
    name: "Daniel Johnson",
    initials: "DJ",
    email: "daniel.johnson@example.com",
    service: "Electrical Services",
    date: "5 days ago",
    experience:
      "7 years as an electrician working on residential and commercial projects.",
    qualifications:
      "Licensed Electrician, Certified in Smart Home Installation",
  },
];

// Sample data for service assignments
const serviceAssignments = [
  {
    providerName: "John Smith",
    providerInitials: "JS",
    providerEmail: "john.smith@example.com",
    service: "House Cleaning",
  },
  {
    providerName: "John Smith",
    providerInitials: "JS",
    providerEmail: "john.smith@example.com",
    service: "Deep Cleaning",
  },
  {
    providerName: "Robert Davis",
    providerInitials: "RD",
    providerEmail: "robert.davis@example.com",
    service: "Plumbing Repair",
  },
  {
    providerName: "David Miller",
    providerInitials: "DM",
    providerEmail: "david.miller@example.com",
    service: "Electrical Work",
  },
];

// Sample data for services
const servicesData = [
  { id: 1, name: "House Cleaning" },
  { id: 2, name: "Deep Cleaning" },
  { id: 3, name: "Plumbing Repair" },
  { id: 4, name: "Electrical Work" },
  { id: 5, name: "Gardening" },
];
