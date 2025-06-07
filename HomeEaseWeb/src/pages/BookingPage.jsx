import { useState, useEffect } from "react";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Refrigerator,
  MicrowaveIcon as Oven,
  FolderCogIcon as Cabinet,
  AppWindowIcon as Window,
  PaintBucket,
  Flower2,
  AnvilIcon as Iron,
  Shirt,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Form, useParams } from "react-router-dom";
import { GetServiceById } from "@/api";
import { BookingPageSkeleton } from "@/components/SkeletonLoader/BookingPageSkeleton";
import { CreateBooking } from "@/api";
import { redirect, useNavigation } from "react-router-dom";

let customerId;
let serviceId;
let serviceProviderId;
let totalPrice;
let serviceTypeName;
let sizes = "";

export async function action({ request }) {
  const formData = await request.formData();
  const date = formData.get("date");
  const time = formData.get("time");
  const address = formData.get("address");
  const safeSize = originalValue.replace(/[^\x00-\xFF]/g, "");
  {
    try {
      const result = await CreateBooking({
        customerId,
        serviceId,
        serviceProviderId,
        date,
        time,
        totalPrice,
        address,
        serviceTypeName,
        sizes,
      });
      console.log("Result from post request", result);
      return redirect(
        `/services/booking/success?id=${result.id}&date=${result.bookingDate}&time=${result.time}&address=${result.address}&service=${result.serviceTypeName}&details=${sizes}&total=${result.totalCost}`
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default function BookingPage() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { sId, spId } = useParams();
  const [service, setService] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [baseRate, setBaseRate] = useState(0);
  const [pricingOptions, setPricingOptions] = useState(null);
  const [options, setOptions] = useState(null);
  const [extraCosts, setExtraCosts] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [typeName, setTypeName] = useState("");
  const [size, setSize] = useState({});

  serviceId = sId;
  serviceProviderId = spId;
  totalPrice = totalCost;
  customerId = user?.customerID;
  serviceTypeName = typeName;
  sizes = JSON.stringify(size).slice(1, -1);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const service = await GetServiceById(spId, sId);
        setService(service);
        setBaseRate(service.rate);
        setPricingOptions(service.pricingOptions);
        console.log(service.pricingOptions);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    if (customerId) {
      fetchService();
      console.log(customerId);
    }
  }, [customerId]);

  const handleServiceTypeChange = (value) => {
    const serviceTypeOptions = service.pricingOptions.filter(
      (po) => po.serviceTypeName === value
    );
    setTypeName(value);
    setOptions(null);
    setOptions(serviceTypeOptions);
    setSize({});
  };

  const handleSeletedPricing = (unit, price) => {
    setExtraCosts((prev) => ({ ...prev, [unit]: price }));
    //Setting up selected size
    const pricingOption = pricingOptions.find(
      (po) => po.serviceTypeName === typeName && po.labelUnit === unit
    );
    if (pricingOption) {
      const option = pricingOption.options.find(
        (o) => o.price.toString() === price
      );
      if (option) {
        console.log("Unit inside option: ", unit);
        console.log(sizes);
        setSize((prev) => ({ ...prev, [unit]: option.pricingOptionName }));
      }
    }
  };

  useEffect(() => {
    let total = 0;
    Object.values(extraCosts).forEach((value) => {
      total += parseFloat(value) || 0;
    });
    setTotalCost(baseRate + total);
  }, [extraCosts, baseRate]);

  const PriceSection = () => (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg flex justify-between items-center">
      <div>
        <div className="text-3xl font-bold">Total</div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold">R{totalCost}</div>
      </div>
    </div>
  );

  const BookingDetailsComponent = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{service.serviceName}</h3>
      <div className="border-t pt-4">
        <div className="flex items-center space-x-4 mb-3">
          <span className="text-muted-foreground">By</span>
          <Avatar>
            <AvatarImage src={service.imgURL} alt={service.serviceName} />
            <AvatarFallback>
              {service.companyName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{service.companyName}</h4>
            {/*<div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{service.provider.rating}</span>
              </div>*/}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading === true ? (
        <BookingPageSkeleton />
      ) : (
        <Form method="POST" replace>
          <div className="min-h-screen bg-background flex flex-col lg:flex-row relative pt-20 pb-[140px] lg:pb-0">
            {/* Mobile Booking Details */}
            <div className="lg:hidden p-4 border-b">
              <BookingDetailsComponent />
            </div>

            {/* Left Section - Desktop */}
            <div className="hidden lg:block lg:w-1/3 p-6 border-r">
              <div className="space-y-6 sticky top-6">
                <BookingDetailsComponent />
                <PriceSection />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 p-4 lg:p-6">
              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <h1 className="text-2xl font-bold">
                    {service.serviceName} Booking
                  </h1>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                <h2 className="font-semibold">
                  Add details about your booking
                </h2>

                <div className="space-y-6">
                  {/*<div className="space-y-4">
              <h2 className="font-semibold">Booking Duration</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold">{duration}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDuration(duration + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>*/}

                  <div className="space-y-4">
                    {/*<div className="space-y-2">
                      <label className="text-sm">Select start date:</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>*/}

                    {pricingOptions && (
                      <div className="space-y-2">
                        <label className="text-sm">Select Service Type:</label>
                        <Select
                          onValueChange={handleServiceTypeChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Service Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              new Set(
                                pricingOptions.map(
                                  (option) => option.serviceTypeName
                                )
                              )
                            ).map((type, index) => (
                              <SelectItem key={index} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {options &&
                      options.map((option, index) => (
                        <div key={index} className="space-y-2">
                          <label className="text-sm">
                            Select {option.labelUnit}
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleSeletedPricing(option.labelUnit, value)
                            }
                            required
                            key={option.serviceTypeName}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {option.options.map((o, index) => (
                                <SelectItem
                                  key={o.pricingOptionId}
                                  value={o.price.toString()}
                                >
                                  {o.pricingOptionName}
                                  <span className="ml-8 text-muted-foreground">
                                    + R{o.price}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}

                    <div>
                      <Label className="flex " htmlFor="date">
                        Select Date
                      </Label>
                      <div className="flex mt-1 items-center">
                        <Input
                          name="date"
                          type="date"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Select start time:</label>
                      <Select name="time" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="08:30">08:30</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="09:30">09:30</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="10:30">10:30</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="11:30">11:30</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="12:30">12:30</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="13:30">13:30</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="14:30">14:30</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Add your address</label>
                    <Textarea
                      name="address"
                      placeholder="Enter your address (e.g., 123 Main Street, Apartment 4B, City, Province, ZIP Code)"
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="hidden lg:block w-full gap-4">
                    <Button
                      disabled={navigation.state === "submitting"}
                      className="flex-1"
                      size="lg"
                    >
                      {navigation.state === "submitting" ? (
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      ) : (
                        ""
                      )}
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t p-4 space-y-4">
              <PriceSection />
              <div className="flex gap-4">
                <Button
                  disabled={navigation.state === "submitting"}
                  className="flex-1"
                  size="lg"
                >
                  {navigation.state === "submitting" ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    ""
                  )}
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}
