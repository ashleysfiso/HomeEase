import React, { useRef, useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";

const UpcomingBookingsSkeletonLoader = () => {
  const shimmer = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View className="bg-card rounded-2xl p-4 mb-4 shadow-sm border border-border overflow-hidden">
      {/* shimmer overlay */}
      <Animated.View
        className="absolute top-0 left-0 h-full w-full bg-white/10"
        style={{
          transform: [{ translateX }],
        }}
      />

      {/* Service Header */}
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12 rounded-full bg-muted mr-3" />
        <View className="flex-1">
          <View className="h-4 w-32 bg-muted rounded mb-2" />
          <View className="h-3 w-24 bg-muted rounded" />
        </View>
      </View>

      {/* Status and Schedule */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="h-3 w-16 bg-muted rounded" />
          <View className="h-5 w-20 bg-muted rounded-full" />
        </View>

        <View className="h-3 w-20 bg-muted rounded mb-2" />
        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded bg-muted mr-2" />
          <View className="h-3 w-40 bg-muted rounded" />
        </View>

        <View className="bg-muted rounded-xl py-3 mt-3" />
      </View>

      {/* Provider and Call Button */}
      <View className="flex-row items-center justify-between pt-3 border-t border-border">
        <View className="flex-row items-center flex-1">
          <View className="w-8 h-8 bg-muted rounded-full mr-3" />
          <View>
            <View className="h-3 w-28 bg-muted rounded mb-2" />
            <View className="h-3 w-20 bg-muted rounded" />
          </View>
        </View>
        <View className="w-20 h-8 bg-muted rounded-lg" />
      </View>
    </View>
  );
};

export default UpcomingBookingsSkeletonLoader;
