import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import BundleListScreen from './src/screens/BundleListScreen';
import BundleRegisterScreen from './src/screens/BundleRegisterScreen';
import MaterialListScreen from './src/screens/MaterialListScreen';
import MaterialRegisterScreen from './src/screens/MaterialRegisterScreen';
import SupplierListScreen from './src/screens/SupplierListScreen';
import SupplierRegisterScreen from './src/screens/SupplierRegisterScreen';
import OrderListScreen from './src/screens/OrderListScreen';
import OrderRegisterScreen from './src/screens/OrderRegisterScreen';
import BlockListScreen from './src/screens/BlockListScreen';
import BlockRegisterScreen from './src/screens/BlockRegisterScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Materials') {
            iconName = focused ? 'layers' : 'layers-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Tab.Screen name="Inventory" component={InventoryStackNavigator} />
      <Tab.Screen name="Materials" component={MaterialStackNavigator} />
      <Tab.Screen name="Orders" component={OrderStackNavigator} />
      <Tab.Screen name="More" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
};

const DashboardStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="DashboardMain" component={DashboardScreen} options={{ title: 'Dashboard' }} />
  </Stack.Navigator>
);

const InventoryStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="BundleList" component={BundleListScreen} options={{ title: 'Bundles' }} />
    <Stack.Screen name="BundleRegister" component={BundleRegisterScreen} options={{ title: 'Register Bundle' }} />
    <Stack.Screen name="BlockList" component={BlockListScreen} options={{ title: 'Blocks' }} />
    <Stack.Screen name="BlockRegister" component={BlockRegisterScreen} options={{ title: 'Register Block' }} />
  </Stack.Navigator>
);

const MaterialStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="MaterialList" component={MaterialListScreen} options={{ title: 'Materials' }} />
    <Stack.Screen name="MaterialRegister" component={MaterialRegisterScreen} options={{ title: 'Register Material' }} />
    <Stack.Screen name="SupplierList" component={SupplierListScreen} options={{ title: 'Suppliers' }} />
    <Stack.Screen name="SupplierRegister" component={SupplierRegisterScreen} options={{ title: 'Register Supplier' }} />
  </Stack.Navigator>
);

const OrderStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="OrderList" component={OrderListScreen} options={{ title: 'Orders' }} />
    <Stack.Screen name="OrderRegister" component={OrderRegisterScreen} options={{ title: 'New Order' }} />
  </Stack.Navigator>
);

const MoreStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
