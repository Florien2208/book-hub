import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const TermsAndConditionsScreen = () => {
  const router = useRouter();
  const colors = Colors.light;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <View
          className="rounded-xl p-6 shadow-md"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            borderWidth: 1,
          }}
        >
          <Text
            className="text-2xl font-bold mb-4 text-center"
            style={{ color: colors.text }}
          >
            Terms & Conditions
          </Text>

          <Text
            className="text-sm leading-6 mb-4"
            style={{ color: colors.text }}
          >
            Welcome to our application. Please read these Terms & Conditions
            carefully before using the service. By accessing or using our
            service, you agree to be bound by these terms.
          </Text>

          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            1. Acceptance of Terms
          </Text>
          <Text
            className="text-sm leading-6 mb-4"
            style={{ color: colors.text }}
          >
            By accessing our application, you agree to comply with and be
            legally bound by the terms of use described here.
          </Text>

          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            2. Use of Service
          </Text>
          <Text
            className="text-sm leading-6 mb-4"
            style={{ color: colors.text }}
          >
            You agree not to misuse the service or help anyone else to do so.
            Unauthorized use of this application may give rise to a claim for
            damages and/or be a criminal offense.
          </Text>

          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            3. Privacy Policy
          </Text>
          <Text
            className="text-sm leading-6 mb-4"
            style={{ color: colors.text }}
          >
            Please also review our Privacy Policy, which explains how we
            collect, use, and share information.
          </Text>

          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            4. Changes
          </Text>
          <Text
            className="text-sm leading-6 mb-4"
            style={{ color: colors.text }}
          >
            We may modify these terms at any time. We will provide notice of
            significant changes.
          </Text>

          <TouchableOpacity
            className="rounded-lg py-3 mt-4"
            onPress={() => router.back()}
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-center font-semibold text-base text-white">
              I Agree
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;
