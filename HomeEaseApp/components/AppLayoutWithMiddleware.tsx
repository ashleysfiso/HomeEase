// AppLayoutWithMiddleware.tsx
import React from "react";
import { Stack } from "expo-router";
import useAuthMiddleware from "../middleware/useAuthMiddleware";

export default function AppLayoutWithMiddleware() {
  useAuthMiddleware();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="service/[serviceId]/[providerId]/details"
        options={{ title: "Book This Service", headerShown: true }}
      />
      <Stack.Screen
        name="profile/edit-profile"
        options={{ title: "Edit Profile", headerShown: true }}
      />
      <Stack.Screen
        name="notifications/details"
        options={{ title: "Notification Details", headerShown: true }}
      />
      <Stack.Screen
        name="support/index"
        options={{ title: "Support & Help", headerShown: true }}
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    </Stack>
  );
}
