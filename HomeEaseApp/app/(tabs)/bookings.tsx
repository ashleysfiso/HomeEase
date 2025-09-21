import {
  Calendar,
  Home,
  Phone,
  Sparkles,
  User,
  Wrench,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import PremiumAppHeader from "~/components/AppHeader";
import BookingDetailsModal from "~/components/booking/BookingDetailsModal";
import { formatDate } from "~/Utils/Utils";
import { formatTime } from "~/Utils/Utils";

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [modalVisible, setModalVisible] = useState(false);

  const sampleBooking = {
    id: 4,
    customerName: "John Doe",
    customerPhone: "01234455678",
    serviceName: "🧼 Home Cleaning Service 🏡✨",
    serviceTypeName: "✅ Standard Cleaning",
    companyName: "Cleaning Experts",
    size: '"Bedrooms":"6+ Bedrooms","Bathrooms":"1-3 Bathrooms"',
    bookingDate: "2025-06-10",
    time: "13:00",
    status: "Pending",
    totalCost: 1470,
    createdAt: "2025-06-08T15:06:58.8091429",
    updatedAt: "2025-06-08T15:06:58.809144",
    address: "My New Apartment 402b",
    rating: null,
  };

  const bookingsData = {
    upcoming: [
      {
        id: 1,
        service: "Deep Cleaning",
        referenceCode: "RG-247524",
        status: "Confirmed",
        date: "09 Dec",
        time: "8:00-9:00 AM",
        provider: "CleanPro Services",
        icon: Home,
        iconBg: "#ef4444",
        statusColor: "#10b981",
      },
      {
        id: 2,
        service: "Carpet Cleaning",
        referenceCode: "RG-247525",
        status: "Pending",
        date: "10 Dec",
        time: "2:00-4:00 PM",
        provider: "FreshCarpet Co",
        icon: Sparkles,
        iconBg: "#8b5cf6",
        statusColor: "#f59e0b",
      },
      {
        id: 3,
        service: "Window Cleaning",
        referenceCode: "RG-247526",
        status: "Confirmed",
        date: "12 Dec",
        time: "10:00-11:00 AM",
        provider: "ClearView Services",
        icon: Wrench,
        iconBg: "#3b82f6",
        statusColor: "#10b981",
      },
    ],
    history: [
      {
        id: 4,
        service: "Kitchen Cleaning",
        referenceCode: "RG-247520",
        status: "Completed",
        date: "05 Dec",
        time: "9:00-11:00 AM",
        provider: "KitchenCare Pro",
        icon: Home,
        iconBg: "#10b981",
        statusColor: "#6b7280",
      },
      {
        id: 5,
        service: "Bathroom Cleaning",
        referenceCode: "RG-247519",
        status: "Completed",
        date: "03 Dec",
        time: "1:00-2:30 PM",
        provider: "BathClean Services",
        icon: Sparkles,
        iconBg: "#06b6d4",
        statusColor: "#6b7280",
      },
    ],
    draft: [
      {
        id: 6,
        service: "Office Cleaning",
        referenceCode: "RG-247527",
        status: "Draft",
        date: "15 Dec",
        time: "6:00-8:00 PM",
        provider: "OfficePro Clean",
        icon: Wrench,
        iconBg: "#f59e0b",
        statusColor: "#6b7280",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "#10b981";
      case "Pending":
        return "#f59e0b";
      case "Completed":
        return "#10b981";
      case "Draft":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getCallButtonColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "#3b82f6";
      case "Pending":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const renderBookingCard = (booking: any) => {
    const IconComponent = booking.icon;
    return (
      <View
        key={booking.id}
        className="bg-card rounded-2xl p-4 mb-4 shadow-sm border border-border"
      >
        {/* Service Header */}
        <View className="flex-row items-center mb-3">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${booking.iconBg}20` }}
          >
            <Image
              source={{
                uri:
                  booking?.imgURL ?? "https://picsum.photos/600/400?random=4",
              }}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-primary mb-1">
              {booking.service}
            </Text>
            <Text className="text-muted-foreground text-sm">
              Reference Code: {booking.serviceTypeName}
            </Text>
          </View>
        </View>

        {/* Status and Schedule */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-muted-foreground text-sm">Status</Text>
            <View
              className="px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${getStatusColor(booking.status)}20`,
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: getStatusColor(booking.status) }}
              >
                {booking.status}
              </Text>
            </View>
          </View>
          <Text className="text-card-foreground text-sm">Schedule</Text>
          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="#6b7280" />
            <Text className="text-card-foreground ml-2 font-medium">
              {formatDate(booking.date)}, {formatTime(booking.time)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-blue-400 rounded-xl py-3 items-center"
          >
            <Text className="text-primary-foreground font-bold">
              View Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Provider and Call Button */}
        <View className="flex-row items-center justify-between pt-3 border-t border-border">
          <View className="flex-row items-center flex-1">
            <View className="w-8 h-8 bg-muted rounded-full items-center justify-center mr-3">
              <User size={16} color="#6b7280" />
            </View>
            <View>
              <Text className="font-medium text-card-foreground">
                {booking.provider}
              </Text>
              <Text className="text-muted-foreground text-sm">
                Service provider
              </Text>
            </View>
          </View>
          {(booking.status === "Confirmed" || booking.status === "Pending") && (
            <TouchableOpacity
              className="flex-row items-center px-4 py-2 rounded-lg"
              style={{
                backgroundColor: getCallButtonColor(booking.status),
              }}
            >
              <Phone size={16} color="white" />
              <Text className="text-white font-medium ml-2">Call</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = (tabName: string) => (
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-muted-foreground text-lg">No bookings found</Text>
      <Text className="text-muted-foreground/60 text-sm mt-2">
        {tabName === "upcoming" && "You have no upcoming bookings"}
        {tabName === "history" && "No booking history available"}
        {tabName === "draft" && "No draft bookings"}
      </Text>
    </View>
  );

  const handleSearch = () => {
    console.log("Search pressed");
  };

  const handleNotifications = () => {
    console.log("Notifications pressed");
  };

  const handleMessages = () => {
    console.log("Messages pressed");
  };

  const handleCallCustomer = () => {
    console.log("Call Customer", `Calling...`);
  };

  const handleUpdateStatus = (status: string) => {
    console.log("Status Updated", `Booking status changed to: ${status}`);
    setModalVisible(false);
  };

  const handleRateService = () => {
    console.log("Rate Service", "Rating functionality would open here");
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-background">
      {/* Header */}
      <PremiumAppHeader
        showSearch={true}
        showNotifications={true}
        showMessages={true}
        onSearchPress={handleSearch}
        onNotificationPress={handleNotifications}
        onMessagePress={handleMessages}
        notificationCount={5}
        variant="glass"
      />
      {/* Tabs Container */}
      <View className="flex-1 px-6 ">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 gap-3"
        >
          {/* Tab List */}
          <TabsList className="flex-row w-full">
            <TabsTrigger value="upcoming" className="flex-1">
              <Text className="text-sm text-primary font-medium">Upcoming</Text>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1">
              <Text className="text-sm text-primary font-medium">History</Text>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="upcoming" className="flex-1">
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
                flexGrow: 1,
              }}
            >
              {bookingsData.upcoming.length > 0
                ? bookingsData.upcoming.map(renderBookingCard)
                : renderEmptyState("upcoming")}
            </ScrollView>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
                flexGrow: 1,
              }}
            >
              {bookingsData.history.length > 0
                ? bookingsData.history.map(renderBookingCard)
                : renderEmptyState("history")}
            </ScrollView>
          </TabsContent>

          <TabsContent value="draft" className="flex-1">
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
                flexGrow: 1,
              }}
            >
              {bookingsData.draft.length > 0
                ? bookingsData.draft.map(renderBookingCard)
                : renderEmptyState("draft")}
            </ScrollView>
          </TabsContent>
        </Tabs>
      </View>
      <BookingDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        booking={sampleBooking}
        onCallCustomer={handleCallCustomer}
        onUpdateStatus={handleUpdateStatus}
        onRateService={handleRateService}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;
