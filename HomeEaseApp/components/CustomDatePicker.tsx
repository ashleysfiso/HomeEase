import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { Calendar } from "lucide-react-native";

interface CustomDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
}: CustomDatePickerProps) {
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const handleConfirm = (date: Date) => {
    setPickerVisible(false);
    onChange(date);
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        className="border border-border bg-background px-4 py-3 rounded-xl"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-foreground ">
            {value ? format(value, "MMMM dd, yyyy") : "Select a date"}{" "}
          </Text>
          <Calendar className="bg-blue-500" />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={value ?? new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
        minimumDate={tomorrow}
      />
    </View>
  );
}
