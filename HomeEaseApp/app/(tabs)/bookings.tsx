import {
  Calendar,
  Home,
  Phone,
  Sparkles,
  User,
  Wrench,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import PremiumAppHeader from "~/components/AppHeader";
import BookingDetailsModal from "~/components/booking/BookingDetailsModal";
import { formatDate } from "~/Utils/Utils";
import { formatTime } from "~/Utils/Utils";
import { useAuth } from "~/contexts/AuthContext";
import {
  getAllUpcomingCustomerBooking,
  getAllUpcomingProviderBooking,
  getCutomerBookingHistory,
  getProviderBookingHistory,
} from "~/api/bookingApi";
import UpcomingBookingsSkeletonLoader from "~/components/skeletonLoader/SkeletonUpcomingBookings";
import { Item } from "@rn-primitives/select";
import SearchBar from "~/components/SearchBar";
import LeaveReviewModal from "~/components/reviews/LeaveReviewModal";

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

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [bookingsData, setBookingsData] = useState<BookingData[]>([]);
  const [historyBookingsData, setHistoryBookingsData] = useState<BookingData[]>(
    []
  );
  const [servicesFound, setServicesFound] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<BookingData>();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  // ✅ API state
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const take = 10;

  const fetchServices = async (reset = false) => {
    if (isHistoryLoading || (!hasMore && !reset)) return;
    if (reset) setHistoryBookingsData([]);
    setIsHistoryLoading(true);
    try {
      const currentSkip = reset ? 0 : skip;

      const result = user?.customerID
        ? await getCutomerBookingHistory(
            user.customerID,
            currentSkip,
            take,
            searchQuery
          )
        : await getProviderBookingHistory(
            user?.providerId ?? 0,
            currentSkip,
            take,
            searchQuery
          );
      if (reset) {
        setHistoryBookingsData(result.items);
        setSkip(take);
        setHasMore(result.items.length < result.totalCount);
        setServicesFound(result.totalCount);
      } else {
        setHistoryBookingsData((prev) => {
          const newData = [...prev, ...result.items];
          setHasMore(newData.length < result.totalCount);
          return newData;
        });
        setSkip((prev) => prev + take);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(true);
  }, [searchTrigger]);

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      try {
        if (user?.customerID) {
          const result = await getAllUpcomingCustomerBooking(user.customerID);
          setBookingsData(result);
          setIsUpcomingLoading(false);
          return;
        }

        if (user?.providerId) {
          const result = await getAllUpcomingProviderBooking(user.providerId);
          setBookingsData(result);
          setIsUpcomingLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUpcomingBookings();
  }, [user]);

  const sampleBooking = {
    id: 0,
    customerName: "",
    customerPhone: "",
    serviceName: "",
    serviceTypeName: "",
    companyName: "",
    size: '""',
    bookingDate: "0000-00-00",
    time: "",
    status: "",
    totalCost: 0,
    createdAt: "",
    updatedAt: "",
    address: "",
    rating: null,
  };

  const bookingsDat = {
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

  const showReviewError = (message: any) => {
    if (typeof message === "string") {
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
            <Text className="text-lg font-semibold text-foreground/70 mb-1">
              {booking.serviceName}
            </Text>
            <Text className="text-muted-foreground text-sm">
              {booking.serviceTypeName}
            </Text>
          </View>
        </View>

        {/* Status and Schedule */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <TouchableOpacity
              onPress={() => {
                setBookingId(booking?.id);
                setServiceName(booking.serviceName);
                setCompanyName(booking.companyName);
                setReviewModalVisible(true);
              }}
            >
              <Text className="text-blue-500/70 font-bold">Leave Review</Text>
            </TouchableOpacity>
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

          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="#6b7280" />
            <Text className="text-card-foreground/70 ml-2 font-medium">
              {formatDate(booking.bookingDate)}, {formatTime(booking.time)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedBooking(booking);
              setModalVisible(true);
            }}
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
              {user?.customerID ? (
                <Image
                  source={{
                    uri:
                      booking?.companyLogo ??
                      "https://picsum.photos/600/400?random=9",
                  }}
                  className="w-10 h-10 rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <User size={16} color="#6b7280" />
              )}
            </View>
            <View>
              <Text className="font-medium text-card-foreground">
                {user?.customerID ? booking.companyName : booking.customerName}
              </Text>
              <Text className="text-muted-foreground text-sm">
                {user?.customerID ? "Service provider" : "Customer"}
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
      {/* Search Bar */}
      {/* Search Bar */}
      <View className="px-4 pb-6">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onPress={() => setActiveTab("history")}
          placeholder="Search service or service provider or customer's name"
          searchTrigger={() => {
            setSearchTrigger(searchQuery);
          }}
        />
      </View>
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
              {isUpcomingLoading ? (
                <View>
                  <UpcomingBookingsSkeletonLoader />
                  <UpcomingBookingsSkeletonLoader />
                  <UpcomingBookingsSkeletonLoader />
                </View>
              ) : bookingsData.length > 0 ? (
                bookingsData.map(renderBookingCard)
              ) : (
                renderEmptyState("upcoming")
              )}
            </ScrollView>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            {
              <FlatList
                data={historyBookingsData}
                renderItem={({ item }) => renderBookingCard(item)}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                onEndReached={() => fetchServices()}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  isHistoryLoading ? <ActivityIndicator size="small" /> : null
                }
                ListEmptyComponent={
                  !isHistoryLoading ? (
                    renderEmptyState
                  ) : (
                    <View>
                      <UpcomingBookingsSkeletonLoader />
                      <UpcomingBookingsSkeletonLoader />
                      <UpcomingBookingsSkeletonLoader />
                    </View>
                  )
                }
                initialNumToRender={5} // how many items to render initially
                maxToRenderPerBatch={10} // render more as you scroll
                windowSize={5} // number of screens worth of content to render
                removeClippedSubviews // unmount off-screen items
              />
            }
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
              {bookingsDat.draft.length > 0
                ? bookingsDat.draft.map(renderBookingCard)
                : renderEmptyState("draft")}
            </ScrollView>
          </TabsContent>
        </Tabs>
      </View>
      <LeaveReviewModal
        visible={reviewModalVisible}
        onClose={() => {
          setBookingId(null);
          setReviewModalVisible(false);
        }}
        bookingId={bookingId}
        serviceName={serviceName}
        companyName={companyName}
      />
      <BookingDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        booking={selectedBooking ?? sampleBooking}
        onCallCustomer={handleCallCustomer}
        onUpdateStatus={handleUpdateStatus}
        onRateService={handleRateService}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;
