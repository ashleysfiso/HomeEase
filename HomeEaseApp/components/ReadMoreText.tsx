import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ReadMoreTextProps {
  description: string;
}

const ReadMoreText = ({ description }: ReadMoreTextProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <View>
      <Text
        className="text-gray-700 leading-6 mb-2"
        numberOfLines={showAll ? undefined : 2}
      >
        {description}
      </Text>
      {description.length > 100 && (
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text className="text-blue-500">
            {showAll ? "Read less" : "Read more"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMoreText;
