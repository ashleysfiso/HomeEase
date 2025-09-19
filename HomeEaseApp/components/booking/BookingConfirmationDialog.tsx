import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Home,
  CheckCircle,
} from "lucide-react-native";

interface BookingData {
  serviceTypeName: string;
  size: string;
  bookingDate: string;
  time: string;
  totalCost: number;
  address: string;
}

interface BookingConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingData: BookingData;
  isLoading?: boolean;
}

const BookingConfirmationDialog = ({
  visible,
  onClose,
  onConfirm,
  bookingData,
  isLoading = false,
}: BookingConfirmationDialogProps) => {
  const formatSize = (sizeString: string) => {
    if (!sizeString) return "Not specified";
    return sizeString
      .split(",")
      .map((item) => {
        const [key, value] = item.split(":");
        return `${key}: ${value}`;
      })
      .join(", ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-card rounded-2xl w-full max-w-md shadow-2xl">
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-border">
            <Text className="text-xl font-bold text-foreground">
              Booking Confirmation
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <X size={24} className="bg-foreground" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
            <View className="p-6 space-y-4">
              {/* Service Type */}
              <View className="flex-row items-center space-x-6 mb-2">
                <View className="w-10 h-10 bg-blue-500/10 rounded-full mr-2 items-center justify-center">
                  <Home size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground font-medium">
                    Service Type
                  </Text>
                  <Text className="text-base text-foreground font-semibold mt-1">
                    {bookingData.serviceTypeName}
                  </Text>
                </View>
              </View>

              {/* Size/Options */}
              {bookingData.size && (
                <View className="flex-row items-center space-x-3 mb-2">
                  <View className="w-10 h-10 bg-blue-500/10 rounded-full mr-2 items-center justify-center">
                    <CheckCircle size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-muted-foreground font-medium">
                      Selected Options
                    </Text>
                    <Text className="text-base text-foreground mt-1">
                      {bookingData.size}
                    </Text>
                  </View>
                </View>
              )}

              {/* Date */}
              <View className="flex-row items-center space-x-3 mb-2">
                <View className="w-10 h-10 bg-blue-500/10 rounded-full mr-2 items-center justify-center">
                  <Calendar size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground font-medium">
                    Date
                  </Text>
                  <Text className="text-base text-foreground mt-1">
                    {formatDate(bookingData.bookingDate)}
                  </Text>
                </View>
              </View>

              {/* Time */}
              <View className="flex-row items-center space-x-3 mb-2">
                <View className="w-10 h-10 bg-blue-500/10 rounded-full mr-2 items-center justify-center">
                  <Clock size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground font-medium">
                    Time
                  </Text>
                  <Text className="text-base text-foreground mt-1">
                    {bookingData.time}
                  </Text>
                </View>
              </View>

              {/* Address */}
              <View className="flex-row items-center space-x-3 mb-2">
                <View className="w-10 h-10 bg-blue-500/10 rounded-full mr-2 items-center justify-center">
                  <MapPin size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground font-medium">
                    Service Address
                  </Text>
                  <Text className="text-base text-foreground mt-1">
                    {bookingData.address}
                  </Text>
                </View>
              </View>

              {/* Total Cost */}
              <View className="flex-row items-center space-x-6 bg-blue-500/5 mb-2 p-4 rounded-xl">
                <View className="w-10 h-10 bg-blue-500/20 rounded-full mr-2 items-center justify-center">
                  <DollarSign size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted-foreground font-medium">
                    Total Cost
                  </Text>
                  <Text className="text-2xl text-blue-500 font-bold mt-1">
                    ${bookingData.totalCost}
                  </Text>
                </View>
              </View>

              {/* Important Note */}
              <View className="bg-muted/50 p-4 rounded-xl">
                <Text className="text-sm text-muted-foreground text-center">
                  Please review all details carefully. Once confirmed, you will
                  receive a booking confirmation via email.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View className="flex-row gap-3 p-6 border-t border-border">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-border items-center"
              disabled={isLoading}
            >
              <Text className="text-muted-foreground font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-500 items-center"
              disabled={isLoading}
            >
              <Text className="text-primary-foreground font-bold">
                {isLoading ? "Confirming..." : "Confirm Booking"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookingConfirmationDialog;
