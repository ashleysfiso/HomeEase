import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SpecializedCleaningForm({ handleChange }) {
  const [service, setService] = useState("");

  const handleValueChange = (value) => {
    setService(value);
    handleChange("specializedCleaning", "type", value);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Type of Cleaning</label>
            <Select onValueChange={handleValueChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Cleaning Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Carpet-Cleaning">
                  🧼 Carpet Cleaning
                </SelectItem>
                <SelectItem value="Window-Cleaning">
                  🪟 Window Washing
                </SelectItem>
                <SelectItem value="Post-construction-Cleaning">
                  🛠 Post-Construction Cleaning
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/*Carpert cleaning*/}
          {service === "Carpet-Cleaning" && (
            <div className="space-y-2">
              <label className="text-sm">Area Size (m²)</label>
              <Select
                onValueChange={(value) =>
                  handleChange("specializedCleaning", "size", value)
                }
                required
              >
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
          {service === "Window-Cleaning" && (
            <div className="space-y-2">
              <label className="text-sm">Number of Windows</label>
              <Select
                onValueChange={(value) =>
                  handleChange("specializedCleaning", "size", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Number of Windows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5 Windows">1-5 Windows</SelectItem>
                  <SelectItem value="6-10 Windows">6-10 Windows</SelectItem>
                  <SelectItem value="11-20 Windows">11-20 Windows</SelectItem>
                  <SelectItem value="20+ Windows">20+ Windows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/*Post-Construction cleaning*/}
          {service === "Post-construction-Cleaning" && (
            <div className="space-y-2">
              <label className="text-sm">Area Size (sq. meters)</label>
              <Select
                onValueChange={(value) =>
                  handleChange("specializedCleaning", "size", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Area Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small (Up to 20m²)">
                    Small (Up to 20m²)
                  </SelectItem>
                  <SelectItem value="medium (20m² - 50m²)">
                    Medium (20m² - 50m²)
                  </SelectItem>
                  <SelectItem value="large (50m²+)">Large (50m²+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
