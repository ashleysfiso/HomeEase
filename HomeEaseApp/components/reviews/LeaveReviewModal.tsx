import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { X, Star, MessageSquare, Send } from "lucide-react-native";
import { addReview } from "~/api/reviewsApi";

interface LeaveReviewModalProps {
  visible: boolean;
  onClose: () => void;
  bookingId: number | null;
  serviceName?: string;
  companyName?: string;
  isSubmitting?: boolean;
}

const LeaveReviewModal = ({
  visible,
  onClose,
  bookingId,
  serviceName = "Service",
  companyName = "Company",
}: LeaveReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Id = bookingId ?? 0;

  const resetForm = () => {
    setRating(0);
    setComment("");
    setHoveredStar(0);
  };

  const handleClose = () => {
    if (rating > 0 || comment.trim()) {
      Alert.alert(
        "Discard Review?",
        "Are you sure you want to close without submitting your review?",
        [
          { text: "Keep Writing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              resetForm();
              onClose();
            },
          },
        ]
      );
    } else {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a star rating before submitting."
      );
      setIsSubmitting(false);
      return;
    }

    if (comment === "") {
      Alert.alert(
        "Comment Required",
        "Please leave a comment before submitting."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await addReview({
        bookingId: Id,
        comment: comment,
        rating: rating,
      });
      Alert.alert("Review Submitted", "Thank you for your feedback!", [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            onClose();
          },
        },
      ]);
      setIsSubmitting(false);
    } catch (error) {
      if (typeof error === "string") {
        Alert.alert("Error", `${error}`);
        setIsSubmitting(false);
      } else {
        Alert.alert("Error", "Failed to submit review. Please try again.");
        setIsSubmitting(false);
      }
    }
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Tap a star to rate";
    }
  };

  const getStarColor = (starNumber: number) => {
    const activeStars = hoveredStar || rating;
    if (starNumber <= activeStars) {
      if (activeStars <= 2) return "#ef4444"; // red for poor ratings
      if (activeStars === 3) return "#f59e0b"; // amber for good
      if (activeStars === 4) return "#10b981"; // emerald for very good
      return "#22c55e"; // green for excellent
    }
    return "#e5e7eb"; // gray for inactive
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-card rounded-t-3xl shadow-2xl max-h-[85%]">
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-border">
            <View className="flex-1">
              <Text className="text-xl font-bold text-foreground">
                Leave a Review
              </Text>
              <Text className="text-muted-foreground text-sm mt-1">
                {serviceName} • {companyName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              className="p-2 rounded-full bg-muted/50"
            >
              <X size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="p-6">
            {/* Rating Section */}
            <View className="items-center mb-8">
              <Text className="text-lg font-semibold text-foreground mb-6">
                How would you rate this service?
              </Text>

              {/* Stars */}
              <View className="flex-row items-center justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    onPressIn={() => setHoveredStar(star)}
                    onPressOut={() => setHoveredStar(0)}
                    className="p-2"
                    activeOpacity={0.7}
                  >
                    <Star
                      size={40}
                      color={getStarColor(star)}
                      fill={getStarColor(star)}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Rating Text */}
              <Text
                className="text-base font-medium"
                style={{
                  color:
                    (hoveredStar || rating) > 0
                      ? getStarColor(hoveredStar || rating)
                      : "#6b7280",
                }}
              >
                {getRatingText(hoveredStar || rating)}
              </Text>
            </View>

            {/* Comment Section */}
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <MessageSquare size={20} color="#3B82F6" />
                <Text className="text-base font-semibold text-foreground ml-2">
                  Write a comment
                </Text>
              </View>

              <View className="bg-input rounded-2xl border border-border p-4">
                <TextInput
                  className="text-foreground text-base min-h-[100px]"
                  placeholder="Share your experience with this service. What did you like? Any suggestions for improvement?"
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={comment}
                  onChangeText={setComment}
                  maxLength={500}
                />
              </View>

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-muted-foreground text-xs">
                  Help others by sharing your honest feedback
                </Text>
                <Text className="text-muted-foreground text-xs">
                  {comment.length}/500
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className={`flex-row items-center justify-center py-4 px-6 rounded-2xl ${
                rating > 0 && !isSubmitting ? "bg-blue-500" : "bg-muted"
              }`}
              disabled={rating === 0 || isSubmitting}
              style={{
                opacity: rating > 0 && !isSubmitting ? 1 : 0.5,
              }}
            >
              <Send size={20} color="white" className="mr-2" />
              <Text
                className={`${
                  rating === 0 ? "text-foreground" : "text-white"
                } font-bold ml-2 text-lg`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Text>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleClose}
              className="items-center py-4"
              disabled={isSubmitting}
            >
              <Text className="text-muted-foreground font-medium">
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LeaveReviewModal;
