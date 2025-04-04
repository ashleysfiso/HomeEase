import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PlumbingServicesForm({ handleChange }) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Plumbing Issue Type:</label>
            <Select
              onValueChange={(value) =>
                handleChange("plumbingService", "type", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Plumbing Issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Office Cleaning">🚰 Leaky Faucet</SelectItem>
                <SelectItem value="Clogged Drain">🚽 Clogged Drain</SelectItem>
                <SelectItem value="Shower Repair">🚿 Shower Repair</SelectItem>
                <SelectItem value="Pipe Installation/Repair">
                  🛁 Pipe Installation/Repair
                </SelectItem>
                <SelectItem value="Full Plumbing Inspectionr">
                  🏠 Full Plumbing Inspectionr
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
