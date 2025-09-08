import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CheckCircle,
  Info,
  Percent,
  XCircle,
  TriangleAlert,
} from "lucide-react-native";
import { router } from "expo-router"; // Import router from expo-router

const notificationsData = [
  {
    id: "1",
    type: "offer",
    title: "Best offer for you!",
    shortDescription:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    fullDescription:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    icon: Percent,
    iconColor: "#22c55e", // green-500
    bgColor: "#22c55e20", // green-500 with 20% opacity
  },
  {
    id: "2",
    type: "warning",
    title: "Warning.",
    shortDescription: "Your password is not strong enough. Please update it.",
    fullDescription:
      "Your password is not strong enough. It is recommended to use a combination of uppercase and lowercase letters, numbers, and special characters to create a strong password. Please update it as soon as possible to ensure the security of your account.",
    icon: TriangleAlert,
    iconColor: "#facc15", // yellow-400
    bgColor: "#facc1520", // yellow-400 with 20% opacity
  },
  {
    id: "3",
    type: "success",
    title: "Congratulations!",
    shortDescription: "Success create your account. Enjoy our services.",
    fullDescription:
      "Congratulations! Your account has been successfully created. You can now log in and enjoy all the features and services we offer. We are excited to have you as part of our community!",
    icon: CheckCircle,
    iconColor: "#22c55e", // green-500
    bgColor: "#22c55e20", // green-500 with 20% opacity
  },
  {
    id: "4",
    type: "info",
    title: "Did you know?",
    shortDescription:
      "Get you best offers and discounts by enabling notifications.",
    fullDescription:
      "Did you know that by enabling notifications, you can receive personalized offers, exclusive discounts, and important updates directly to your device? Don't miss out on great deals and stay informed about new features and services!",
    icon: Info,
    iconColor: "#3b82f6", // blue-500
    bgColor: "#3b82f620", // blue-500 with 20% opacity
  },
  {
    id: "5",
    type: "error",
    title: "Something went wrong!",
    shortDescription:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    fullDescription:
      "Something went wrong while processing your request. Please try again later. If the issue persists, contact our support team for assistance. We apologize for any inconvenience this may cause.",
    icon: XCircle,
    iconColor: "#ef4444", // red-500
    bgColor: "#ef444420", // red-500 with 20% opacity
  },
  {
    id: "6",
    type: "offer",
    title: "Best offer for you!",
    shortDescription:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    fullDescription:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    icon: Percent,
    iconColor: "#22c55e", // green-500
    bgColor: "#22c55e20", // green-500 with 20% opacity
  },
  {
    id: "7",
    type: "info",
    title: "Did you know?",
    shortDescription:
      "Get you best offers and discounts by enabling notifications.",
    fullDescription:
      "Did you know that by enabling notifications, you can receive personalized offers, exclusive discounts, and important updates directly to your device? Don't miss out on great deals and stay informed about new features and services!",
    icon: Info,
    iconColor: "#3b82f6", // blue-500
    bgColor: "#3b82f620", // blue-500 with 20% opacity
  },
];

const NotificationScreen = () => {
  const handleViewMore = (notification: (typeof notificationsData)[0]) => {
    // Navigate to the detail screen, passing the notification ID as a parameter
    router.push({
      pathname: "/notifications/details",
      params: { id: notification.id },
    });
  };

  return (
    <SafeAreaView className="flex-1  bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {notificationsData.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <View
              key={notification.id}
              className="bg-card rounded-2xl p-4 mt-4 shadow-sm border border-border"
            >
              <View className="flex-row items-center mb-2">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: notification.bgColor }}
                >
                  <IconComponent size={20} color={notification.iconColor} />
                </View>
                <Text className="text-lg font-semibold text-foreground flex-1">
                  {notification.title}
                </Text>
              </View>
              <Text className="text-muted-foreground text-sm mb-3">
                {notification.shortDescription}
              </Text>
              <TouchableOpacity onPress={() => handleViewMore(notification)}>
                <Text className="text-blue-500 font-medium">View more...</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
