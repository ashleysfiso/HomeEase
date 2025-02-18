import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Search for services (e.g., Cleaning, Repairs)"
        className="px-4 py-2 rounded-lg shadow-md focus:outline-none"
      />
    </div>
  );
}