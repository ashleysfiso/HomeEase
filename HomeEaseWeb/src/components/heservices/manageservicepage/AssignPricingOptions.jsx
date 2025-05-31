import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckSquare, XSquare, UserPlus, Link, Loader2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { CreatePricingOption, DeletePricingOption } from "@/api";
import EmptyState from "@/components/EmptyState";
import MyLoader from "@/components/MyLoader";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";

export default function AssignPricingOptions({ services, setSubmitTrigger }) {
  const [service, setService] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [optionName, setOptionName] = useState("");
  const [unitLabel, setUnitLabel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (serviceType) {
      const service = services.find((s) =>
        s.serviceTypes.some((type) => type.id === serviceType.id)
      );
      if (service) {
        const found = service.serviceTypes.find(
          (st) => st.id === serviceType.id
        );
        setServiceType(found ?? null);
      }
    }
  }, [services]);

  const handleAssignPricingOption = async () => {
    setIsSubmitting(true);
    if (!serviceType) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select a service and a service type. ",
      });
      setIsSubmitting(false);
    } else if (!optionName.trim()) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please enter a valid pricing option name",
      });
      setIsSubmitting(false);
    } else if (!unitLabel.trim()) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please enter a valid unit label",
      });
      setIsSubmitting(false);
    } else {
      try {
        const result = await CreatePricingOption({
          serviceTypeId: serviceType.id,
          name: optionName,
          unitLabel: unitLabel,
        });
        setSubmitTrigger((prev) => !prev);
        toast({
          description: "Pricing option has been created successfully.",
        });
        setIsSubmitting(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
        setIsSubmitting(false);
      }
    }
  };

  const handleDeletePricingOption = async (id) => {
    setIsSubmitting(true);
    try {
      const res = await DeletePricingOption(id);
      toast({
        description: `Service type ${res?.name} has been deleted successfully.`,
      });
      setIsSubmitting(false);
      setSubmitTrigger((prev) => !prev);
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
      <CardHeader>
        <CardTitle>Assign Pricing Options</CardTitle>
        <CardDescription>
          Configure and manage pricing options for each service type to reflect
          accurate costs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Service</label>
              <Select
                onValueChange={(value) => {
                  setServiceType(null);
                  setService(null);
                  const service = services.find(
                    (s) => s.id.toString() === value
                  );
                  setService(service ?? null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {service && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select Service Type
                </label>
                <Select
                  onValueChange={(value) => {
                    const service = services.find((s) =>
                      s.serviceTypes.some(
                        (type) => type.id.toString() === value
                      )
                    );
                    const serviceType = service.serviceTypes.find(
                      (st) => st.id.toString() === value
                    );
                    setServiceType(serviceType ?? null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {service.serviceTypes.map((serviceType) => (
                      <SelectItem
                        key={serviceType.id}
                        value={serviceType.id.toString()}
                      >
                        {serviceType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {serviceType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Pricing Option Name
                </label>
                <Input
                  placeholder="e.g., 1–3 Bedrooms, 5+ Bathrooms, Up to 5 Hours"
                  value={optionName}
                  onChange={(e) => {
                    setOptionName(e.target.value);
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Unit Label</label>
                <Input
                  placeholder="e.g., Bedrooms, Bathrooms, Hours"
                  value={unitLabel}
                  onChange={(e) => {
                    setUnitLabel(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="border rounded-md p-4 bg-muted/20">
            <h4 className="font-medium mb-2">
              Current Options Assignments {serviceType && serviceType.name}
            </h4>
            <div className="space-y-4">
              {serviceType && serviceType.pricingOptions.length === 0 ? (
                <EmptyState message="No pricing options available yet." />
              ) : (
                serviceType &&
                serviceType.pricingOptions.map((po, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex-col justify-center space-y-2">
                      <Badge>{po.labelUnit}</Badge>
                      {po.options.map((o) => (
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{o.name}</p>
                          <DeleteAlertDialog
                            isLoading={isSubmitting}
                            handelAction={handleDeletePricingOption}
                            id={o.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button disabled={isSubmitting} onClick={handleAssignPricingOption}>
              {isSubmitting ? (
                <MyLoader />
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Assign Pricing Option
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
