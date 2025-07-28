import { Search } from "lucide-react-native";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-white rounded-2xl shadow-sm border border-gray-100">
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9ca3af"
        className="flex-1 px-4 py-4 text-gray-900"
      />
      <TouchableOpacity className="bg-blue-600 m-2 p-3 rounded-xl">
        <Search size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
