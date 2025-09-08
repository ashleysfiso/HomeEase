// SkeletonBooking.jsx
import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SkeletonBookingConfrimation() {
  // animated value for pulsing opacity
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

  // interpolate between two opacities for nicer effect
  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  return (
    <AnimatedView
      style={{ opacity }}
      className="bg-muted rounded-2xl p-2 flex-row items-center"
    >
      {/* left icon placeholder */}
      <View className="p-2 rounded-full mr-3">
        <AnimatedView style={{ opacity }} className="w-8 h-8 rounded-full" />
      </View>

      {/* main content placeholders */}
      <View className="flex-1">
        {/* title placeholder */}
        <AnimatedView
          style={{ opacity }}
          className="h-5 rounded-md mb-2 w-3/4"
        />

        {/* subtitle placeholder */}
        <AnimatedView
          style={{ opacity }}
          className="h-4 rounded-md mb-2 w-1/2"
        />

        {/* time row placeholder */}
        <View className="flex-row items-center">
          <AnimatedView style={{ opacity }} className="w-3 h-3 rounded-full " />
          <AnimatedView
            style={{ opacity }}
            className="h-4 rounded-md ml-2 w-40 "
          />
        </View>
      </View>

      {/* right action placeholder */}
      <TouchableOpacity className=" p-2 rounded-full">
        <AnimatedView style={{ opacity }} className="w-6 h-6 rounded-full " />
      </TouchableOpacity>
    </AnimatedView>
  );
}
