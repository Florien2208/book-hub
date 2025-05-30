import React, { useState, useCallback } from "react";
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
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";

// Define the Book interface
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  borrowDate: string;
  returnDate: string;
  isOverdue: boolean;
}

// Define the tab type
type TabType = "current" | "overdue";

export default function MyBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover:
        "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
      borrowDate: "2024-05-15",
      returnDate: "2024-05-29",
      isOverdue: false,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7FSXuLfWs-b5JyLrZwGsNM6fk0-ikkBV2g&s",
      borrowDate: "2024-05-10",
      returnDate: "2024-05-24",
      isOverdue: true,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://m.media-amazon.com/images/I/61HkdyBpKOL._AC_UF894,1000_QL80_.jpg",
      borrowDate: "2024-05-20",
      returnDate: "2024-06-03",
      isOverdue: false,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5AfrvhPMMEL7WHYy-I3HS9VOWRhhiT4McQ&s",
      borrowDate: "2024-05-18",
      returnDate: "2024-06-01",
      isOverdue: false,
    },
    
  ]);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("current");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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

  const returnBook = (book: Book): void => {
    Alert.alert(
      "Return Book",
      `Are you sure you want to return "${book.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Return",
          onPress: () => {
            const updatedBooks = borrowedBooks.filter((b) => b.id !== book.id);
            setBorrowedBooks(updatedBooks);
            Alert.alert(
              "Success",
              `"${book.title}" has been returned successfully!`
            );
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
          onPress: () => {
            const newReturnDate = new Date(book.returnDate);
            newReturnDate.setDate(newReturnDate.getDate() + 14);

            const updatedBooks = borrowedBooks.map((b) =>
              b.id === book.id
                ? {
                    ...b,
                    returnDate: newReturnDate.toISOString().split("T")[0],
                  }
                : b
            );
            setBorrowedBooks(updatedBooks);
            Alert.alert(
              "Success",
              `"${
                book.title
              }" has been renewed until ${newReturnDate.toLocaleDateString()}!`
            );
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
                style={{ backgroundColor: Colors.light.primary }}
                onPress={() => returnBook(book)}
              >
                <Text className="text-white text-center font-medium text-sm">
                  Return
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-2 px-3 rounded-lg border"
                style={{
                  backgroundColor: book.isOverdue
                    ? Colors.light.muted
                    : Colors.light.card,
                  borderColor: Colors.light.cardBorder,
                }}
                onPress={() => renewBook(book)}
                disabled={book.isOverdue}
              >
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
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
          onPress: () => {
            const updatedBooks = borrowedBooks.filter((book) => book.isOverdue);
            setBorrowedBooks(updatedBooks);
            Alert.alert(
              "Success",
              "All current books have been returned successfully!"
            );
          },
        },
      ]
    );
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
              }}
              onPress={handleReturnAllBooks}
            >
              <Text
                className="font-semibold"
                style={{ color: Colors.light.primary }}
              >
                Return All Books
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
