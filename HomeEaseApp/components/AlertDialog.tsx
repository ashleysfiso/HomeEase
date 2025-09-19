"use client";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  X,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertDialogProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  singleButton?: boolean;
}

const AlertDialog = ({
  visible,
  type = "info",
  title,
  message,
  primaryButtonText = "OK",
  secondaryButtonText = "Cancel",
  onPrimaryPress,
  onSecondaryPress,
  onClose,
  showCloseButton = true,
  singleButton = false,
}: AlertDialogProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);

  const getIconAndColors = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "#10b981", // green-500
          bgColor: "#10b98120", // green-500 with opacity
          primaryButtonBg: "#10b981",
        };
      case "error":
        return {
          icon: XCircle,
          iconColor: "#ef4444", // red-500
          bgColor: "#ef444420", // red-500 with opacity
          primaryButtonBg: "#ef4444",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "#f59e0b", // amber-500
          bgColor: "#f59e0b20", // amber-500 with opacity
          primaryButtonBg: "#f59e0b",
        };
      case "info":
      default:
        return {
          icon: Info,
          iconColor: "#3b82f6", // blue-500
          bgColor: "#3b82f620", // blue-500 with opacity
          primaryButtonBg: "#3b82f6",
        };
    }
  };

  const {
    icon: IconComponent,
    iconColor,
    bgColor,
    primaryButtonBg,
  } = getIconAndColors();

  const handlePrimaryPress = () => {
    onPrimaryPress?.();
  };

  const handleSecondaryPress = () => {
    onSecondaryPress?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View
        className="flex-1 justify-center items-center px-6"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: opacityAnim,
        }}
      >
        <Animated.View
          className="bg-background rounded-3xl shadow-2xl overflow-hidden"
          style={{
            width: width - 48,
            maxWidth: 400,
            transform: [{ scale: scaleAnim }],
            elevation: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
          }}
        >
          {/* Header with close button */}
          {showCloseButton && (
            <View className="absolute top-4 right-4 z-10">
              <TouchableOpacity onPress={handleClose} className="p-2">
                <X size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          )}

          {/* Content */}
          <View className="px-6 pt-8 pb-6">
            {/* Icon */}
            <View className="items-center mb-6">
              <View
                className="w-16 h-16 rounded-full items-center justify-center"
                style={{ backgroundColor: bgColor }}
              >
                <IconComponent size={32} color={iconColor} />
              </View>
            </View>

            {/* Title */}
            <Text className="text-xl font-bold text-foreground text-center mb-3">
              {title}
            </Text>

            {/* Message */}
            <Text className="text-base text-foreground-muted text-center leading-6 mb-8">
              {message}
            </Text>

            {/* Buttons */}
            <View className={`${singleButton ? "flex-col" : "flex-row"} gap-3`}>
              {!singleButton && (
                <TouchableOpacity
                  onPress={handleSecondaryPress}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-300 items-center"
                  style={{
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <Text className="text-gray-700 font-semibold text-base">
                    {secondaryButtonText}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handlePrimaryPress}
                className={`${
                  singleButton ? "w-full" : "flex-1"
                } py-3 px-4 rounded-xl items-center bg-blue-500`}
                style={{
                  shadowColor: primaryButtonBg,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text className="text-white font-bold text-base">
                  {primaryButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default AlertDialog;
