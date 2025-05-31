import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteAlertDialog({
  isLoading,
  handelAction,
  id,
  message,
  buttonText,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isLoading}>
        <Button variant="outline" size="sm" className="text-red-500">
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : buttonText ? (
            buttonText
          ) : (
            "Delete"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {message ? (
              message
            ) : (
              <p>
                This action cannot be undone. This will permanently delete this
                service and remove this item's data from our servers.{" "}
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handelAction(id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
