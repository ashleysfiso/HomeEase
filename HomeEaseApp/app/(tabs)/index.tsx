import React from "react";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Building2,
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
} from "lucide-react-native";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "~/components/SearchBar";

export default function Index() {
  const router = useRouter();

  const categories = [
    { id: 1, name: "House Cleaning", icon: Home, color: "#3b82f6" },
    { id: 2, name: "Office Cleaning", icon: Building2, color: "#10b981" },
    { id: 3, name: "Deep Cleaning", icon: Sparkles, color: "#8b5cf6" },
    { id: 4, name: "Move-In / Move-Out", icon: MoveRight, color: "#f97316" },
    { id: 5, name: "Post-Construction", icon: Hammer, color: "#eab308" },
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
  ];

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-background">
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
          <Text className="text-muted-foreground text-base mb-1">
            HELLO ASHLEY 👋
          </Text>
          <Text className="text-foreground text-2xl font-bold mb-6">
            What you are looking{"\n"}for today
          </Text>

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
        <View className="px-6 mb-6">
          <View className="bg-blue-600 rounded-2xl p-4 flex-row items-center">
            <View className="bg-white/20 p-2 rounded-full mr-3">
              <CheckCircle size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg mb-1">
                Your booking is Confirmed
              </Text>
              <Text className="text-white/90 font-medium mb-1">
                Deep Cleaning Service
              </Text>
              <View className="flex-row items-center">
                <Clock size={14} color="white" />
                <Text className="text-white/90 ml-1">Tomorrow • 2:00 PM</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-white/20 p-2 rounded-full">
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cleaning Services Section */}
        <View className="px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-foreground">
              Popular Services
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            {cleaningServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
                style={{ width: "48%" }}
              >
                <Image
                  source={{ uri: service.image }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="font-semibold text-card-foreground mb-1">
                    {service.title}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-blue-500 font-medium">
                      {service.price}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 mr-1">⭐</Text>
                      <Text className="text-muted-foreground text-sm">
                        {service.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Services */}
        <View className="px-6 mt-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-foreground">
              Recent Bookings
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="gap-y-3">
            <TouchableOpacity className="bg-card rounded-2xl p-4 flex-row items-center shadow-sm border border-border">
              <View className="bg-primary/10 p-3 rounded-xl mr-4">
                <Home size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-card-foreground mb-1">
                  Regular House Cleaning
                </Text>
                <Text className="text-muted-foreground text-sm">
                  Weekly • Bi-weekly • Monthly
                </Text>
              </View>
              <Text className="text-blue-500 font-semibold">From $80</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-card rounded-2xl p-4 flex-row items-center shadow-sm border border-border">
              <View className="bg-purple-500/10 p-3 rounded-xl mr-4">
                <Sparkles size={24} color="#8b5cf6" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-card-foreground mb-1">
                  Move-in/Move-out Cleaning
                </Text>
                <Text className="text-muted-foreground text-sm">
                  One-time deep clean
                </Text>
              </View>
              <Text className="text-blue-500 font-semibold">From $200</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
