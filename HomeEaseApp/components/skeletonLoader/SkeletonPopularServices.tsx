// SkeletonPopularServices.jsx
import React, { useEffect, useRef } from "react";
import { View, FlatList, Animated } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SkeletonPopularServices() {
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

  const skeletonData = Array.from({ length: 5 }, (_, i) => ({ id: i }));

  const renderItem = () => (
    <AnimatedView
      style={{ opacity, width: 150, marginRight: 12 }}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border mr-3"
    >
      {/* Image placeholder */}
      <View className="w-full h-32 bg-muted" />

      {/* Text + price + rating placeholder */}
      <View className="p-3">
        <View className="h-4 bg-muted rounded-md w-3/4 mb-2" />
        <View className="flex-row justify-between items-center">
          <View className="h-4 bg-muted rounded-md w-12" />
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-muted mr-1" />
            <View className="h-3 w-6 bg-muted rounded-md" />
          </View>
        </View>
      </View>
    </AnimatedView>
  );

  return (
    <FlatList
      data={skeletonData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="mb-6"
    />
  );
}
