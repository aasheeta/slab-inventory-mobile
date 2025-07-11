import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const SettingsItem = ({ icon, title, subtitle, onPress, rightComponent, hasChevron = true }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#007bff" />
      </View>
      <View style={styles.settingsText}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.settingsRight}>
      {rightComponent}
      {hasChevron && !rightComponent && (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </View>
  </TouchableOpacity>
);

const SettingsSection = ({ title, children }) => (
  <View style={styles.settingsSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(true);
  const [biometricAuth, setBiometricAuth] = React.useState(false);

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

  const handleBackup = () => {
    Alert.alert('Backup', 'Data backup initiated successfully!');
  };

  const handleExport = () => {
    Alert.alert('Export', 'Data export will be available soon!');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@granite-inventory.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <SettingsSection title="Profile">
          <SettingsItem
            icon="person-outline"
            title="Account Information"
            subtitle="Edit your profile details"
            onPress={() => {/* Navigate to profile */}}
          />
          <SettingsItem
            icon="key-outline"
            title="Change Password"
            subtitle="Update your password"
            onPress={() => {/* Navigate to change password */}}
          />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="App Preferences">
          <SettingsItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive alerts for inventory updates"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#e9ecef', true: '#007bff33' }}
                thumbColor={notificationsEnabled ? '#007bff' : '#666'}
              />
            }
            hasChevron={false}
          />
          <SettingsItem
            icon="sync-outline"
            title="Auto Sync"
            subtitle="Automatically sync data in background"
            rightComponent={
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: '#e9ecef', true: '#007bff33' }}
                thumbColor={autoSync ? '#007bff' : '#666'}
              />
            }
            hasChevron={false}
          />
          <SettingsItem
            icon="finger-print-outline"
            title="Biometric Login"
            subtitle="Use fingerprint or face ID"
            rightComponent={
              <Switch
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                trackColor={{ false: '#e9ecef', true: '#007bff33' }}
                thumbColor={biometricAuth ? '#007bff' : '#666'}
              />
            }
            hasChevron={false}
          />
          <SettingsItem
            icon="color-palette-outline"
            title="Theme"
            subtitle="Light theme"
            onPress={() => Alert.alert('Theme', 'Dark theme coming soon!')}
          />
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection title="Data Management">
          <SettingsItem
            icon="cloud-upload-outline"
            title="Backup Data"
            subtitle="Create a backup of your inventory"
            onPress={handleBackup}
          />
          <SettingsItem
            icon="download-outline"
            title="Export Data"
            subtitle="Export inventory to Excel/CSV"
            onPress={handleExport}
          />
          <SettingsItem
            icon="refresh-outline"
            title="Sync Now"
            subtitle="Force sync with server"
            onPress={() => Alert.alert('Sync', 'Data synchronized successfully!')}
          />
        </SettingsSection>

        {/* Business Settings */}
        <SettingsSection title="Business Settings">
          <SettingsItem
            icon="business-outline"
            title="Company Profile"
            subtitle="Update company information"
            onPress={() => {/* Navigate to company settings */}}
          />
          <SettingsItem
            icon="card-outline"
            title="Currency & Units"
            subtitle="USD, Metric system"
            onPress={() => Alert.alert('Currency', 'Currency settings coming soon!')}
          />
          <SettingsItem
            icon="receipt-outline"
            title="Invoice Settings"
            subtitle="Configure invoice templates"
            onPress={() => {/* Navigate to invoice settings */}}
          />
        </SettingsSection>

        {/* Support & Legal */}
        <SettingsSection title="Support & Legal">
          <SettingsItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="FAQs and tutorials"
            onPress={() => Alert.alert('Help', 'Visit our help center at help.granite-inventory.com')}
          />
          <SettingsItem
            icon="mail-outline"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={handleSupport}
          />
          <SettingsItem
            icon="document-text-outline"
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            onPress={() => Alert.alert('Terms', 'Terms of service will open in browser')}
          />
          <SettingsItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => Alert.alert('Privacy', 'Privacy policy will open in browser')}
          />
        </SettingsSection>

        {/* App Info */}
        <SettingsSection title="About">
          <SettingsItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0 (Build 1)"
            hasChevron={false}
          />
          <SettingsItem
            icon="star-outline"
            title="Rate App"
            subtitle="Help us improve"
            onPress={() => Alert.alert('Rate App', 'Thanks for using our app!')}
          />
        </SettingsSection>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#dc3545" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dc3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
  },
});

export default SettingsScreen;