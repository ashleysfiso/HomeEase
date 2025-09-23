"use client";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { X, Star, User, Calendar, Building } from "lucide-react-native";

export interface ReviewItem {
  id: number;
  customerName: string;
  serviceName: string;
  companyName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsModalProps {
  visible: boolean;
  onClose: () => void;
  reviewsData: ReviewItem[];
  isReviewsLoading?: boolean;
  fetchReviews?: () => void;
  title?: string;
  averageRating: number;
  totalCount: string;
}

const ReviewsModal = ({
  visible,
  onClose,
  reviewsData,
  isReviewsLoading = false,
  fetchReviews,
  title = "Reviews",
  averageRating,
  totalCount,
}: ReviewsModalProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        if (diffInHours === 0) {
          const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
          return diffInMinutes <= 1
            ? "Just now"
            : `${diffInMinutes} minutes ago`;
        }
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
      } else if (diffInDays === 1) {
        return "Yesterday";
      } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
      } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
      } else {
        return formatDate(dateString);
      }
    } catch (error) {
      return formatDate(dateString);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            color={star <= rating ? "#fbbf24" : "#e5e7eb"}
            fill={star <= rating ? "#fbbf24" : "#e5e7eb"}
          />
        ))}
        <Text className="text-muted-foreground text-sm ml-2">({rating}/5)</Text>
      </View>
    );
  };

  const renderReview = (item: ReviewItem) => {
    return (
      <View className="bg-card rounded-2xl p-4 mb-2 shadow-sm border border-border">
        {/* Header with customer info and rating */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-blue-500/10 rounded-full items-center justify-center mr-3">
              <User size={20} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-foreground/70 text-base">
                {item.customerName}
              </Text>
              <Text className="text-muted-foreground text-sm">
                {formatTimeAgo(item.createdAt)}
              </Text>
            </View>
          </View>
          <View className="items-end">{renderStars(item.rating)}</View>
        </View>

        {/* Service and Company Info */}
        <View className="mb-3">
          <View className="flex-row items-center mb-2">
            <Building size={16} color="#3B82F6" />
            <Text className="text-muted-foreground text-sm ml-2 font-medium">
              {item.companyName}
            </Text>
          </View>
          <Text className="text-card-foreground text-sm font-medium">
            {item.serviceName}
          </Text>
        </View>

        {/* Review Comment */}
        {item.comment && item.comment.trim() !== "" && (
          <View className="bg-muted/30 rounded-xl p-3">
            <Text className="text-card-foreground leading-5">
              {item.comment}
            </Text>
          </View>
        )}

        {/* Date stamp */}
        <View className="flex-row items-center justify-end mt-3 pt-3 border-t border-border/50">
          <Calendar size={14} color="#3B82F6" />
          <Text className="text-muted-foreground text-xs ml-1">
            {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  const getAverageRating = () => {
    return averageRating;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50">
        <View className="flex-1 bg-card mt-20 rounded-t-3xl shadow-2xl">
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-border">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground">
                {title}
              </Text>
              <Text className="text-muted-foreground">
                {reviewsData.length} review{reviewsData.length !== 1 ? "s" : ""}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-muted/50"
            >
              <X size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          {/* Rating Summary */}
          {reviewsData.length > 0 && (
            <View className="p-6 border-b border-border">
              <View className="flex-row items-center justify-center mb-4">
                <View className="items-center">
                  <Text className="text-4xl font-bold text-foreground">
                    {getAverageRating()}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        color={
                          star <= Math.round(averageRating)
                            ? "#fbbf24"
                            : "#e5e7eb"
                        }
                        fill={
                          star <= Math.round(averageRating)
                            ? "#fbbf24"
                            : "#e5e7eb"
                        }
                      />
                    ))}
                  </View>
                  <Text className="text-muted-foreground text-sm mt-1">
                    Average Rating
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Reviews List */}
          <View className="flex-1 px-6">
            <FlatList
              data={reviewsData}
              renderItem={({ item }) => renderReview(item)}
              keyExtractor={(item) => `${item.id}`}
              contentContainerStyle={{
                paddingBottom: 20,
                paddingTop: 20,
              }}
              showsVerticalScrollIndicator={false}
              onEndReached={() => fetchReviews?.()}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                isReviewsLoading ? (
                  <View className="items-center py-4">
                    <ActivityIndicator size="small" />
                    <Text className="text-muted-foreground text-sm mt-2">
                      Loading more reviews...
                    </Text>
                  </View>
                ) : null
              }
              ListEmptyComponent={
                !isReviewsLoading ? (
                  <View className="flex-1 items-center justify-center py-20">
                    <View className="w-20 h-20 bg-muted/50 rounded-full items-center justify-center mb-4">
                      <Star size={32} color="#3B82F6" />
                    </View>
                    <Text className="text-muted-foreground text-lg font-medium">
                      No reviews yet
                    </Text>
                    <Text className="text-muted-foreground/60 text-sm mt-2 text-center px-8">
                      Be the first to leave a review for this service
                    </Text>
                  </View>
                ) : (
                  <View className="flex-1 items-center justify-center py-2">
                    <ActivityIndicator size="large" />
                  </View>
                )
              }
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewsModal;
