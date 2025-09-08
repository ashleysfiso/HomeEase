"use client";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { ArrowRight } from "lucide-react-native";
import type { OnboardingSlideData } from "../data/OnBoardingData";

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  isLastSlide: boolean;
  onNext: () => void;
  onSkip: () => void;
  currentIndex: number;
  totalSlides: number;
}

const { width } = Dimensions.get("window");

const OnboardingSlide = ({
  slide,
  isLastSlide,
  onNext,
  onSkip,
  currentIndex,
  totalSlides,
}: OnboardingSlideProps) => {
  return (
    <View
      className="flex-1 items-center justify-between bg-background px-6 pb-12"
      style={{ width }}
    >
      <View className="flex-1 items-center justify-center pt-12">
        <Image
          source={slide.image}
          className="w-30 h-64 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-foreground text-center mb-4">
          {slide.title}
        </Text>
        <Text className="text-base text-muted-foreground text-center px-4">
          {slide.description}
        </Text>
      </View>

      <View className="items-center mb-8">
        {/* Pagination Dots */}
        <View className="flex-row mb-8">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === currentIndex ? "bg-blue-500" : "bg-muted-foreground"
              }`}
            />
          ))}
        </View>

        {/* Buttons */}
        <TouchableOpacity
          onPress={onNext}
          className="bg-blue-500 rounded-xl py-4 px-8 flex-row items-center  w-full mb-4"
        >
          <Text className="text-primary-foreground font-bold text-lg mr-2">
            {isLastSlide ? "Get Started" : "Next"}
          </Text>
          <ArrowRight size={20} className="bg-foreground" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSkip}>
          <Text className="text-muted-foreground font-medium text-base">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingSlide;
