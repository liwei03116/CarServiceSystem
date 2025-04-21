# 🚗 Car Service System – Mobile Admin

**Mobile administration app** for the Car Service System, enabling administrators to manage service requests, oversee operations, and interact with customers directly from a mobile device.

---

## 📱 Features

- **Service Request Management**: View, filter, and update customer service requests.
- **Customer Profiles**: Access detailed customer information and service history.
- **Real-time Notifications**: Get push notifications on status changes and new requests.
- **Analytics Dashboard**: Monitor key metrics such as pending requests, completion rates, and average handling time.
- **Offline Support**: Cache recent data for basic offline viewing and queue updates when back online.

---

## 🛠️ Technology Stack

- **React Native**: Cross-platform mobile framework.
- **Redux**: Centralized state management.
- **Axios**: HTTP client for API integration.
- **React Navigation**: Navigation and screen management.
- **@react-native-async-storage/async-storage**: Local storage for caching and offline support.

---

## 📂 Project Structure

```plaintext
mobileAdmin/
├── android/            # Android-specific configuration
├── ios/                # iOS-specific configuration
├── src/
│   ├── api/            # API service modules (axios calls)
│   ├── assets/         # Images, fonts, icons
│   ├── components/     # Reusable UI components
│   ├── navigation/     # Navigation stacks and config
│   ├── redux/          # Actions, reducers, store configuration
│   ├── screens/        # Feature screens (Dashboard, Requests, Profile)
│   ├── utils/          # Utility functions and constants
│   └── App.js          # Root component and provider setup
├── .env                # Environment variables (excluded from VCS)
├── .gitignore          # Files and folders to ignore in Git
├── app.json            # Expo/React Native app configuration
├── index.js            # App registry for React Native
├── babel.config.js     # Babel configuration
├── package.json        # Project metadata and dependencies
└── README.md           # This documentation file

🚀 Getting Started

Prerequisites

Node.js v14 or higher

npm v6+ or Yarn

React Native CLI

Android Studio (with SDK) or Xcode

Installation Steps

Clone the repository

git clone https://github.com/liwei03116/CarServiceSystem.git
cd CarServiceSystem/mobileAdmin

Install dependencies

npm install
# or
yarn install

Configure environment

Copy the example env file:

cp .env.example .env

Edit .env to set:

API_BASE_URL=https://your.api.endpoint

Run on Android

npx react-native run-android

Run on iOS

npx pod-install ios
npx react-native run-ios

🧪 Testing

Coming soon: integration with Jest and React Native Testing Library.

🚧 Deployment

Build a release APK (Android):

cd android && ./gradlew assembleRelease

Archive for iOS (Xcode or CLI):

Open ios/MobileAdmin.xcworkspace in Xcode, select Generic iOS Device, then Product → Archive.