# Mobile Granite Inventory App

A comprehensive React Native mobile application for managing granite inventory, suppliers, orders, and business operations. This app provides a user-friendly mobile interface for granite businesses to track materials, bundles, blocks, and customer orders.

## 🚀 Features

### 📊 Dashboard
- **Real-time Statistics**: View key metrics like total visits, orders, and customers
- **Bundle Status Overview**: Track available, on-hold, sold, reserved, and returned bundles
- **Top Sellers**: Monitor best-selling materials
- **Quick Actions**: Fast access to common tasks

### 📦 Inventory Management
- **Bundle Management**: Register, track, and manage granite bundles with detailed specifications
- **Block Management**: Handle raw stone blocks with dimensions, weight, and processing status
- **Material Catalog**: Maintain comprehensive material database with types, colors, and finishes
- **Stock Tracking**: Monitor inventory levels with low-stock alerts

### 👥 Supplier Management
- **Supplier Database**: Store complete supplier information including contact details
- **Performance Tracking**: Monitor supplier performance and material counts
- **Communication Tools**: Direct contact integration for suppliers

### 📋 Order Management
- **Order Creation**: Create detailed customer orders with priority levels
- **Order Tracking**: Monitor order status from quote to completion
- **Customer Management**: Store customer information and project details
- **Priority System**: Manage orders with high, medium, and low priority levels

### ⚙️ Settings & Configuration
- **User Preferences**: Customize notifications, sync settings, and app behavior
- **Data Management**: Backup, export, and sync capabilities
- **Business Settings**: Configure company profile, currency, and invoice templates
- **Security**: Biometric authentication and password management

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper + Custom Components
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **Styling**: StyleSheet with responsive design

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android
- ✅ Web (via Expo Web)

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile-granite-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

## 📱 Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: admin@granite.com
- **Password**: password

## 🎨 Design Philosophy

### Mobile-First Design
- **Touch-Optimized**: Large tap targets and gesture-friendly interface
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Material Design**: Following modern mobile design principles

### User Experience
- **Intuitive Navigation**: Bottom tab navigation with clear categorization
- **Quick Actions**: Easy access to frequently used features
- **Visual Feedback**: Loading states, animations, and status indicators
- **Offline Support**: Core functionality works without internet connection

### Performance
- **Optimized Lists**: Efficient rendering of large datasets
- **Image Optimization**: Compressed and cached images
- **Memory Management**: Proper cleanup and resource management

## 📁 Project Structure

```
mobile-granite-inventory/
├── src/
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.js # Authentication state management
│   ├── screens/           # Main app screens
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── BundleListScreen.js
│   │   ├── BundleRegisterScreen.js
│   │   ├── MaterialListScreen.js
│   │   ├── MaterialRegisterScreen.js
│   │   ├── SupplierListScreen.js
│   │   ├── SupplierRegisterScreen.js
│   │   ├── OrderListScreen.js
│   │   ├── OrderRegisterScreen.js
│   │   ├── BlockListScreen.js
│   │   ├── BlockRegisterScreen.js
│   │   └── SettingsScreen.js
│   ├── components/        # Reusable components
│   ├── services/          # API and business logic
│   └── styles/            # Shared styles and themes
├── App.js                 # Root component with navigation
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
API_BASE_URL=https://your-api-endpoint.com
ENABLE_ANALYTICS=true
```

### API Integration
The app is designed to work with a REST API. Update the API endpoints in `src/services/` to connect to your backend:
- Authentication endpoints
- Inventory management APIs
- Order processing APIs
- Supplier management APIs

## 🚀 Deployment

### Expo Managed Workflow
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Publish updates
expo publish
```

### Standalone Apps
```bash
# Create production builds
expo build:ios --type app-store
expo build:android --type app-bundle
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📋 TODO / Roadmap

- [ ] **Offline Sync**: Complete offline data synchronization
- [ ] **Camera Integration**: QR code scanning for inventory
- [ ] **Push Notifications**: Real-time alerts for important events
- [ ] **Analytics Dashboard**: Advanced reporting and analytics
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Dark Mode**: Complete dark theme implementation
- [ ] **Advanced Filters**: More sophisticated filtering options
- [ ] **Export Features**: PDF generation and report exports

## 🐛 Known Issues

- Switch components in Settings may need platform-specific styling
- Large image uploads might require optimization
- Some animations may need performance tuning on older devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@granite-inventory.com or create an issue in the repository.

## 🙏 Acknowledgments

- React Native and Expo teams for the excellent development platform
- Material Design team for design inspiration
- Open source community for various libraries and tools used

---

**Built with ❤️ for the granite industry**