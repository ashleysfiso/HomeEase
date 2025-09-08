import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SkeletonRecentBookings() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  // Dummy 2 items to mimic your list
  const skeletonItems = [1, 2];

  return (
    <View className="px-6 mt-6 mb-8">
      <View className="gap-y-3">
        {skeletonItems.map((item) => (
          <AnimatedView
            key={item}
            style={{ opacity }}
            className="bg-card rounded-2xl p-4 flex-row items-center shadow-sm border border-border"
          >
            {/* Left icon placeholder */}
            <View className="bg-muted/40 p-3 rounded-xl mr-4">
              <View className="w-6 h-6 rounded-md bg-muted" />
            </View>

            {/* Title + subtitle */}
            <View className="flex-1">
              <View className="h-4 bg-muted rounded-md w-40 mb-2" />
              <View className="h-3 bg-muted rounded-md w-28" />
            </View>

            {/* Price placeholder */}
            <View className="h-4 bg-muted rounded-md w-16 ml-3" />
          </AnimatedView>
        ))}
      </View>
    </View>
  );
}
