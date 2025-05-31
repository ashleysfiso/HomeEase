import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, XSquare, UserPlus, Link, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GetServiceProviders } from "@/api";
import TableSkeleton from "@/components/TableSkeleton";
import { MyPagination } from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateStatus,
  UpdatePendingApprovalStatus,
  ApproveServiceProviderApplication,
} from "@/api";
import { GetPendingApprovals } from "@/api";
import { formatReadableDate } from "@/utils";
import EmptyState from "@/components/EmptyState";
import AssignServiceOfferings from "@/components/heservices/manageproviders/AssignServiceOfferings";
import { ScrollRestoration } from "react-router-dom";

export function ManageProvidersPage({ section }) {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPendingApprovalsLoading, setIsPendingApprovalLoading] =
    useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [submitTriger, setSubmitTrigger] = useState(true);
  const [isUpdateProviderLoading, setIsUpdateProviderLoading] = useState(false);
  const { toast } = useToast();
  const itemsPerPage = 7;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredProviders = serviceProviders.filter((provider) =>
    provider.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProviders = filteredProviders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const result = await GetServiceProviders();
        setServiceProviders(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPendingApprovals = async () => {
      try {
        const result = await GetPendingApprovals();
        setPendingApprovals(result);
        setIsPendingApprovalLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServiceProviders();
    fetchPendingApprovals();
  }, [submitTriger]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleUpdateStatus = async (id, status) => {
    setIsUpdateProviderLoading(true);
    try {
      const res = await UpdateStatus(id, status);
      setIsUpdateProviderLoading(false);
      setSubmitTrigger((prev) => !prev);
      toast({
        title: "Success",
        description: `The service provider ${res.companyName} was successfully updated to ${res.status}`,
        duration: 10000,
      });
    } catch (err) {
      setIsUpdateProviderLoading(false);
      toast({
        title: "Error",
        description: `${err}`,
        variant: "destructive",
        duration: 10000,
      });
    }
  };

  const handlePendingApprovalStatus = async (id, status) => {
    setIsUpdateProviderLoading(true);
    try {
      const res = await UpdatePendingApprovalStatus(id, status);
      setIsUpdateProviderLoading(false);
      setSubmitTrigger((prev) => !prev);
      toast({
        title: "Success",
        description: `The service provider ${res.companyName} was successfully updated to ${res.status}`,
        duration: 10000,
      });
    } catch (err) {
      setIsUpdateProviderLoading(false);
      toast({
        title: "Error",
        description: `${err}`,
        variant: "destructive",
        duration: 10000,
      });
    }
  };

  const handleApprovePendingApproval = async (details, id) => {
    setIsUpdateProviderLoading(true);
    try {
      const res = await ApproveServiceProviderApplication(details);

      await handlePendingApprovalStatus(id, "Approved");
    } catch (err) {
      setIsUpdateProviderLoading(false);
      const errorMessage = err.message[0].description;
      console.error(`Response from function${errorMessage}`);
      toast({
        title: "Error",
        description: `${err.message[0].description}`,
        variant: "destructive",
        duration: 10000,
      });
    }
  };

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

      <Tabs defaultValue="all-providers" className="w-full space-y-4">
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
                <Input
                  onChange={handleSearchTermChange}
                  className="max-w-sm"
                  placeholder="Search providers..."
                />
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Provider
                </Button>
              </div>
              {isLoading ? (
                <TableSkeleton />
              ) : (
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
                      {paginatedProviders.map((provider, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {provider.companyName
                                    .split(" ")
                                    .map((s) => s[0])}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {provider.companyName}
                                </div>
                                {/*<div className="text-xs text-muted-foreground">
                                {provider.email}
                              </div>*/}
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
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {provider.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              {provider.status === "Active" ? (
                                <AlertDialog>
                                  <AlertDialogTrigger
                                    disabled={isUpdateProviderLoading}
                                  >
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-500"
                                    >
                                      {isUpdateProviderLoading ? (
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                      ) : (
                                        "Suspend"
                                      )}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action will temporarily disable
                                        this service provider's account. While
                                        suspended, all services linked to this
                                        provider will be inaccessible, and no
                                        new services can be activated.
                                        Historical data and configurations will
                                        remain stored securely.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          handleUpdateStatus(
                                            provider.id,
                                            "Suspended",
                                            provider.companyName
                                          );
                                        }}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <AlertDialog>
                                  <AlertDialogTrigger
                                    disabled={isUpdateProviderLoading}
                                  >
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-green-500"
                                    >
                                      {isUpdateProviderLoading ? (
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                      ) : (
                                        "Reactivate"
                                      )}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will restore full access to the
                                        provider's account. Upon reactivation,
                                        the provider can resume managing
                                        services, and all associated data,
                                        resources, and functionality will be
                                        reinstated immediately.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          handleUpdateStatus(
                                            provider.id,
                                            "Active",
                                            provider.companyName
                                          );
                                        }}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <MyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </CardFooter>
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
                {isPendingApprovalsLoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  </div>
                ) : pendingApprovals.length === 0 ? (
                  <EmptyState message="There are currently no new service provider applications awaiting review or approval. Please check back later." />
                ) : (
                  pendingApprovals.map((application) => (
                    <Card key={application.id} className="overflow-hidden">
                      <div className="p-4 border-b bg-muted/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {application.fullName
                                  .split(" ")
                                  .map((s) => s[0])}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">
                                {application.fullName}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {application.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              Applied:{" "}
                              {formatReadableDate(application.createdAt)}
                            </Badge>
                            <Badge
                              className={
                                "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              Pending
                            </Badge>
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
                          <h5 className="font-medium mb-2">Company Name</h5>
                          <p className="text-sm text-muted-foreground">
                            {application.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/10 flex justify-end space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger
                            disabled={isUpdateProviderLoading}
                          >
                            <Button variant="outline" size="sm">
                              {isUpdateProviderLoading ? (
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                              ) : (
                                <>
                                  <XSquare className="mr-2 h-4 w-4 text-red-500" />
                                  Reject
                                </>
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will reject the application to become a
                                provider. The applicant will not be granted
                                access to manage services or access
                                provider-specific features.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handlePendingApprovalStatus(
                                    application.id,
                                    "Rejected"
                                  );
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger
                            disabled={isUpdateProviderLoading}
                          >
                            <Button size="sm">
                              {isUpdateProviderLoading ? (
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                              ) : (
                                <>
                                  <CheckSquare className="mr-2 h-4 w-4" />
                                  Approve
                                </>
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will approve the application. The applicant
                                will gain full access to the provider dashboard,
                                allowing them to manage services and utilize all
                                provider-specific features immediately.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleApprovePendingApproval(
                                    {
                                      fullName: application.fullName,
                                      email: application.email,
                                      phoneNumber: application.phoneNumber,
                                      companyName: application.companyName,
                                    },
                                    application.id
                                  );
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assign Services Tab */}
        <TabsContent value="assign-services" className="space-y-4">
          <AssignServiceOfferings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
