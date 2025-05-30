import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import {
  bookAPI,
  type Book,
  type SearchFilters,
  getReturnDate,
} from "@/api/bookAPI";

export default function BookCatalogWithAPI() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [genres, setGenres] = useState<string[]>(["All"]);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);

  // Initial data loading
  useEffect(() => {
    loadInitialData();
  }, []);

  // Search and filter effect
  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedGenre, books]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Load books and genres in parallel
      const [booksResponse, genresResponse] = await Promise.all([
        bookAPI.getAllBooks(),
        bookAPI.getGenres(),
      ]);

      if (booksResponse.success && booksResponse.data) {
        setBooks(booksResponse.data);
        setFilteredBooks(booksResponse.data);
      } else {
        Alert.alert("Error", booksResponse.error || "Failed to load books");
      }

      if (genresResponse.success && genresResponse.data) {
        setGenres(genresResponse.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load data. Please try again.");
      console.error("Error loading initial data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!books.length) return;

    setIsSearching(true);

    try {
      const filters: SearchFilters = {
        query: searchQuery,
        genre: selectedGenre,
      };

      const response = await bookAPI.searchBooks(filters);

      if (response.success && response.data) {
        setFilteredBooks(response.data);
      } else {
        Alert.alert("Search Error", response.error || "Failed to search books");
      }
    } catch (error) {
      console.error("Search error:", error);
      Alert.alert("Error", "Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const openBookDetails = async (book: Book) => {
    try {
      // Fetch fresh book data to ensure availability is current
      const response = await bookAPI.getBookById(book.id);

      if (response.success && response.data) {
        setSelectedBook(response.data);
        setModalVisible(true);
      } else {
        Alert.alert("Error", response.error || "Failed to load book details");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load book details");
      console.error("Error loading book details:", error);
    }
  };

  const borrowBook = async (book: Book) => {
    if (!book.available) {
      Alert.alert(
        "Unavailable",
        "This book is currently not available for borrowing."
      );
      return;
    }

    Alert.alert(
      "Borrow Book",
      `Do you want to borrow "${
        book.title
      }"?\n\nReturn date: ${getReturnDate()}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Borrow",
          onPress: async () => {
            setIsBorrowing(true);
            try {
              const response = await bookAPI.borrowBook({
                bookId: book.id,
                userId: "current_user", // In a real app, this would be the logged-in user's ID
                borrowDate: new Date().toISOString(),
                returnDate: new Date(
                  Date.now() + 14 * 24 * 60 * 60 * 1000
                ).toISOString(),
              });

              if (response.success && response.data) {
                // Update local state
                const updatedBooks = books.map((b) =>
                  b.id === book.id ? response.data! : b
                );
                setBooks(updatedBooks);
                setSelectedBook(response.data);

                Alert.alert(
                  "Success",
                  response.message || "Book borrowed successfully!"
                );
                setModalVisible(false);

                // Refresh the filtered books
                handleSearch();
              } else {
                Alert.alert("Error", response.error || "Failed to borrow book");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to borrow book. Please try again.");
              console.error("Borrow error:", error);
            } finally {
              setIsBorrowing(false);
            }
          },
        },
      ]
    );
  };

  const renderBook = ({ item }: { item: Book }) => (
    <TouchableOpacity
      className="w-1/2 p-2"
      onPress={() => openBookDetails(item)}
      activeOpacity={0.7}
    >
      <View
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: Colors.light.card,
          borderColor: Colors.light.cardBorder,
        }}
      >
        <View className="items-center mb-3">
          <Image
            source={{ uri: item.cover }}
            className="w-20 h-28 rounded-lg mb-2"
          />
          <View
            className="px-2 py-1 rounded-full absolute bottom-[-15] right-0"
            style={{
              backgroundColor: item.available
                ? Colors.light.success + "20"
                : Colors.light.error + "20",
            }}
          >
            <Text
              className="text-xs font-medium"
              style={{
                color: item.available
                  ? Colors.light.success
                  : Colors.light.error,
              }}
            >
              {item.available ? "Available" : "Borrowed"}
            </Text>
          </View>
        </View>
        <Text
          className="text-sm font-semibold text-center mb-1"
          style={{ color: Colors.light.text }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          className="text-xs text-center"
          style={{ color: Colors.light.mutedForeground }}
          numberOfLines={1}
        >
          {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: Colors.light.background }}
      >
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text className="mt-4 text-lg" style={{ color: Colors.light.text }}>
          Loading books...
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

      <View className="flex-1 px-4 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: Colors.light.text }}
          >
            Book Catalog
          </Text>
          <Text
            className="text-base"
            style={{ color: Colors.light.mutedForeground }}
          >
            Discover and borrow your next great read
          </Text>
        </View>

        {/* Search Bar */}
        <View
          className="flex-row items-center px-4 py-3 rounded-xl mb-4 border"
          style={{
            backgroundColor: Colors.light.card,
            borderColor: Colors.light.cardBorder,
          }}
        >
          <IconSymbol
            name="magnifyingglass"
            size={20}
            color={Colors.light.mutedForeground}
          />
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder="Search books or authors..."
            placeholderTextColor={Colors.light.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ color: Colors.light.text }}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <IconSymbol
                name="xmark.circle.fill"
                size={20}
                color={Colors.light.mutedForeground}
              />
            </TouchableOpacity>
          ) : null}
          {isSearching && (
            <ActivityIndicator
              size="small"
              color={Colors.light.primary}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>

        {/* Genre Filter */}
        <View className="mb-6">
          <Text
            className="text-lg font-semibold mb-3 px-2"
            style={{ color: Colors.light.text }}
          >
            Browse by Genre
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            <View className="flex-row">
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  className="px-5 py-3 rounded-full mr-3 border"
                  style={{
                    backgroundColor:
                      selectedGenre === genre
                        ? Colors.light.primary
                        : Colors.light.card,
                    borderColor:
                      selectedGenre === genre
                        ? Colors.light.primary
                        : Colors.light.cardBorder,
                    shadowColor: Colors.light.text,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: selectedGenre === genre ? 0.2 : 0.1,
                    shadowRadius: 2,
                    elevation: selectedGenre === genre ? 3 : 1,
                    transform: [{ scale: selectedGenre === genre ? 1.02 : 1 }],
                  }}
                  onPress={() => setSelectedGenre(genre)}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center">
                    {selectedGenre === genre && (
                      <View
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: "white" }}
                      />
                    )}
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color:
                          selectedGenre === genre ? "white" : Colors.light.text,
                      }}
                    >
                      {genre}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Books Grid */}
        <View className="flex-1">
          {filteredBooks.length === 0 && !isSearching ? (
            <View className="flex-1 justify-center items-center">
              <Text
                className="text-lg text-center"
                style={{ color: Colors.light.mutedForeground }}
              >
                No books found matching your criteria
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredBooks}
              renderItem={renderBook}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              refreshing={isSearching}
              onRefresh={loadInitialData}
            />
          )}
        </View>
      </View>

      {/* Book Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View
            className="rounded-t-3xl p-6"
            style={{
              backgroundColor: Colors.light.card,
              maxHeight: "80%",
            }}
          >
            {selectedBook && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-start mb-4">
                  <Text
                    className="text-2xl font-bold flex-1"
                    style={{ color: Colors.light.text }}
                  >
                    {selectedBook.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="ml-4"
                  >
                    <IconSymbol
                      name="xmark"
                      size={24}
                      color={Colors.light.mutedForeground}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-row mb-6">
                  <Image
                    source={{ uri: selectedBook.cover }}
                    className="w-24 h-36 rounded-lg mr-4"
                  />
                  <View className="flex-1">
                    <Text
                      className="text-lg font-semibold mb-2"
                      style={{ color: Colors.light.mutedForeground }}
                    >
                      by {selectedBook.author}
                    </Text>
                    <View
                      className="px-3 py-1 rounded-full self-start mb-2"
                      style={{
                        backgroundColor: Colors.light.accent + "20",
                      }}
                    >
                      <Text
                        className="text-sm font-medium"
                        style={{ color: Colors.light.accent }}
                      >
                        {selectedBook.genre}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full self-start"
                      style={{
                        backgroundColor: selectedBook.available
                          ? Colors.light.success + "20"
                          : Colors.light.error + "20",
                      }}
                    >
                      <Text
                        className="text-sm font-medium"
                        style={{
                          color: selectedBook.available
                            ? Colors.light.success
                            : Colors.light.error,
                        }}
                      >
                        {selectedBook.available
                          ? "Available"
                          : "Currently Borrowed"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mb-6">
                  <Text
                    className="text-lg font-semibold mb-2"
                    style={{ color: Colors.light.text }}
                  >
                    Description
                  </Text>
                  <Text
                    className="text-base leading-6"
                    style={{ color: Colors.light.mutedForeground }}
                  >
                    {selectedBook.description}
                  </Text>
                </View>

                <View className="mb-6">
                  <Text
                    className="text-lg font-semibold mb-2"
                    style={{ color: Colors.light.text }}
                  >
                    Details
                  </Text>
                  <Text
                    className="text-base mb-1"
                    style={{ color: Colors.light.mutedForeground }}
                  >
                    ISBN: {selectedBook.isbn}
                  </Text>
                  {selectedBook.available && (
                    <Text
                      className="text-base"
                      style={{ color: Colors.light.mutedForeground }}
                    >
                      Return Date: {getReturnDate()}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className="py-4 rounded-xl items-center flex-row justify-center"
                  style={{
                    backgroundColor: selectedBook.available
                      ? Colors.light.primary
                      : Colors.light.muted,
                  }}
                  onPress={() => borrowBook(selectedBook)}
                  disabled={!selectedBook.available || isBorrowing}
                >
                  {isBorrowing && (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                  )}
                  <Text
                    className="text-lg font-semibold"
                    style={{
                      color: selectedBook.available
                        ? "white"
                        : Colors.light.mutedForeground,
                    }}
                  >
                    {isBorrowing
                      ? "Processing..."
                      : selectedBook.available
                      ? "Borrow Book"
                      : "Currently Unavailable"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
