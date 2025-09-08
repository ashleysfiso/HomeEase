import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share,
  Star,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDatePicker from "~/components/CustomDatePicker";
import ReadMoreText from "~/components/ReadMoreText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import TimePickerScreen from "~/components/TimeSelector";
import { Platform } from "react-native";

const ServiceDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [activeTab, setActiveTab] = useState("Booking");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedBedroomOption, setSelectedBedroomOption] = useState<any>(null);
  const [selectedBathroomOption, setSelectedBathroomOption] =
    useState<any>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const hours = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + i;
    const label = `${hour.toString().padStart(2, "0")}:00`;
    return { label, value: label };
  });

  // Service data
  const serviceData = {
    serviceId: 1,
    serviceProviderId: 1,
    serviceName: "🧼 Home Cleaning Service 🏡✨",
    companyName: "Cleaning Experts",
    companyLogo: "/placeholder.svg?height=60&width=60",
    heroImage: "/placeholder.svg?height=300&width=400",
    rate: 700,
    availability: "Mon-Sun",
    duration: "2-4 hours",
    description:
      "Enjoy a spotless home without lifting a finger! Whether you need a quick tidy-up or a deep refresh, we've got you covered with three flexible options:\n\n✅ Standard Cleaning\nPerfect for routine upkeep 🧹\n• Dusting surfaces & furniture\n• Kitchen & bathroom wipe-down\n• Vacuuming & mopping floors\n• Beds made, trash emptied\n\n🧼 Deep Cleaning\nGreat for seasonal resets or first-time cleans 🧼✨\n• Scrubbing tiles & baseboards\n• Polishing mirrors & fixtures\n• Detailed kitchen & appliance cleaning\n• Sanitizing bathrooms top-to-bottom\n\n🚚 Move In/Move Out Cleaning\nLeave or enter a home that feels brand new! 🏠\n• Full property deep clean\n• Inside cabinets & drawers cleaned\n• Walls, doors, and switches wiped\n• Garage, balcony, and more (on request)",
    imgURL: null,
    status: "Available",
    isDeleted: false,
    rating: 4.8,
    reviewCount: "1.2K",
    categories: ["Home Services", "Cleaning", "Professional"],
    pricingOptions: [
      {
        serviceTypeName: "✅ Standard Cleaning",
        labelUnit: "Bedrooms",
        options: [
          {
            serviceTypeId: 1,
            pricingOptionId: 1,
            pricingOptionName: "1-3 Bedrooms",
            price: 50,
          },
          {
            serviceTypeId: 1,
            pricingOptionId: 2,
            pricingOptionName: "4-5 Bedrooms",
            price: 200,
          },
          {
            serviceTypeId: 1,
            pricingOptionId: 3,
            pricingOptionName: "6+ Bedrooms",
            price: 700,
          },
        ],
      },
      {
        serviceTypeName: "✅ Standard Cleaning",
        labelUnit: "Bathrooms",
        options: [
          {
            serviceTypeId: 1,
            pricingOptionId: 4,
            pricingOptionName: "1-3 Bathrooms",
            price: 70,
          },
          {
            serviceTypeId: 1,
            pricingOptionId: 5,
            pricingOptionName: "4-5 Bathrooms",
            price: 300,
          },
          {
            serviceTypeId: 1,
            pricingOptionId: 6,
            pricingOptionName: "6+ Bathrooms",
            price: 400,
          },
        ],
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent service! The team was professional and thorough. My house has never been cleaner!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      userName: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great cleaning service. They arrived on time and did a fantastic job. Will definitely book again.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      userName: "Emily Davis",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Amazing deep cleaning service! They cleaned areas I didn't even think about. Highly recommended!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  // Get unique service types
  const getServiceTypes = () => {
    const types = [
      ...new Set(
        serviceData.pricingOptions.map((option) => option.serviceTypeName)
      ),
    ];
    return types;
  };

  // Get pricing options for selected service type
  const getPricingOptionsForType = (serviceTypeName: string) => {
    return serviceData.pricingOptions.filter(
      (option) => option.serviceTypeName === serviceTypeName
    );
  };

  // Calculate total cost
  useEffect(() => {
    let total = 0;
    if (selectedBedroomOption) {
      total += selectedBedroomOption.price;
    }
    if (selectedBathroomOption) {
      total += selectedBathroomOption.price;
    }
    setTotalCost(total);
  }, [selectedBedroomOption, selectedBathroomOption]);

  // Handle service type selection
  const handleServiceTypeSelection = (serviceTypeName: string) => {
    setSelectedServiceType(serviceTypeName);
    setSelectedBedroomOption(null);
    setSelectedBathroomOption(null);
  };

  // Handle back button press
  const handleBackPress = () => {
    Alert.alert("Navigation", "Back button pressed");
  };

  // Handle share button press
  const handleSharePress = () => {
    Alert.alert("Share", "Share functionality would be implemented here");
  };

  // Handle booking submission
  const handleBooking = () => {
    if (!selectedServiceType) {
      Alert.alert("Error", "Please select a service type");
      return;
    }
    if (!selectedBedroomOption && !selectedBathroomOption) {
      Alert.alert("Error", "Please select at least one size option");
      return;
    }
    if (!bookingDate || !bookingTime || !address) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const bookingData = {
      serviceTypeName: selectedServiceType,
      size: `${selectedBedroomOption?.pricingOptionName || ""} ${
        selectedBathroomOption?.pricingOptionName || ""
      }`.trim(),
      bookingDate: bookingDate,
      time: bookingTime,
      totalCost: totalCost,
      address: address,
    };

    console.log("Booking Data:", bookingData);
    Alert.alert("Success", "Booking created successfully!");
  };

  const serviceTypes = getServiceTypes();
  const currentPricingOptions = selectedServiceType
    ? getPricingOptionsForType(selectedServiceType)
    : [];
  const bedroomOptions = currentPricingOptions.find(
    (option) => option.labelUnit === "Bedrooms"
  );
  const bathroomOptions = currentPricingOptions.find(
    (option) => option.labelUnit === "Bathrooms"
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      enabled={true}
    >
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 bg-background">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            bounces={true}
            contentContainerStyle={{
              paddingBottom: activeTab === "Booking" ? 100 : 20,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            {/* Hero Image */}
            <View className="relative">
              <Image
                source={{ uri: "https://picsum.photos/seed/bathroom/120/160" }}
                className="w-full h-80"
                resizeMode="cover"
              />

              {/* Company Logo Overlay */}
              <View className="absolute bottom-4 right-4">
                <Image
                  source={{ uri: "https://picsum.photos/seed/kitchen/120/160" }}
                  className="w-16 h-16 rounded-full bg-card border-4 border-card shadow-lg"
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Content Container */}
            <View className="bg-card">
              {/* Service Info */}
              <View className="p-6 border-b border-border">
                <Text className="text-2xl font-bold text-foreground mb-2">
                  {serviceData.serviceName}
                </Text>
                <View className="flex-row items-center mb-3">
                  <Text className="text-muted-foreground mr-4">
                    By Cleaning Experts
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Star size={16} color="#fbbf24" fill="#fbbf24" />
                    <Text className="text-foreground ml-1 font-bold">
                      {serviceData.rating}/5
                    </Text>
                    <Text className="text-muted-foreground ml-1">
                      ({serviceData.reviewCount})
                    </Text>
                  </View>
                </View>
              </View>

              {/* Description */}
              <View className="p-6 border-b border-border">
                <Text className="text-lg font-semibold text-foreground mb-3">
                  Overview
                </Text>
                <Text className="text-card-foreground leading-6 mb-4">
                  <ReadMoreText description={serviceData.description} />
                </Text>
              </View>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 gap-3 mx-6 mt-4"
              >
                <TabsList className="flex-row w-full">
                  <TabsTrigger value="Booking" className="flex-1">
                    <Text className="text-sm text-primary font-medium">
                      Booking
                    </Text>
                  </TabsTrigger>
                  <TabsTrigger value="Reviews" className="flex-1">
                    <Text className="text-sm text-primary font-medium">
                      Reviews
                    </Text>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Booking">
                  {/* Service Type Selection */}
                  {serviceTypes.length > 0 && (
                    <View className="bg-card p-6 border-b border-border">
                      <Text className="text-lg font-semibold text-foreground mb-4">
                        Select Service Type
                      </Text>
                      {serviceTypes.map((serviceType) => (
                        <TouchableOpacity
                          key={serviceType}
                          onPress={() =>
                            handleServiceTypeSelection(serviceType)
                          }
                          className={`p-4 rounded-xl border-2 mb-3 ${
                            selectedServiceType === serviceType
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card"
                          }`}
                        >
                          <Text
                            className={`font-medium ${
                              selectedServiceType === serviceType
                                ? "text-primary"
                                : "text-foreground"
                            }`}
                          >
                            {serviceType}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Size Selection */}
                  {selectedServiceType && (
                    <View className="bg-card p-6 border-b border-border">
                      <Text className="text-lg font-semibold text-foreground mb-4">
                        Select Size Options
                      </Text>

                      {/* Bedroom Options */}
                      {bedroomOptions && (
                        <View className="mb-6">
                          <Text className="text-md font-medium text-card-foreground mb-3">
                            {bedroomOptions.labelUnit}
                          </Text>
                          {bedroomOptions.options.map((option) => (
                            <TouchableOpacity
                              key={option.pricingOptionId}
                              onPress={() => setSelectedBedroomOption(option)}
                              className={`p-4 rounded-xl border-2 mb-2 flex-row justify-between items-center ${
                                selectedBedroomOption?.pricingOptionId ===
                                option.pricingOptionId
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-card"
                              }`}
                            >
                              <Text
                                className={`font-medium ${
                                  selectedBedroomOption?.pricingOptionId ===
                                  option.pricingOptionId
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {option.pricingOptionName}
                              </Text>
                              <Text className="text-green-600 font-bold">
                                ${option.price}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}

                      {/* Bathroom Options */}
                      {bathroomOptions && (
                        <View>
                          <Text className="text-md font-medium text-card-foreground mb-3">
                            {bathroomOptions.labelUnit}
                          </Text>
                          {bathroomOptions.options.map((option) => (
                            <TouchableOpacity
                              key={option.pricingOptionId}
                              onPress={() => setSelectedBathroomOption(option)}
                              className={`p-4 rounded-xl border-2 mb-2 flex-row justify-between items-center ${
                                selectedBathroomOption?.pricingOptionId ===
                                option.pricingOptionId
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-card"
                              }`}
                            >
                              <Text
                                className={`font-medium ${
                                  selectedBathroomOption?.pricingOptionId ===
                                  option.pricingOptionId
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {option.pricingOptionName}
                              </Text>
                              <Text className="text-green-600 font-bold">
                                ${option.price}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  )}

                  {/* Date & Time Selection */}

                  <View className="bg-card p-6 border-b border-border">
                    <Text className="text-lg font-semibold text-foreground mb-4">
                      Select Date & Time
                    </Text>

                    <View>
                      <Text className="text-card-foreground font-medium mb-2">
                        Date
                      </Text>
                      <CustomDatePicker
                        label="Select Booking Date"
                        value={selectedDate}
                        onChange={setSelectedDate}
                      />
                    </View>

                    <View>
                      <Text className="text-card-foreground font-medium mb-2">
                        Time
                      </Text>
                      <TimePickerScreen />
                    </View>
                  </View>

                  {/* Address */}
                  <View className="bg-card p-6 border-b border-border">
                    <Text className="text-lg font-semibold text-foreground mb-4">
                      Service Address
                    </Text>

                    <TextInput
                      placeholder="Enter your full address"
                      className="h-32 border border-gray-300 rounded-lg p-3 text-base text-black"
                      multiline
                      textAlignVertical="top"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>

                  {/* Cost Summary */}
                  {totalCost > 0 && (
                    <View className="bg-card p-6 mb-6">
                      <Text className="text-lg font-semibold text-foreground mb-4">
                        Cost Summary
                      </Text>
                      {selectedBedroomOption && (
                        <View className="flex-row justify-between items-center mb-2">
                          <Text className="text-card-foreground">
                            {selectedBedroomOption.pricingOptionName}
                          </Text>
                          <Text className="text-foreground font-medium">
                            ${selectedBedroomOption.price}
                          </Text>
                        </View>
                      )}
                      {selectedBathroomOption && (
                        <View className="flex-row justify-between items-center mb-2">
                          <Text className="text-card-foreground">
                            {selectedBathroomOption.pricingOptionName}
                          </Text>
                          <Text className="text-foreground font-medium">
                            ${selectedBathroomOption.price}
                          </Text>
                        </View>
                      )}
                      <View className="border-t border-border pt-2 mt-2">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-lg font-bold text-foreground">
                            Total
                          </Text>
                          <Text className="text-xl font-bold text-green-600">
                            ${totalCost}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </TabsContent>

                <TabsContent value="Reviews">
                  <View className="p-6">
                    <View className="flex-row items-center justify-between mb-6">
                      <Text className="text-lg font-semibold text-foreground">
                        Reviews ({serviceData.reviewCount})
                      </Text>
                      <View className="flex-row items-center">
                        <Star size={16} color="#fbbf24" fill="#fbbf24" />
                        <Text className="text-card-foreground ml-1 font-medium">
                          {serviceData.rating}
                        </Text>
                      </View>
                    </View>
                    {reviews.map((review) => (
                      <View
                        key={review.id}
                        className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
                      >
                        <View className="flex-row items-center mb-3">
                          <Image
                            source={{ uri: review.avatar }}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <View className="flex-1">
                            <Text className="font-semibold text-foreground">
                              {review.userName}
                            </Text>
                            <Text className="text-muted-foreground text-sm">
                              {review.date}
                            </Text>
                          </View>
                          <View className="flex-row items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                color={
                                  i < review.rating ? "#fbbf24" : "#e5e7eb"
                                }
                                fill={i < review.rating ? "#fbbf24" : "#e5e7eb"}
                              />
                            ))}
                          </View>
                        </View>
                        <Text className="text-card-foreground leading-5">
                          {review.comment}
                        </Text>
                      </View>
                    ))}
                  </View>
                </TabsContent>
              </Tabs>
            </View>
          </ScrollView>

          {/* Floating Book Now Button - Only show on Booking tab */}
          {activeTab === "Booking" && (
            <View className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
              <TouchableOpacity
                onPress={handleBooking}
                className="bg-blue-500 rounded-xl py-4 items-center shadow-lg"
                style={{
                  shadowColor: "#3b82f6", // Keeping hardcoded as it's a style prop
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Text className="text-primary-foreground font-bold text-lg">
                  Book Now - ${totalCost}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ServiceDetailScreen;
