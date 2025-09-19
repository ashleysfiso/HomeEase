import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ReadMoreTextProps {
  description: string | null;
}

const ReadMoreText = ({ description }: ReadMoreTextProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <View>
      <Text
        className="text-muted-foreground leading-6 mb-2"
        numberOfLines={showAll ? undefined : 2}
      >
        {description}
      </Text>
      {description
        ? description.length > 100 && (
            <TouchableOpacity onPress={() => setShowAll(!showAll)}>
              <Text className="text-blue-500">
                {showAll ? "Read less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )
        : "No text to show"}
    </View>
  );
};

export default ReadMoreText;
