import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
  Switch,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";

// Import the SF Symbols type if available, or define a union type
type SFSymbolName =
  | "person.circle"
  | "clock"
  | "questionmark.circle"
  | "info.circle"
  | "chevron.right";

// Define types for better type safety
interface User {
  name: string;
  email: string;
  membershipType: string;
  memberSince: string;
  avatar: string;
}

interface Settings {
  notifications: boolean;
  emailUpdates: boolean;
  reminders: boolean;
  darkMode: boolean;
}

interface MenuItem {
  id: number;
  title: string;
  icon: SFSymbolName;
  onPress: () => void;
}

interface SettingItem {
  key: keyof Settings;
  title: string;
  subtitle: string;
}

export default function Account(): React.JSX.Element {
  const [user] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    membershipType: "Premium",
    memberSince: "2023-01-15",
    avatar:
      "https://www.profilepersonnel.co.za/wp-content/uploads/2021/09/profile-personnel-welcome.png",
  });

  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    emailUpdates: true,
    reminders: true,
    darkMode: false,
  });

  const toggleSetting = (key: keyof Settings): void => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Edit Profile",
      icon: "person.circle" as const,
      onPress: (): void =>
        Alert.alert("Coming Soon", "Profile editing will be available soon!"),
    },
    {
      id: 2,
      title: "Reading History",
      icon: "clock" as const,
      onPress: (): void =>
        Alert.alert("Reading History", "View your complete reading history."),
    },
    {
      id: 5,
      title: "Help & Support",
      icon: "questionmark.circle" as const,
      onPress: (): void =>
        Alert.alert("Support", "Contact our support team for assistance."),
    },
    {
      id: 6,
      title: "About",
      icon: "info.circle" as const,
      onPress: (): void =>
        Alert.alert("About", "Library Management App v1.0.0"),
    },
  ];

  const settingsItems: SettingItem[] = [
    {
      key: "reminders",
      title: "Return Reminders",
      subtitle: "Remind me before books are due",
    },
    {
      key: "darkMode",
      title: "Dark Mode",
      subtitle: "Use dark theme (coming soon)",
    },
  ];

  const handleSignOut = (): void => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: (): void => {
          // Add sign out logic here
          console.log("User signed out");
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.light.background }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-6 mb-6">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: Colors.light.text }}
          >
            My Account
          </Text>
          <Text
            className="text-base"
            style={{ color: Colors.light.mutedForeground }}
          >
            Manage your profile and preferences
          </Text>
        </View>

        {/* Profile Section */}
        <View className="px-4 mb-6">
          <View
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.cardBorder,
            }}
          >
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: user.avatar }}
                className="w-20 h-20 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text
                  className="text-2xl font-bold mb-1"
                  style={{ color: Colors.light.text }}
                >
                  {user.name}
                </Text>
                <Text
                  className="text-base mb-2"
                  style={{ color: Colors.light.mutedForeground }}
                >
                  {user.email}
                </Text>
                <View
                  className="px-3 py-1 rounded-full self-start"
                  style={{ backgroundColor: Colors.light.primary + "20" }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{ color: Colors.light.primary }}
                  >
                    {user.membershipType} Member
                  </Text>
                </View>
              </View>
            </View>
            <Text
              className="text-sm"
              style={{ color: Colors.light.mutedForeground }}
            >
              Member since{" "}
              {new Date(user.memberSince).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* Settings */}
        <View className="px-4 mb-6">
          <Text
            className="text-xl font-semibold mb-4"
            style={{ color: Colors.light.text }}
          >
            Preferences
          </Text>
          <View
            className="rounded-xl border"
            style={{
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.cardBorder,
            }}
          >
            {settingsItems.map((setting, index, array) => (
              <View key={setting.key}>
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-1">
                    <Text
                      className="text-base font-medium mb-1"
                      style={{ color: Colors.light.text }}
                    >
                      {setting.title}
                    </Text>
                    <Text
                      className="text-sm"
                      style={{ color: Colors.light.mutedForeground }}
                    >
                      {setting.subtitle}
                    </Text>
                  </View>
                  <Switch
                    value={settings[setting.key]}
                    onValueChange={(): void => toggleSetting(setting.key)}
                    trackColor={{
                      false: Colors.light.muted,
                      true: Colors.light.primary + "50",
                    }}
                    thumbColor={
                      settings[setting.key]
                        ? Colors.light.primary
                        : Colors.light.mutedForeground
                    }
                  />
                </View>
                {index < array.length - 1 && (
                  <View
                    className="h-px mx-4"
                    style={{ backgroundColor: Colors.light.cardBorder }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 mb-6">
          <Text
            className="text-xl font-semibold mb-4"
            style={{ color: Colors.light.text }}
          >
            More Options
          </Text>
          <View
            className="rounded-xl border"
            style={{
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.cardBorder,
            }}
          >
            {menuItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  className="flex-row items-center p-4"
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: Colors.light.muted }}
                  >
                    <IconSymbol
                      name={item.icon as any}
                      size={20}
                      color={Colors.light.primary}
                    />
                  </View>
                  <Text
                    className="flex-1 text-base"
                    style={{ color: Colors.light.text }}
                  >
                    {item.title}
                  </Text>
                  <IconSymbol
                    name={"chevron.right" as any}
                    size={16}
                    color={Colors.light.mutedForeground}
                  />
                </TouchableOpacity>
                {index < menuItems.length - 1 && (
                  <View
                    className="h-px ml-14"
                    style={{ backgroundColor: Colors.light.cardBorder }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Sign Out Button */}
        <View className="px-4 pb-8">
          <TouchableOpacity
            className="py-4 rounded-xl items-center border"
            style={{
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.error + "30",
            }}
            onPress={handleSignOut}
          >
            <Text
              className="font-semibold"
              style={{ color: Colors.light.error }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
