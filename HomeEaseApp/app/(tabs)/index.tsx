import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Droplet,
  Hammer,
  Home,
  MoveRight,
  PanelsTopLeft,
  PartyPopper,
  Shirt,
  Sofa,
  Sparkles,
  Star,
} from "lucide-react-native";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "~/components/SearchBar";
import { Link } from "expo-router";
import { useAuth } from "~/contexts/AuthContext";
import {
  getUpcomingCustomerBooking,
  getUpcomingProviderBooking,
  get5RecentCustomerBookings,
  get5RecentProviderBookings,
} from "~/api/bookingApi";
import { getPopularServices } from "~/api/serviceOfferingApi";
import SkeletonBookingConfrimation from "~/components/skeletonLoader/BookingConfirmationLoader";
import SkeletonPopularServices from "~/components/skeletonLoader/SkeletonPopularServices";
import SkeletonRecentBookings from "~/components/skeletonLoader/SkeletonRecentBooking";
import PremiumAppHeader from "~/components/AppHeader";

export default function Index() {
  const router = useRouter();
  const { loading, user } = useAuth();
  const [upcomingBooking, setUpcomingBooking] = useState<any>(null);
  const [popularServices, setPopularServices] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState({
    popular: true,
    upcoming: true,
    recent: true,
  });

  const updateLoading = (key: string, value: boolean) => {
    setIsLoading((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const categories = [
    { id: 1, name: "House Cleaning", icon: Home, color: "#3b82f6" },
    { id: 2, name: "Office Cleaning", icon: Building2, color: "#10b981" },
    { id: 3, name: "Deep Cleaning", icon: Sparkles, color: "#8b5cf6" },
    { id: 4, name: "Move-In/Out", icon: MoveRight, color: "#f97316" },
    { id: 5, name: "Construction", icon: Hammer, color: "#eab308" },
    { id: 6, name: "Carpet Cleaning", icon: Droplet, color: "#06b6d4" },
    { id: 7, name: "Window Cleaning", icon: PanelsTopLeft, color: "#0ea5e9" },
    { id: 8, name: "Laundry & Ironing", icon: Shirt, color: "#f43f5e" },
    { id: 9, name: "Mattress & Upholstery", icon: Sofa, color: "#6366f1" },
    {
      id: 10,
      name: "After-Party Cleaning",
      icon: PartyPopper,
      color: "#ec4899",
    },
  ];

  const cleaningServices = [
    {
      id: 1,
      title: "Regular House Cleaning",
      image: "/placeholder.svg?height=120&width=160",
      price: "From $80",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Deep Cleaning Service",
      image: "/placeholder.svg?height=120&width=160",
      price: "From $150",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Regular House Cleaning",
      image: "/placeholder.svg?height=120&width=160",
      price: "From $80",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Deep Cleaning Service",
      image: "/placeholder.svg?height=120&width=160",
      price: "From $150",
      rating: 4.9,
    },
    {
      id: 5,
      title: "Regular House Cleaning",
      image: "/placeholder.svg?height=120&width=160",
      price: "From $80",
      rating: 4.8,
    },
  ];

  useEffect(() => {
    const fetchUpcomingBooking = async () => {
      if (user?.customerID) {
        try {
          const booking = await getUpcomingCustomerBooking(user?.customerID);
          updateLoading("upcoming", false);
          setUpcomingBooking(booking);
        } catch (error) {
          console.log(error);
        }
      }
      if (user?.providerId) {
        try {
          const booking = await getUpcomingProviderBooking(user?.providerId);
          updateLoading("upcoming", false);
          setUpcomingBooking(booking);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchRecentBookings = async () => {
      if (user?.customerID) {
        try {
          const bookings = await get5RecentCustomerBookings(user?.customerID);
          updateLoading("recent", false);
          setRecentBookings(bookings);
        } catch (error) {
          console.log(error);
        }
      }
      if (user?.providerId) {
        try {
          const bookings = await get5RecentProviderBookings(user?.providerId);
          updateLoading("recent", false);
          setRecentBookings(bookings);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchPopularServices = async () => {
      try {
        const services = await getPopularServices();
        setPopularServices(services);
        updateLoading("popular", false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!loading) {
      fetchUpcomingBooking();
      fetchPopularServices();
      fetchRecentBookings();
    }
  }, [user]);

  const handleSearch = () => {
    console.log("Search pressed");
  };

  const handleNotifications = () => {
    console.log("Notifications pressed");
  };

  const handleMessages = () => {
    console.log("Messages pressed");
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-background">
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*<View className="flex-row justify-center items-center mt-2n">
          <Image
            source={require("../../assets/images/HomeEase.png")}
            className="w-12 h-10"
          />
          <Text className="text-xl pt-2 font-bold text-primary">HomeEase</Text>
        </View>*/}

        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          {/* Search Bar */}
          <SearchBar
            onPress={() => router.push("/browse")}
            placeholder="Search what you need"
            value=""
            onChangeText={(text: string) => text}
          />
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={({ item }) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity className="items-center mr-4">
                <View
                  className="w-16 h-16 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <IconComponent size={24} color={item.color} />
                </View>
                <Text className="text-foreground text-sm font-medium text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="mb-6"
        />

        {/* Booking Confirmation Card */}
        <View className="px-6 mb-6 ">
          {isLoading.upcoming ? (
            <SkeletonBookingConfrimation />
          ) : upcomingBooking === "No Upcoming Booking" ? (
            <View className="bg-gray-200 rounded-2xl p-4 flex-row items-center">
              <View className="bg-gray-400/40 p-2 rounded-full mr-3">
                <Clock size={24} color="black" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold text-lg mb-1">
                  No Upcoming Bookings
                </Text>
                <Text className="text-gray-600 font-medium mb-1">
                  They’ll appear here once schedul
                </Text>
              </View>
              <TouchableOpacity className="bg-gray-400/40 p-2 rounded-full">
                <ArrowRight size={20} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="bg-blue-600 rounded-2xl p-4 flex-row items-center">
              <View className="bg-white/20 p-2 rounded-full mr-3">
                <CheckCircle size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-lg mb-1">
                  Your booking is Confirmed
                </Text>
                <Text className="text-white/90 font-medium mb-1">
                  {upcomingBooking?.name}
                </Text>
                <View className="flex-row items-center">
                  <Clock size={14} color="white" />
                  <Text className="text-white/90 ml-1">
                    {formatDistanceToNow(new Date(upcomingBooking?.date))} • @
                    {upcomingBooking?.time}
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                <ArrowRight size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Popular Cleaning Services Section */}
        <View className="px-6 ">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-muted-foreground">
              Popular Services
            </Text>
          </View>
          {isLoading.popular ? (
            <SkeletonPopularServices />
          ) : (
            <FlatList
              data={popularServices}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
                  style={{ width: 150, marginRight: 12 }}
                >
                  <Image
                    source={{ uri: item?.imgURL }}
                    className="w-full h-32"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text className="font-semibold text-card-foreground mb-1">
                      {item?.serviceName}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-blue-500 font-medium">
                        From R{item?.rate}
                      </Text>
                      <View className="flex-row items-center">
                        <Star size={12} color="#fbbf24" fill="#fbbf24" />
                        <Text className="text-muted-foreground text-sm">
                          {" "}
                          {item?.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) =>
                `${item.serviceId}-${item.serviceProviderId}`
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              className="mb-6"
            />
          )}
        </View>

        {/* Recent Services */}
        <View className="px-6 mt-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-muted-foreground">
              Recent Bookings
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          {isLoading.recent ? (
            <SkeletonRecentBookings />
          ) : recentBookings.length > 0 ? (
            <View className="gap-y-3">
              {recentBookings.map((booking: any) => (
                <TouchableOpacity
                  key={booking.id}
                  className="bg-card rounded-2xl p-4 flex-row items-center shadow-sm border border-border"
                >
                  <View
                    className="bg-primary/10 p-3 rounded-xl mr-4"
                    style={{ backgroundColor: "#3b82f615" }}
                  >
                    <Home size={24} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-card-foreground mb-1">
                      {booking.serviceName}
                    </Text>
                    <Text className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(booking?.createdAt))} ago
                    </Text>
                  </View>
                  <Text className="text-blue-500 font-semibold">
                    R{booking?.totalCost}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-card border border-border rounded-2xl p-6 items-center justify-center">
              <View className="bg-blue-500/10 p-4 rounded-full mb-3">
                <Calendar size={28} color="#3b82f6" />
              </View>
              <Text className="text-card-foreground font-semibold text-base mb-1">
                No recent bookings
              </Text>
              <Text className="text-muted-foreground text-sm text-center">
                Book a service and your recent bookings will appear here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
