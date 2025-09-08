import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ArrowLeft, Calendar, Mail, Phone, User } from "lucide-react-native";
import { useState } from "react";
import { router } from "expo-router"; // Assuming Expo Router for navigation

const EditProfile = () => {
  // Dummy user profile data (replace with actual user data from state/API)
  const [name, setName] = useState("WaxCraftedLi");
  const [phoneNumber, setPhoneNumber] = useState("+1 64 072 3456");
  const [email, setEmail] = useState("ferg@gmail.com");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("Not Set"); // Consider a date picker for a real app

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend API
    const updatedProfile = {
      name,
      phoneNumber,
      email,
      gender,
      dateOfBirth,
    };
    console.log("Saving changes:", updatedProfile);
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!"
    );
    // Optionally navigate back after saving
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
      >
        <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
          {/* Profile Fields */}
          <View className="mb-6">
            <Text className="text-card-foreground font-medium mb-2">Name</Text>
            <View className="flex-row items-center bg-input rounded-xl px-4 py-4">
              <User size={20} className="text-muted-foreground" />
              <TextInput
                className="flex-1 ml-3 text-foreground"
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-card-foreground font-medium mb-2">
              Phone Number
            </Text>
            <View className="flex-row items-center bg-input rounded-xl px-4 py-4">
              <Phone size={20} className="text-muted-foreground" />
              <TextInput
                className="flex-1 ml-3 text-foreground"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-card-foreground font-medium mb-2">
              E-mail
            </Text>
            <View className="flex-row items-center bg-input rounded-xl px-4 py-4">
              <Mail size={20} className="text-muted-foreground" />
              <TextInput
                className="flex-1 ml-3 text-foreground"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-card-foreground font-medium mb-2">
              Gender
            </Text>
            <View className="flex-row items-center bg-input rounded-xl px-4 py-4">
              <User size={20} className="text-muted-foreground" />
              <TextInput
                className="flex-1 ml-3 text-foreground"
                value={gender}
                onChangeText={setGender}
                placeholder="Enter gender"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-card-foreground font-medium mb-2">
              Date of Birth
            </Text>
            <View className="flex-row items-center bg-input rounded-xl px-4 py-4">
              <Calendar size={20} className="text-muted-foreground" />
              <TextInput
                className="flex-1 ml-3 text-foreground"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="YYYY-MM-DD (e.g., 1990-01-15)"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            onPress={handleSaveChanges}
            className="bg-blue-500 rounded-xl py-4 items-center shadow-lg mt-4"
          >
            <Text className="text-primary-foreground font-bold text-lg">
              Save Changes
            </Text>
          </TouchableOpacity>

          {/* Cancel Button (Optional, if not using router.back()) */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 py-4 items-center"
          >
            <Text className="text-muted-foreground font-medium">Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;
