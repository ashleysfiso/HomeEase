import React, { useState, useEffect } from "react";
import Reviews from "@/components/Reviews/Reviews";
import { GetProviderReviews } from "@/api";
import MyLoader from "@/components/MyLoader";
import { useAuth } from "@/contexts/AuthContext";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const serviceProviderId = user?.providerId;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await GetProviderReviews(serviceProviderId);
        setReviews(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, please try again later");
      }
    };
    if (serviceProviderId) {
      fetchReviews();
    }
  }, [serviceProviderId]);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center w-full">
          <MyLoader />
        </div>
      ) : (
        reviews && <Reviews data={reviews} />
      )}
    </div>
  );
}
