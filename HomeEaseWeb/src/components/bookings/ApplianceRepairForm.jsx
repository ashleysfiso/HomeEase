import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export default function ApplianceRepairForm() {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Appliance Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Appliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fridge">🧊 Refrigerator</SelectItem>
                <SelectItem value="washing-machine">
                  🏠 Washing Machine
                </SelectItem>
                <SelectItem value="oven">🔥 Oven/Stove</SelectItem>
                <SelectItem value="tv">📺 Television</SelectItem>
                <SelectItem value="ac">❄️ Air Conditioner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Issue Description</Label>
            <Input placeholder="Describe the issue" />
          </div>
        </div>
      </div>
    </>
  );
}
