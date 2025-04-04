import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CarWash({ handleChange }) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Car Type</label>
            <Select
              onValueChange={(value) =>
                handleChange("carWashService", "vehicleType", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Car Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedan">🚗 Sedan</SelectItem>
                <SelectItem value="Suv">🚙 SUV</SelectItem>
                <SelectItem value="Van">🛻 Van</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Service Type</label>
            <Select
              onValueChange={(value) =>
                handleChange("carWashService", "type", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Exterior">🚿 Exterior Wash</SelectItem>
                <SelectItem value="Interior">🏠 Interior Detailing</SelectItem>
                <SelectItem value="Full-detail">
                  🛠️ Full Car Detailing
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
