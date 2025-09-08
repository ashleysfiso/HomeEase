import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeft,
  Book,
  FileText,
  Headset,
  Info,
  Lock,
  Mail,
  Phone,
  Star,
} from "lucide-react-native";
import { router } from "expo-router"; // Assuming Expo Router for navigation

const SupportAndHelp = () => {
  const supportOptions = [
    {
      id: "1",
      title: "FAQs",
      description: "Find answers to common questions",
      icon: Info,
      onPress: () => {
        // Navigate to an FAQ screen or open a web view
        console.log("Navigate to FAQs");
        // router.push("/support/faqs") // Example route
      },
    },
    {
      id: "2",
      title: "Contact Us",
      description: "Get in touch with our support team",
      icon: Headset,
      onPress: () => {
        // Navigate to a contact form or show contact details
        console.log("Navigate to Contact Us");
        // router.push("/support/contact") // Example route
      },
    },
    {
      id: "3",
      title: "Terms of Service",
      description: "Read our terms and conditions",
      icon: FileText,
      onPress: () => {
        // Navigate to Terms of Service screen or open a web view
        console.log("Navigate to Terms of Service");
        // router.push("/legal/terms") // Example route
      },
    },
    {
      id: "4",
      title: "Privacy Policy",
      description: "Understand how we protect your data",
      icon: Lock,
      onPress: () => {
        // Navigate to Privacy Policy screen or open a web view
        console.log("Navigate to Privacy Policy");
        // router.push("/legal/privacy") // Example route
      },
    },
    {
      id: "5",
      title: "Rate Our App",
      description: "Leave us a review on the app store",
      icon: Star,
      onPress: () => {
        // Open app store link
        console.log("Open app store for rating");
      },
    },
    {
      id: "6",
      title: "About Us",
      description: "Learn more about our company",
      icon: Book,
      onPress: () => {
        // Navigate to About Us screen
        console.log("Navigate to About Us");
        // router.push("/about") // Example route
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* Support Options */}
        <View className="mb-6">
          {supportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={option.onPress}
                className="bg-card rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm border border-border"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                    <IconComponent size={20} className="text-blue-500" />
                  </View>
                  <View>
                    <Text className="text-foreground font-medium">
                      {option.title}
                    </Text>
                    <Text className="text-muted-foreground text-sm">
                      {option.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Direct Contact Info (Optional) */}
        <View className="bg-card rounded-xl p-6 shadow-sm border border-border mt-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Need more help?
          </Text>
          <View className="flex-row items-center mb-3">
            <Phone size={20} className="text-blue-500" />
            <Text className="text-card-foreground ml-3">+27 (72) 456-7890</Text>
          </View>
          <View className="flex-row items-center">
            <Mail size={20} className=" text-blue-500" />
            <Text className="text-card-foreground ml-3">
              support@mycompany.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportAndHelp;
