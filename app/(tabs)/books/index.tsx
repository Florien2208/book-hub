import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Book, mockApi } from "@/api/cataloApi";


// Define the tab type
type TabType = "current" | "overdue";

export default function MyBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("current");
  const [actionLoading, setActionLoading] = useState<{
    [key: string]: boolean;
  }>({});

  // Load books on component mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await mockApi.fetchBorrowedBooks();

      if (response.success && response.data) {
        setBorrowedBooks(response.data);
      } else {
        Alert.alert("Error", response.message || "Failed to load books");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadBooks();
    setRefreshing(false);
  }, []);

  const getDaysUntilReturn = (returnDate: string): number => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (isOverdue: boolean, daysLeft: number): string => {
    if (isOverdue) return Colors.light.error;
    if (daysLeft <= 2) return Colors.light.warning;
    return Colors.light.success;
  };

  const getStatusText = (isOverdue: boolean, daysLeft: number): string => {
    if (isOverdue) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft === 1) return "Due Tomorrow";
    return `${daysLeft} days left`;
  };

  const setBookActionLoading = (bookId: number, loading: boolean): void => {
    setActionLoading((prev) => ({
      ...prev,
      [`book_${bookId}`]: loading,
    }));
  };

  const returnBook = (book: Book): void => {
    Alert.alert(
      "Return Book",
      `Are you sure you want to return "${book.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Return",
          onPress: async () => {
            try {
              setBookActionLoading(book.id, true);
              const response = await mockApi.returnBook(book.id);

              if (response.success) {
                // Refresh the books list
                await loadBooks();
                Alert.alert(
                  "Success",
                  response.message || "Book returned successfully!"
                );
              } else {
                Alert.alert(
                  "Error",
                  response.message || "Failed to return book"
                );
              }
            } catch (error) {
              Alert.alert("Error", "An unexpected error occurred");
            } finally {
              setBookActionLoading(book.id, false);
            }
          },
        },
      ]
    );
  };

  const renewBook = (book: Book): void => {
    if (book.isOverdue) {
      Alert.alert(
        "Cannot Renew",
        "Overdue books cannot be renewed. Please return the book first."
      );
      return;
    }

    Alert.alert(
      "Renew Book",
      `Do you want to renew "${book.title}" for another 2 weeks?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Renew",
          onPress: async () => {
            try {
              setBookActionLoading(book.id, true);
              const response = await mockApi.renewBook(book.id);

              if (response.success) {
                // Refresh the books list
                await loadBooks();
                Alert.alert(
                  "Success",
                  response.message || "Book renewed successfully!"
                );
              } else {
                Alert.alert(
                  "Error",
                  response.message || "Failed to renew book"
                );
              }
            } catch (error) {
              Alert.alert("Error", "An unexpected error occurred");
            } finally {
              setBookActionLoading(book.id, false);
            }
          },
        },
      ]
    );
  };

  const handleReturnAllBooks = (): void => {
    Alert.alert(
      "Return All Books",
      "Are you sure you want to return all current books?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Return All",
          onPress: async () => {
            try {
              setActionLoading((prev) => ({ ...prev, returnAll: true }));
              const response = await mockApi.returnAllBooks();

              if (response.success) {
                // Refresh the books list
                await loadBooks();
                Alert.alert(
                  "Success",
                  response.message || "All books returned successfully!"
                );
              } else {
                Alert.alert(
                  "Error",
                  response.message || "Failed to return all books"
                );
              }
            } catch (error) {
              Alert.alert("Error", "An unexpected error occurred");
            } finally {
              setActionLoading((prev) => ({ ...prev, returnAll: false }));
            }
          },
        },
      ]
    );
  };

  const currentBooks = borrowedBooks.filter((book) => !book.isOverdue);
  const overdueBooks = borrowedBooks.filter((book) => book.isOverdue);
  const displayBooks = activeTab === "current" ? currentBooks : overdueBooks;

  const renderBookCard = (book: Book) => {
    const daysLeft = getDaysUntilReturn(book.returnDate);
    const statusColor = getStatusColor(book.isOverdue, daysLeft);
    const statusText = getStatusText(book.isOverdue, daysLeft);
    const bookLoading = actionLoading[`book_${book.id}`] || false;

    return (
      <View
        key={book.id}
        className="mb-4 p-4 rounded-xl border"
        style={{
          backgroundColor: Colors.light.card,
          borderColor: book.isOverdue
            ? Colors.light.error + "30"
            : Colors.light.cardBorder,
          borderWidth: book.isOverdue ? 2 : 1,
        }}
      >
        <View className="flex-row">
          <Image
            source={{ uri: book.cover }}
            className="w-16 h-24 rounded-lg mr-4"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1 mr-2">
                <Text
                  className="text-lg font-semibold mb-1"
                  style={{ color: Colors.light.text }}
                  numberOfLines={2}
                >
                  {book.title}
                </Text>
                <Text
                  className="text-sm mb-2"
                  style={{ color: Colors.light.mutedForeground }}
                >
                  by {book.author}
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

            <View className="mb-3">
              <Text
                className="text-xs mb-1"
                style={{ color: Colors.light.mutedForeground }}
              >
                Borrowed: {new Date(book.borrowDate).toLocaleDateString()}
              </Text>
              <Text
                className="text-xs"
                style={{ color: Colors.light.mutedForeground }}
              >
                Due: {new Date(book.returnDate).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="flex-1 py-2 px-3 rounded-lg mr-2"
                style={{
                  backgroundColor: bookLoading
                    ? Colors.light.muted
                    : Colors.light.primary,
                  opacity: bookLoading ? 0.7 : 1,
                }}
                onPress={() => returnBook(book)}
                disabled={bookLoading}
              >
                {bookLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-white text-center font-medium text-sm">
                    Return
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-2 px-3 rounded-lg border"
                style={{
                  backgroundColor:
                    book.isOverdue || bookLoading
                      ? Colors.light.muted
                      : Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                  opacity: bookLoading ? 0.7 : 1,
                }}
                onPress={() => renewBook(book)}
                disabled={book.isOverdue || bookLoading}
              >
                {bookLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.light.mutedForeground}
                  />
                ) : (
                  <Text
                    className="text-center font-medium text-sm"
                    style={{
                      color: book.isOverdue
                        ? Colors.light.mutedForeground
                        : Colors.light.primary,
                    }}
                  >
                    Renew
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: Colors.light.background }}
      >
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text
            className="mt-4 text-lg"
            style={{ color: Colors.light.mutedForeground }}
          >
            Loading your books...
          </Text>
        </View>
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

      <View className="flex-1 px-4 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: Colors.light.text }}
          >
            My Books
          </Text>
          <Text
            className="text-base"
            style={{ color: Colors.light.mutedForeground }}
          >
            Manage your borrowed books and returns
          </Text>
        </View>

        {/* Summary Cards */}
        <View className="flex-row mb-6 -mx-2">
          <View className="w-1/2 px-2">
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
                  style={{ backgroundColor: Colors.light.primary + "20" }}
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
                  {currentBooks.length}
                </Text>
              </View>
              <Text
                className="text-sm"
                style={{ color: Colors.light.mutedForeground }}
              >
                Current Books
              </Text>
            </View>
          </View>
          <View className="w-1/2 px-2">
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
                  {overdueBooks.length}
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

        {/* Tab Navigation */}
        <View
          className="flex-row mb-4 p-1 rounded-xl"
          style={{ backgroundColor: Colors.light.muted }}
        >
          <TouchableOpacity
            className="flex-1 py-3 rounded-lg"
            style={{
              backgroundColor:
                activeTab === "current" ? Colors.light.card : "transparent",
            }}
            onPress={() => setActiveTab("current")}
          >
            <Text
              className="text-center font-medium"
              style={{
                color:
                  activeTab === "current"
                    ? Colors.light.primary
                    : Colors.light.mutedForeground,
              }}
            >
              Current ({currentBooks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-3 rounded-lg"
            style={{
              backgroundColor:
                activeTab === "overdue" ? Colors.light.card : "transparent",
            }}
            onPress={() => setActiveTab("overdue")}
          >
            <Text
              className="text-center font-medium"
              style={{
                color:
                  activeTab === "overdue"
                    ? Colors.light.error
                    : Colors.light.mutedForeground,
              }}
            >
              Overdue ({overdueBooks.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books List */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.light.primary}
            />
          }
        >
          {displayBooks.length > 0 ? (
            displayBooks.map(renderBookCard)
          ) : (
            <View className="flex-1 items-center justify-center py-12">
              <View
                className="w-20 h-20 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: Colors.light.muted }}
              >
                <IconSymbol
                  name={
                    activeTab === "current"
                      ? "book"
                      : "exclamationmark.triangle"
                  }
                  size={32}
                  color={Colors.light.mutedForeground}
                />
              </View>
              <Text
                className="text-lg font-semibold mb-2"
                style={{ color: Colors.light.text }}
              >
                {activeTab === "current"
                  ? "No Current Books"
                  : "No Overdue Books"}
              </Text>
              <Text
                className="text-center"
                style={{ color: Colors.light.mutedForeground }}
              >
                {activeTab === "current"
                  ? "You have no currently borrowed books.\nVisit the catalog to borrow some!"
                  : "Great! You have no overdue books."}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Quick Action Button */}
        {activeTab === "current" && displayBooks.length > 0 && (
          <View className="py-4">
            <TouchableOpacity
              className="py-4 rounded-xl items-center border"
              style={{
                backgroundColor: Colors.light.card,
                borderColor: Colors.light.cardBorder,
                opacity: actionLoading.returnAll ? 0.7 : 1,
              }}
              onPress={handleReturnAllBooks}
              disabled={actionLoading.returnAll}
            >
              {actionLoading.returnAll ? (
                <ActivityIndicator size="small" color={Colors.light.primary} />
              ) : (
                <Text
                  className="font-semibold"
                  style={{ color: Colors.light.primary }}
                >
                  Return All Books
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
