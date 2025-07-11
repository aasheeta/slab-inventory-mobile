# Granite Inventory Mobile App Setup

## Overview

Your granite inventory management system now includes a React Native mobile app that provides the same functionality as your web application, optimized for mobile devices.

## Project Structure

```
granite-inventory/
├── server/          # Backend API (Node.js/Express)
├── slab/           # Web Frontend (React)
└── mobile/         # Mobile App (React Native/Expo) 📱 NEW!
```

## Quick Start

### 1. Start the Backend Server
```bash
cd server
npm install
npm start
```

### 2. Start the Mobile App
```bash
cd mobile
npm install
npm start
```

### 3. Run on Your Device
- **Physical Device**: Install Expo Go app and scan the QR code
- **Android Emulator**: Press `a` in the terminal
- **iOS Simulator**: Press `i` in the terminal (macOS only)

## Key Features

✅ **Same Functionality**: All features from the web app
✅ **Beautiful UI**: Material Design with React Native Paper
✅ **Responsive**: Works on phones and tablets
✅ **Fast**: Optimized for mobile performance
✅ **Offline Ready**: Basic offline functionality
✅ **Navigation**: Intuitive drawer navigation

## Mobile-Specific Features

- **Touch-Optimized**: Designed for touch interactions
- **Pull-to-Refresh**: Refresh data by pulling down
- **Swipe Navigation**: Easy navigation between screens
- **Mobile Alerts**: Native mobile notifications
- **Camera Integration**: Ready for future barcode scanning
- **Responsive Design**: Adapts to different screen sizes

## Development

The mobile app is built with:
- **React Native** + **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Paper** for UI components
- **Context API** for state management

## API Integration

The mobile app connects to the same backend API as your web application:
- Authentication endpoints
- Bundle management
- Material management
- Supplier management
- Block management
- Order management

## Next Steps

1. **Install Dependencies**: Follow the setup guide in `mobile/README.md`
2. **Configure API**: Update the API URL in the mobile app
3. **Test**: Run the app and test all features
4. **Customize**: Adjust colors and branding to match your needs
5. **Deploy**: Build for production when ready

For detailed setup instructions, see `mobile/README.md`.

---

**Note**: The mobile app requires the backend server to be running. Make sure to start the server before running the mobile app.