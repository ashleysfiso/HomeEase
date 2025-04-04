import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { CollapsiblePriceBreakdown } from "@/components/CollapsiblePriceBreakdown";
import { Textarea } from "@/components/ui/textarea";
import { useParams, ScrollRestoration } from "react-router-dom";
import { getServiceById } from "@/api";
import BookingSkeletonLoader from "@/components/BookingSkeletonLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Form } from "react-router-dom";
import { createBooking } from "@/api";

let customerId;
let serviceId;
let serviceProviderId;
let totalPrice;
let extras;

export async function action({ request }) {
  const formData = await request.formData();
  const day = formData.get("date");
  const time = formData.get("time");
  const date = `${day}T${time}`;
  const address = formData.get("location");
  //additional information variables
  const bedrooms = formData.get("bedrooms");
  const bathrooms = formData.get("bathrooms");
  const duration = formData.get("duration");
  const additionalInfo = [bedrooms, bathrooms, duration, ...(extras ?? [])]
    .filter(Boolean)
    .join(",");
  //console.log(additionalInfo);

  try {
    const result = await createBooking({
      customerId,
      serviceId,
      serviceProviderId,
      date,
      totalPrice,
      address,
      additionalInfo,
    });
    console.log("Result from post request", result);
  } catch (error) {
    console.log(error);
  }
}

export default function CleaningBookingPage() {
  const { user } = useAuth();
  const { sId, spId } = useParams();
  const [service, setService] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCost, setTotalCost] = useState();
  const [formData, setFormData] = useState({
    location: "",
    bedrooms: "",
    bathrooms: "",
    isAirbnb: "NO",
    extras: [],
    duration: "",
    frequency: "ONE TIME",
    date: "",
    time: "",
  });

  serviceId = sId;
  serviceProviderId = spId;
  totalPrice = totalCost;
  extras = formData.extras;
  customerId = user?.customerID;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const result = await getServiceById(spId, sId);
        setService(result);
        setTotalCost(result.rate);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchService();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(value)
        ? prev.extras.filter((item) => item !== value)
        : [...prev.extras, value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      priceBreakdown: {
        bookingPrice: 304,
        bookingCover: 19,
        serviceFee: 39,
        discount: 0,
      },
    };
  };

  const bookingDetails = {
    location: formData.location,
    date: formData.date,
    time: formData.time,
    duration: formData.duration,
    bedrooms: formData.bedrooms,
    bathrooms: formData.bathrooms,
    extras: formData.extras,
  };

  const prices = {
    bookingPrice: 304,
    bookingCover: 19,
    serviceFee: 39,
    discount: 0,
  };

  return (
    <>
      {isLoading ? (
        <div>
          <ScrollRestoration />
          <BookingSkeletonLoader />
        </div>
      ) : (
        <div className="container mx-auto p-4 py-20">
          <ScrollRestoration />
          <div className="lg:hidden mb-4">
            <CollapsiblePriceBreakdown
              bookingDetails={bookingDetails}
              prices={prices}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <Card className="w-full lg:w-2/3">
              <CardHeader>
                <CardTitle className="text-2xl flex justify-center font-bold">
                  {service.serviceName} Booking
                </CardTitle>
                <CardDescription className="flex flex-col items-center justify-center">
                  <p className="text-center">{service.description}</p>
                  <p className="flex flex-row gap-2 text-sm items-center">
                    <span className="text-muted-foreground">By</span>{" "}
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{service.companyName}</span>
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form method="POSt" className="space-y-6">
                  <div className="space-y-6">
                    {service.serviceName === "Plumbing" && (
                      <div className="space-y-4">
                        <h2 className=" flex justify-center text-xl font-semibold">
                          How Long
                        </h2>
                        <p className="flex justify-center">
                          Select enough hours to complete all tasks
                        </p>
                        <div className="flex justify-center">
                          <Select
                            name="duration"
                            required
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                duration: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="1 Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Task should be completed by 1 hour">
                                1 hour
                              </SelectItem>
                              <SelectItem value="Task should be completed by 2 hours">
                                2 hours
                              </SelectItem>
                              <SelectItem value="Task should be completed by 3 hours">
                                3 hours
                              </SelectItem>
                              <SelectItem value="Task should be completed by 4 hours">
                                4 hours
                              </SelectItem>
                              <SelectItem value="Task should be completed by 5 hours">
                                5 hours
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {/*<ToggleGroup
                          id="duration"
                          name="duration"
                          variant="outline"
                          type="single"

                        >
                          <ToggleGroupItem value="1">1</ToggleGroupItem>
                          <ToggleGroupItem value="2">2</ToggleGroupItem>
                          <ToggleGroupItem value="3">3</ToggleGroupItem>
                          <ToggleGroupItem value="4">4</ToggleGroupItem>
                          <ToggleGroupItem value="5">5</ToggleGroupItem>
                        </ToggleGroup>*/}
                      </div>
                    )}

                    {service.serviceName === "Indoor General Cleaning" && (
                      <div className="flex justify-center gap-2">
                        <div className="space-y-2">
                          <Label
                            className="flex justify-center"
                            htmlFor="bedrooms"
                          >
                            Number of Bedrooms
                          </Label>

                          <Select
                            id="bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            required
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                bedrooms: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1 Bedrooms">
                                1 Bedroom
                              </SelectItem>
                              <SelectItem value="2 Bedrooms">
                                2 Bedrooms
                              </SelectItem>
                              <SelectItem value="3 Bedrooms">
                                3 Bedrooms
                              </SelectItem>
                              <SelectItem value="4 Bedrooms">
                                4 Bedrooms
                              </SelectItem>
                              <SelectItem value="5 Bedrooms">
                                5 Bedrooms
                              </SelectItem>
                              <SelectItem value="6 Bedrooms">
                                6 Bedrooms
                              </SelectItem>
                              <SelectItem value="7+ Bedrooms">
                                7+ Bedrooms
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            className="flex justify-center"
                            htmlFor="bathrooms"
                          >
                            Number of Bathrooms
                          </Label>
                          <Select
                            id="bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            required
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                bathrooms: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1 Bathroom">
                                1 Bathroom
                              </SelectItem>
                              <SelectItem value="2 Bathrooms">
                                2 Bathrooms
                              </SelectItem>
                              <SelectItem value="3 Bathrooms">
                                3 Bathrooms
                              </SelectItem>
                              <SelectItem value="4 Bathrooms">
                                4 Bathrooms
                              </SelectItem>
                              <SelectItem value="5 Bathrooms">
                                5 Bathrooms
                              </SelectItem>
                              <SelectItem value="6 Bathrooms">
                                6 Bathrooms
                              </SelectItem>
                              <SelectItem value="7+ Bathrooms">
                                7+ Bathrooms
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    {/*Extras for Indoor*/}
                    {service.serviceName === "Indoor General Cleaning" && (
                      <div className="">
                        <Label className=" flex justify-center text-xl font-semibold">
                          Extras
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 place-items-center">
                          {[
                            "Laundry & Ironing",
                            "Inside Fridge",
                            "Inside Oven",
                            "Inside Cabinets",
                            "Interior Windows",
                            "Interior Walls",
                          ].map((extra) => (
                            <div
                              key={extra}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={extra}
                                checked={formData.extras.includes(extra)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(extra)
                                }
                              />
                              <label
                                htmlFor={extra}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {extra}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/*Extras for Outdoor*/}
                    {service.serviceName === "Outdoor General Cleaning" && (
                      <div>
                        <Label className=" flex justify-center text-xl font-semibold">
                          Extras
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 place-items-center">
                          {["Gardening", "Outside Windows", "Car Washing"].map(
                            (extra) => (
                              <div
                                key={extra}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={extra}
                                  checked={formData.extras.includes(extra)}
                                  onCheckedChange={() =>
                                    handleCheckboxChange(extra)
                                  }
                                />
                                <label
                                  htmlFor={extra}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {extra}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/*<div>
                  <Label>How Often</Label>
                  <RadioGroup
                    name="frequency"
                    value={formData.frequency}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, frequency: value }))
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ONE TIME" id="one-time" />
                      <Label htmlFor="one-time">ONE TIME</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="REGULAR" id="regular" />
                      <Label htmlFor="regular">REGULAR</Label>
                    </div>
                  </RadioGroup>
                  {formData.frequency === "REGULAR" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Regular cleaning, save up to 28%
                    </p>
                  )}
                </div>*/}
                    <div className="flex justify-center items-center gap-2">
                      <div>
                        <Label className="flex justify-center" htmlFor="date">
                          Select Day
                        </Label>
                        <div className="flex mt-1 items-center">
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                          />
                          <Calendar className="ml-2 h-4 w-4 opacity-50" />
                        </div>
                      </div>

                      <div>
                        <Label className="flex justify-center" htmlFor="time">
                          Select Time
                        </Label>
                        <div className="mt-1">
                          <Select
                            name="time"
                            value={formData.time}
                            required
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, time: value }))
                            }
                            className="flex items-center mt-1"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 8).map(
                                (hour) => (
                                  <SelectItem
                                    key={hour}
                                    value={`${hour
                                      .toString()
                                      .padStart(2, "0")}:00`}
                                  >
                                    {`${hour.toString().padStart(2, "0")}:00`}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-1">
                      <Textarea
                        id="location"
                        name="location"
                        placeholder="Enter your address (e.g., 123 Main Street, Apartment 4B, City, Province, ZIP Code)"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </Form>
              </CardContent>
            </Card>
            <div className="hidden lg:block w-full lg:w-1/3">
              <PriceBreakdown bookingDetails={bookingDetails} prices={prices} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
