import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Alert as Alert2,
  AlertDescription,
  AlertTitle,
} from "~/components/ui/alert";
import { router } from "expo-router";
import {
  Facebook,
  Twitter,
  Linkedin,
  AlertTriangle,
} from "lucide-react-native";
import { useAuth } from "~/contexts/AuthContext";
import { apiLogin } from "~/api/authApi";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email address");
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiLogin(email, password);
      const token = data.token;
      const refreshToken = data.refreshToken;
      const user = {
        email: data.email,
        userName: data.firstName,
        userId: data.userId,
        role: data.role,
        customerID: data.customerID,
        providerId: data.providerId,
      };

      login(token, refreshToken, user);
      console.log("Login attempt:", { email, password });
      Alert.alert("Login Success", "You have been logged in!");
      // Navigate to the main app after successful login
      //router.replace("/(tabs)"); // Assuming '/home' is your main app screen
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-background">
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 0}
        className="flex-1 justify-center "
      >
        <View className="flex-1 items-center">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            className="p-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center mb-10">
              <Image
                source={require("../../assets/images/adaptive-icon.png")}
                className="w-80 h-0"
                resizeMode="cover"
              />
              <Text className="text-3xl font-bold text-blue-500 mb-2">
                Log In Now
              </Text>
              <Text className="text-base text-muted-foreground text-center px-4">
                Please login to continue using our app
              </Text>
              {errorMessage && (
                <Alert2
                  icon={AlertTriangle}
                  variant="destructive"
                  className="w-auto mt-2"
                >
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert2>
              )}
            </View>

            <View className="mb-4">
              <TextInput
                className="px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>

            <TouchableOpacity className="mb-8 self-end">
              <Text className="text-blue-500 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-blue-500 flex-row justify-center rounded-xl py-4 items-center shadow-lg mb-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator
                  color={"white"}
                  size={"small"}
                  className="mr-2"
                />
              ) : (
                <Text className="text-primary-foreground font-bold text-lg">
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              className="items-center mb-8"
            >
              <Text className="text-muted-foreground">
                Don't have an account?{" "}
                <Text className="text-blue-500 font-medium">Sign Up</Text>
              </Text>
            </TouchableOpacity>

            {/*
              <View className="items-center mb-6">
                <Text className="text-muted-foreground mb-4">
                  Or connect with
                </Text>
                <View className="flex-row space-x-6">
                  <TouchableOpacity className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                    <Facebook size={24} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                    <Twitter size={24} color="#1da1f2" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                    <Linkedin size={24} color="#0a66c2" />
                  </TouchableOpacity>
                </View>
              </View>*/}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
