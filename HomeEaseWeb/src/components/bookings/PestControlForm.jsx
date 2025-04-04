import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PestControlForm({ handleChange }) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Pest Problem</label>
            <Select
              onValueChange={(value) =>
                handleChange("pestControlService", "type", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Pest Problem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ants">🐜 Ants</SelectItem>
                <SelectItem value="rodents">🐁 Rodents</SelectItem>
                <SelectItem value="spiders">🕷️ Spiders</SelectItem>
                <SelectItem value="mosquitoes">🦟 Mosquitoes</SelectItem>
                <SelectItem value="full-home">
                  🏠 Full Home Treatment
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Property Size (m²)</label>
            <Select
              onValueChange={(value) =>
                handleChange("pestControlService", "propertySize", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Property Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small Up to 50 m²">
                  Small (Up to 50 m²)
                </SelectItem>
                <SelectItem value="medium (50 - 200 m²)">
                  Medium (50 - 200 m²)
                </SelectItem>
                <SelectItem value="large (200 - 500 m²)">
                  Large (200 - 500 m²)
                </SelectItem>
                <SelectItem value="extra-large (500+ m²)">
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
