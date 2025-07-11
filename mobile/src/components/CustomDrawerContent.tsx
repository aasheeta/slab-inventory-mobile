import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
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
    { label: 'Dashboard', icon: '🏠', route: 'Dashboard' },
    { label: 'Bundle List', icon: '📦', route: 'Bundle List', category: 'Inventory' },
    { label: 'Add Bundle', icon: '➕', route: 'Add Bundle', category: 'Inventory' },
    { label: 'Material List', icon: '📋', route: 'Material List', category: 'Materials' },
    { label: 'Add Material', icon: '➕', route: 'Add Material', category: 'Materials' },
    { label: 'Supplier List', icon: '👥', route: 'Supplier List', category: 'Suppliers' },
    { label: 'Add Supplier', icon: '👤', route: 'Add Supplier', category: 'Suppliers' },
    { label: 'Block List', icon: '🧱', route: 'Block List', category: 'Blocks' },
    { label: 'Add Block', icon: '➕', route: 'Add Block', category: 'Blocks' },
    { label: 'Order List', icon: '📝', route: 'Order List', category: 'Orders' },
    { label: 'Add Order', icon: '➕', route: 'Add Order', category: 'Orders' },
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
        <Text style={styles.menuIcon}>{item.icon}</Text>
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
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

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

        <View style={styles.divider} />

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>❓ Need Help?</Text>
          <Text style={styles.helpSubtext}>Contact your administrator</Text>
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.onPrimary,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
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
    height: 1,
    backgroundColor: colors.border,
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
  menuIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing.md,
  },
  menuText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
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
    backgroundColor: colors.surface,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  logoutIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing.md,
  },
  logoutText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;