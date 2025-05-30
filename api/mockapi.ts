// mockapi.ts

import { mockData } from "@/constants/MockData";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  dob: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  dob?: string;
  token: string;
}
// mockApi.ts
type LoginData = {
  email: string;
  password: string;
};


const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  token: "mock-jwt-token-123",
};

export const login = async (data: LoginData): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === mockUser.email && data.password === "password123") {
        resolve(mockUser);
      } else {
        reject(new Error("Invalid email or password."));
      }
    }, 1000); // simulate network delay
  });
};

export const signup = async (data: SignupData): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { name, email, password, dob } = data;
      if (!name || !email || !password || !dob) {
        return reject(new Error("All fields are required."));
      }
      if (!email.includes("@")) {
        return reject(new Error("Invalid email format."));
      }
      resolve({
        id: Date.now(),
        name,
        email,
        dob,
        token: "mock-jwt-token-123",
      });
    }, 1200);
  });
};

export interface Book {
  id: number;
  title: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  isOverdue: boolean;
}

export interface Stats {
  totalBorrowed: number;
  currentlyBorrowed: number;
  returned: number;
  overdue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Service
export class MockApiService {
  
  // Get user statistics
  static async getStats(): Promise<ApiResponse<Stats>> {
    await delay(500); // Simulate network delay
    
    try {
      return {
        success: true,
        data: mockData.stats
      };
    } catch (error) {
      return {
        success: false,
        data: mockData.stats,
        message: 'Failed to fetch statistics'
      };
    }
  }

  // Get borrowed books
  static async getBorrowedBooks(): Promise<ApiResponse<Book[]>> {
    await delay(800); // Simulate network delay
    
    try {
      // Update overdue status based on current date
      const updatedBooks = mockData.borrowedBooks.map(book => ({
        ...book,
        isOverdue: new Date(book.returnDate) < new Date()
      }));

      return {
        success: true,
        data: updatedBooks
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Failed to fetch borrowed books'
      };
    }
  }

  // Return a book
  static async returnBook(bookId: number): Promise<ApiResponse<boolean>> {
    await delay(1000); // Simulate network delay
    
    try {
      // Find and remove the book from borrowed books
      const bookIndex = mockData.borrowedBooks.findIndex(book => book.id === bookId);
      
      if (bookIndex === -1) {
        return {
          success: false,
          data: false,
          message: 'Book not found'
        };
      }

      // Remove the book from borrowed books
      mockData.borrowedBooks.splice(bookIndex, 1);
      
      // Update stats
      mockData.stats.currentlyBorrowed -= 1;
      mockData.stats.returned += 1;
      
      // Recalculate overdue count
      const overdueCount = mockData.borrowedBooks.filter(book => 
        new Date(book.returnDate) < new Date()
      ).length;
      mockData.stats.overdue = overdueCount;

      return {
        success: true,
        data: true,
        message: 'Book returned successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        message: 'Failed to return book'
      };
    }
  }

  // Borrow a new book
  static async borrowBook(title: string, author: string, daysToReturn: number = 14): Promise<ApiResponse<Book>> {
    await delay(1200); // Simulate network delay
    
    try {
      const borrowDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(borrowDate.getDate() + daysToReturn);

      const newBook: Book = {
        id: Date.now(), // Simple ID generation
        title,
        author,
        borrowDate: borrowDate.toISOString().split('T')[0],
        returnDate: returnDate.toISOString().split('T')[0],
        isOverdue: false
      };

      // Add to borrowed books
      mockData.borrowedBooks.push(newBook);
      
      // Update stats
      mockData.stats.currentlyBorrowed += 1;
      mockData.stats.totalBorrowed += 1;

      return {
        success: true,
        data: newBook,
        message: 'Book borrowed successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: {} as Book,
        message: 'Failed to borrow book'
      };
    }
  }

  // Extend return date
  static async extendReturnDate(bookId: number, additionalDays: number): Promise<ApiResponse<Book>> {
    await delay(700); // Simulate network delay
    
    try {
      const book = mockData.borrowedBooks.find(book => book.id === bookId);
      
      if (!book) {
        return {
          success: false,
          data: {} as Book,
          message: 'Book not found'
        };
      }

      const currentReturnDate = new Date(book.returnDate);
      currentReturnDate.setDate(currentReturnDate.getDate() + additionalDays);
      book.returnDate = currentReturnDate.toISOString().split('T')[0];
      book.isOverdue = false; // Reset overdue status

      // Recalculate overdue count
      const overdueCount = mockData.borrowedBooks.filter(book => 
        new Date(book.returnDate) < new Date()
      ).length;
      mockData.stats.overdue = overdueCount;

      return {
        success: true,
        data: book,
        message: 'Return date extended successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: {} as Book,
        message: 'Failed to extend return date'
      };
    }
  }

  // Get dashboard data (stats + borrowed books in one call)
  static async getDashboardData(): Promise<ApiResponse<{stats: Stats, borrowedBooks: Book[]}>> {
    await delay(600); // Simulate network delay
    
    try {
      // Update overdue status and count
      const updatedBooks = mockData.borrowedBooks.map(book => ({
        ...book,
        isOverdue: new Date(book.returnDate) < new Date()
      }));

      const overdueCount = updatedBooks.filter(book => book.isOverdue).length;
      mockData.stats.overdue = overdueCount;

      return {
        success: true,
        data: {
          stats: mockData.stats,
          borrowedBooks: updatedBooks
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          stats: mockData.stats,
          borrowedBooks: []
        },
        message: 'Failed to fetch dashboard data'
      };
    }
  }
}