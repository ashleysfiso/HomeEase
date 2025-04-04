import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetAvailableServices } from "@/api";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { AddNewService } from "@/api";
import { useToast } from "@/hooks/use-toast";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("service-name");
  const basePrice = formData.get("service-price");
  const description = formData.get("service-description");

  try {
    const data = await AddNewService({
      name: name,
      description: description,
      basePrice: basePrice,
    });
    return {
      success: `The service ${data.name} was successfully created with a base price of R${data.basePrice}.`,
    };
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
  const [submitTriger, setSubmitTrigger] = useState(true);
  const navigation = useNavigation();
  const { toast } = useToast();
  const addServiceResponse = useActionData();

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
      toast({ title: "Success", description: addServiceResponse.success });
      setIsLoading(true);
      setSubmitTrigger((prev) => !prev);
      setActiveTab("all-services");
    }
    if (addServiceResponse?.error) {
      toast({
        title: "Error",
        description: addServiceResponse.error,
        variant: "destructive",
      });
    }
  }, [addServiceResponse]);
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
          {/*<TabsTrigger value="service-categories">
            Service Categories
          </TabsTrigger>*/}
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
                <Input className="w-full" placeholder="Search services..." />
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
                        <th className="p-2 text-left font-medium">Price</th>
                        <th className="p-2 text-left font-medium">Status</th>
                        <th className="p-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="p-2">{service.name}</td>
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
              )}
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
