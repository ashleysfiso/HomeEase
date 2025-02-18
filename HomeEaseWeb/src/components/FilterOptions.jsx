import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterOptions() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Filter Options</h3>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Price Range</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low to High</SelectItem>
            <SelectItem value="high">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Rating</label>
        <div className="space-y-2">
          <Checkbox id="4stars" />
          <label htmlFor="4stars" className="ml-2">
            4+ Stars
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Availability</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply Filters Button */}
      <Button variant="primary" className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}
