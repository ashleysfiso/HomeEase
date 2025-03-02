import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollRestoration } from "react-router-dom";

export function BookingPageSkeleton() {
  return (
    <>
      <ScrollRestoration />
      <div className="min-h-screen bg-background flex flex-col lg:flex-row relative pb-[140px] lg:pb-0">
        {/* Mobile Booking Details Skeleton */}
        <div className="lg:hidden p-4 border-b">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Left Section - Desktop Skeleton */}
        <div className="hidden lg:block lg:w-1/3 p-6 border-r">
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        {/* Right Section Skeleton */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Footer Skeleton */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t p-4 space-y-4">
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
