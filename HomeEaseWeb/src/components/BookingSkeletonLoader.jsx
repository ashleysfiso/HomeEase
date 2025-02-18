import React from "react";

export default function BookingSkeletonLoader() {
  return (
    <div className="container mx-auto p-4 py-20">
      {/* Collapsible Price Breakdown (Skeleton) */}
      <div className="lg:hidden mb-4">
        <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Card Skeleton */}
        <div className="w-full lg:w-2/3 animate-pulse">
          <div className="bg-gray-200 p-6 rounded-lg">
            <div className="h-8 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-6">
              <div className="space-y-4">
                {/* About Your Clean Section */}
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-1/2">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
                {/* Extras */}
                <div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-1/4"></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array(6)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="h-6 bg-gray-200 rounded"
                        ></div>
                      ))}
                  </div>
                </div>
                {/* Date and Time */}
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-1/2">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              {/* Address */}
              <div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              {/* Submit Button */}
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>

        {/* Price Breakdown Skeleton */}
        <div className="hidden lg:block w-full lg:w-1/3 animate-pulse">
          <div className="bg-gray-200 p-6 rounded-lg h-60"></div>
        </div>
      </div>
    </div>
  );
}
