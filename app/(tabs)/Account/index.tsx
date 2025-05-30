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
import { router } from "expo-router";

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
      icon: "person.circle",
      onPress: (): void =>
        Alert.alert("Coming Soon", "Profile editing will be available soon!"),
    },
    {
      id: 2,
      title: "Reading History",
      icon: "clock",
      onPress: (): void =>
        Alert.alert("Reading History", "View your complete reading history."),
    },
    {
      id: 5,
      title: "Help & Support",
      icon: "questionmark.circle",
      onPress: (): void =>
        Alert.alert("Support", "Contact our support team for assistance."),
    },
    {
      id: 6,
      title: "About",
      icon: "info.circle",
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
          router.push("/home"); // Try push first
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{ paddingHorizontal: 16, paddingTop: 24, marginBottom: 24 }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 8,
              color: Colors.light.text,
            }}
          >
            My Account
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.light.mutedForeground,
            }}
          >
            Manage your profile and preferences
          </Text>
        </View>

        {/* Profile Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              padding: 24,
              borderRadius: 12,
              borderWidth: 1,
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.cardBorder,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginRight: 16,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 4,
                    color: Colors.light.text,
                  }}
                >
                  {user.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 8,
                    color: Colors.light.mutedForeground,
                  }}
                >
                  {user.email}
                </Text>
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 20,
                    alignSelf: "flex-start",
                    backgroundColor: Colors.light.primary + "20",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: Colors.light.primary,
                    }}
                  >
                    {user.membershipType} Member
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: Colors.light.mutedForeground,
              }}
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
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 16,
              color: Colors.light.text,
            }}
          >
            Preferences
          </Text>
          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.cardBorder,
            }}
          >
            {settingsItems.map((setting, index, array) => (
              <View key={setting.key}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 16,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginBottom: 4,
                        color: Colors.light.text,
                      }}
                    >
                      {setting.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.light.mutedForeground,
                      }}
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
                    style={{
                      height: 1,
                      marginHorizontal: 16,
                      backgroundColor: Colors.light.cardBorder,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 16,
              color: Colors.light.text,
            }}
          >
            More Options
          </Text>
          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.cardBorder,
            }}
          >
            {menuItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                  }}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 16,
                      backgroundColor: Colors.light.muted,
                    }}
                  >
                    <IconSymbol
                      name={item.icon as any}
                      size={20}
                      color={Colors.light.primary}
                    />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: Colors.light.text,
                    }}
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
                    style={{
                      height: 1,
                      marginLeft: 56,
                      backgroundColor: Colors.light.cardBorder,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 1,
              backgroundColor: Colors.light.card,
              borderColor: Colors.light.error + "30",
            }}
            onPress={handleSignOut}
          >
            <Text
              style={{
                fontWeight: "600",
                color: Colors.light.error,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
