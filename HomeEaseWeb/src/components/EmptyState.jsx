import React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyState({ message = "No items found.", className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 border rounded-2xl bg-muted/50",
        className
      )}
    >
      <Inbox className="w-12 h-12 text-muted-foreground mb-3" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
