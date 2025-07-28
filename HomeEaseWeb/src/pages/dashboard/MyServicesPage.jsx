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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServiceCard } from "@/components/heservices/ServiceCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  GetAvailableServices,
  GetServiceProviderServiceOfferings,
} from "@/api";
import PricingInputs from "@/components/heservices/myservices/PricingInputs";
import EmptyState from "@/components/EmptyState";

export default function MyServices() {
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [serviceOfferings, setServiceOfferings] = useState([]);
  const [service, setService] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [rate, setRate] = useState();
  const [availability, setAvailablility] = useState();
  const [activeTab, setActiveTab] = useState("my-services");
  const [submitTrigger, setSubmitTrigger] = useState(false);
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

    const fetchServiceOfferings = async () => {
      try {
        const result = await GetServiceProviderServiceOfferings(
          serviceProviderId
        );
        setServiceOfferings(result);
        setIsServicesLoading(false);
      } catch (error) {
        console.log(error);
        setIsServicesLoading(false);
      }
    };

    if (serviceProviderId) {
      fetchServiceOfferings();
      fetchAvailableServices();
    }
  }, [serviceProviderId, submitTrigger]);

  const handleAddServiceClick = (service) => {
    setService(service);
    setActiveTab("service-details");
  };

  return (
    <div className="space-y-6">
      <div className="flex-col items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
        <p className="text-muted-foreground">
          Add, edit, and manage services you offer on the platform.
        </p>
      </div>

      <Tabs
        defaultValue="my-services"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="my-services">My Services</TabsTrigger>
          <TabsTrigger value="add-service">Add Service</TabsTrigger>
        </TabsList>

        <TabsContent value="my-services" className="space-y-4">
          {isServicesLoading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            </div>
          ) : serviceOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceOfferings.map((service) => (
                <ServiceCard
                  key={service.serviceId}
                  service={service}
                  setSubmitTrigger={setSubmitTrigger}
                  serviceProviderId={serviceProviderId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <EmptyState message="You haven't added any services yet." />
              <Button
                onClick={() => setActiveTab("add-service")}
                className="mt-4"
                variant="outline"
              >
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleAddServiceClick(service)}
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="cursor-pointer">
                          <p
                            className="text-xs text-muted-foreground whitespace-pre-wrap overflow-hidden"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 8,
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
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="service-details">
          {service && (
            <PricingInputs
              service={service}
              serviceProviderId={serviceProviderId}
              setSubmitTrigger={setSubmitTrigger}
              setActiveTab={setActiveTab}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
