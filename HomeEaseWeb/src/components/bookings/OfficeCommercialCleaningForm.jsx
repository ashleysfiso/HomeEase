import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OfficeCommercialCleaningForm({ handleChange }) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Cleaning Type</label>
            <Select
              onValueChange={(value) =>
                handleChange("officeCleaning", "type", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Cleaning Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
                <SelectItem value="Industrial Cleaning">
                  Industrial Cleaning
                </SelectItem>
                <SelectItem value="Retail Store Cleaning">
                  Retail Store Cleaning
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Area Size(m²)</label>
            <Select
              onValueChange={(value) =>
                handleChange("officeCleaning", "officeSize", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Area Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small: 0-100 m²</SelectItem>
                <SelectItem value="medium">Medium: 100-200 m²</SelectItem>
                <SelectItem value="large">Large: 200-325 m²</SelectItem>
                <SelectItem value="xl">Extra-Large: 325+ m²</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
