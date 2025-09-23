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
  ActivityIndicator,
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
import { Textarea } from "~/components/ui/textarea";
import TimePickerScreen from "~/components/TimeSelector";
import { Platform } from "react-native";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "~/contexts/AuthContext";
import BookingConfirmationDialog from "~/components/booking/BookingConfirmationDialog";
import { getServiceOfferingById } from "~/api/serviceOfferingApi";
import { getReviews } from "~/api/reviewsApi";
import { createBooking } from "~/api/bookingApi";
import ServiceDetailsSkeleton from "~/components/skeletonLoader/SkeletonServiceDetails";
import AlertDialog from "~/components/AlertDialog";
import { useAlertDialog } from "~/hooks/useAlertDialog";
import Toast from "react-native-toast-message";
import { FlatList } from "react-native";
import ReviewsModal from "~/components/reviews/ReviewsModal";
interface BookingData {
  serviceTypeName: string;
  size: string;
  bookingDate: string;
  time: string;
  totalCost: number;
  address: string;
}

// A single pricing option (e.g., "1-3 Bedrooms")
interface PricingOption {
  serviceTypeId: number;
  pricingOptionId: number;
  pricingOptionName: string;
  price: number;
}

// A service type with grouped options (e.g., Bedrooms, Bathrooms)
interface PricingGroup {
  serviceTypeName: string;
  labelUnit: string;
  options: PricingOption[];
}

// The full service data object
interface ServiceData {
  serviceId: number;
  serviceProviderId: number;
  serviceName: string;
  companyName: string;
  companyLogo: string;
  heroImage: string;
  rate: number;
  availability: string;
  duration: string;
  description: string;
  imgURL: string | null;
  status: string;
  isDeleted: boolean;
  rating: number;
  reviewCount: string;
  categories: string[];
  pricingOptions: PricingGroup[];
}

export interface Review {
  id: number;
  customerName: string;
  serviceName: string;
  companyName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ServiceDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Booking");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number;
  }>({});
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [extraCosts, setExtraCosts] = useState<{ [key: string]: number }>({});
  const [size, setSize] = useState({});
  const [baseRate, setBaseRate] = useState(0);
  const { serviceId, providerId } = useLocalSearchParams();
  const { user } = useAuth();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const alertDialog = useAlertDialog();
  const router = useRouter();
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const take = 10;
  const [modalVisible, setModalVisible] = useState(false);

  const fetchReviews = async (reset = false) => {
    if (isReviewsLoading || (!hasMore && !reset)) return;
    setIsReviewsLoading(true);
    try {
      const currentSkip = reset ? 0 : skip;
      if (!Number(serviceId) || !Number(providerId)) {
        return;
      }
      const result = await getReviews(
        Number(serviceId),
        Number(providerId),
        skip,
        take
      );
      if (reset) {
        setReviewsData(result.items);
        setSkip(take);
        setHasMore(result.items.length < result.totalCount);
      } else {
        setReviewsData((prev) => {
          const newData = [...prev, ...result.items];
          setHasMore(newData.length < result.totalCount);
          return newData;
        });
        setSkip((prev) => prev + take);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceOfferingById(
          Number(serviceId),
          Number(providerId)
        );

        setServiceData(data);
        setBaseRate(data.rate ?? 0);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (Number(serviceId) || Number(providerId)) {
      fetchService();
      fetchReviews(true);
    }
  });

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
        serviceData?.pricingOptions.map((option) => option.serviceTypeName)
      ),
    ];
    return types;
  };

  // Get pricing options for selected service type
  const getPricingOptionsForType = (serviceTypeName: string) => {
    return serviceData?.pricingOptions.filter(
      (option) => option.serviceTypeName === serviceTypeName
    );
  };

  // Handle service type selection
  const handleServiceTypeSelection = (serviceTypeName: string) => {
    setSelectedServiceType(serviceTypeName);
    setSelectedOptions({});
    setSize({});
    setExtraCosts({});
  };

  // Handle booking submission
  const handleBooking = () => {
    if (!selectedServiceType) {
      alertDialog.showError(
        "Missing Information",
        "Please select a service type to continue."
      );
      return;
    }
    if (!selectedDate || !bookingTime || !address) {
      alertDialog.showError(
        "Incomplete Form",
        "Please fill in all required fields: date, time, and address."
      );
      return;
    }

    if (!serviceId || !providerId || !user?.customerID) {
      alertDialog.showError(
        "Error",
        "We couldn’t load the required information. Please try again later"
      );
      return;
    }

    setShowConfirmationDialog(true);
  };

  const bookingData = {
    customerId: user?.customerID,
    serviceId: serviceId,
    serviceProviderId: providerId,
    serviceTypeName: selectedServiceType,
    size: Object.entries(size)
      .map(([key, value]) => `${key}: ${value} `)
      .join(", "),
    bookingDate: selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "No Date Selected",
    time: bookingTime,
    totalCost: totalCost,
    address: address,
  };

  // Handle final booking confirmation
  const handleBookingConfirmation = async () => {
    setIsBookingLoading(true);

    try {
      console.log("Final Booking Data:", bookingData);

      // API call
      const result = await createBooking(bookingData);

      setShowConfirmationDialog(false);
      Toast.show({
        type: "success",
        text1: "Booking confirmed successfully",
      });
      router.replace("/bookings");
    } catch (error) {
      alertDialog.showError(
        "Error",
        "Failed to confirm booking. Please try again."
      );
    } finally {
      setIsBookingLoading(false);
    }
  };

  const serviceTypes = getServiceTypes();
  const currentPricingOptions = selectedServiceType
    ? getPricingOptionsForType(selectedServiceType)
    : [];

  const handleSeletedPricing = (
    unit: string,
    typeName: string,
    price: number,
    pricingOptionId: number
  ) => {
    setExtraCosts((prev) => ({ ...prev, [unit]: price }));
    setSelectedOptions((prev) => ({ ...prev, [unit]: pricingOptionId }));
    //Setting up selected size
    const pricingOption = serviceData?.pricingOptions.find(
      (po) => po.serviceTypeName === typeName && po.labelUnit === unit
    );
    if (pricingOption) {
      const option = pricingOption.options.find(
        (o) => o.pricingOptionId === pricingOptionId
      );
      if (option) {
        setSize((prev) => ({ ...prev, [unit]: option.pricingOptionName }));
      }
    }
  };

  useEffect(() => {
    let total = 0;
    Object.values(extraCosts).forEach((value) => {
      total += value;
    });
    setTotalCost(baseRate + total);
  }, [extraCosts, baseRate]);

  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 0}
      className="flex-1"
    >
      {isLoading ? (
        <ServiceDetailsSkeleton />
      ) : (
        <View className="flex-1 bg-background">
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
                  source={{
                    uri: "https://picsum.photos/seed/bathroom/120/160",
                  }}
                  className="w-full h-80"
                  resizeMode="cover"
                />

                {/* Company Logo Overlay */}
                <View className="absolute bottom-4 right-4">
                  <Image
                    source={{
                      uri: "https://picsum.photos/seed/kitchen/120/160",
                    }}
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
                    {serviceData?.serviceName}
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
                        {serviceData?.rating}/5
                      </Text>
                      <Text className="text-muted-foreground ml-1">
                        ({serviceData?.reviewCount})
                      </Text>
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text className="text-blue-500/70 ml-1 p-4 font-bold">
                          View All Reviews
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Description */}
                <View className="p-6 border-b border-border">
                  <Text className="text-lg font-semibold text-foreground mb-3">
                    Overview
                  </Text>
                  <Text className="text-card-foreground leading-6 mb-4">
                    <ReadMoreText
                      description={serviceData?.description ?? null}
                    />
                  </Text>
                </View>

                {/* Service Type Selection */}
                {serviceTypes.length > 0 && (
                  <View className="bg-card p-6 border-b border-border">
                    <Text className="text-lg font-semibold text-foreground mb-4">
                      Select Service Type
                    </Text>
                    {serviceTypes.map((serviceType) => (
                      <TouchableOpacity
                        key={serviceType}
                        onPress={() => handleServiceTypeSelection(serviceType)}
                        className={`p-4 rounded-xl border-2 mb-3 ${
                          selectedServiceType === serviceType
                            ? "border-blue-500 bg-blue-500/10"
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
                    {/* Pricing Options */}
                    {currentPricingOptions &&
                      currentPricingOptions.map((pricingOption) => (
                        <View key={pricingOption.labelUnit}>
                          <Text className="text-md font-medium text-card-foreground mb-3">
                            {pricingOption.labelUnit}
                          </Text>
                          {pricingOption.options.map((option) => (
                            <TouchableOpacity
                              key={option.pricingOptionId}
                              onPress={() =>
                                handleSeletedPricing(
                                  pricingOption.labelUnit,
                                  pricingOption.serviceTypeName,
                                  option.price,
                                  option.pricingOptionId
                                )
                              }
                              className={`p-4 rounded-xl border-2 mb-2 flex-row justify-between items-center ${
                                selectedOptions[pricingOption.labelUnit] ===
                                option?.pricingOptionId
                                  ? "border-blue-500 bg-blue-500/10"
                                  : "border-border bg-card"
                              }`}
                            >
                              <Text
                                className={`font-medium ${
                                  selectedOptions[pricingOption.labelUnit] ===
                                  option.pricingOptionId
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {option.pricingOptionName}
                              </Text>
                              <Text className="text-green-500 font-bold">
                                +R{option.price}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ))}
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
                    <TimePickerScreen
                      selectedTime={bookingTime}
                      setSelectedTime={setBookingTime}
                    />
                  </View>
                </View>

                {/* Address */}
                <View className="bg-card p-6 border-b border-border">
                  <Text className="text-lg font-semibold text-foreground mb-4">
                    Service Address
                  </Text>

                  <TextInput
                    placeholder="Enter your full address"
                    className="h-32 border border-border rounded-lg p-3 text-base text-foreground"
                    multiline
                    textAlignVertical="top"
                    placeholderTextColor="#9CA3AF"
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
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-md text-card-foreground">
                        Standard Rate
                      </Text>
                      <Text className="text-md text-foreground font-medium">
                        R{baseRate}
                      </Text>
                    </View>

                    {Object.entries(extraCosts).map(([labelUnit, cost]) => (
                      <View
                        key={labelUnit}
                        className="flex-row justify-between items-center mb-1"
                      >
                        <Text className="text-md text-card-foreground">
                          {labelUnit}
                        </Text>
                        <Text className="text-md text-foreground font-medium">
                          R{cost}
                        </Text>
                      </View>
                    ))}

                    <View className="border-t border-border pt-2 mt-2">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-foreground">
                          Total
                        </Text>
                        <Text className="text-xl font-bold text-green-600">
                          R{totalCost}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
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
                  <Text className="text-white font-bold text-lg">
                    Book Now - ${totalCost}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <BookingConfirmationDialog
              visible={showConfirmationDialog}
              onClose={() => setShowConfirmationDialog(false)}
              onConfirm={handleBookingConfirmation}
              bookingData={bookingData}
              isLoading={isBookingLoading}
            />
          </View>
        </View>
      )}
      <ReviewsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        reviewsData={reviewsData}
        isReviewsLoading={isReviewsLoading}
        fetchReviews={fetchReviews}
        title="Service Reviews"
        averageRating={serviceData?.rating ?? 0}
        totalCount={serviceData?.reviewCount ?? "0"}
      />
      {/* Alert Dialog */}
      <AlertDialog
        visible={alertDialog.isVisible}
        type={alertDialog.config.type}
        title={alertDialog.config.title}
        message={alertDialog.config.message}
        primaryButtonText={alertDialog.config.primaryButtonText}
        secondaryButtonText={alertDialog.config.secondaryButtonText}
        singleButton={alertDialog.config.singleButton}
        showCloseButton={alertDialog.config.showCloseButton}
        onPrimaryPress={alertDialog.handlePrimary}
        onSecondaryPress={alertDialog.handleSecondary}
        onClose={alertDialog.hideAlert}
      />
    </KeyboardAvoidingView>
  );
};

export default ServiceDetailScreen;
