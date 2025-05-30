import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const colors = Colors.light;

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="w-full"
      >
        {/* Hero Section with Floating Logo */}
        <View className="items-center justify-center pt-16 pb-8">
          {/* Decorative Background Elements */}
          <View
            className="absolute top-20 left-8 w-20 h-20 rounded-full opacity-10"
            style={{ backgroundColor: colors.primary }}
          />
          <View
            className="absolute top-32 right-12 w-12 h-12 rounded-full opacity-10"
            style={{ backgroundColor: colors.secondary }}
          />
          <View
            className="absolute top-28 right-24 w-6 h-6 rounded-full opacity-20"
            style={{ backgroundColor: colors.accent }}
          />

          {/* Main Logo Container */}
          <View className="relative">
            {/* Glow Effect */}
            <View
              className="absolute inset-0 rounded-3xl blur-xl opacity-30"
              style={{ backgroundColor: colors.primary }}
            />

            {/* Logo Container */}
            <View
              className="relative rounded-3xl p-8 shadow-2xl"
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                shadowColor: colors.primary,
                elevation: 20,
              }}
            >
              <Image
                source={require("../assets/images/1.png")}
                resizeMode="contain"
                className="h-32 w-32"
              />
            </View>
          </View>

          {/* Animated Dots */}
          <View className="flex-row space-x-3 mt-8">
            <View
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.primary }}
            />
            <View
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: colors.secondary,
                animationDelay: "0.2s",
              }}
            />
            <View
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.accent, animationDelay: "0.4s" }}
            />
          </View>
        </View>

        {/* Content Section */}
        <View className="px-8 flex-1 justify-center">
          {/* Brand Name with Gradient Text Effect */}
          <View className="items-center mb-6">
            <Text
              className="text-5xl font-black text-center mb-2 tracking-tight"
              style={{ color: colors.text }}
            >
              Book
              <Text style={{ color: colors.primary }}>Hub</Text>
            </Text>

            {/* Subtitle with Icon */}
            <View className="flex-row items-center">
              <View
                className="w-1 h-6 rounded-full mr-3"
                style={{ backgroundColor: colors.primary }}
              />
              <Text
                className="text-lg font-semibold tracking-wide"
                style={{ color: colors.primary }}
              >
                Smart Library Management
              </Text>
            </View>
          </View>

          {/* Feature Highlights */}
          <View className="space-y-4 mb-8">
            <View className="flex-row items-center space-x-4">
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.muted }}
              >
                <Text style={{ color: colors.primary, fontSize: 16 }}>📚</Text>
              </View>
              <Text
                className="text-base font-medium"
                style={{ color: colors.text }}
              >
                Organize your entire book collection
              </Text>
            </View>

            <View className="flex-row items-center space-x-4">
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.muted }}
              >
                <Text style={{ color: colors.secondary, fontSize: 16 }}>
                  ⏰
                </Text>
              </View>
              <Text
                className="text-base font-medium"
                style={{ color: colors.text }}
              >
                Track borrowings and return dates
              </Text>
            </View>

            <View className="flex-row items-center space-x-4">
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.muted }}
              >
                <Text style={{ color: colors.accent, fontSize: 16 }}>🔍</Text>
              </View>
              <Text
                className="text-base font-medium"
                style={{ color: colors.text }}
              >
                Quick search and smart filters
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text
            className="text-base text-center leading-7 mb-12"
            style={{ color: colors.mutedForeground }}
          >
            Transform how you manage books with our intelligent platform.
            Perfect for libraries, bookstores, and personal collections.
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="px-8 pb-8">
          {/* Primary Button */}
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/sign-up")}
            className="rounded-2xl py-5 items-center shadow-lg mb-4"
            style={{
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              elevation: 10,
            }}
          >
            <Text className="text-white text-lg font-bold tracking-wide">
              Get Started Free
            </Text>
          </TouchableOpacity>

          {/* Secondary Button */}
          <TouchableOpacity onPress={() => router.replace("/(tabs)")}
            className="rounded-2xl py-4 items-center border-2"
            style={{
              borderColor: colors.cardBorder,
              backgroundColor: colors.card,
            }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.primary }}
            >
              Explore Demo
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
