// services/mockData.ts

import { Book, Stats } from "@/api/mockapi";


// Mock data store (simulates a database)
export const mockData = {
  // User statistics
  stats: {
    totalBorrowed: 12,
    currentlyBorrowed: 3,
    returned: 9,
    overdue: 1,
  } as Stats,

  // Currently borrowed books
  borrowedBooks: [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      borrowDate: "2024-05-15",
      returnDate: "2024-05-29",
      isOverdue: false,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      borrowDate: "2024-05-10",
      returnDate: "2024-05-24",
      isOverdue: true,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      borrowDate: "2024-05-20",
      returnDate: "2024-06-03",
      isOverdue: false,
    },
  ] as Book[],

  // Available books catalog (for browsing/borrowing)
  catalogBooks: [
    {
      id: 101,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      category: "Classic Literature",
      available: true,
      totalCopies: 3,
      availableCopies: 2,
      description:
        "A romantic novel of manners written by Jane Austen in 1813.",
      publishYear: 1813,
      pages: 432,
      language: "English",
    },
    {
      id: 102,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "9780316769174",
      category: "Classic Literature",
      available: true,
      totalCopies: 2,
      availableCopies: 1,
      description:
        "A controversial novel originally published for adults, it has since become popular with adolescent readers.",
      publishYear: 1951,
      pages: 277,
      language: "English",
    },
    {
      id: 103,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      isbn: "9780747532699",
      category: "Fantasy",
      available: false,
      totalCopies: 5,
      availableCopies: 0,
      description:
        "The first novel in the Harry Potter series and Rowling's debut novel.",
      publishYear: 1997,
      pages: 223,
      language: "English",
    },
    {
      id: 104,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      category: "Fantasy",
      available: true,
      totalCopies: 4,
      availableCopies: 3,
      description:
        "An epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
      publishYear: 1954,
      pages: 1216,
      language: "English",
    },
    {
      id: 105,
      title: "Dune",
      author: "Frank Herbert",
      isbn: "9780441172719",
      category: "Science Fiction",
      available: true,
      totalCopies: 2,
      availableCopies: 1,
      description:
        "A science fiction novel about the desert planet Arrakis and the noble family atreides.",
      publishYear: 1965,
      pages: 688,
      language: "English",
    },
    {
      id: 106,
      title: "The Handmaid's Tale",
      author: "Margaret Atwood",
      isbn: "9780385490818",
      category: "Dystopian Fiction",
      available: true,
      totalCopies: 3,
      availableCopies: 2,
      description:
        "A dystopian novel set in a near-future New England, in a totalitarian state.",
      publishYear: 1985,
      pages: 311,
      language: "English",
    },
    {
      id: 107,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      isbn: "9780062316097",
      category: "Non-Fiction",
      available: true,
      totalCopies: 4,
      availableCopies: 3,
      description:
        "A book that explores the history of humankind from the Stone Age to the present.",
      publishYear: 2011,
      pages: 443,
      language: "English",
    },
    {
      id: 108,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      isbn: "9780857197689",
      category: "Finance",
      available: true,
      totalCopies: 2,
      availableCopies: 1,
      description:
        "Timeless lessons on wealth, greed, and happiness about the psychology of money.",
      publishYear: 2020,
      pages: 256,
      language: "English",
    },
  ],

  // User borrowing history
  borrowingHistory: [
    {
      id: 201,
      bookTitle: "The Alchemist",
      author: "Paulo Coelho",
      borrowDate: "2024-03-10",
      returnDate: "2024-03-24",
      actualReturnDate: "2024-03-22",
      status: "returned",
      wasOverdue: false,
    },
    {
      id: 202,
      bookTitle: "Atomic Habits",
      author: "James Clear",
      borrowDate: "2024-04-05",
      returnDate: "2024-04-19",
      actualReturnDate: "2024-04-21",
      status: "returned",
      wasOverdue: true,
    },
    {
      id: 203,
      bookTitle: "The Silent Patient",
      author: "Alex Michaelides",
      borrowDate: "2024-04-15",
      returnDate: "2024-04-29",
      actualReturnDate: "2024-04-28",
      status: "returned",
      wasOverdue: false,
    },
  ],

  // User preferences/settings
  userSettings: {
    defaultBorrowPeriod: 14, // days
    reminderDays: 3, // remind user 3 days before due date
    autoRenewEnabled: false,
    maxRenewals: 2,
    preferredCategories: ["Fiction", "Science Fiction", "Non-Fiction"],
    notificationsEnabled: true,
    emailReminders: true,
  },

  // Library information
  libraryInfo: {
    name: "Central City Library",
    address: "123 Main Street, Central City",
    phone: "+1 (555) 123-4567",
    email: "info@centralcitylibrary.com",
    openingHours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    maxBooksPerUser: 5,
    defaultLoanPeriod: 14,
    maxRenewals: 2,
    finePerDay: 0.5, // in dollars
  },
};
