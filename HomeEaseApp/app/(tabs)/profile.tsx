import { Link } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Edit3,
  Mail,
  Phone,
  User,
  UserCircle,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "~/contexts/AuthContext";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const userProfile = {
    name: "WaxCraftedLi",
    role: "Customer",
    avatar: "/placeholder.svg?height=80&width=80",
    phoneNumber: "+1 64 072 3456",
    email: "ferg@gmail.com",
    gender: "Male",
    dateOfBirth: "Not Set",
  };

  const profileFields = [
    {
      id: 1,
      label: "Phone Number",
      value: userProfile.phoneNumber,
      icon: Phone,
      hasFlag: true,
    },
    {
      id: 2,
      label: "E-mail",
      value: userProfile.email,
      icon: Mail,
      hasFlag: false,
    },
    {
      id: 3,
      label: "Gender",
      value: userProfile.gender,
      icon: User,
      hasFlag: false,
    },
    {
      id: 4,
      label: "Date of Birth",
      value: userProfile.dateOfBirth,
      icon: Calendar,
      hasFlag: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-card px-6 py-8 items-center border-b border-border">
          {/* Avatar */}
          <View className="relative mb-4">
            <Image
              source={require("../../assets/images/user.png")}
              className="w-20 h-20 rounded-full"
              resizeMode="cover"
            />
            {/* You could add an edit button overlay here if needed */}
          </View>
          {/* User Info */}
          <Text className="text-xl font-bold text-foreground mb-1">
            {userProfile.name}
          </Text>
          <Link href="/profile/edit-profile" asChild>
            <TouchableOpacity className="flex-row items-center">
              <Edit3 size={16} color="#3b82f6" />
              <Text className="text-blue-500 font-medium ml-1">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Profile Fields */}
        <View className="px-6 py-6">
          {profileFields.map((field) => {
            return (
              <View key={field.id} className="mb-6">
                <Text className="text-card-foreground font-medium mb-2">
                  {field.label}
                </Text>
                <View className="bg-secondary rounded-xl px-4 py-4 flex-row items-center">
                  {field.hasFlag && (
                    <View className="w-6 h-4 bg-red-500 rounded-sm mr-3 items-center justify-center">
                      <Text className="text-white text-xs font-bold">🇺🇸</Text>
                    </View>
                  )}
                  <Text
                    className={`flex-1 text-foreground font-medium ${
                      field.value === "Not Set" ? "text-muted-foreground" : ""
                    }`}
                  >
                    {field.value}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Additional Profile Options */}
        <View className="px-6 py-4">
          <Link href="/support" asChild>
            <TouchableOpacity className="bg-card rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm border border-border">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-500/10 rounded-full items-center justify-center mr-3">
                  <Phone size={20} color="#10b981" />
                </View>
                <Text className="text-foreground font-medium">
                  Support & Help
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Logout Button */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            onPress={logout}
            className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 items-center"
          >
            <Text className="text-destructive font-semibold text-lg">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
