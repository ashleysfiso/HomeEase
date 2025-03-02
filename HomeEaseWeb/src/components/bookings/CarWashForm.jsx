import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CarWash() {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Car Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Car Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">🚗 Sedan</SelectItem>
                <SelectItem value="suv">🚙 SUV</SelectItem>
                <SelectItem value="pickup">🛻 Van</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Service Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exterior">🚿 Exterior Wash</SelectItem>
                <SelectItem value="interior">🏠 Interior Detailing</SelectItem>
                <SelectItem value="full-detail">
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
