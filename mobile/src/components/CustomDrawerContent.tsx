import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  Avatar,
  Text,
  Divider,
  Surface,
  IconButton,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, fontSize } from '../utils/theme';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  category?: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'home-outline', route: 'Dashboard' },
    { label: 'Bundle List', icon: 'cube-outline', route: 'Bundle List', category: 'Inventory' },
    { label: 'Add Bundle', icon: 'add-circle-outline', route: 'Add Bundle', category: 'Inventory' },
    { label: 'Material List', icon: 'layers-outline', route: 'Material List', category: 'Materials' },
    { label: 'Add Material', icon: 'add-outline', route: 'Add Material', category: 'Materials' },
    { label: 'Supplier List', icon: 'people-outline', route: 'Supplier List', category: 'Suppliers' },
    { label: 'Add Supplier', icon: 'person-add-outline', route: 'Add Supplier', category: 'Suppliers' },
    { label: 'Block List', icon: 'grid-outline', route: 'Block List', category: 'Blocks' },
    { label: 'Add Block', icon: 'add-circle-outline', route: 'Add Block', category: 'Blocks' },
    { label: 'Order List', icon: 'list-outline', route: 'Order List', category: 'Orders' },
    { label: 'Add Order', icon: 'add-outline', route: 'Add Order', category: 'Orders' },
  ];

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const renderMenuItem = (item: MenuItem) => {
    const isActive = props.state.routeNames[props.state.index] === item.route;
    
    return (
      <TouchableOpacity
        key={item.route}
        style={[
          styles.menuItem,
          isActive && styles.activeMenuItem,
        ]}
        onPress={() => props.navigation.navigate(item.route)}
      >
        <Ionicons
          name={item.icon as any}
          size={24}
          color={isActive ? colors.primary : colors.textSecondary}
        />
        <Text
          style={[
            styles.menuText,
            isActive && styles.activeMenuText,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <Surface style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={60}
              label={user?.name?.charAt(0) || 'U'}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>
          </View>
        </Surface>

        <Divider style={styles.divider} />

        {/* Navigation Menu */}
        <View style={styles.menuContainer}>
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <View key={category} style={styles.categoryContainer}>
              {category !== 'General' && (
                <Text style={styles.categoryHeader}>{category}</Text>
              )}
              {items.map(renderMenuItem)}
            </View>
          ))}
        </View>

        <Divider style={styles.divider} />

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>Need Help?</Text>
          <Text style={styles.helpSubtext}>Contact your administrator</Text>
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <Surface style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileSection: {
    margin: spacing.md,
    borderRadius: 12,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  profileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  divider: {
    marginVertical: spacing.md,
  },
  menuContainer: {
    paddingHorizontal: spacing.md,
  },
  categoryContainer: {
    marginBottom: spacing.lg,
  },
  categoryHeader: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    marginVertical: spacing.xs,
  },
  activeMenuItem: {
    backgroundColor: `${colors.primary}15`,
  },
  menuText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginLeft: spacing.md,
  },
  activeMenuText: {
    color: colors.primary,
    fontWeight: '600',
  },
  helpSection: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  helpText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  helpSubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  logoutText: {
    fontSize: fontSize.md,
    color: colors.error,
    marginLeft: spacing.md,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;