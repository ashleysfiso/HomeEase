import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SpecializedCleaningForm() {
  const [service, setService] = useState("");

  const handleValueChange = (value) => {
    setService(value);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Type of Cleaning</label>
            <Select value={service} onValueChange={handleValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Cleaning Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carpet">🧼 Carpet Cleaning</SelectItem>
                <SelectItem value="window">🪟 Window Washing</SelectItem>
                <SelectItem value="post-construction">
                  🛠 Post-Construction Cleaning
                </SelectItem>
                <SelectItem value="vehicle">
                  🚗 Vehicle Interior Cleaning
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/*Carpert cleaning*/}
          {service === "carpet" && (
            <div className="space-y-2">
              <label className="text-sm">Area Size (m²)</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Area Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Up to 20 m²)</SelectItem>
                  <SelectItem value="medium">Medium (20 - 50 m²)</SelectItem>
                  <SelectItem value="large">Large (50+ m²)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/*Windows cleaning*/}
          {service === "window" && (
            <div className="space-y-2">
              <label className="text-sm">Number of Windows</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Number of Windows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 Windows</SelectItem>
                  <SelectItem value="6-10">6-10 Windows</SelectItem>
                  <SelectItem value="11-20">11-20 Windows</SelectItem>
                  <SelectItem value="20+">20+ Windows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/*Post-Construction cleaning*/}
          {service === "post-construction" && (
            <div className="space-y-2">
              <label className="text-sm">Area Size (sq. meters)</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Area Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Up to 20m²)</SelectItem>
                  <SelectItem value="medium">Medium (20m² - 50m²)</SelectItem>
                  <SelectItem value="large">Large (50m²+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/*Vehicle cleaning*/}
          {service === "vehicle" && (
            <div className="space-y-2">
              <label className="text-sm">Vehicle Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
