import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LaundryServicesForm({ handleChange }) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Service Type</label>
            <Select
              onValueChange={(value) =>
                handleChange("laundryService", "type", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Laundry Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard Wash & Fold">
                  🏠 Standard Wash & Fold
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Weight of Laundry (kg)</label>
            <Select
              onValueChange={(value) =>
                handleChange("laundryService", "weight", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5kg">Up to 5kg</SelectItem>
                <SelectItem value="10kg">5 - 10kg</SelectItem>
                <SelectItem value="15kg">10 - 15kg</SelectItem>
                <SelectItem value="20kg">15kg+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
