import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Button, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Clock } from "lucide-react-native";

export default function TimePickerScreen() {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(time);
    hideTimePicker();
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={showTimePicker}
        className="border border-border bg-background px-4 py-3 rounded-xl"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-foreground">
            {selectedTime ? `${selectedTime}` : "Select time"}
          </Text>
          <Clock />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}
