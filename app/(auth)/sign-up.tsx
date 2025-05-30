// SignupScreen.js
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { signup, SignupData } from "@/api/mockapi";


const SignupScreen = () => {
  const [language, setLanguage] = useState("en");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });
  const router = useRouter();
  const colors = Colors.light;

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password || !agreed) {
      return Alert.alert(
        "Validation",
        "Please fill all fields and agree to terms."
      );
    }

    try {
      setLoading(true);
      const user = await signup(formData);
      Alert.alert("Success", `Welcome, ${user?.name}`);
      router.push("/(tabs)");
    } catch (err: unknown) {
      // Type-safe error handling
      if (err instanceof Error) {
        Alert.alert("Signup Failed", err.message);
      } else {
        Alert.alert("Signup Failed", "Unknown error occurred");
      }
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

        {/* Signup Card */}
        <View
          className="rounded-2xl p-8 w-[90%] shadow-xl"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            borderWidth: 1,
          }}
        >
          {/* Header */}
          <View className="mb-6">
            <Text
              className="text-2xl font-bold text-center mb-2"
              style={{ color: colors.text }}
            >
              Create New Account
            </Text>
            <Text
              className="text-sm text-center"
              style={{ color: colors.mutedForeground }}
            >
              Already Registered?{" "}
              <Text
                onPress={() => router.push("/(auth)/sign-in")}
                style={{ color: colors.primary, fontWeight: "600" }}
              >
                Log in here
              </Text>
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            {(["name", "email", "dob"] as (keyof SignupData)[]).map((field) => (
              <View key={field}>
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  {field.toUpperCase()}
                </Text>
                <TextInput
                  placeholder={
                    field === "dob"
                      ? "DD/MM/YYYY"
                      : field === "email"
                      ? "example@mail.com"
                      : "Your name"
                  }
                  value={formData[field]} // now field is known as keyof SignupData
                  onChangeText={(text) =>
                    setFormData({ ...formData, [field]: text })
                  }
                  keyboardType={field === "email" ? "email-address" : "default"}
                  autoCapitalize={field === "email" ? "none" : "words"}
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
            ))}

            {/* Password Field */}
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
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
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
          </View>

          {/* Terms */}
          <Pressable
            onPress={() => setAgreed(!agreed)}
            className="flex-row items-start mt-4 space-x-3"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
            accessibilityLabel="Agree to terms and conditions and privacy policy"
          >
            <View
              className="w-5 h-5 rounded-md border-2 justify-center items-center"
              style={{
                backgroundColor: agreed ? colors.primary : colors.card,
                borderColor: agreed ? colors.primary : colors.cardBorder,
              }}
            >
              {agreed && <Ionicons name="checkmark" size={14} color="white" />}
            </View>

            <Text className="text-sm flex-1" style={{ color: colors.text }}>
              I confirm that I have read and agree to the{" "}
              <Text
                onPress={() => router.push("/(auth)/termsandcondition")}
                style={{
                  color: colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Terms & Conditions
              </Text>{" "}
              and{" "}
              <Text
                onPress={() => router.push("/(auth)/privacypolicy")}
                style={{
                  color: colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </Pressable>

          {/* Sign Up Button */}
          <TouchableOpacity
            className="rounded-lg py-4 mt-6 shadow-sm"
            onPress={handleSignup}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.muted : colors.primary,
              shadowColor: colors.primary,
              elevation: 6,
            }}
          >
            <Text className="text-center font-semibold text-white text-lg">
              {loading ? "Signing up..." : "Sign up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
