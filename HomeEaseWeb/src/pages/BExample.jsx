import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default function BExample() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [extras, setExtras] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("08:00");

  const services = [
    { name: "Home Cleaning", price: 50 },
    { name: "Lawn Care", price: 40 },
    { name: "Plumbing", price: 60 },
    { name: "Electrical Work", price: 70 },
    { name: "Handyman Services", price: 55 },
  ];

  const extraServices = [
    { name: "Inside Oven", price: 15 },
    { name: "Inside Fridge", price: 10 },
    { name: "Interior Windows", price: 20 },
  ];

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const toggleExtra = (extra) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const calculateTotal = () => {
    let total = selectedServices.reduce(
      (sum, service) =>
        sum + (services.find((s) => s.name === service)?.price || 0),
      0
    );
    total += extras.reduce(
      (sum, extra) =>
        sum + (extraServices.find((e) => e.name === extra)?.price || 0),
      0
    );
    return total;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Book Your Service</h1>

      {/* Service Selection */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Select Services</h2>
          {services.map((service) => (
            <div key={service.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={selectedServices.includes(service.name)}
                onCheckedChange={() => toggleService(service.name)}
              />
              <span>
                {service.name} - ${service.price}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Customization */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Customize Your Booking</h2>
          <div className="flex items-center justify-between mb-2">
            <label>Bedrooms:</label>
            <Input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value))}
              min="1"
              className="w-16"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label>Bathrooms:</label>
            <Input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(parseInt(e.target.value))}
              min="1"
              className="w-16"
            />
          </div>
        </CardContent>
      </Card>

      {/* Extras */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Extras</h2>
          {extraServices.map((extra) => (
            <div key={extra.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={extras.includes(extra.name)}
                onCheckedChange={() => toggleExtra(extra.name)}
              />
              <span>
                {extra.name} - ${extra.price}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Date & Time */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Select Date & Time</h2>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
          <p>
            <strong>Services:</strong>{" "}
            {selectedServices.join(", ") || "None Selected"}
          </p>
          <p>
            <strong>Extras:</strong> {extras.join(", ") || "None Selected"}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {selectedDate ? format(selectedDate, "PP") : "Not Selected"} at{" "}
            {time}
          </p>
          <p className="font-bold text-xl mt-2">Total: ${calculateTotal()}</p>
        </CardContent>
      </Card>

      {/* Booking Button */}
      <Button size="lg" className="w-full">
        Confirm Booking
      </Button>
    </div>
  );
}
