import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, Filter } from "lucide-react";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { DeleteReview } from "@/api";

function StarRating({ rating, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews({ data, isAdmin }) {
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [endIndex, setEndIndex] = useState(2);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalReviews = data.distribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const averageRating =
    data.distribution.reduce((sum, item) => sum + item.stars * item.count, 0) /
    totalReviews;

  const filteredReviews = data.reviews.filter((review) => {
    if (filterBy === "all") return true;
    if (filterBy === "verified") return review.verified;
    if (filterBy === "5-star") return review.rating === 5;
    if (filterBy === "4-star") return review.rating === 4;
    if (filterBy === "3-star") return review.rating === 3;
    if (filterBy === "2-star") return review.rating === 2;
    if (filterBy === "1-star") return review.rating === 1;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "oldest")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    if (sortBy === "helpful") return b.helpful - a.helpful;
    return 0;
  });

  const slicedReviews = sortedReviews.slice(0, endIndex);

  const handleLoadMore = () => {
    setEndIndex((prev) => prev + 2);
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const result = await DeleteReview(id);
      alert("Review has been successfully deleted");
      setIsDeleting(false);
    } catch (error) {
      alert(error.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Customer Reviews</h1>
        <p className="text-muted-foreground">
          See what our customers are saying about their experience
        </p>
      </div>

      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  {averageRating ? averageRating.toFixed(1) : 0}
                </div>
                <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                <p className="text-sm text-muted-foreground">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {data.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{item.stars}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter & Sort</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter reviews" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="verified">Verified Only</SelectItem>
              <SelectItem value="5-star">5 Star</SelectItem>
              <SelectItem value="4-star">4 Star</SelectItem>
              <SelectItem value="3-star">3 Star</SelectItem>
              <SelectItem value="2-star">2 Star</SelectItem>
              <SelectItem value="1-star">1 Star</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {slicedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.customerName}
                      />
                      <AvatarFallback>
                        {review.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{review.customerName}</h4>

                        <Badge variant="secondary" className="text-xs">
                          Verified Booking
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-2">
                  <h5 className="font-medium">{review.serviceName}</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/*<Separator />}

                {/* Review Actions 
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsDown className="w-4 h-4" />
                      Not Helpful ({review.notHelpful})
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Report
                  </Button>
                </div>*/}
                {isAdmin && (
                  <DeleteAlertDialog
                    id={review.id}
                    isLoading={isDeleting}
                    handelAction={handleDelete}
                    message="This action cannot be undone. This will permanently delete this
                            review and remove this item's data from our servers."
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {endIndex < sortedReviews.length && (
        <div className="text-center">
          <Button onClick={handleLoadMore} variant="outline" size="lg">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}
