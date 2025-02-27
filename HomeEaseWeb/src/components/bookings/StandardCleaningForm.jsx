import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function StandardCleaningForm({
  handleToggle,
  extras,
  selectedTasks,
}) {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Service Type:</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Standard Cleaning" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard Cleanin">
                  Standard Cleaning
                </SelectItem>
                <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                <SelectItem value=" Move-in/Move-out Cleaning">
                  {" "}
                  Move-in/Move-out Cleaning
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <div className="space-y-2">
              <label className="text-sm">Number of Bedrooms</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="1 Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Bedrooms">1 Bedroom</SelectItem>
                  <SelectItem value="2 Bedrooms">2 Bedrooms</SelectItem>
                  <SelectItem value="3 Bedrooms">3 Bedrooms</SelectItem>
                  <SelectItem value="4 Bedrooms">4 Bedrooms</SelectItem>
                  <SelectItem value="5 Bedrooms">5 Bedrooms</SelectItem>
                  <SelectItem value="6 Bedrooms">6 Bedrooms</SelectItem>
                  <SelectItem value="7+ Bedrooms">7+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm"> Number of Bathrooms</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="1 Bathroom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Bathroom">1 Bathroom</SelectItem>
                  <SelectItem value="2 Bathrooms">2 Bathrooms</SelectItem>
                  <SelectItem value="3 Bathrooms">3 Bathrooms</SelectItem>
                  <SelectItem value="4 Bathrooms">4 Bathrooms</SelectItem>
                  <SelectItem value="5 Bathrooms">5 Bathrooms</SelectItem>
                  <SelectItem value="6 Bathrooms">6 Bathrooms</SelectItem>
                  <SelectItem value="7+ Bathrooms">7+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Extra Tasks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {extras.map((task) => {
            const Icon = task.icon;
            return (
              <button
                key={task.id}
                onClick={() => handleToggle(task.id)}
                className={cn(
                  "p-4 rounded-lg border text-center space-y-2 transition-colors",
                  selectedTasks.includes(task.id)
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary"
                )}
              >
                <div className="w-8 h-8 mx-auto">
                  <Icon className="w-full h-full" />
                </div>
                <span className="text-sm">{task.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
