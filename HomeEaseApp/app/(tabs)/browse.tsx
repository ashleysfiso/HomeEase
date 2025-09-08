import { useRouter } from "expo-router";
import { Check, Filter, Grid3X3, Star, X } from "lucide-react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import SearchBar from "~/components/SearchBar";
import { getServiceOfferings } from "~/api/serviceOfferingApi";

const BrowseServicesScreen = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();
  const [searchTrigger, setSearchTrigger] = useState("");
  const [servicesFound, setServicesFound] = useState(0);

  // ✅ API state
  const [data, setData] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const take = 10;

  // 🔹 Fetch services from API
  const fetchServices = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    try {
      const currentSkip = reset ? 0 : skip;
      const result = await getServiceOfferings(currentSkip, take, searchQuery);

      if (reset) {
        setData(result.items);
        setSkip(take);
        setHasMore(result.items.length < result.totalCount);
        setServicesFound(result.totalCount);
      } else {
        setData((prev) => {
          const newData = [...prev, ...result.items];
          setHasMore(newData.length < result.totalCount);
          return newData;
        });
        setSkip((prev) => prev + take);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial fetch
  useEffect(() => {
    fetchServices(true);
  }, [searchTrigger]);

  const toggleFavorite = (serviceId: number) => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // 🔹 Render a service card
  const renderServiceCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border m-2"
      style={{ width: "45%" }}
      onPress={() =>
        router.push({
          pathname: "/service/[serviceId]/[providerId]/details",
          params: {
            service: "Service",
            serviceId: String(item.serviceId),
            providerId: String(item.serviceProviderId),
          },
        })
      }
    >
      <View className="relative">
        <Image
          source={{ uri: item.imageUrl || "https://placehold.co/300" }}
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-card/90 rounded-full px-2 py-1 flex-row items-center">
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text className="text-card-foreground text-xs font-medium ml-1">
            {item.rating || 0}
            <Text className="text-muted-foreground text-xs">
              ({item.reviewCount || 0})
            </Text>
          </Text>
        </View>
      </View>
      <View className="p-3">
        <Text
          className="font-semibold text-card-foreground mb-2"
          numberOfLines={2}
        >
          {item.serviceName}
        </Text>
        <Text className="text-sm text-muted-foreground mb-2">
          by {item.companyName}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-500 font-medium">
            From R{item.rate || "N/A"}
          </Text>
          <Text className="text-muted-foreground text-xs">
            ({item.reviewCount || 0})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Search Bar */}
      <View className="px-4 pt-4 pb-6">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search service or service provider"
          searchTrigger={() => setSearchTrigger(searchQuery)}
        />
      </View>

      {/* Section Header */}
      <View className="px-4 pb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-bold text-foreground">
            Home Services
          </Text>
          <Text className="text-muted-foreground text-sm">
            {servicesFound} services found
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Filter size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Grid3X3 size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Services Grid */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderServiceCard}
          numColumns={2}
          keyExtractor={(item) => `${item.serviceId}-${item.serviceProviderId}`}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => fetchServices()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" /> : null
          }
          ListEmptyComponent={
            !loading ? (
              <View className="flex-1 items-center justify-center py-20">
                <Text className="text-muted-foreground text-lg">
                  No services found
                </Text>
                <Text className="text-muted-foreground/60 text-sm mt-2">
                  Try adjusting your filters
                </Text>
              </View>
            ) : null
          }
        />
      )}

      {/* Filters modal can stay as is */}
    </SafeAreaView>
  );
};

export default BrowseServicesScreen;
