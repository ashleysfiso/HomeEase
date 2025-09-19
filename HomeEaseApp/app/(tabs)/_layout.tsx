import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1d4ed8",
        tabBarInactiveTintColor: "#9ca3af",
        headerStyle: {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 4,
        },
        headerShadowVisible: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6 name="house" color={color} size={24} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6 name="magnifying-glass" color={color} size={24} />
          ),
          tabBarLabel: "Browse",
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6 name="calendar" color={color} size={24} />
          ),
          tabBarLabel: "Bookings",
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6 name="bell" color={color} size={24} />
          ),
          tabBarBadge: 3,
          tabBarLabel: "Notifications",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6 name="user" color={color} size={24} />
          ),

          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
