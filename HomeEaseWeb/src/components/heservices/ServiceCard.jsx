import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { StatusBadge } from "./StatusBadge";
import { Button } from "../ui/button";
import { Undo, Trash2 } from "lucide-react";
import { EditService } from "./EditService";
import { EditPricingOptions } from "./myservices/EditPricingOptions";
import { ServicDeletedBedge } from "./ServiceDeletedBadge";
import { DeleteServiceOffering } from "@/api";
import MyLoader from "../MyLoader";
import { useToast } from "@/hooks/use-toast";

export function ServiceCard({ service, setSubmitTrigger, serviceProviderId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleServiceOfferingDelete = async () => {
    setIsSubmitting(true);
    try {
      const result = await DeleteServiceOffering(
        serviceProviderId,
        service.serviceId
      );
      toast({
        description: "Service Offering has been updated successfully.",
      });
      setSubmitTrigger((prev) => !prev);
      setIsSubmitting(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      setIsSubmitting(false);
    }
  };
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{service.serviceName}</CardTitle>
          <StatusBadge status={service.status} />
        </div>
        <CardDescription className="text-xs">
          {service.companyName}
        </CardDescription>
        <ServicDeletedBedge isDeleted={service.isDeleted} />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-1 text-sm mb-2">
          <div className="text-muted-foreground">Base Price:</div>
          <div className="font-medium">R{service.rate}</div>
          <div className="text-muted-foreground">Available:</div>
          <div>{service.availability}</div>
        </div>
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
      <CardFooter className="p-2 gap-2">
        <EditPricingOptions
          service={service}
          setSubmitTrigger={setSubmitTrigger}
        />
        <Button
          variant={service.isDeleted ? "outline" : "destructive"}
          onClick={handleServiceOfferingDelete}
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <MyLoader />}
          {service.isDeleted ? (
            <Undo className="w-4 h-4" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {service.isDeleted ? "Restore" : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
