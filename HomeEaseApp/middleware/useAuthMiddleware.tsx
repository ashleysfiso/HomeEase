import { useAuth } from "../contexts/AuthContext";
import { useSegments, useRouter } from "expo-router";
import { useEffect } from "react";

export default function useAuthMiddleware() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until token check is done

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(onboarding)");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);
}
