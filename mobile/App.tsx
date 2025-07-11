import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

// Conditionally import React Native Paper only for native platforms
let PaperProvider: any = ({ children }: { children: React.ReactNode }) => <>{children}</>;

if (Platform.OS !== 'web') {
  try {
    const { Provider } = require('react-native-paper');
    const { theme } = require('./src/utils/theme');
    PaperProvider = ({ children }: { children: React.ReactNode }) => (
      <Provider theme={theme}>{children}</Provider>
    );
  } catch (error) {
    console.warn('React Native Paper not available for web');
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}