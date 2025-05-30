// mockApi.ts
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  borrowDate: string;
  returnDate: string;
  isOverdue: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Mock data storage with updated dates
let mockBooksData: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
    borrowDate: "2025-05-15",
    returnDate: "2025-06-12", // Future date - current book
    isOverdue: false,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7FSXuLfWs-b5JyLrZwGsNM6fk0-ikkBV2g&s",
    borrowDate: "2025-05-10",
    returnDate: "2025-05-28", // Past date - overdue book
    isOverdue: true,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover:
      "https://m.media-amazon.com/images/I/61HkdyBpKOL._AC_UF894,1000_QL80_.jpg",
    borrowDate: "2025-05-20",
    returnDate: "2025-06-15", // Future date - current book
    isOverdue: false,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5AfrvhPMMEL7WHYy-I3HS9VOWRhhiT4McQ&s",
    borrowDate: "2025-05-18",
    returnDate: "2025-06-01", // Future date - current book (due soon)
    isOverdue: false,
  },
];

// Utility function to simulate API delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Fetch all borrowed books
  async fetchBorrowedBooks(): Promise<ApiResponse<Book[]>> {
    await delay(800); // Simulate network delay

    try {
      // Update overdue status based on current date
      const currentDate = new Date();
      const updatedBooks = mockBooksData.map((book) => ({
        ...book,
        isOverdue: new Date(book.returnDate) < currentDate,
      }));

      mockBooksData = updatedBooks;

      return {
        success: true,
        data: [...mockBooksData],
        message: "Books fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch books",
      };
    }
  },

  // Return a specific book
  async returnBook(bookId: number): Promise<ApiResponse<Book>> {
    await delay(500);

    try {
      const bookIndex = mockBooksData.findIndex((book) => book.id === bookId);

      if (bookIndex === -1) {
        return {
          success: false,
          message: "Book not found",
        };
      }

      const returnedBook = mockBooksData[bookIndex];
      mockBooksData = mockBooksData.filter((book) => book.id !== bookId);

      return {
        success: true,
        data: returnedBook,
        message: `"${returnedBook.title}" has been returned successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to return book",
      };
    }
  },

  // Return all current books (not overdue)
  async returnAllBooks(): Promise<ApiResponse<Book[]>> {
    await delay(1000);

    try {
      const currentBooks = mockBooksData.filter((book) => !book.isOverdue);
      mockBooksData = mockBooksData.filter((book) => book.isOverdue);

      return {
        success: true,
        data: currentBooks,
        message: "All current books have been returned successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to return all books",
      };
    }
  },

  // Renew a book
  async renewBook(bookId: number): Promise<ApiResponse<Book>> {
    await delay(700);

    try {
      const bookIndex = mockBooksData.findIndex((book) => book.id === bookId);

      if (bookIndex === -1) {
        return {
          success: false,
          message: "Book not found",
        };
      }

      const book = mockBooksData[bookIndex];

      if (book.isOverdue) {
        return {
          success: false,
          message:
            "Overdue books cannot be renewed. Please return the book first.",
        };
      }

      // Extend return date by 14 days
      const newReturnDate = new Date(book.returnDate);
      newReturnDate.setDate(newReturnDate.getDate() + 14);

      const updatedBook = {
        ...book,
        returnDate: newReturnDate.toISOString().split("T")[0],
      };

      mockBooksData[bookIndex] = updatedBook;

      return {
        success: true,
        data: updatedBook,
        message: `"${
          book.title
        }" has been renewed until ${newReturnDate.toLocaleDateString()}!`,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to renew book",
      };
    }
  },

  // Get book statistics
  async getBookStats(): Promise<
    ApiResponse<{ current: number; overdue: number }>
  > {
    await delay(300);

    try {
      const currentBooks = mockBooksData.filter((book) => !book.isOverdue);
      const overdueBooks = mockBooksData.filter((book) => book.isOverdue);

      return {
        success: true,
        data: {
          current: currentBooks.length,
          overdue: overdueBooks.length,
        },
        message: "Stats fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch stats",
      };
    }
  },
};

export type { Book, ApiResponse };
