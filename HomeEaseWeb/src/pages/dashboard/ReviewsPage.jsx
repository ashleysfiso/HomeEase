import React, { useState, useEffect } from "react";
import Reviews from "@/components/Reviews/Reviews";
import { GetReviews } from "@/api";
import MyLoader from "@/components/MyLoader";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await GetReviews();
        setReviews(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, please try again later");
      }
    };
    fetchReviews();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center w-full">
          <MyLoader />
        </div>
      ) : (
        reviews && <Reviews data={reviews} isAdmin={true} />
      )}
    </div>
  );
}
