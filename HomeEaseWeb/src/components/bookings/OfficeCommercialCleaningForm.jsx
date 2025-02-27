import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OfficeCommercialCleaningForm() {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Cleaning Type:</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Office Cleaning" />
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
            <label className="text-sm">How big is your area?</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Extra-Large: 325+ m²" />
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
