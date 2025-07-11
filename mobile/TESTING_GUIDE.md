# Testing Guide for Granite Inventory Mobile App

## 🧪 Testing Options

### 1. **Web Browser Testing (Quickest)**
Test the app functionality in your web browser:

```bash
npm run web
```
This opens the app in your browser where you can test most functionality.

### 2. **Physical Device Testing (Recommended)**
Test on your actual phone or tablet:

1. **Install Expo Go**:
   - iOS: Download from App Store
   - Android: Download from Google Play Store

2. **Start the app**:
   ```bash
   npm start
   ```

3. **Scan QR Code**:
   - Use your camera app or Expo Go to scan the QR code
   - The app will load on your device

### 3. **Emulator Testing (Full Native Experience)**
Test using device simulators:

**For Android Emulator:**
```bash
npm run android
```

**For iOS Simulator (macOS only):**
```bash
npm run ios
```

## 🔧 Testing Scenarios

### **Authentication Testing**

1. **Login Screen**:
   - ✅ Check beautiful gradient background
   - ✅ Test form validation (empty fields)
   - ✅ Test login with mock credentials
   - ✅ Check loading state
   - ✅ Test password visibility toggle

**Mock Login Credentials:**
- Email: `test@example.com`
- Password: `password123`

### **Dashboard Testing**

1. **Statistics Cards**:
   - ✅ Check gradient cards display
   - ✅ Verify icons and numbers
   - ✅ Test pull-to-refresh
   - ✅ Check responsive layout

2. **Bundle Overview**:
   - ✅ Check color-coded status indicators
   - ✅ Test data display
   - ✅ Verify responsive design

3. **Quick Actions**:
   - ✅ Test navigation to different screens
   - ✅ Check button interactions

### **Navigation Testing**

1. **Drawer Menu**:
   - ✅ Test hamburger menu opening
   - ✅ Check user profile section
   - ✅ Test navigation to all screens
   - ✅ Verify logout functionality

2. **Screen Navigation**:
   - ✅ Test all menu items
   - ✅ Check back navigation
   - ✅ Verify screen transitions

### **Bundle Management Testing**

1. **Bundle List Screen**:
   - ✅ Test search functionality
   - ✅ Test status filtering
   - ✅ Check card layouts
   - ✅ Test pull-to-refresh
   - ✅ Test FAB (floating action button)

2. **Bundle Details**:
   - ✅ Check all bundle information display
   - ✅ Test action buttons (edit/delete)
   - ✅ Verify status color coding

## 📱 Device-Specific Testing

### **Phone Testing**
- Portrait orientation
- Touch interactions
- Swipe gestures
- Keyboard input

### **Tablet Testing**
- Landscape orientation
- Larger screen layouts
- Touch targets
- Content scaling

## 🔍 What to Look For

### **UI/UX Testing**

1. **Visual Elements**:
   - ✅ Beautiful gradient backgrounds
   - ✅ Consistent colors and typography
   - ✅ Proper spacing and alignment
   - ✅ Material Design components

2. **Interactions**:
   - ✅ Smooth animations
   - ✅ Touch feedback
   - ✅ Loading states
   - ✅ Error handling

3. **Responsiveness**:
   - ✅ Adapts to different screen sizes
   - ✅ Proper text scaling
   - ✅ Touch-friendly buttons
   - ✅ Readable content

### **Functionality Testing**

1. **Core Features**:
   - ✅ Authentication flow
   - ✅ Dashboard data display
   - ✅ Navigation system
   - ✅ Search and filtering

2. **API Integration**:
   - ✅ Mock data displays correctly
   - ✅ Loading states work
   - ✅ Error handling
   - ✅ Network requests

## 🐛 Common Issues & Solutions

### **Installation Issues**

**Issue**: Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

**Issue**: Metro bundler cache
```bash
# Clear Metro cache
npx expo start --clear
```

### **Runtime Issues**

**Issue**: App crashes on startup
- Check terminal for error messages
- Ensure all imports are correct
- Clear cache and restart

**Issue**: Navigation not working
- Check if all screen components exist
- Verify route names match

**Issue**: API connection fails
- Check backend server is running
- Verify API URL in `src/services/api.ts`
- Check network connectivity

## 📊 Test Results Checklist

### ✅ **Authentication**
- [ ] Login screen displays correctly
- [ ] Form validation works
- [ ] Loading states appear
- [ ] Error messages show
- [ ] Navigation after login works

### ✅ **Dashboard**
- [ ] Statistics cards display
- [ ] Gradients and colors correct
- [ ] Pull-to-refresh works
- [ ] Quick actions navigate
- [ ] Bundle overview shows

### ✅ **Navigation**
- [ ] Drawer menu opens/closes
- [ ] All menu items work
- [ ] User profile displays
- [ ] Logout functionality works
- [ ] Screen transitions smooth

### ✅ **Bundle Management**
- [ ] List screen loads
- [ ] Search functionality works
- [ ] Filtering by status works
- [ ] Cards display properly
- [ ] Actions buttons work

### ✅ **UI/UX**
- [ ] Beautiful design
- [ ] Consistent theming
- [ ] Touch-friendly interface
- [ ] Responsive layout
- [ ] Smooth animations

### ✅ **Performance**
- [ ] Fast loading times
- [ ] Smooth scrolling
- [ ] No lag in navigation
- [ ] Efficient memory usage

## 🚀 Advanced Testing

### **Testing with Backend**

1. **Start Backend Server**:
   ```bash
   cd ../server
   npm install
   npm start
   ```

2. **Update API URL** in `mobile/src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'http://your-ip:5000/api';
   ```

3. **Test Real Data**:
   - Login with real credentials
   - Test CRUD operations
   - Verify data synchronization

### **Performance Testing**

1. **Use React Native Debugger**
2. **Monitor network requests**
3. **Check memory usage**
4. **Test on low-end devices**

## 📱 Testing on Different Devices

### **Recommended Test Devices**

1. **Small Phone** (iPhone SE, small Android)
2. **Large Phone** (iPhone Pro Max, large Android)
3. **Tablet** (iPad, Android tablet)
4. **Different OS Versions**

### **Screen Sizes to Test**
- 320px (small phone)
- 375px (standard phone)
- 414px (large phone)
- 768px+ (tablet)

## 🎯 Testing Priorities

### **High Priority**
1. Authentication flow
2. Navigation system
3. Dashboard display
4. Core functionality

### **Medium Priority**
1. Search and filtering
2. Form interactions
3. Error handling
4. Performance

### **Low Priority**
1. Edge cases
2. Advanced features
3. Accessibility
4. Offline functionality

## 📋 Bug Reporting

When reporting bugs, include:
1. Device type and OS version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots or screen recordings
5. Console error messages

---

**Happy Testing! 🚀**

The mobile app is designed to be intuitive and user-friendly. Most testing can be done quickly in a web browser, but testing on actual devices provides the best experience evaluation.