import React from "react";
import { ScrollView, View, Dimensions } from "react-native";

const ServiceDetailsSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Hero Image */}
      <View
        style={{
          width: screenWidth,
          height: 200,
          backgroundColor: "#e5e7eb",
        }}
      />

      {/* Company Logo */}
      <View
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#d1d5db",
        }}
      />

      {/* Service Info */}
      <View style={{ margin: 16 }}>
        <View
          style={{
            width: "60%",
            height: 24,
            borderRadius: 4,
            backgroundColor: "#e5e7eb",
            marginBottom: 8,
          }}
        />
        <View
          style={{
            width: "40%",
            height: 16,
            borderRadius: 4,
            backgroundColor: "#e5e7eb",
            marginBottom: 12,
          }}
        />
        <View
          style={{
            width: "30%",
            height: 16,
            borderRadius: 4,
            backgroundColor: "#e5e7eb",
          }}
        />
      </View>

      {/* Overview */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
        <View
          style={{
            width: "40%",
            height: 20,
            borderRadius: 4,
            backgroundColor: "#e5e7eb",
            marginBottom: 8,
          }}
        />
        <View
          style={{
            width: "100%",
            height: 60,
            borderRadius: 4,
            backgroundColor: "#e5e7eb",
          }}
        />
      </View>

      {/* Tabs */}
      <View
        style={{ flexDirection: "row", marginHorizontal: 16, marginBottom: 16 }}
      >
        <View
          style={{
            flex: 1,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#d1d5db",
            marginRight: 8,
          }}
        />
        <View
          style={{
            flex: 1,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#d1d5db",
          }}
        />
      </View>

      {/* Booking / Pricing Options */}
      {[...Array(3)].map((_, i) => (
        <View key={i} style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <View
            style={{
              width: "60%",
              height: 20,
              borderRadius: 4,
              backgroundColor: "#e5e7eb",
              marginBottom: 8,
            }}
          />
          <View
            style={{
              width: "100%",
              height: 48,
              borderRadius: 8,
              backgroundColor: "#e5e7eb",
              marginBottom: 8,
            }}
          />
          <View
            style={{
              width: "100%",
              height: 48,
              borderRadius: 8,
              backgroundColor: "#e5e7eb",
            }}
          />
        </View>
      ))}

      {/* Reviews */}
      {[...Array(2)].map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#d1d5db",
              marginRight: 12,
            }}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: "50%",
                height: 16,
                borderRadius: 4,
                backgroundColor: "#e5e7eb",
                marginBottom: 4,
              }}
            />
            <View
              style={{
                width: "80%",
                height: 16,
                borderRadius: 4,
                backgroundColor: "#e5e7eb",
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ServiceDetailsSkeleton;
