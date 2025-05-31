import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateServiceOffering } from "@/api";
import { useToast } from "@/hooks/use-toast";
import MyLoader from "@/components/MyLoader";

function PricingInputs({
  service,
  serviceProviderId,
  setActiveTab,
  setSubmitTrigger,
}) {
  const [basePrice, setBasePrice] = useState();
  const [prices, setPrices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getPrice = (id) => {
    const found = prices.find((p) => p.pricingOptionId === id);
    return found ? found.price : "";
  };
  const isEmpty = (value) =>
    value === "" || value === null || value === undefined || value === 0;

  const handlePriceChange = (pricingOptionId, value) => {
    const parsedValue = parseFloat(value) || 0;

    setPrices((prev) => {
      const existingIndex = prev.findIndex(
        (p) => p.pricingOptionId === pricingOptionId
      );
      if (existingIndex !== -1) {
        // Update existing
        const updated = [...prev];
        updated[existingIndex].price = parsedValue;
        return updated;
      } else {
        // Add new
        return [...prev, { pricingOptionId, price: parsedValue }];
      }
    });
  };

  const getPriceValue = (id) => {
    const found = prices.find((p) => p.pricingOptionId === id);
    return found ? found.price : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const hasEmptyPrices = service.serviceTypes.some((service) =>
      service.pricingOptions.some((option) =>
        option.options.some((o) => isEmpty(getPrice(o.id)))
      )
    );

    if (isEmpty(basePrice) || hasEmptyPrices) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await CreateServiceOffering({
        serviceId: service.id,
        serviceProviderId: serviceProviderId,
        rate: basePrice,
        options: prices,
      });
      toast({
        description: "Service Offering has been created successfully.",
      });
      setIsSubmitting(false);
      setActiveTab("my-services");
      setSubmitTrigger((prev) => !prev);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      setIsSubmitting(false);
    }

    console.log("Base Price:", basePrice);
    console.log("Pricing Options:", prices);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold">
          Set Your Pricing for {service?.name} Services
        </h1>
        <p className="text-muted-foreground mt-1">
          Define the cost of your service to attract the right clients and
          reflect its value.
        </p>
      </div>
      <Card className="border shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-sm font-bold">Base Price</h2>
          <div className="space-y-2">
            <Label htmlFor="basePrice">Enter base price</Label>
            <Input
              id="basePrice"
              type="number"
              placeholder="e.g. 100"
              value={basePrice}
              onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
              required
            />
            {isEmpty(basePrice) && submitted && (
              <p className="text-sm text-red-500">This field is required.</p>
            )}
            <p className="text-sm text-muted-foreground">
              Each selected pricing option will be added to the base price.
            </p>
          </div>
        </CardContent>
      </Card>
      {service.serviceTypes.map((type) => (
        <Card key={type.id} className="border shadow-md">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold">{type.name}</h2>
              <p className="text-muted-foreground text-sm ">
                Set tiered pricing based on property size. Each selection will
                adjust the total service cost.
                <br />
                <strong>Example: </strong> Total Cost ={" "}
                <strong>
                  Base Price +{" "}
                  {type?.pricingOptions?.map((option, index) => {
                    const label = option.options.find(
                      (opt) => opt.name.includes("-") || opt.name.includes("+")
                    )?.name;
                    return (
                      <span key={option.labelUnit}>
                        ({label} Price)
                        {index < type.pricingOptions.length - 1 ? " + " : ""}
                      </span>
                    );
                  })}
                </strong>
                . .
              </p>
            </div>
            {type.pricingOptions.map((unit) => (
              <div key={unit.labelUnit} className="space-y-4">
                <h3 className="text-sm font-semibold">{unit.labelUnit}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {unit.options.map((option) => {
                    const price = getPrice(option.id);
                    const isInvalid = submitted && isEmpty(price);
                    return (
                      <div key={option.id} className="space-y-1">
                        <Label>{option.name}</Label>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          value={getPriceValue(option.id)}
                          onChange={(e) =>
                            handlePriceChange(option.id, e.target.value)
                          }
                        />
                        {isInvalid && (
                          <p className="text-sm text-red-500">
                            This field is required.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <div className="flex w-full">
        <Button
          disabled={isSubmitting}
          className="flex w-full"
          type="submit"
          onClick={handleSubmit}
        >
          {isSubmitting && <MyLoader />}
          Submit
        </Button>
      </div>
    </div>
  );
}

export default PricingInputs;
