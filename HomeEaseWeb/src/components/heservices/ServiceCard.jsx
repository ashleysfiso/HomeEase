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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { StatusBadge } from "./StatusBadge";
import { Button } from "../ui/button";
import { Pencil, XCircle } from "lucide-react";
import { EditService } from "./EditService";

export function ServiceCard({ service }) {
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
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-1 text-sm mb-2">
          <div className="text-muted-foreground">Rate:</div>
          <div className="font-medium">R{service.rate}/hr</div>
          <div className="text-muted-foreground">Available:</div>
          <div>{service.availability}</div>
        </div>
        <p className="text-xs text-muted-foreground">{service.description}</p>
      </CardContent>
      <CardFooter className="p-2 gap-2">
        <EditService
          service={service}
          onSave={(updated) => {
            // Save logic here: call API or update local state
            console.log("Updated Service:", updated);
          }}
        />
        <Button variant="outline" size="sm" className="flex-1">
          <XCircle className="h-3.5 w-3.5 mr-1" />
          Unlist
        </Button>
      </CardFooter>
    </Card>
  );
}
