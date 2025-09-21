import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Home,
  User,
  Phone,
  Building,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

interface BookingData {
  id: number;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceTypeName: string;
  companyName: string;
  size: string;
  bookingDate: string;
  time: string;
  status: string;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  address: string;
  rating: number | null;
}

interface BookingDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  booking: BookingData | null;
  onCallCustomer?: () => void;
  onUpdateStatus?: (status: string) => void;
  onRateService?: () => void;
}

const BookingDetailsModal = ({
  visible,
  onClose,
  booking,
  onCallCustomer,
  onUpdateStatus,
  onRateService,
}: BookingDetailsModalProps) => {
  if (!booking) {
    console.log("BookingDetailsModal - No booking data provided");
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return { bg: "#10b98120", text: "#10b981", icon: CheckCircle };
      case "pending":
        return { bg: "#f59e0b20", text: "#f59e0b", icon: AlertCircle };
      case "completed":
        return { bg: "#10b98120", text: "#10b981", icon: CheckCircle };
      case "cancelled":
        return { bg: "#ef444420", text: "#ef4444", icon: XCircle };
      default:
        return { bg: "#6b728020", text: "#6b7280", icon: AlertCircle };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.log("Error formatting date:", error);
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = Number.parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      console.log("Error formatting time:", error);
      return timeString;
    }
  };

  const parseSize = (sizeString: string) => {
    try {
      if (!sizeString) return "Not specified";

      // Handle the specific format from your data
      // "\"Bedrooms\":\"6+ Bedrooms\",\"Bathrooms\":\"1-3 Bathrooms\""
      const cleanSize = sizeString.replace(/\\"/g, '"').replace(/"/g, "");
      const parts = cleanSize.split(",");
      return parts
        .map((part) => {
          const [key, value] = part.split(":");
          return `${key?.trim()}: ${value?.trim()}`;
        })
        .join(", ");
    } catch (error) {
      console.log("Error parsing size:", error);
      return sizeString;
    }
  };

  const formatCreatedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) +
        " at " +
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    } catch (error) {
      console.log("Error formatting created date:", error);
      return dateString;
    }
  };

  const statusConfig = getStatusColor(booking.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View
          className="bg-background rounded-t-3xl shadow-2xl"
          style={{
            maxHeight: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 20,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-border">
            <View>
              <Text className="text-xl font-bold text-foreground">
                Booking Details
              </Text>
              <Text className="text-sm text-muted-foreground">
                ID: #{booking.id}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-muted-100"
            >
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
            <View className="p-6 gap-6">
              {/* Status Badge */}
              <View className="flex-row items-center justify-center">
                <View
                  className="flex-row items-center px-4 py-2 rounded-full"
                  style={{ backgroundColor: statusConfig.bg }}
                >
                  <StatusIcon size={16} color={statusConfig.text} />
                  <Text
                    className="ml-2 font-semibold text-sm"
                    style={{ color: statusConfig.text }}
                  >
                    {booking.status?.toUpperCase() || "UNKNOWN"}
                  </Text>
                </View>
              </View>

              {/* Customer Information */}
              <View className="bg-background border border-border rounded-2xl p-4">
                <Text className="text-lg font-semibold text-muted-foreground mb-3">
                  Customer Information
                </Text>

                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <User size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Customer Name</Text>
                    <Text className="text-base font-medium text-foreground/70">
                      {booking.customerName || "Not provided"}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={onCallCustomer}
                  className="flex-row items-center"
                >
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Phone size={20} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Phone Number</Text>
                    <Text className="text-base font-medium text-green-600">
                      {booking.customerPhone || "Not provided"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Service Information */}
              <View className="bg-background border border-border rounded-2xl p-4">
                <Text className="text-lg font-semibold text-muted-foreground mb-3">
                  Service Details
                </Text>

                <View className="flex-row items-start mb-3">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                    <Home size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Service</Text>
                    <Text className="text-base font-medium text-foreground/70 mb-1">
                      {booking.serviceName || "Not specified"}
                    </Text>
                    <Text className="text-sm text-blue-600 font-medium">
                      {booking.serviceTypeName || "Not specified"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Building size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Company</Text>
                    <Text className="text-base font-medium text-foreground/70">
                      {booking.companyName || "Not specified"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                    <Home size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">
                      Size & Options
                    </Text>
                    <Text className="text-base font-medium text-foreground/70">
                      {parseSize(booking.size)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Booking Information */}
              <View className="bg-background border border-border rounded-2xl p-4">
                <Text className="text-lg font-semibold text-muted-foreground mb-3">
                  Booking Information
                </Text>

                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Calendar size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Date</Text>
                    <Text className="text-base font-medium text-foreground/70">
                      {formatDate(booking.bookingDate)}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Clock size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Time</Text>
                    <Text className="text-base font-medium text-foreground/70">
                      {formatTime(booking.time)}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                    <MapPin size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Address</Text>
                    <Text className="text-base font-medium text-foreground/70">
                      {booking.address || "Not provided"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Cost Information */}
              <View className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-blue-200 rounded-full items-center justify-center mr-4">
                    <DollarSign size={24} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">Total Cost</Text>
                    <Text className="text-3xl font-bold text-blue-600">
                      ${booking.totalCost || 0}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Rating Section */}
              {booking.rating !== null && booking.rating !== undefined ? (
                <View className="bg-gray-50 rounded-2xl p-4">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-yellow-100 rounded-full items-center justify-center mr-3">
                      <Star size={20} color="#eab308" fill="#eab308" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm text-gray-500">
                        Service Rating
                      </Text>
                      <Text className="text-base font-medium text-gray-900">
                        {booking.rating}/5 Stars
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                booking.status?.toLowerCase() === "completed" && (
                  <TouchableOpacity
                    onPress={onRateService}
                    className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200"
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-yellow-200 rounded-full items-center justify-center mr-3">
                        <Star size={20} color="#eab308" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-medium text-gray-900">
                          Rate this service
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Share your experience
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              )}

              {/* Timestamps */}
              <View className="bg-gray-50 rounded-2xl p-4">
                <Text className="text-sm text-gray-500 mb-2">
                  <Text className="font-medium">Created:</Text>{" "}
                  {booking.createdAt
                    ? formatCreatedDate(booking.createdAt)
                    : "Not available"}
                </Text>
                <Text className="text-sm text-gray-500">
                  <Text className="font-medium">Last Updated:</Text>{" "}
                  {booking.updatedAt
                    ? formatCreatedDate(booking.updatedAt)
                    : "Not available"}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          {booking.status?.toLowerCase() === "pending" && (
            <View className="p-6 border-t border-border">
              <View className="flex-row gap-x-4">
                <TouchableOpacity
                  onPress={() => onUpdateStatus?.("cancelled")}
                  className="flex-1 py-3 px-4 rounded-xl border border-red-200 bg-red-50 items-center"
                >
                  <Text className="text-red-600 font-semibold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onUpdateStatus?.("confirmed")}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 items-center"
                >
                  <Text className="text-white font-bold">Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BookingDetailsModal;
