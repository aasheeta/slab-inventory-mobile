# Granite Inventory Mobile App

A React Native mobile application for granite inventory management, built with Expo and TypeScript. This app provides the same functionality as the web application but optimized for mobile devices with a beautiful and intuitive user interface.

## Features

- **Authentication**: Secure login with JWT tokens
- **Dashboard**: Overview of inventory statistics and metrics
- **Inventory Management**: 
  - Bundle management (list, add, edit, delete)
  - Material management
  - Supplier management
  - Block management
  - Order management
- **Modern UI**: Built with React Native Paper for consistent Material Design
- **Navigation**: Drawer navigation for easy access to all features
- **Responsive Design**: Optimized for both phones and tablets
- **Offline Support**: Basic offline functionality (future enhancement)

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation 6** for navigation
- **React Native Paper** for UI components
- **Expo Linear Gradient** for beautiful gradients
- **Axios** for API communication
- **Context API** for state management

## Prerequisites

Before setting up the mobile app, ensure you have:

1. **Node.js** (version 16 or higher)
2. **npm** or **yarn**
3. **Expo CLI**: Install globally with `npm install -g @expo/cli`
4. **Backend Server**: The server from the `../server` directory should be running
5. **Mobile Device** or **Emulator**:
   - For iOS: Xcode Simulator (macOS only)
   - For Android: Android Studio with Android Emulator
   - Physical device with Expo Go app installed

## Installation

1. **Navigate to the mobile directory**:
   ```bash
   cd mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure the API endpoint**:
   Open `src/services/api.ts` and update the `API_BASE_URL` to match your backend server:
   ```typescript
   const API_BASE_URL = 'http://your-server-ip:5000/api';
   ```

   **Important**: 
   - For Android Emulator: Use `http://10.0.2.2:5000/api`
   - For iOS Simulator: Use `http://localhost:5000/api`
   - For Physical Device: Use your computer's IP address, e.g., `http://192.168.1.100:5000/api`

## Running the App

1. **Start the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on specific platform**:
   ```bash
   # For iOS Simulator (macOS only)
   npm run ios
   
   # For Android Emulator
   npm run android
   
   # For web browser (for testing)
   npm run web
   ```

3. **Using Expo Go** (Physical Device):
   - Install Expo Go from App Store (iOS) or Google Play Store (Android)
   - Scan the QR code displayed in the terminal
   - The app will load on your device

## Project Structure

```
mobile/
├── src/
│   ├── components/           # Reusable UI components
│   │   └── CustomDrawerContent.tsx
│   ├── contexts/            # React contexts for state management
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── ThemeContext.tsx # Theme configuration
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx     # Main app navigator
│   │   ├── AuthNavigator.tsx    # Authentication flow
│   │   └── MainNavigator.tsx    # Main app screens
│   ├── screens/             # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── dashboard/      # Dashboard screen
│   │   ├── bundles/        # Bundle management screens
│   │   ├── materials/      # Material management screens
│   │   ├── suppliers/      # Supplier management screens
│   │   ├── blocks/         # Block management screens
│   │   └── orders/         # Order management screens
│   ├── services/           # API and external services
│   │   └── api.ts          # Backend API integration
│   ├── utils/              # Utility functions and constants
│   │   └── theme.ts        # Theme configuration
│   └── types/              # TypeScript type definitions
├── assets/                 # Images, fonts, and other assets
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Configuration

### API Configuration

Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url:5000/api';
```

### Theme Customization

Modify colors and styling in `src/utils/theme.ts`:

```typescript
export const colors = {
  primary: '#2E7D32',      // Main brand color
  secondary: '#FF6F00',    // Secondary accent color
  background: '#F5F5F5',   // App background
  // ... other colors
};
```

## API Integration

The app communicates with the backend server through the following endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/bundles` - Fetch bundles
- `POST /api/bundles` - Create bundle
- `PUT /api/bundles/:id` - Update bundle
- `DELETE /api/bundles/:id` - Delete bundle
- Similar endpoints for materials, suppliers, blocks, and orders

## Features in Detail

### Authentication
- Secure login with email and password
- JWT token storage and management
- Automatic logout on token expiration

### Dashboard
- Real-time statistics and metrics
- Quick action buttons for common tasks
- Bundle status overview
- Top-selling materials display

### Inventory Management
- **Bundles**: Complete CRUD operations with search and filtering
- **Materials**: Material catalog management
- **Suppliers**: Supplier information and contact management
- **Blocks**: Raw block inventory tracking
- **Orders**: Order processing and status tracking

### UI/UX Features
- Material Design components
- Smooth animations and transitions
- Pull-to-refresh functionality
- Loading states and error handling
- Responsive design for different screen sizes

## Development

### Adding New Screens

1. Create a new screen component in the appropriate directory under `src/screens/`
2. Add navigation route in `src/navigation/MainNavigator.tsx`
3. Update the drawer menu in `src/components/CustomDrawerContent.tsx`

### Adding New API Endpoints

1. Add the API function in `src/services/api.ts`
2. Use the function in your screen components
3. Handle loading states and error cases

### Styling Guidelines

- Use the predefined colors from `src/utils/theme.ts`
- Follow the spacing system defined in the theme
- Use React Native Paper components for consistency
- Implement responsive design for different screen sizes

## Building for Production

### Android APK

1. **Configure app signing**:
   ```bash
   expo build:android
   ```

2. **Generate APK**:
   ```bash
   expo build:android -t apk
   ```

### iOS IPA

1. **Configure certificates** (requires Apple Developer account):
   ```bash
   expo build:ios
   ```

### App Store Deployment

1. **Build for production**:
   ```bash
   expo build:android -t app-bundle  # For Google Play Store
   expo build:ios -t archive         # For Apple App Store
   ```

2. **Submit to stores** using Expo's automated submission or manual upload

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**:
   ```bash
   npx expo start --clear
   ```

2. **Node modules issues**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Network request failed**:
   - Check if backend server is running
   - Verify API_BASE_URL is correct
   - Ensure device/emulator can reach the server

4. **Authentication issues**:
   - Verify backend authentication endpoints
   - Check token storage and retrieval
   - Ensure proper error handling

### Development Tips

- Use React Native Debugger for debugging
- Enable remote debugging in development
- Test on both iOS and Android platforms
- Use TypeScript for better code quality
- Follow React Native best practices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both platforms
5. Submit a pull request

## License

This project is part of the Granite Inventory Management System.

## Support

For issues and support:
1. Check the troubleshooting section
2. Review the backend server setup
3. Ensure all dependencies are correctly installed
4. Verify network connectivity between mobile app and backend

---

**Note**: This mobile app is designed to work with the existing backend server. Make sure the server is running and accessible before starting the mobile app development.