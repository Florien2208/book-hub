// bookAPI.ts - Mocked API service

export type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  available: boolean;
  genre: string;
  description: string;
  isbn: string;
};

// Simulated database
let booksDatabase: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
    available: true,
    genre: "Classic",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    isbn: "978-0-7432-7356-5",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7FSXuLfWs-b5JyLrZwGsNM6fk0-ikkBV2g&s",
    available: false,
    genre: "Classic",
    description:
      "A gripping tale of racial injustice and childhood innocence in the American South.",
    isbn: "978-0-06-112008-4",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover:
      "https://m.media-amazon.com/images/I/61HkdyBpKOL._AC_UF894,1000_QL80_.jpg",
    available: true,
    genre: "Dystopian",
    description:
      "A dystopian masterpiece about totalitarianism and the power of language and thought.",
    isbn: "978-0-452-28423-4",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5AfrvhPMMEL7WHYy-I3HS9VOWRhhiT4McQ&s",
    available: true,
    genre: "Romance",
    description:
      "A witty and romantic tale of love, marriage, and social expectations in Regency England.",
    isbn: "978-0-14-143951-8",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover:
      "https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Coming-of-age",
    description:
      "A controversial coming-of-age story following Holden Caulfield's experiences in New York City.",
    isbn: "978-0-316-76948-0",
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    cover:
      "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Fantasy",
    description:
      "The magical story of a young wizard's journey at Hogwarts School of Witchcraft and Wizardry.",
    isbn: "978-0-439-70818-8",
  },

  {
    id: 7,
    title: "Animal Farm",
    author: "George Orwell",
    cover: "https://m.media-amazon.com/images/I/91Lbhwt5RzL.jpg",
    available: true,
    genre: "Dystopian",
    description:
      "An allegorical tale about farm animals who rebel against their human farmer.",
    isbn: "978-0-452-28424-1",
  },
  {
    id: 8,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    cover: "https://covers.openlibrary.org/b/isbn/9780141441146-M.jpg",
    available: false,
    genre: "Romance",
    description:
      "A Gothic romance following an orphaned governess and her complex relationship with her employer.",
    isbn: "978-0-14-144114-6",
  },
  {
    id: 9,
    title: "Brave New World",
    author: "Aldous Huxley",
    cover:
      "https://m.media-amazon.com/images/I/71GNqqXuN3L._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Dystopian",
    description:
      "A prophetic vision of a future society controlled by technology and conditioning.",
    isbn: "978-0-06-085052-4",
  },
  {
    id: 10,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZgqwzCoZiPieqzWmZv5hULrgbZ1G6TIxvPA&s",
    available: false,
    genre: "Classic",
    description:
      "A powerful story of friendship and dreams during the Great Depression.",
    isbn: "978-0-14-017739-8",
  },
  {
    id: 11,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_nNqaFYgHZKFXgg8elF2Tp8TywpLjASUOQ&s",
    available: true,
    genre: "Romance",
    description:
      "The timeless tale of star-crossed lovers in Renaissance Verona.",
    isbn: "978-0-14-071749-7",
  },
  {
    id: 12,
    title: "The Odyssey",
    author: "Homer",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449112-M.jpg",
    available: true,
    genre: "Classic",
    description:
      "The epic journey of Odysseus as he struggles to return home after the Trojan War.",
    isbn: "978-0-14-044911-2",
  },
  {
    id: 13,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/db/Fahrenheit_451_1st_ed_cover.jpg",
    available: false,
    genre: "Dystopian",
    description:
      "A chilling vision of a future where books are banned and burned by the government.",
    isbn: "978-1-4516-7331-9",
  },
  {
    id: 14,
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Huckleberry_Finn_book.JPG",
    available: true,
    genre: "Coming-of-age",
    description:
      "A young boy's adventures along the Mississippi River in this American classic.",
    isbn: "978-0-14-243717-4",
  },
  {
    id: 15,
    title: "Wuthering Heights",
    author: "Emily Brontë",
    cover: "https://covers.openlibrary.org/b/isbn/9780141439556-M.jpg",
    available: true,
    genre: "Romance",
    description:
      "A passionate and dark tale of love and revenge on the Yorkshire moors.",
    isbn: "978-0-14-143955-6",
  },
  {
    id: 16,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLQAWZXYYr1FMFdp6PVtdE-5RYFF7WnE8Qw&s",
    available: false,
    genre: "Classic",
    description:
      "A decadent tale of beauty, corruption, and the price of eternal youth.",
    isbn: "978-0-14-143957-0",
  },
  {
    id: 17,
    title: "Great Expectations",
    author: "Charles Dickens",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdNQzzXDewWM8sfxXOY1rtS8Xq1OWJ3zvltQ&s",
    available: true,
    genre: "Classic",
    description:
      "A young man's journey from humble beginnings to unexpected fortune in Victorian England.",
    isbn: "978-0-14-143956-3",
  },
  {
    id: 18,
    title: "Moby Dick",
    author: "Herman Melville",
    cover: "https://covers.openlibrary.org/b/isbn/9780142000830-M.jpg",
    available: true,
    genre: "Classic",
    description:
      "The epic tale of Captain Ahab's obsessive quest to hunt the white whale.",
    isbn: "978-0-14-200083-0",
  },
  {
    id: 19,
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1724863997i/7126.jpg",
    available: false,
    genre: "Classic",
    description:
      "An epic tale of betrayal, imprisonment, and revenge in 19th-century France.",
    isbn: "978-0-14-044926-6",
  },
  {
    id: 20,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    cover:
      "https://m.media-amazon.com/images/I/71HFqQydGdL._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Fantasy",
    description:
      "A young wizard discovers his magical heritage and begins his journey at Hogwarts School.",
    isbn: "978-0-7475-3269-9",
  },
  {
    id: 21,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    cover:
      "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Fantasy",
    description:
      "An epic fantasy adventure following Frodo's quest to destroy the One Ring.",
    isbn: "978-0-547-92822-7",
  },
  {
    id: 22,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover:
      "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg",
    available: false,
    genre: "Fantasy",
    description:
      "Bilbo Baggins' unexpected adventure with dwarves and a dragon.",
    isbn: "978-0-547-92822-7",
  },
  {
    id: 23,
    title: "The Fault in Our Stars",
    author: "John Green",
    cover:
      "https://m.media-amazon.com/images/I/817tHNcyAgL._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Romance",
    description:
      "A heart-wrenching love story between two teenagers facing cancer.",
    isbn: "978-0-525-47881-2",
  },
  {
    id: 24,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    cover:
      "https://m.media-amazon.com/images/I/71WSzKYzelL._AC_UF1000,1000_QL80_.jpg",
    available: true,
    genre: "Dystopian",
    description:
      "A thrilling dystopian tale of survival and rebellion in a post-apocalyptic world.",
    isbn: "978-0-439-02348-1",
  },
];

// Simulate network delay
const simulateDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface BorrowBookRequest {
  bookId: number;
  userId?: string;
  borrowDate?: string;
  returnDate?: string;
}

export interface SearchFilters {
  query?: string;
  genre?: string;
  available?: boolean;
}

class BookAPI {
  // Fetch all books
  async getAllBooks(): Promise<ApiResponse<Book[]>> {
    try {
      await simulateDelay(600);
      return {
        success: true,
        data: [...booksDatabase],
        message: "Books fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch books",
      };
    }
  }

  // Search and filter books
  async searchBooks(filters: SearchFilters): Promise<ApiResponse<Book[]>> {
    try {
      await simulateDelay(400);

      let filteredBooks = [...booksDatabase];

      // Filter by search query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredBooks = filteredBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
      }

      // Filter by genre
      if (filters.genre && filters.genre !== "All") {
        filteredBooks = filteredBooks.filter(
          (book) => book.genre === filters.genre
        );
      }

      // Filter by availability
      if (filters.available !== undefined) {
        filteredBooks = filteredBooks.filter(
          (book) => book.available === filters.available
        );
      }

      return {
        success: true,
        data: filteredBooks,
        message: `Found ${filteredBooks.length} books`,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to search books",
      };
    }
  }

  // Get book by ID
  async getBookById(id: number): Promise<ApiResponse<Book>> {
    try {
      await simulateDelay(300);

      const book = booksDatabase.find((b) => b.id === id);

      if (!book) {
        return {
          success: false,
          error: "Book not found",
        };
      }

      return {
        success: true,
        data: book,
        message: "Book found",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch book details",
      };
    }
  }

  // Borrow a book
  async borrowBook(request: BorrowBookRequest): Promise<ApiResponse<Book>> {
    try {
      await simulateDelay(1000); // Longer delay to simulate processing

      const bookIndex = booksDatabase.findIndex((b) => b.id === request.bookId);

      if (bookIndex === -1) {
        return {
          success: false,
          error: "Book not found",
        };
      }

      const book = booksDatabase[bookIndex];

      if (!book.available) {
        return {
          success: false,
          error: "Book is currently not available for borrowing",
        };
      }

      // Update book availability
      booksDatabase[bookIndex] = {
        ...book,
        available: false,
      };

      return {
        success: true,
        data: booksDatabase[bookIndex],
        message: `Successfully borrowed "${book.title}"`,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to borrow book",
      };
    }
  }

  // Return a book
  async returnBook(bookId: number): Promise<ApiResponse<Book>> {
    try {
      await simulateDelay(800);

      const bookIndex = booksDatabase.findIndex((b) => b.id === bookId);

      if (bookIndex === -1) {
        return {
          success: false,
          error: "Book not found",
        };
      }

      const book = booksDatabase[bookIndex];

      if (book.available) {
        return {
          success: false,
          error: "Book is already available",
        };
      }

      // Update book availability
      booksDatabase[bookIndex] = {
        ...book,
        available: true,
      };

      return {
        success: true,
        data: booksDatabase[bookIndex],
        message: `Successfully returned "${book.title}"`,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to return book",
      };
    }
  }

  // Get available genres
  async getGenres(): Promise<ApiResponse<string[]>> {
    try {
      await simulateDelay(200);

      const genres = Array.from(
        new Set(booksDatabase.map((book) => book.genre))
      );

      return {
        success: true,
        data: ["All", ...genres],
        message: "Genres fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch genres",
      };
    }
  }

  // Add a new book (bonus feature)
  async addBook(book: Omit<Book, "id">): Promise<ApiResponse<Book>> {
    try {
      await simulateDelay(1200);

      const newId = Math.max(...booksDatabase.map((b) => b.id)) + 1;
      const newBook: Book = {
        ...book,
        id: newId,
      };

      booksDatabase.push(newBook);

      return {
        success: true,
        data: newBook,
        message: `Successfully added "${book.title}" to the catalog`,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to add book",
      };
    }
  }

  // Get books statistics
  async getStats(): Promise<
    ApiResponse<{
      totalBooks: number;
      availableBooks: number;
      borrowedBooks: number;
      genreDistribution: Record<string, number>;
    }>
  > {
    try {
      await simulateDelay(500);

      const totalBooks = booksDatabase.length;
      const availableBooks = booksDatabase.filter((b) => b.available).length;
      const borrowedBooks = totalBooks - availableBooks;

      const genreDistribution = booksDatabase.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        success: true,
        data: {
          totalBooks,
          availableBooks,
          borrowedBooks,
          genreDistribution,
        },
        message: "Statistics fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch statistics",
      };
    }
  }
}

// Export singleton instance
export const bookAPI = new BookAPI();

// Helper function to get return date
export const getReturnDate = (weeksFromNow: number = 2): string => {
  const date = new Date();
  date.setDate(date.getDate() + weeksFromNow * 7);
  return date.toLocaleDateString();
};
