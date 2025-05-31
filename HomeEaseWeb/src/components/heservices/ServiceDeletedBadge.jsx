import { Badge } from "@/components/ui/badge";
import { CheckCircle, Ban } from "lucide-react";

export function ServicDeletedBedge({ isDeleted }) {
  return isDeleted ? (
    <Badge variant="destructive" className="flex items-center gap-1">
      <Ban className="w-4 h-4" />
      Deleted
    </Badge>
  ) : (
    <Badge variant="success" className="flex items-center gap-1">
      <CheckCircle className="w-4 h-4" />
      Active
    </Badge>
  );
}
