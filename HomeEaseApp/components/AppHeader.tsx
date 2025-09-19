import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Bell, MessageCircle, Search, Sparkles } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeToggle } from "~/components/ThemeToggle";

interface PremiumAppHeaderProps {
  showSearch?: boolean;
  showNotifications?: boolean;
  showMessages?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onMessagePress?: () => void;
  notificationCount?: number;
  variant?: "gradient" | "glass" | "minimal";
}

const PremiumAppHeader = ({
  showSearch = true,
  showNotifications = true,
  showMessages = false,
  onSearchPress,
  onNotificationPress,
  onMessagePress,
  notificationCount = 0,
  variant = "glass",
}: PremiumAppHeaderProps) => {
  const insets = useSafeAreaInsets();

  const renderBackground = () => {
    switch (variant) {
      case "gradient":
        return (
          <LinearGradient
            colors={["#3b82f6", "#1d4ed8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0"
          />
        );
      case "glass":
        return (
          <View className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        );
      default:
        return <View className="absolute inset-0 bg-background" />;
    }
  };

  const textColor = variant === "gradient" ? "text-white" : "text-foreground";
  const subtitleColor =
    variant === "gradient" ? "text-white/80" : "text-muted-foreground";
  const iconColor = variant === "gradient" ? "#ffffff" : "#6b7280";

  return (
    <>
      <StatusBar
        barStyle={variant === "gradient" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <View
        style={{
          paddingTop: insets.top,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: variant === "gradient" ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {renderBackground()}

        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between">
            {/* Left - App Name */}
            <View className="flex-1">
              <View className="flex-row items-center">
                <View>
                  <Text
                    className={`text-3xl font-black ${textColor} tracking-tight`}
                    style={{
                      fontFamily:
                        Platform.OS === "ios" ? "SF Pro Display" : "Roboto",
                      letterSpacing: -1,
                    }}
                  >
                    Home
                    <Text
                      className={`text-3xl font-light ${
                        variant === "gradient"
                          ? "text-white/90"
                          : "text-primary"
                      }`}
                      style={{
                        fontFamily:
                          Platform.OS === "ios" ? "SF Pro Display" : "Roboto",
                        letterSpacing: -0.5,
                      }}
                    >
                      Ease
                    </Text>
                  </Text>
                  <Text
                    className={`text-xs ${subtitleColor} font-medium tracking-widest uppercase`}
                  >
                    Premium Cleaning
                  </Text>
                </View>
              </View>
            </View>

            {/* Right - Action Icons */}
            <View className="flex-row items-center gap-2">
              {
                <TouchableOpacity
                  className={`p-3 rounded-2xl ${
                    variant === "gradient"
                      ? "bg-white/20 active:bg-white/30"
                      : "bg-muted/50 active:bg-muted"
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                ></TouchableOpacity>
              }

              {showNotifications && (
                <TouchableOpacity
                  onPress={onNotificationPress}
                  className={`p-3 rounded-2xl relative ${
                    variant === "gradient"
                      ? "bg-white/20 active:bg-white/30"
                      : "bg-muted/50 active:bg-muted"
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Bell size={22} color={iconColor} />
                  {notificationCount > 0 && (
                    <View className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full items-center justify-center border-2 border-white">
                      <Text className="text-white text-xs font-bold">
                        {notificationCount > 9 ? "9+" : notificationCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}

              {showMessages && (
                <TouchableOpacity
                  onPress={onMessagePress}
                  className={`p-3 rounded-2xl ${
                    variant === "gradient"
                      ? "bg-white/20 active:bg-white/30"
                      : "bg-muted/50 active:bg-muted"
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <MessageCircle size={22} color={iconColor} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default PremiumAppHeader;
