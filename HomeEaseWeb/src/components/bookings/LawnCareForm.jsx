import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LawnCareForm() {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Lawn Care Service Needed</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Lawn Care Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mowing">🌿 Mowing & Trimming</SelectItem>
                <SelectItem value="garden-maintenance">
                  🌼 Garden Maintenance
                </SelectItem>
                <SelectItem value="fertilization">
                  🌱 Fertilization & Weed Control
                </SelectItem>
                <SelectItem value="pruning">🌳 Tree & Shrub Pruning</SelectItem>
                <SelectItem value="sod-installation">
                  🌾 Sod Installation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Property Size (Square Meters)</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Property Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (Up to 50 m²)</SelectItem>
                <SelectItem value="medium">Medium (50 - 200 m²)</SelectItem>
                <SelectItem value="large">Large (200 - 500 m²)</SelectItem>
                <SelectItem value="extra-large">
                  Extra Large (500+ m²)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
