"use client";

import { useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { router } from "expo-router";
import { onboardingSlides } from "../../data/OnBoardingData";
import OnboardingSlide from "../../components/OnboardingSlide";
import { useAuth } from "~/contexts/AuthContext";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Last slide, navigate to login/register
      router.replace("/login");
    }
  };

  const handleSkip = () => {
    // Skip onboarding and go to login/register
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={({ item, index }) => (
          <OnboardingSlide
            slide={item}
            isLastSlide={index === onboardingSlides.length - 1}
            onNext={handleNext}
            onSkip={handleSkip}
            currentIndex={currentIndex}
            totalSlides={onboardingSlides.length}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default OnboardingScreen;
