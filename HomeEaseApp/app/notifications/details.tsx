import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useLocalSearchParams, router } from "expo-router"; // Import useLocalSearchParams and router
import {
  CheckCircle,
  Info,
  Percent,
  XCircle,
  TriangleAlert,
} from "lucide-react-native";

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

const NotificationDetailScreen = () => {
  const { id } = useLocalSearchParams(); // Get the 'id' parameter from the URL

  // Find the notification based on the ID
  const notification: (typeof notificationsData)[0] | undefined =
    notificationsData.find((item) => item.id === id);

  if (!notification) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-foreground text-lg">Notification not found.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary rounded-md"
        >
          <Text className="text-primary-foreground">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const IconComponent = notification.icon;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        <View className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <View className="flex-row items-center mb-4">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: notification.bgColor }}
            >
              <IconComponent size={28} color={notification.iconColor} />
            </View>
            <Text className="text-xl font-bold text-foreground flex-1">
              {notification.title}
            </Text>
          </View>
          <Text className="text-card-foreground leading-6">
            {notification.fullDescription}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetailScreen;
