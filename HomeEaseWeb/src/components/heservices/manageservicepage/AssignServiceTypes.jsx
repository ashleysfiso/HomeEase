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
import { CreateServiceType, DeleteServiceType } from "@/api";
import EmptyState from "@/components/EmptyState";
import MyLoader from "@/components/MyLoader";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";

export default function AssignServiceTypes({ services, setSubmitTrigger }) {
  const [service, setService] = useState(null);
  const [serviceTypeName, setServiceTypeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (service) {
      const found = services.find((s) => s.id === service.id);
      setService(found ?? null);
    }
  }, [services]);

  const handleAssignServiceType = async () => {
    setIsSubmitting(true);
    if (!service) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select a service. ",
      });
      setIsSubmitting(false);
    } else if (!serviceTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please enter a valid service type name.",
      });
      setIsSubmitting(false);
    } else {
      try {
        const result = await CreateServiceType({
          serviceId: service.id,
          name: serviceTypeName,
        });
        setSubmitTrigger((prev) => !prev);
        toast({
          description: "Service type has been created successfully.",
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

  const handleDeleteServcieType = async (id) => {
    setIsSubmitting(true);
    try {
      const res = await DeleteServiceType(id);
      toast({
        description: `Service type ${res.name} has been deleted successfully.`,
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
        <CardTitle>Assign Service Types</CardTitle>
        <CardDescription>
          Link specific service types to a selected service for better
          categorization and management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Service</label>
              <Select
                onValueChange={(value) => {
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type Name</label>
              <Input
                placeholder="Enter service type name (e.g., DeepCleaning, ElectricalRepair)"
                value={serviceTypeName}
                onChange={(e) => {
                  setServiceTypeName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="border rounded-md p-4 bg-muted/20">
            <h4 className="font-medium mb-2">Current Assignments</h4>
            <div className="space-y-4">
              {service && service.serviceTypes.length === 0 ? (
                <EmptyState message="No service types available yet." />
              ) : (
                service &&
                service.serviceTypes.map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="font-medium">{type.name}</p>
                      </div>
                    </div>
                    <Badge>{service.name}</Badge>
                    <DeleteAlertDialog
                      isLoading={isSubmitting}
                      handelAction={handleDeleteServcieType}
                      id={type.id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button disabled={isSubmitting} onClick={handleAssignServiceType}>
              {isSubmitting ? (
                <MyLoader />
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Assign Service Type
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
