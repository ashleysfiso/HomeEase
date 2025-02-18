import React from "react";

export default function ServicesSkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-background rounded-lg shadow-sm overflow-hidden animate-pulse"
        >
          {/* Skeleton for the image */}
          <div className="animate-pulse w-full h-48 bg-gray-200"></div>

          {/* Skeleton for the content */}
          <div className="p-4">
            {/* Skeleton for the title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

            {/* Skeleton for the "By" section */}
            <div className="flex items-center gap-2 mb-4 animate-pulse">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Skeleton for the rating and reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Skeleton for the button */}
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
