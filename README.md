# BookHub 📚

**Smart Library Management System**

Transform how you manage books with our intelligent platform. Perfect for libraries, bookstores, and personal collections.

## ✨ Features

- **📚 Complete Collection Management** - Organize your entire book collection with ease
- **⏰ Borrowing Tracker** - Track borrowings and return dates efficiently  
- **🔍 Smart Search** - Quick search functionality with intelligent filters
- **📱 Mobile-First Design** - Beautiful, responsive interface built with React Native
- **🎨 Modern UI/UX** - Clean, intuitive design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js
- Expo CLI
- Expo Go app (for quick testing) OR Xcode/Android Studio (for full build)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Florien2208/book-hub.git
   cd bookhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app**

   **Expo Go (Quick):**
   ```bash
   npx expo start
   ```
   Scan QR code with Expo Go app

   **Development Build (Full features):**
   ```bash
   npx expo run:ios    # or run:android
   ```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: Custom components with React Native
- **State Management**: React Hooks
- **Platform**: iOS & Android

## 📱 App Structure

```
bookhub/
├── app/
│   ├── (auth)/
│   │   └── sign-up.tsx
│   ├── (tabs)/
│   └── Home.tsx
├── assets/
│   └── images/
├── constants/
│   └── Colors.ts
└── components/
```


### Authentication
- User registration and login
- Secure authentication flow

### Main Application
- Tab-based navigation
- Library management interface
- Book search and filtering

## 📋 Core Functionality

### Borrowing System
- Track who borrowed which books
- Set and monitor return dates
- Send reminders for overdue books
- Maintain borrowing history

### Search & Filter
- Quick search by title, author, or ISBN
- Advanced filtering options
- Sort by various criteria
- Export search results

## 🔧 Configuration

The app uses a color system defined in `constants/Colors.ts`. You can customize the theme by modifying the color values:

```typescript



## 🙏 Acknowledgments

- Built with ❤️ using React Native and Expo
- Icons and emojis from various open-source projects
- Inspired by modern library management needs
