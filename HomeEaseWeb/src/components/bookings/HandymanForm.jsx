import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HandymanForm({ handleChange }) {
  const [service, setService] = useState("");

  const handleValueChange = (value) => {
    setService(value);
    handleChange("handymanService", "type", value);
  };
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Type of Handyman Work</label>
            <Select value={service} onValueChange={handleValueChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="furniture assembly">
                  🔨 Furniture Assembly
                </SelectItem>
                <SelectItem value="Door & Window Repairs">
                  🚪 Door & Window Repairs
                </SelectItem>
                <SelectItem value="Picture Hanging & Mounting">
                  🖼️ Picture Hanging & Mounting
                </SelectItem>
                <SelectItem value="tv-mounting">📦 TV Mounting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {service === "furniture assembly" && (
            <div className="space-y-2">
              <label className="text-sm">Furniture Type</label>
              <Select
                onValueChange={(value) =>
                  handleChange("handymanService", "propertyValue", value)
                }
                required
              >
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

          {service === "Door & Window Repairs" && (
            <div className="space-y-2">
              <label className="text-sm">Repair Type</label>
              <Select
                onValueChange={(value) =>
                  handleChange("handymanService", "propertyValue", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Repair Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hinge/Lock Fix">Hinge/Lock Fix</SelectItem>
                  <SelectItem value="Part Replacement">
                    Part Replacement
                  </SelectItem>
                  <SelectItem value="Window Glass Repair">
                    Window Glass Repair
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {service === "Picture Hanging & Mounting" && (
            <div className="space-y-2">
              <label className="text-sm">Item Type</label>
              <Select
                onValueChange={(value) =>
                  handleChange("handymanService", "propertyValue", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Item Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    Small Frames (A3 or smaller)
                  </SelectItem>
                  <SelectItem value="Medium Frames/Mirrors">
                    Medium Frames/Mirrors
                  </SelectItem>
                  <SelectItem value="Large/Heavy Items">
                    Large/Heavy Items
                  </SelectItem>
                  <SelectItem value="Gallery Wall Arrangement">
                    Gallery Wall Arrangement
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {service === "tv-mounting" && (
            <div className="space-y-2">
              <label className="text-sm">TV Size</label>
              <Select
                onValueChange={(value) =>
                  handleChange("handymanService", "propertyValue", value)
                }
                required
              >
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
