import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function BookingsListSkeleton() {
  // Create an array of 5 items for the skeleton rows/cards
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="mx-auto">
      {/* Desktop view - Table skeleton */}
      <div className="hidden md:block rounded-md border">
        <div className="w-full">
          {/* Table header skeleton */}
          <div className="flex w-full border-b">
            <Skeleton className="h-12 w-1/5 p-4" />
            <Skeleton className="h-12 w-1/5 p-4" />
            <Skeleton className="h-12 w-1/5 p-4" />
            <Skeleton className="h-12 w-1/5 p-4" />
            <Skeleton className="h-12 w-1/5 p-4" />
            <Skeleton className="h-12 w-[80px] p-4" />
          </div>

          {/* Table rows skeleton */}
          {skeletonItems.map((item) => (
            <div key={item} className="flex w-full border-b">
              <div className="w-1/5 p-4">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="w-1/5 p-4">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="w-1/5 p-4">
                <Skeleton className="h-5 w-4/5" />
              </div>
              <div className="w-1/5 p-4">
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <div className="w-1/5 p-4">
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="w-[80px] p-4 flex justify-center">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view - Cards skeleton */}
      <div className="grid gap-4 md:hidden">
        {skeletonItems.map((item) => (
          <Card key={item}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Skeleton className="h-9 w-28 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-5 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[70px] rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
