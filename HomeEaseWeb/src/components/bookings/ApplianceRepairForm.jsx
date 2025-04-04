import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export default function ApplianceRepairForm({ handleChange }) {
  const [value, setValue] = useState("");

  const handleValueChange = (value) => {
    setValue(value);
    handleChange("applianceRepair", "issue", value);
  };
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Appliance Type</label>
            <Select
              onValueChange={(value) =>
                handleChange("applianceRepair", "type", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Appliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fridge">🧊 Refrigerator</SelectItem>
                <SelectItem value="Washing-machine Repair">
                  🏠 Washing Machine
                </SelectItem>
                <SelectItem value="Oven-Stove Repair">🔥 Oven/Stove</SelectItem>
                <SelectItem value="TV Repair">📺 Television</SelectItem>
                <SelectItem value="Air Conditioner Repair">
                  ❄️ Air Conditioner
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Issue Description</Label>
            <Input
              value={value}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder="Describe the issue"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}
