import React from "react";
import { View, FlatList } from "react-native";

const ServiceCardSkeleton = () => {
  const skeletonData = Array.from({ length: 6 }).map((_, i) => ({ id: i }));

  const renderItem = () => (
    <View
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border m-2"
      style={{ width: "45%" }}
    >
      {/* Image Placeholder */}
      <View className="w-full h-32 bg-muted" />

      {/* Content */}
      <View className="p-3">
        {/* Title */}
        <View className="w-28 h-4 bg-muted rounded mb-2" />

        {/* Subtitle */}
        <View className="w-20 h-3 bg-muted rounded mb-2" />

        {/* Bottom row */}
        <View className="flex-row justify-between items-center">
          <View className="w-16 h-3 bg-muted rounded" />
          <View className="w-8 h-3 bg-muted rounded" />
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={skeletonData}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      renderItem={renderItem}
      scrollEnabled={false} // no scrolling for skeleton
    />
  );
};

export default ServiceCardSkeleton;
