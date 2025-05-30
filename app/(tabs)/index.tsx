import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Book, MockApiService, Stats } from "@/api/mockapi";


export default function Dashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBorrowed: 0,
    currentlyBorrowed: 0,
    returned: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await MockApiService.getDashboardData();

      if (response.success) {
        setBorrowedBooks(response.data.borrowedBooks);
        setStats(response.data.stats);
      } else {
        Alert.alert(
          "Error",
          response.message || "Failed to load dashboard data"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleReturnBook = async (bookId: number, bookTitle: string) => {
    Alert.alert(
      "Return Book",
      `Are you sure you want to return "${bookTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Return",
          onPress: async () => {
            try {
              const response = await MockApiService.returnBook(bookId);

              if (response.success) {
                Alert.alert(
                  "Success",
                  response.message || "Book returned successfully"
                );
                // Refresh data after successful return
                await loadDashboardData();
              } else {
                Alert.alert(
                  "Error",
                  response.message || "Failed to return book"
                );
              }
            } catch (error) {
              Alert.alert("Error", "Network error. Please try again.");
              console.error("Return book error:", error);
            }
          },
        },
      ]
    );
  };

  const handleExtendReturnDate = async (bookId: number, bookTitle: string) => {
    Alert.alert(
      "Extend Return Date",
      `Extend return date for "${bookTitle}" by 7 days?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Extend",
          onPress: async () => {
            try {
              const response = await MockApiService.extendReturnDate(bookId, 7);

              if (response.success) {
                Alert.alert(
                  "Success",
                  response.message || "Return date extended successfully"
                );
                // Refresh data after successful extension
                await loadDashboardData();
              } else {
                Alert.alert(
                  "Error",
                  response.message || "Failed to extend return date"
                );
              }
            } catch (error) {
              Alert.alert("Error", "Network error. Please try again.");
              console.error("Extend return date error:", error);
            }
          },
        },
      ]
    );
  };

  const getDaysUntilReturn = (returnDate: string) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (isOverdue: boolean, daysLeft: number) => {
    if (isOverdue) return Colors.light.error;
    if (daysLeft <= 2) return Colors.light.warning;
    return Colors.light.success;
  };

  const getStatusText = (isOverdue: boolean, daysLeft: number) => {
    if (isOverdue) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft === 1) return "Due Tomorrow";
    return `${daysLeft} days left`;
  };

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: Colors.light.background }}
      >
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text
          className="text-base mt-4"
          style={{ color: Colors.light.mutedForeground }}
        >
          Loading your dashboard...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.light.background }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      <ScrollView
        className="flex-1 px-4 pt-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.light.primary]}
          />
        }
      >
        {/* Header */}
        <View className="mb-6">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: Colors.light.text }}
          >
            Welcome Back!
          </Text>
          <Text
            className="text-base"
            style={{ color: Colors.light.mutedForeground }}
          >
            Manage your borrowed books and track deadlines
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="mb-6">
          <Text
            className="text-xl font-semibold mb-4"
            style={{ color: Colors.light.text }}
          >
            Your Statistics
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            <View className="w-1/2 px-2 mb-4">
              <View
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-2">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{
                      backgroundColor: Colors.light.primaryLight + "20",
                    }}
                  >
                    <IconSymbol
                      name="book.fill"
                      size={20}
                      color={Colors.light.primary}
                    />
                  </View>
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: Colors.light.text }}
                  >
                    {stats.currentlyBorrowed}
                  </Text>
                </View>
                <Text
                  className="text-sm"
                  style={{ color: Colors.light.mutedForeground }}
                >
                  Currently Borrowed
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-4">
              <View
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-2">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: Colors.light.success + "20" }}
                  >
                    <IconSymbol
                      name="checkmark.circle.fill"
                      size={20}
                      color={Colors.light.success}
                    />
                  </View>
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: Colors.light.text }}
                  >
                    {stats.returned}
                  </Text>
                </View>
                <Text
                  className="text-sm"
                  style={{ color: Colors.light.mutedForeground }}
                >
                  Books Returned
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-4">
              <View
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-2">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: Colors.light.accent + "20" }}
                  >
                    <IconSymbol
                      name="chart.bar.fill"
                      size={20}
                      color={Colors.light.accent}
                    />
                  </View>
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: Colors.light.text }}
                  >
                    {stats.totalBorrowed}
                  </Text>
                </View>
                <Text
                  className="text-sm"
                  style={{ color: Colors.light.mutedForeground }}
                >
                  Total Borrowed
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-4">
              <View
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-2">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: Colors.light.error + "20" }}
                  >
                    <IconSymbol
                      name="exclamationmark.triangle.fill"
                      size={20}
                      color={Colors.light.error}
                    />
                  </View>
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: Colors.light.text }}
                  >
                    {stats.overdue}
                  </Text>
                </View>
                <Text
                  className="text-sm"
                  style={{ color: Colors.light.mutedForeground }}
                >
                  Overdue Books
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Current Borrowed Books */}
        <View className="mb-6">
          <Text
            className="text-xl font-semibold mb-4"
            style={{ color: Colors.light.text }}
          >
            Your Borrowed Books
          </Text>
          {borrowedBooks.length === 0 ? (
            <View
              className="p-6 rounded-xl border items-center"
              style={{
                backgroundColor: Colors.light.card,
                borderColor: Colors.light.cardBorder,
              }}
            >
              <IconSymbol
                name="book"
                size={48}
                color={Colors.light.mutedForeground}
              />
              <Text
                className="text-base mt-2 text-center"
                style={{ color: Colors.light.mutedForeground }}
              >
                No books currently borrowed
              </Text>
            </View>
          ) : (
            borrowedBooks.map((book) => {
              const daysLeft = getDaysUntilReturn(book.returnDate);
              const statusColor = getStatusColor(book.isOverdue, daysLeft);
              const statusText = getStatusText(book.isOverdue, daysLeft);

              return (
                <View
                  key={book.id}
                  className="mb-3 p-4 rounded-xl border"
                  style={{
                    backgroundColor: Colors.light.card,
                    borderColor: Colors.light.cardBorder,
                  }}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 mr-4">
                      <Text
                        className="text-lg font-semibold mb-1"
                        style={{ color: Colors.light.text }}
                      >
                        {book.title}
                      </Text>
                      <Text
                        className="text-sm mb-2"
                        style={{ color: Colors.light.mutedForeground }}
                      >
                        by {book.author}
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: Colors.light.mutedForeground }}
                      >
                        Borrowed:{" "}
                        {new Date(book.borrowDate).toLocaleDateString()}
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: Colors.light.mutedForeground }}
                      >
                        Due: {new Date(book.returnDate).toLocaleDateString()}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: statusColor + "20" }}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{ color: statusColor }}
                      >
                        {statusText}
                      </Text>
                    </View>
                  </View>

                  {/* Book Actions */}
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={() => handleReturnBook(book.id, book.title)}
                      className="flex-1 p-2 rounded-lg items-center"
                      style={{ backgroundColor: Colors.light.success + "20" }}
                      activeOpacity={0.8}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{ color: Colors.light.success }}
                      >
                        Return Book
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        handleExtendReturnDate(book.id, book.title)
                      }
                      className="flex-1 p-2 rounded-lg items-center"
                      style={{ backgroundColor: Colors.light.primary + "20" }}
                      activeOpacity={0.8}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{ color: Colors.light.primary }}
                      >
                        Extend Date
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text
            className="text-xl font-semibold mb-4"
            style={{ color: Colors.light.text }}
          >
            Quick Actions
          </Text>
          <View className="flex-row -mx-2">
            <View className="w-1/2 px-2">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/catalog")}
                className="p-4 rounded-xl items-center"
                style={{ backgroundColor: Colors.light.primary }}
                activeOpacity={0.8}
              >
                <IconSymbol name="magnifyingglass" size={24} color="white" />
                <Text className="text-white font-medium mt-2">
                  Browse Catalog
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-1/2 px-2">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/books")}
                className="p-4 rounded-xl items-center border"
                style={{
                  backgroundColor: Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                }}
                activeOpacity={0.8}
              >
                <IconSymbol
                  name="arrow.clockwise"
                  size={24}
                  color={Colors.light.primary}
                />
                <Text
                  className="font-medium mt-2"
                  style={{ color: Colors.light.text }}
                >
                  Return Books
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
