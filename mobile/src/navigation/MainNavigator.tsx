import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import BundleListScreen from '../screens/bundles/BundleListScreen';
import BundleRegisterScreen from '../screens/bundles/BundleRegisterScreen';
import MaterialListScreen from '../screens/materials/MaterialListScreen';
import MaterialRegisterScreen from '../screens/materials/MaterialRegisterScreen';
import SupplierListScreen from '../screens/suppliers/SupplierListScreen';
import SupplierRegisterScreen from '../screens/suppliers/SupplierRegisterScreen';
import BlockListScreen from '../screens/blocks/BlockListScreen';
import BlockRegisterScreen from '../screens/blocks/BlockRegisterScreen';
import OrderListScreen from '../screens/orders/OrderListScreen';
import OrderRegisterScreen from '../screens/orders/OrderRegisterScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#2E7D32',
        drawerInactiveTintColor: '#757575',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bundle List"
        component={BundleListScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cube-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Bundle"
        component={BundleRegisterScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Material List"
        component={MaterialListScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="layers-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Material"
        component={MaterialRegisterScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="add-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Supplier List"
        component={SupplierListScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Supplier"
        component={SupplierRegisterScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-add-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Block List"
        component={BlockListScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Block"
        component={BlockRegisterScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Order List"
        component={OrderListScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Order"
        component={OrderRegisterScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="add-outline" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;