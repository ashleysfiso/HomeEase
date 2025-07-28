import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1d4ed8",
        tabBarInactiveTintColor: "#9ca3af",

        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="home" color={color} size={24} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="search" color={color} size={24} />
          ),
          tabBarLabel: "Browse",
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="calendar" color={color} size={24} />
          ),
          tabBarLabel: "Bookings",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="user" color={color} size={24} />
          ),
          tabBarBadge: 3,
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
