import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
          This screen does not exist.
        </Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-lg text-indigo-600 underline font-semibold">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
