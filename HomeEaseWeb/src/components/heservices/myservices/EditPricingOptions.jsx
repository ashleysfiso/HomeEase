import React, { useState, useEffect } from "react";
import { Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { UpdatePricingOption } from "@/api";

export function EditPricingOptions({ service, setSubmitTrigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedPrices, setEditedPrices] = useState({});
  const [updatingOptions, setUpdatingOptions] = useState({});
  const [successOptions, setSuccessOptions] = useState({});
  const { toast } = useToast();

  const serviceTypeNames = Array.from(
    new Set(service.pricingOptions.map((option) => option.serviceTypeName))
  );
  const uniqueLabelUnits = Array.from(
    new Set(
      service.pricingOptions.map((option) => option.labelUnit.toLowerCase())
    )
  );

  useEffect(() => {
    const prices = {};
    service.pricingOptions.forEach((serviceType) => {
      serviceType.options.forEach((option) => {
        prices[option.pricingOptionId] = option.price;
      });
    });
    setEditedPrices(prices);
  }, [service]);

  const handlePriceChange = (pricingOptionId, newPrice) => {
    setEditedPrices((prev) => ({
      ...prev,
      [pricingOptionId]: newPrice,
    }));
  };

  const handleUpdateOption = async (pricingOptionId) => {
    setUpdatingOptions((prev) => ({ ...prev, [pricingOptionId]: true }));

    const newPrice = editedPrices[pricingOptionId];
    const update = {
      serviceProviderId: service.serviceProviderId,
      serviceId: service.serviceId,
      pricingOptionId: pricingOptionId,
      price: newPrice,
    };

    try {
      const result = await UpdatePricingOption(update);
      setSubmitTrigger((prev) => !prev);
      setUpdatingOptions((prev) => ({ ...prev, [pricingOptionId]: false }));
      setSuccessOptions((prev) => ({ ...prev, [pricingOptionId]: true }));
      setTimeout(() => {
        setSuccessOptions((prev) => ({ ...prev, [pricingOptionId]: false }));
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      setUpdatingOptions((prev) => ({ ...prev, [pricingOptionId]: false }));
    }
  };

  const getCurrentPrice = (pricingOptionId) => {
    if (pricingOptionId in editedPrices) {
      return editedPrices[pricingOptionId];
    }

    for (const serviceType of service.pricingOptions) {
      for (const option of serviceType.options) {
        if (option.pricingOptionId === pricingOptionId) {
          return option.price;
        }
      }
    }

    return 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1">
          <Pencil className="h-3.5 w-3.5 mr-1" />
          Edit Pricing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Pricing Options</DialogTitle>
          <DialogDescription>
            Update prices for {service.serviceName}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          {serviceTypeNames.length > 0 ? (
            <Tabs defaultValue={serviceTypeNames[0]}>
              <TabsList className="mb-4 w-full">
                {serviceTypeNames.map((typeName) => (
                  <TabsTrigger
                    key={typeName}
                    value={typeName}
                    className="flex-1"
                  >
                    {typeName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {serviceTypeNames.map((typeName) => (
                <TabsContent key={typeName} value={typeName}>
                  <Accordion type="multiple" defaultValue={uniqueLabelUnits}>
                    {service.pricingOptions
                      .filter((st) => st.serviceTypeName === typeName)
                      .map((serviceType) => (
                        <AccordionItem
                          key={`${serviceType.serviceTypeName}-${serviceType.labelUnit}`}
                          value={serviceType.labelUnit.toLowerCase()}
                        >
                          <AccordionTrigger className="text-base font-medium">
                            {serviceType.labelUnit}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 mt-2">
                              {serviceType.options.map((option) => (
                                <div
                                  key={option.pricingOptionId}
                                  className="flex items-center justify-between border-b pb-3"
                                >
                                  <div className="font-medium">
                                    {option.pricingOptionName}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground mr-1">
                                        R
                                      </span>
                                      <Input
                                        type="number"
                                        value={getCurrentPrice(
                                          option.pricingOptionId
                                        )}
                                        onChange={(e) =>
                                          handlePriceChange(
                                            option.pricingOptionId,
                                            Number(e.target.value)
                                          )
                                        }
                                        className="w-24"
                                      />
                                    </div>
                                    <Button
                                      onClick={() =>
                                        handleUpdateOption(
                                          option.pricingOptionId
                                        )
                                      }
                                      disabled={
                                        updatingOptions[option.pricingOptionId]
                                      }
                                      size="sm"
                                    >
                                      {successOptions[
                                        option.pricingOptionId
                                      ] ? (
                                        <Check className="h-4 w-4" />
                                      ) : updatingOptions[
                                          option.pricingOptionId
                                        ] ? (
                                        "Updating..."
                                      ) : (
                                        "Update"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No pricing options available for this service.
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
