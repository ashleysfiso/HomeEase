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
import PasswordStrengthBar from "react-password-strength-bar";
import { apiRegister } from "~/api/authApi";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage("");
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !lastName ||
      !phoneNumber
    ) {
      setErrorMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email address");
      return;
    }
    if (!/^0\d{9}$/.test(phoneNumber)) {
      setErrorMessage("Phone must be 10 digits and start with 0");
      return;
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setErrorMessage(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await apiRegister(
        name,
        lastName,
        email,
        phoneNumber,
        password
      );
      console.log("Register attempt:", { name, email, password });
      Toast.show({
        type: "success",
        text1: "Registration Success",
        text2: "Your account has been created!",
      });
      // Navigate to login or directly to the main app
      router.replace("/(auth)/login");
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const isValid = validatePassword(password);
  return (
    <SafeAreaView className="flex-1 justify-center bg-background">
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        className="flex-1 justify-center"
        keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 0}
      >
        <View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            className="p-6 "
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center my-10">
              {/*<Image
                source={require("../../assets/images/adaptive-icon.png")}
                className="w-80 h-56"
                resizeMode="cover"
              />*/}
              <Text className="text-3xl font-bold text-blue-500 mb-2">
                Sign Up Now
              </Text>
              <Text className="text-base text-muted-foreground text-center px-4">
                Please fill the details and create account
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

            <View className="mb-6">
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View className="mb-6">
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              {!validatePassword(password) && password.length > 0 && (
                <Text className="text-sm text-red-500">
                  Must be 8+ characters, include uppercase, lowercase, number,
                  and special character
                </Text>
              )}
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>

            <View className="mb-8">
              <TextInput
                className="w-full px-4 py-4 rounded-xl border border-border text-foreground bg-card"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
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
                  Register
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/login")}
              className="items-center mb-8"
            >
              <Text className="text-muted-foreground">
                Already have an account?{" "}
                <Text className="text-blue-500 font-medium">Login</Text>
              </Text>
            </TouchableOpacity>

            {/*<View className="items-center mb-6">
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

export default RegisterScreen;
