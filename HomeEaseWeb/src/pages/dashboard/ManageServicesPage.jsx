import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { GetAvailableServices } from "@/api";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { AddNewService, UpdateService, DeleteService } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { MyPagination } from "@/components/Pagination";
import AssignServiceTypes from "@/components/heservices/manageservicepage/AssignServiceTypes";
import AssignPricingOptions from "@/components/heservices/manageservicepage/AssignPricingOptions";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("service-name");
  const formType = formData.get("formType");
  const basePrice = formData.get("service-price");
  const description = formData.get("service-description");
  const serviceId = formData.get("serviceId");

  try {
    if (formType === "Add") {
      const data = await AddNewService({
        name: name,
        description: description,
        basePrice: basePrice,
      });
      return {
        success: `The service ${data?.name} was successfully created with a base price of R${data?.basePrice}.`,
      };
    }
    if (formType === "Update") {
      if (
        name === "" ||
        basePrice === null ||
        basePrice === undefined ||
        description === ""
      ) {
        return {
          error: "Please fill out all fields correctly.",
        };
      }
      const data = await UpdateService({
        id: serviceId,
        name: name,
        description: description,
        basePrice: basePrice,
      });
      return {
        success: `The service ${data?.name} was successfully Updated with a base price of R${data?.basePrice}.`,
      };
    }
  } catch (err) {
    return {
      error: "Something went wrong on our end. Please try again later.",
    };
  }
}

export function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all-services");
  const [searchTerm, setSearchTerm] = useState("");
  const [submitTriger, setSubmitTrigger] = useState(true);
  const [serviceId, setServiceId] = useState();
  const [serviceName, setServiceName] = useState("Service Name");
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceDescription, setServiceDescription] = useState("");
  const [isDeleteServiceLoading, setIsDeleteServiceLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();
  const { toast } = useToast();
  const addServiceResponse = useActionData();
  const itemsPerPage = 7;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredServices = services.filter((service) => {
    return service.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginatedServices = filteredServices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const services = await GetAvailableServices();
      setServices(services);
      setIsLoading(false);
      console.log(services);
    };

    fetchData();
  }, [submitTriger]);

  useEffect(() => {
    if (addServiceResponse?.success) {
      toast({
        title: "Success",
        description: addServiceResponse.success,
        duration: 10000,
      });
      setIsLoading(true);
      setSubmitTrigger((prev) => !prev);
      setActiveTab("all-services");
    }
    if (addServiceResponse?.error) {
      toast({
        title: "Error",
        description: addServiceResponse.error,
        variant: "destructive",
        duration: 10000,
      });
    }
  }, [addServiceResponse]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteService = async (id) => {
    setIsDeleteServiceLoading(true);
    try {
      const result = await DeleteService(id);
      toast({
        title: "Success",
        description: `The service ${result?.name} was successfully Deleted.`,
        duration: 10000,
      });
      setIsDeleteServiceLoading(false);
      setSubmitTrigger((prev) => !prev);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong on our end. Please try again later.",
        variant: "destructive",
        duration: 10000,
      });
      setIsDeleteServiceLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Services</h2>
        <p className="text-muted-foreground">
          Add, edit, and manage services offered on the platform.
        </p>
      </div>

      <Tabs
        defaultValue="all-services"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all-services">All Services</TabsTrigger>
          <TabsTrigger value="add-new-service">Add New Service</TabsTrigger>
          <TabsTrigger value="assign-service-type">
            Assign Service Type
          </TabsTrigger>
          <TabsTrigger value="assign-pricing-option">
            Assign Pricing Option
          </TabsTrigger>
          <TabsTrigger
            value="update-service"
            className="pointer-events-none opacity-50"
          >
            Update Service
          </TabsTrigger>
        </TabsList>

        {/* All Services Tab */}
        <TabsContent value="all-services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Services</CardTitle>
              <CardDescription>
                View and manage all services offered on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input
                  value={searchTerm}
                  className="w-full mr-4"
                  placeholder="Search services..."
                  onChange={handleSearchTermChange}
                />
                <Button
                  onClick={() => {
                    setActiveTab("add-new-service");
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                </div>
              ) : (
                <div className="border w-full rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">
                          Service Name
                        </th>
                        <th className="p-2 text-left font-medium">
                          Description
                        </th>
                        <th className="p-2 text-left font-medium">Price</th>
                        <th className="p-2 text-left font-medium">Status</th>
                        <th className="p-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedServices.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="p-2">{service.name}</td>
                          <td>
                            {" "}
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="cursor-pointer">
                                  <p
                                    className="text-xs text-muted-foreground whitespace-pre-wrap overflow-hidden"
                                    style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: 4,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {service.description}
                                  </p>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="max-w-md">
                                <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                                  {service.description}
                                </p>
                              </PopoverContent>
                            </Popover>
                          </td>
                          <td className="p-2">R{service.basePrice}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                service.isDeleted === false
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {service.isDeleted === false
                                ? "Active"
                                : "Deleted"}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button
                                id={service.id}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setServiceId(service.id);
                                  setServiceName(service.name);
                                  setServicePrice(service.basePrice);
                                  setServiceDescription(service.description);
                                  setActiveTab("update-service");
                                }}
                              >
                                Edit
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger
                                  disabled={isDeleteServiceLoading}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500"
                                  >
                                    {isDeleteServiceLoading ? (
                                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    ) : (
                                      "Delete"
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete this service and remove
                                      this service's data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        handleDeleteService(service.id);
                                      }}
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <MyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add New Service Tab */}
        <TabsContent value="add-new-service" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
              <CardDescription>
                Create a new service to offer on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="POST" className="space-y-4">
                <input
                  id="formType"
                  name="formType"
                  value="Add"
                  className="hidden"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input
                      id="service-name"
                      name="service-name"
                      placeholder="e.g. House Cleaning"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Base Price (R)</Label>
                    <Input
                      id="service-price"
                      name="service-price"
                      type="number"
                      placeholder="e.g. 99.99"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-description">Description</Label>
                  <Textarea
                    id="service-description"
                    name="service-description"
                    placeholder="Describe the service in detail..."
                    required
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? (
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    ) : (
                      ""
                    )}{" "}
                    Create Service
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Update Service Tab */}
        <TabsContent value="update-service" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Update Service</CardTitle>
              <CardDescription>Edit Service Information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="POST" className="space-y-4">
                <input
                  id="formType"
                  name="formType"
                  value="Update"
                  className="hidden"
                />
                <input
                  id="serviceId"
                  name="serviceId"
                  value={serviceId}
                  className="hidden"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input
                      id="service-name"
                      name="service-name"
                      value={serviceName}
                      placeholder="e.g. House Cleaning"
                      required
                      onChange={(e) => {
                        setServiceName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Base Price (R)</Label>
                    <Input
                      id="service-price"
                      name="service-price"
                      value={servicePrice}
                      type="number"
                      placeholder="e.g. 99.99"
                      onChange={(e) => {
                        setServicePrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-description">Description</Label>
                  <Textarea
                    id="service-description"
                    name="service-description"
                    value={serviceDescription}
                    placeholder="Describe the service in detail..."
                    required
                    rows={4}
                    onChange={(e) => {
                      setServiceDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? (
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    ) : (
                      ""
                    )}{" "}
                    Update Service
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assign-service-type" className="space-y-4">
          <AssignServiceTypes
            services={services}
            setSubmitTrigger={setSubmitTrigger}
          />
        </TabsContent>

        <TabsContent value="assign-pricing-option" className="space-y-4">
          <AssignPricingOptions
            services={services}
            setSubmitTrigger={setSubmitTrigger}
          />
        </TabsContent>

        {/* Service Categories Tab */}
        {/*<TabsContent value="service-categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
              <CardDescription>
                Manage service categories and subcategories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input
                  className="max-w-sm"
                  placeholder="Search categories..."
                />
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>

              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">
                        Category Name
                      </th>
                      <th className="p-2 text-left font-medium">
                        Services Count
                      </th>
                      <th className="p-2 text-left font-medium">Status</th>
                      <th className="p-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesData.map((category) => (
                      <tr key={category.id} className="border-b">
                        <td className="p-2">{category.name}</td>
                        <td className="p-2">{category.servicesCount}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              category.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {category.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                            >
                              Delete
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
        </TabsContent>*/}
      </Tabs>
    </div>
  );
}
