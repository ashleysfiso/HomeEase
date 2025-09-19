import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { getUser } from "~/api/authApi";
import { setAxiosToken } from "~/api/axiosConfig";

interface User {
  email: string;
  userName: string;
  userId: string;
  role: string[];
  customerID: number | null;
  providerId: number | null;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    token: string,
    refreshToken: string,
    userData: Omit<User, "token">
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Restore session
  useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        const userId = await SecureStore.getItemAsync("userId");
        if (token && userId) {
          setAxiosToken(token);
          const user = await getUser(userId);
          const userWithToken = { ...user, token: token };
          setUser(userWithToken);
        }
      } catch (e) {
        console.error("Error restoring token", e);
      } finally {
        setLoading(false);
      }
    };
    restoreToken();
  }, []);

  // Login
  const login = async (
    token: string,
    refreshToken: string,
    userData: Omit<User, "token">
  ) => {
    try {
      setAxiosToken(token);
      await SecureStore.setItemAsync("access_token", token);
      await SecureStore.setItemAsync("userId", userData.userId);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      setUser({ ...userData, token });
      router.replace("/");
    } catch (e) {
      console.error("Login error", e);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setUser(null);
      router.replace("/login");
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
