import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const PrivacyPolicyScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.light.card,
            borderRadius: 12,
            padding: 24,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.light.text,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Privacy Policy
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.light.mutedForeground,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            This Privacy Policy outlines how we collect, use, and protect your
            personal information when you use our services.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.light.text,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            1. Information We Collect
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.light.mutedForeground,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            We collect personal data such as your name, email address, and usage
            data to improve your experience.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.light.text,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            2. Use of Your Information
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.light.mutedForeground,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            Your information is used to provide and improve our services,
            communicate with you, and ensure compliance with our policies.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.light.text,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            3. Data Sharing
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.light.mutedForeground,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            We do not sell your personal data. It may be shared with trusted
            third parties to help us operate our services.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.light.text,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            4. Security
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.light.mutedForeground,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            We use secure methods to protect your information, but no system is
            100% secure. Use our services at your own risk.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.light.text,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            5. Your Rights
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.light.mutedForeground,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            You have the right to access, correct, or delete your personal
            information. Contact us for assistance.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.primary,
              borderRadius: 8,
              paddingVertical: 12,
              marginTop: 16,
            }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              I Understand
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
