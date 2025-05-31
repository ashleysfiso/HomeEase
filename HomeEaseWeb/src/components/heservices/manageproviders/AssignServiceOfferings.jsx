import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "../StatusBadge";
import MyLoader from "@/components/MyLoader";
import { EditPricingOptions } from "../myservices/EditPricingOptions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { GetServiceOfferings, UpdateServiceOfferingStatus } from "@/api";

export default function AssignServiceOfferings() {
  const [filter, setFilter] = useState("Pending");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTriger, setSubmitTrigger] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await GetServiceOfferings();
        setServices(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [submitTriger]);

  const handleStatusChange = async (spId, sId, status) => {
    setIsSubmitting(true);
    try {
      const result = await UpdateServiceOfferingStatus({
        spId: spId,
        sId: sId,
        status: status,
      });
      /*toast({
        description: "Service Offering has been updated successfully.",
      });*/
      setSubmitTrigger((prev) => !prev);
      setIsSubmitting(false);
    } catch (error) {
      /*toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });*/
      setIsSubmitting(false);
    }
  };

  const filteredServices = services.filter(
    (service) => service.status === filter
  );
  return (
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
            <ToggleGroup
              type="single"
              value={filter}
              onValueChange={(value) => {
                setFilter(value);
              }}
            >
              <ToggleGroupItem value="Pending">Pending</ToggleGroupItem>
              <ToggleGroupItem value="Approved">Approved</ToggleGroupItem>
              <ToggleGroupItem value="Rejected">Rejected</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="border rounded-md p-4 bg-muted/20">
            {isLoading ? (
              <div className="flex justify-center">
                <MyLoader />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between w-full p-4 rounded-xl border shadow-sm space-x-4">
                      <div className="flex flex-col space-y-1">
                        <p className="text-lg font-semibold text-gray-900">
                          {service.companyName}
                        </p>
                        <StatusBadge status={service.status} />
                      </div>

                      <Badge>{service.serviceName}</Badge>
                      <EditPricingOptions
                        service={service}
                        setSubmitTrigger={setSubmitTrigger}
                      />
                      {service.status !== "Rejected" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          disabled={isSubmitting}
                          onClick={() =>
                            handleStatusChange(
                              service.serviceProviderId,
                              service.serviceId,
                              "Rejected"
                            )
                          }
                        >
                          {isSubmitting && <MyLoader />}
                          Reject
                        </Button>
                      )}
                      {service.status !== "Approved" && (
                        <Button
                          size="sm"
                          disabled={isSubmitting}
                          onClick={() =>
                            handleStatusChange(
                              service.serviceProviderId,
                              service.serviceId,
                              "Approved"
                            )
                          }
                        >
                          {isSubmitting && <MyLoader />}
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
