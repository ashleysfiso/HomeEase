import { useRouter } from "expo-router";
import { Check, Filter, Grid3X3, Search, Star, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "~/components/SearchBar";

const BrowseServicesScreen = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();

  const allServices = [
    {
      id: 1,
      title: "Home Cleaning",
      image: "https://picsum.photos/seed/homecleaning/200/300",
      rating: 4.8,
      reviews: 187,
      price: "110",
      category: "Regular",
      companyLogo: "https://placehold.co/30x30?text=HC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 2,
      title: "Bathroom Cleaning",
      image: "https://picsum.photos/seed/bathroom/120/160",
      rating: 4.9,
      reviews: 203,
      price: "125",
      category: "Specialized",
      companyLogo: "https://placehold.co/30x30?text=BC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 3,
      title: "Kitchen Cleaning",
      image: "https://picsum.photos/seed/kitchen/120/160",
      rating: 4.6,
      reviews: 156,
      price: "140",
      category: "Specialized",
      companyLogo: "https://placehold.co/30x30?text=KC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 4,
      title: "Carpet Cleaning",
      image: "https://picsum.photos/seed/carpet/120/160",
      rating: 4.7,
      reviews: 174,
      price: "160",
      category: "Specialized",
      companyLogo: "https://placehold.co/30x30?text=CC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 5,
      title: "Window Cleaning",
      image: "https://picsum.photos/seed/window/120/160",
      rating: 4.5,
      reviews: 142,
      price: "95",
      category: "Regular",
      companyLogo: "https://placehold.co/30x30?text=WC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 6,
      title: "Deep Cleaning",
      image: "https://picsum.photos/seed/deep/120/160",
      rating: 4.9,
      reviews: 298,
      price: "200",
      category: "Premium",
      companyLogo: "https://placehold.co/30x30?text=DC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 7,
      title: "Office Cleaning",
      image: "https://picsum.photos/seed/office/120/160",
      rating: 4.4,
      reviews: 89,
      price: "180",
      category: "Commercial",
      companyLogo: "https://placehold.co/30x30?text=OC",
      providerName: "Sparkle Cleaners",
    },
    {
      id: 8,
      title: "Move-in Cleaning",
      image: "https://picsum.photos/seed/movein/120/160",
      rating: 4.8,
      reviews: 156,
      price: "220",
      category: "Premium",
      companyLogo: "https://picsum.photos/seed/movein/120/160",
      providerName: "Sparkle Cleaners",
    },
  ];

  const categories = ["All", "Regular", "Specialized", "Premium", "Commercial"];
  const priceRanges = [
    "All",
    "Under $100",
    "$100-$150",
    "$150-$200",
    "Over $200",
  ];
  const ratings = ["All", "4.5+", "4.7+", "4.8+"];

  const toggleFavorite = (serviceId: number) => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const filterServices = () => {
    let filtered = allServices;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Price range filter
    if (selectedPriceRange !== "All") {
      filtered = filtered.filter((service) => {
        const price = parseInt(service.price.replace(/[^0-9]/g, ""));
        switch (selectedPriceRange) {
          case "Under $100":
            return price < 100;
          case "$100-$150":
            return price >= 100 && price <= 150;
          case "$150-$200":
            return price >= 150 && price <= 200;
          case "Over $200":
            return price > 200;
          default:
            return true;
        }
      });
    }

    // Rating filter
    if (selectedRating !== "All") {
      const minRating = parseFloat(selectedRating.replace("+", ""));
      filtered = filtered.filter((service) => service.rating >= minRating);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, ""))
          );
        case "price-high":
          return (
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, ""))
          );
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSelectedRating("All");
    setSortBy("name");
  };

  const filteredServices = filterServices();

  const renderServiceCard = ({ item }: { item: (typeof allServices)[0] }) => (
    <TouchableOpacity
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border m-2"
      style={{ width: "45%" }}
      onPress={() =>
        router.push({
          pathname: "/service/[serviceId]/[providerId]/details",
          params: {
            service: "Service",
            serviceId: String(item.id),
            providerId: item.providerName,
          },
        })
      }
    >
      {/* Image with overlays */}
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-32"
          resizeMode="cover"
        />
        {/* Rating overlay - top right */}
        <View className="absolute top-2 right-2 bg-card/90 rounded-full px-2 py-1 flex-row items-center">
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text className="text-card-foreground text-xs font-medium ml-1">
            {item.rating}
            <Text className="text-muted-foreground text-xs">
              ({item.reviews})
            </Text>
          </Text>
        </View>
        {/* Company logo overlay - bottom left */}
        <View className="absolute bottom-2 left-2">
          <Image
            source={{ uri: item.companyLogo }}
            className="w-8 h-8 rounded-full bg-card border-2 border-card"
            resizeMode="cover"
          />
        </View>
      </View>
      {/* Card content */}
      <View className="p-3">
        <Text
          className="font-semibold text-card-foreground mb-2"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text className="text-sm text-muted-foreground mb-2">
          by {item.providerName}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-primary font-medium">From ${item.price}</Text>
          <Text className="text-muted-foreground text-xs">
            ({item.reviews})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-card rounded-t-3xl p-6 max-h-4/5">
          {/* Modal Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-card-foreground">
              Filters
            </Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[1]}
            renderItem={() => (
              <View>
                {/* Category Filter */}
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-card-foreground mb-3">
                    Category
                  </Text>
                  <View className="flex-row flex-wrap">
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category}
                        onPress={() => setSelectedCategory(category)}
                        className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                          selectedCategory === category
                            ? "bg-primary border-primary"
                            : "bg-card border-border"
                        }`}
                      >
                        <Text
                          className={`font-medium ${
                            selectedCategory === category
                              ? "text-primary-foreground"
                              : "text-card-foreground"
                          }`}
                        >
                          {category}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Price Range Filter */}
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-card-foreground mb-3">
                    Price Range
                  </Text>
                  <View className="flex-row flex-wrap">
                    {priceRanges.map((range) => (
                      <TouchableOpacity
                        key={range}
                        onPress={() => setSelectedPriceRange(range)}
                        className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                          selectedPriceRange === range
                            ? "bg-primary border-primary"
                            : "bg-card border-border"
                        }`}
                      >
                        <Text
                          className={`font-medium ${
                            selectedPriceRange === range
                              ? "text-primary-foreground"
                              : "text-card-foreground"
                          }`}
                        >
                          {range}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Rating Filter */}
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-card-foreground mb-3">
                    Minimum Rating
                  </Text>
                  <View className="flex-row flex-wrap">
                    {ratings.map((rating) => (
                      <TouchableOpacity
                        key={rating}
                        onPress={() => setSelectedRating(rating)}
                        className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                          selectedRating === rating
                            ? "bg-primary border-primary"
                            : "bg-card border-border"
                        }`}
                      >
                        <Text
                          className={`font-medium ${
                            selectedRating === rating
                              ? "text-primary-foreground"
                              : "text-card-foreground"
                          }`}
                        >
                          {rating}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Sort By */}
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-card-foreground mb-3">
                    Sort By
                  </Text>
                  {[
                    { key: "name", label: "Name (A-Z)" },
                    { key: "price-low", label: "Price (Low to High)" },
                    { key: "price-high", label: "Price (High to Low)" },
                    { key: "rating", label: "Highest Rated" },
                    { key: "reviews", label: "Most Reviews" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      onPress={() => setSortBy(option.key)}
                      className="flex-row items-center justify-between py-3 border-b border-border"
                    >
                      <Text className="text-card-foreground font-medium">
                        {option.label}
                      </Text>
                      {sortBy === option.key && (
                        <Check size={20} color="#3b82f6" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />

          {/* Modal Footer */}
          <View className="flex-row space-x-3 pt-4 border-t border-border">
            <TouchableOpacity
              onPress={resetFilters}
              className="flex-1 bg-secondary py-3 rounded-xl"
            >
              <Text className="text-center font-semibold text-secondary-foreground">
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              className="flex-1 bg-primary py-3 rounded-xl"
            >
              <Text className="text-center font-semibold text-primary-foreground">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Search Bar */}
      <View className="px-4 pt-4 pb-6">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search service"
        />
      </View>

      {/* Section Header */}
      <View className="px-4 pb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-bold text-foreground">
            Cleaning Services
          </Text>
          <Text className="text-muted-foreground text-sm">
            {filteredServices.length} services found
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

      {/* Active Filters */}
      {(selectedCategory !== "All" ||
        selectedPriceRange !== "All" ||
        selectedRating !== "All") && (
        <View className="px-4 pb-4">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              ...(selectedCategory !== "All"
                ? [{ type: "category", value: selectedCategory }]
                : []),
              ...(selectedPriceRange !== "All"
                ? [{ type: "price", value: selectedPriceRange }]
                : []),
              ...(selectedRating !== "All"
                ? [{ type: "rating", value: selectedRating }]
                : []),
            ]}
            renderItem={({ item }) => (
              <View className="bg-primary/10 px-3 py-1 rounded-full flex-row items-center mr-2">
                <Text className="text-primary text-sm font-medium mr-1">
                  {item.type === "rating" ? `${item.value} stars` : item.value}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (item.type === "category") setSelectedCategory("All");
                    if (item.type === "price") setSelectedPriceRange("All");
                    if (item.type === "rating") setSelectedRating("All");
                  }}
                >
                  <X size={14} color="#1e40af" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {/* Services Grid */}
      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-muted-foreground text-lg">
              No services found
            </Text>
            <Text className="text-muted-foreground/60 text-sm mt-2">
              Try adjusting your filters
            </Text>
          </View>
        )}
      />

      <FilterModal />
    </SafeAreaView>
  );
};

export default BrowseServicesScreen;
