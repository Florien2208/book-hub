import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { login } from "@/api/mockapi";


const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [language, setLanguage] = React.useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const colors = Colors.light;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const user = await login({ email, password });
      Alert.alert("Success", `Welcome back, ${user.name}!`);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Language Picker */}
        <View
          className="rounded-lg px-3 py-2 mb-8 w-[90%] shadow-sm"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            borderWidth: 1,
          }}
        >
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) => setLanguage(itemValue)}
            mode="dropdown"
            style={{
              height: Platform.OS === "android" ? 60 : undefined,
              color: colors.mutedForeground,
            }}
          >
            <Picker.Item
              label="Select Language"
              value="en"
              color={colors.mutedForeground}
            />
            <Picker.Item label="Kinyarwanda" value="rw" color={colors.text} />
            <Picker.Item label="French" value="fr" color={colors.text} />
          </Picker>
        </View>

        {/* Login Card */}
        <View
          className="rounded-2xl p-8 w-[90%] shadow-xl"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            borderWidth: 1,
          }}
        >
          <View className="mb-6">
            <Text
              className="text-2xl font-bold text-center mb-2"
              style={{ color: colors.text }}
            >
              Welcome Back
            </Text>
            <Text
              className="text-sm text-center"
              style={{ color: colors.mutedForeground }}
            >
              Don&apos;t have an account?{" "}
              <Text
                onPress={() => router.push("/(auth)/sign-up")}
                style={{ color: colors.primary, fontWeight: "600" }}
              >
                Sign up here
              </Text>
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text
                className="text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                EMAIL
              </Text>
              <TextInput
                placeholder="Enter your valid email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={{
                  backgroundColor: colors.muted,
                  borderColor: colors.cardBorder,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  color: colors.text,
                }}
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            <View>
              <Text
                className="text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                PASSWORD
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.muted,
                  borderColor: colors.cardBorder,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <TextInput
                  placeholder="••••••••"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                  style={{ flex: 1, color: colors.text }}
                  placeholderTextColor={colors.mutedForeground}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={{ marginLeft: 10 }}
                  accessible={true}
                  accessibilityLabel={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  <AntDesign
                    name={passwordVisible ? "eye" : "eyeo"}
                    size={20}
                    color={colors.mutedForeground}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-2">
              <TouchableOpacity>
                <Text
                  className="text-sm font-medium text-right"
                  style={{ color: colors.primary }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="rounded-lg py-4 mt-6 shadow-sm"
            style={{
              backgroundColor: loading ? colors.muted : colors.primary,
            }}
            disabled={loading}
          >
            <Text className="text-center font-semibold text-white text-lg">
              {loading ? "Logging in..." : "Log in"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center my-6">
            <View
              className="flex-1 h-px"
              style={{ backgroundColor: colors.cardBorder }}
            />
            <Text
              className="px-3 text-sm"
              style={{ color: colors.mutedForeground }}
            >
              or
            </Text>
            <View
              className="flex-1 h-px"
              style={{ backgroundColor: colors.cardBorder }}
            />
          </View>

          <TouchableOpacity
            className="rounded-lg py-3 px-4 flex-row items-center justify-center"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              borderWidth: 1,
            }}
          >
            <AntDesign name="google" size={20} color="#EA4335" />
            <Text
              style={{ color: colors.text, fontWeight: "500", marginLeft: 8 }}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
