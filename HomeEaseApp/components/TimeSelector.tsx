import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { View, Button, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Clock } from "lucide-react-native";

interface TimeSelector {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function TimePickerScreen({
  selectedTime,
  setSelectedTime,
}: TimeSelector) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const minTime = new Date();
    minTime.setHours(9, 0, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(17, 0, 0, 0);

    if (date < minTime || date > maxTime) {
      Alert.alert(
        "Invalid Time",
        "Please select a time between 09:00 and 17:00"
      );
      hideTimePicker();
      return;
    }
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
