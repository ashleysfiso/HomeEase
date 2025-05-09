import React, { useState, useEffect } from "react";
import {
  Clock,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServiceCard } from "@/components/heservices/ServiceCard";
import { useAuth } from "@/contexts/AuthContext";
import { GetAvailableServices } from "@/api";
import { Form } from "react-router-dom";

const servicess = [
  {
    serviceId: 1,
    serviceProviderId: 1,
    serviceName: "Home Cleaning",
    companyName: "CleanPro Services",
    rate: 200,
    availability: "Mon-Sat",
    description:
      "Basic cleaning for homes, including: 🏡 Dusting 🧹 Vacuuming 🏠 Mopping 🍽️ Kitchen Cleaning 🚽 Bathroom Sanitation",
    imgURL: null,
    status: "approved",
  },
  {
    serviceId: 2,
    serviceProviderId: 1,
    serviceName: "Office Cleaning",
    companyName: "CleanPro Services",
    rate: 350,
    availability: "Mon-Fri",
    description:
      "Professional cleaning for offices and commercial spaces: 🏢 Dusting 🧹 Vacuuming 🧽 Surface Cleaning 🚽 Restroom Maintenance",
    imgURL: null,
    status: "approved",
  },
  {
    serviceId: 3,
    serviceProviderId: 1,
    serviceName: "Deep Cleaning",
    companyName: "CleanPro Services",
    rate: 500,
    availability: "Weekends",
    description:
      "Thorough deep cleaning service: 🧼 Cabinet Cleaning 🚿 Shower Descaling 🧫 Appliance Cleaning 🪟 Window Washing",
    imgURL: null,
    status: "pending",
  },
];

const serviceTemplates = [
  {
    id: 1,
    name: "Home Cleaning",
    description:
      "Regular cleaning services for residential homes including dusting, vacuuming, and bathroom cleaning.",
  },
  {
    id: 2,
    name: "Office Cleaning",
    description:
      "Professional cleaning for office spaces and commercial buildings.",
  },
  {
    id: 3,
    name: "Deep Cleaning",
    description:
      "Thorough cleaning service for homes that need extra attention to detail.",
  },
  {
    id: 4,
    name: "Move-in/Move-out Cleaning",
    description:
      "Comprehensive cleaning service for when you're moving in or out of a property.",
  },
  {
    id: 5,
    name: "Window Cleaning",
    description: "Professional window cleaning for homes and businesses.",
  },
  {
    id: 6,
    name: "Carpet Cleaning",
    description:
      "Deep cleaning for carpets to remove stains, dirt, and allergens.",
  },
];

export default function MyServices() {
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [rate, setRate] = useState();
  const [availability, setAvailablility] = useState();
  const { user } = useAuth();

  const serviceProviderId = user?.providerId;

  useEffect(() => {
    const fetchAvailableServices = async () => {
      try {
        const result = await GetAvailableServices();
        setServices(result);
        console.log(result);
        setIsServicesLoading(false);
        console.log(isServicesLoading);
      } catch (error) {
        console.log(error);
        setIsServicesLoading(false);
      }
    };

    if (serviceProviderId) {
      fetchAvailableServices();
      console.log(serviceProviderId);
    }
  }, [serviceProviderId]);

  const handleAddServiceClick = (id) => {
    setOpenPopoverId(id);
    setServiceId(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex-col items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
        <p className="text-muted-foreground">
          Add, edit, and manage services you offer on the platform.
        </p>
      </div>

      <Tabs defaultValue="my-services" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="my-services">My Services</TabsTrigger>
          <TabsTrigger value="add-service">Add Service</TabsTrigger>
        </TabsList>

        <TabsContent value="my-services" className="space-y-4">
          {isServicesLoading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            </div>
          ) : servicess.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicess.map((service) => (
                <ServiceCard key={service.serviceId} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">
                You haven't added any services yet.
              </p>
              <Button className="mt-4" variant="outline">
                Add Your First Service
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="add-service">
          <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200 mb-6">
            <Clock className="h-4 w-4" />
            <AlertTitle>Approval Required</AlertTitle>
            <AlertDescription>
              New services require approval before they become visible to
              customers. Our team will review your submission within 1-2
              business days.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            {isServicesLoading ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              </div>
            ) : (
              services.map((service) => (
                <Card key={service.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Popover
                        open={openPopoverId === service.id}
                        onOpenChange={(open) => {
                          if (!open) {
                            //setPopoverOpen(false);
                            //(null);
                            setOpenPopoverId(null);
                            setServiceId(null);
                            setAvailablility(null);
                            //setRate(null);
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleAddServiceClick(service.id)}
                          >
                            <Plus className="h-4 w-4" />
                            Add
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4" align="end">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-bold leading-none">
                                Add {service.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Provide additional details to add this service.
                              </p>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block mb-1 text-sm font-medium">
                                  Base Price (R)
                                </label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-9"
                                    type="Number"
                                    value={rate}
                                    placeholder="e.g., 200"
                                    required
                                    onChange={(e) => setRate(e.target.value)}
                                  />
                                </div>
                              </div>

                              <Select
                                value={availability}
                                onValueChange={(value) => {
                                  setAvailablility(value);
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <SelectValue placeholder="Select availability (e.g., Mon-Fri, 8am-5pm)" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mon-fri-8-5">
                                    Mon–Fri, 8am–5pm
                                  </SelectItem>
                                  <SelectItem value="mon-sat-9-6">
                                    Mon–Sat, 9am–6pm
                                  </SelectItem>
                                  <SelectItem value="mon-sun-9-6">
                                    Mon–Sun, 9am–6pm
                                  </SelectItem>
                                  <SelectItem value="weekends-10-4">
                                    Weekends, 10am–4pm
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setOpenPopoverId(null);
                                    setServiceId(null);
                                    setAvailablility(null);
                                    //setRate(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button type="button" size="sm">
                                  Add Service
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
