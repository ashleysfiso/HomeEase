import React from "react";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }) {
  if (status === "Approved") {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center"
      >
        <CheckCircle2 className="h-3 w-3" />
        <span>Approved</span>
      </Badge>
    );
  } else if (status === "Pending") {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-50 text-yellow-700 border-yellow-200 flex gap-1 items-center"
      >
        <Clock className="h-3 w-3" />
        <span>Pending</span>
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 border-red-200 flex gap-1 items-center"
      >
        <AlertCircle className="h-3 w-3" />
        <span>Rejected</span>
      </Badge>
    );
  }
}
