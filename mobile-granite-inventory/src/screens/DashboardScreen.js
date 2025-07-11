import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const StatCard = ({ icon, title, value, color, onPress }) => (
  <TouchableOpacity style={[styles.statCard, { backgroundColor: color }]} onPress={onPress}>
    <Ionicons name={icon} size={28} color="#fff" style={styles.statIcon} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </TouchableOpacity>
);

const BundleStatusCard = ({ status, count, color }) => (
  <View style={[styles.bundleCard, { backgroundColor: color }]}>
    <Text style={styles.bundleCount}>{count}</Text>
    <Text style={styles.bundleStatus}>{status}</Text>
  </View>
);

const TopSellerCard = ({ material, index }) => (
  <View style={styles.sellerCard}>
    <View style={styles.sellerRank}>
      <Text style={styles.rankNumber}>{index + 1}</Text>
    </View>
    <Text style={styles.sellerName}>{material}</Text>
  </View>
);

const DashboardScreen = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const statsData = [
    { icon: 'trending-up', title: 'Total Visits\n/ Month', value: '12,000', color: '#6f42c1' },
    { icon: 'cart', title: 'Orders\n/ Month', value: '350', color: '#fd7e14' },
    { icon: 'person-add', title: 'New\nCustomers', value: '120', color: '#007bff' },
    { icon: 'receipt', title: 'New\nOrders', value: '90', color: '#28a745' },
  ];

  const bundleData = [
    { status: 'Available', count: 542, color: '#28a745' },
    { status: 'On Hold', count: 132, color: '#ffc107' },
    { status: 'Sold', count: 93, color: '#dc3545' },
    { status: 'Reserved', count: 18, color: '#17a2b8' },
    { status: 'Returned', count: 15, color: '#6c757d' },
  ];

  const topSellers = ['Granite X Premium', 'Quartz Elegant', 'Marble Classic'];
  const stockMaterials = ['Granite X', 'Quartz Y', 'Marble Z'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistics Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                color={stat.color}
                onPress={() => {/* Handle navigation */}}
              />
            ))}
          </View>
        </View>

        {/* Bundle Status Panel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bundle Status</Text>
          <View style={styles.bundleGrid}>
            {bundleData.map((bundle, index) => (
              <BundleStatusCard
                key={index}
                status={bundle.status}
                count={bundle.count}
                color={bundle.color}
              />
            ))}
          </View>
        </View>

        {/* Top Sellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Best Sellers</Text>
          <View style={styles.sellersContainer}>
            {topSellers.map((material, index) => (
              <TopSellerCard key={index} material={material} index={index} />
            ))}
          </View>
        </View>

        {/* Stock Materials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Materials in Stock</Text>
          <View style={styles.stockContainer}>
            {stockMaterials.map((material, index) => (
              <View key={index} style={styles.stockItem}>
                <Ionicons name="cube-outline" size={20} color="#007bff" />
                <Text style={styles.stockText}>{material}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Inventory', { screen: 'BundleRegister' })}
            >
              <Ionicons name="add-circle-outline" size={32} color="#007bff" />
              <Text style={styles.quickActionText}>Add Bundle</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Materials', { screen: 'MaterialRegister' })}
            >
              <Ionicons name="layers-outline" size={32} color="#28a745" />
              <Text style={styles.quickActionText}>Add Material</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Orders', { screen: 'OrderRegister' })}
            >
              <Ionicons name="receipt-outline" size={32} color="#fd7e14" />
              <Text style={styles.quickActionText}>New Order</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Materials', { screen: 'SupplierRegister' })}
            >
              <Ionicons name="people-outline" size={32} color="#6f42c1" />
              <Text style={styles.quickActionText}>Add Supplier</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Messages</Text>
          <View style={styles.messageCard}>
            <Ionicons name="mail-outline" size={24} color="#007bff" />
            <Text style={styles.messageText}>You have 3 new messages</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    width: (width - 50) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  bundleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  bundleCard: {
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bundleCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bundleStatus: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  sellersContainer: {
    gap: 10,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sellerRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sellerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  stockContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stockText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickActionCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default DashboardScreen;