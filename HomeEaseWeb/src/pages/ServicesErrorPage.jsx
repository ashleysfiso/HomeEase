import React from "react";
import { Error } from "@/components/Error";

export default function ServicesErrorPage() {
  return (
    <div className="container py-40 mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Data Loading Failed</h1>
      <Error
        title="Unable to Fetch Data from the Server"
        description="The requested data could not be loaded at this time. Please check your internet connection, refresh the page, or try again later. If the issue persists, contact support.."
      />
      <Error description="An unexpected error occurred. Please refresh the page." />
    </div>
  );
}
