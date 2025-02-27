import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HandymanForm() {
  const [service, setService] = useState("");

  const handleValueChange = (value) => {
    setService(value);
  };
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Type of Handyman Work</label>
            <Select value={service} onValueChange={handleValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="furniture">🔨 Furniture Assembly</SelectItem>
                <SelectItem value="door-window">
                  🚪 Door & Window Repairs
                </SelectItem>
                <SelectItem value="hanging">
                  🖼️ Picture Hanging & Mounting
                </SelectItem>
                <SelectItem value="tv-mounting">📦 TV Mounting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {service === "furniture" && (
            <div className="space-y-2">
              <label className="text-sm">Furniture Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Furniture Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    Small (Chairs, Nightstands)
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium (Bookshelves, TV Stands)
                  </SelectItem>
                  <SelectItem value="large">Large (Beds, Wardrobes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {service === "door-window" && (
            <div className="space-y-2">
              <label className="text-sm">Repair Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Repair Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hinges">Hinge/Lock Fix</SelectItem>
                  <SelectItem value="replacement">Part Replacement</SelectItem>
                  <SelectItem value="window">Window Glass Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {service === "hanging" && (
            <div className="space-y-2">
              <label className="text-sm">Item Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Item Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    Small Frames (A3 or smaller)
                  </SelectItem>
                  <SelectItem value="medium">Medium Frames/Mirrors</SelectItem>
                  <SelectItem value="large">Large/Heavy Items</SelectItem>
                  <SelectItem value="gallery">
                    Gallery Wall Arrangement
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {service === "tv-mounting" && (
            <div className="space-y-2">
              <label className="text-sm">TV Size</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select TV Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">32"-43"</SelectItem>
                  <SelectItem value="medium">50"-65"</SelectItem>
                  <SelectItem value="large">75"+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
