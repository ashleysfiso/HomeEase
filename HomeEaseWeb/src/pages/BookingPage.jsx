import { useState } from "react";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
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
import {
  Refrigerator,
  MicrowaveIcon as Oven,
  FolderCogIcon as Cabinet,
  AppWindowIcon as Window,
  PaintBucket,
  Flower2,
  AnvilIcon as Iron,
  Shirt,
} from "lucide-react";
import StandardCleaningForm from "@/components/bookings/StandardCleaningForm";
import OfficeCommercialCleaningForm from "@/components/bookings/OfficeCommercialCleaningForm";
import SpecializedCleaningForm from "@/components/bookings/SpecializedCleaningForm";
import PlumbingServicesForm from "@/components/bookings/PlumbingServicesForm";
import LawnCareForm from "@/components/bookings/LawnCareForm";
import HandymanForm from "@/components/bookings/HandymanForm";
import LaundryServicesForm from "@/components/bookings/LaundryServicesForm";

const extraTasks = [
  { id: "fridge", label: "Inside Fridge", price: 50, icon: Refrigerator },
  { id: "oven", label: "Inside Oven", price: 75, icon: Oven },
  { id: "cabinets", label: "Inside Cabinets", price: 60, icon: Cabinet },
  { id: "windows", label: "Interior Windows", price: 80, icon: Window },
  { id: "walls", label: "Interior Walls", price: 100, icon: PaintBucket },
  { id: "plants", label: "Water Plants", price: 30, icon: Flower2 },
  { id: "ironing", label: "Ironing", price: 85, icon: Iron },
  { id: "laundry", label: "Laundry", price: 70, icon: Shirt },
];

export default function BookingPage() {
  const [date, setDate] = useState();
  const [duration, setDuration] = useState(10);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const baseRate = 47.4; // R per hour

  const calculateTotal = () => {
    const basePrice = baseRate * duration;
    const extraTasksTotal = selectedTasks.reduce((total, taskId) => {
      const task = extraTasks.find((t) => t.id === taskId);
      return total + (task?.price || 0);
    }, 0);
    return basePrice + extraTasksTotal;
  };

  const toggleTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const PriceSection = () => (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg flex justify-between items-center">
      <div>
        <div className="text-3xl font-bold">{duration}</div>
        <div className="text-sm">Est. Hours</div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold">R{calculateTotal()}</div>
        <div className="text-sm">Est. Price</div>
      </div>
    </div>
  );

  const BookingDetails = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Booking Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Where:</span>
          <span className="text-muted-foreground">
            Rosebank Pl, Oranjezicht, Cape T...
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>What:</span>
          <span className="text-muted-foreground">Indoor Cleaning</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative pt-20 pb-[140px] lg:pb-0">
      {/* Mobile Booking Details */}
      <div className="lg:hidden p-4 border-b">
        <BookingDetails />
      </div>

      {/* Left Section - Desktop */}
      <div className="hidden lg:block lg:w-1/3 p-6 border-r">
        <div className="space-y-6 sticky top-6">
          <BookingDetails />
          <PriceSection />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">One Time Booking</h1>
            <p className="text-muted-foreground">
              Get once-off help. Try a new worker. Cancel any time
            </p>
          </div>
          <h2 className="font-semibold">Add details about your booking</h2>

          {/*Standard cleaning booking form*/}
          {/*<StandardCleaningForm
            handleToggle={toggleTask}
            extras={extraTasks}
            selectedTasks={selectedTasks}
          />*/}

          {/*Office/Commercial cleaning booking form*/}
          {/*<OfficeCommercialCleaningForm />*/}

          {/* Specialized cleaning booking form*/}
          {/*<SpecializedCleaningForm />*/}

          {/*Plumbing service booking form */}
          {/*<PlumbingServicesForm />*/}

          {/*Lawn care booking form */}
          {/*<LawnCareForm />*/}

          <LaundryServicesForm />
          {/** Handyman booking form */}
          {/*<HandymanForm />*/}

          <div className="space-y-6">
            <div className="space-y-4">
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
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
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
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm">Select start time:</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="07:00 - 07:30" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07:00">07:00 - 07:30</SelectItem>
                    <SelectItem value="07:30">07:30 - 08:00</SelectItem>
                    <SelectItem value="08:00">08:00 - 08:30</SelectItem>
                    <SelectItem value="08:30">08:30 - 09:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Add specific instructions</label>
              <Textarea
                placeholder="Add your notes here"
                className="min-h-[100px]"
              />
            </div>
            <div className="hidden lg:block w-full gap-4">
              <Button className="flex-1" size="lg">
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
          <Button className="flex-1" size="lg">
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
