import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SupplierItem = ({ supplier, onPress }) => (
  <TouchableOpacity style={styles.supplierItem} onPress={onPress}>
    <View style={styles.supplierAvatar}>
      <Text style={styles.supplierInitials}>
        {supplier.name.split(' ').map(n => n[0]).join('').toUpperCase()}
      </Text>
    </View>
    <View style={styles.supplierInfo}>
      <Text style={styles.supplierName}>{supplier.name}</Text>
      <View style={styles.supplierDetail}>
        <Ionicons name="call-outline" size={14} color="#666" />
        <Text style={styles.detailText}>{supplier.phone}</Text>
      </View>
      <View style={styles.supplierDetail}>
        <Ionicons name="mail-outline" size={14} color="#666" />
        <Text style={styles.detailText}>{supplier.email}</Text>
      </View>
      <View style={styles.supplierDetail}>
        <Ionicons name="location-outline" size={14} color="#666" />
        <Text style={styles.detailText}>{supplier.location}</Text>
      </View>
    </View>
    <View style={styles.supplierActions}>
      <View style={[styles.statusBadge, { backgroundColor: supplier.statusColor }]}>
        <Text style={styles.statusText}>{supplier.status}</Text>
      </View>
      <Text style={styles.materialCount}>{supplier.materialCount} materials</Text>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </View>
  </TouchableOpacity>
);

const SupplierListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const suppliers = [
    {
      id: 'S001',
      name: 'Stone Masters Ltd',
      phone: '+1 (555) 123-4567',
      email: 'contact@stonemasters.com',
      location: 'New York, NY',
      status: 'Active',
      statusColor: '#28a745',
      materialCount: 15,
    },
    {
      id: 'S002',
      name: 'Premium Stones Inc',
      phone: '+1 (555) 234-5678',
      email: 'info@premiumstones.com',
      location: 'Los Angeles, CA',
      status: 'Active',
      statusColor: '#28a745',
      materialCount: 8,
    },
    {
      id: 'S003',
      name: 'Italian Marble Co',
      phone: '+1 (555) 345-6789',
      email: 'sales@italianmarble.com',
      location: 'Miami, FL',
      status: 'Inactive',
      statusColor: '#6c757d',
      materialCount: 3,
    },
    {
      id: 'S004',
      name: 'Marble World',
      phone: '+1 (555) 456-7890',
      email: 'orders@marbleworld.com',
      location: 'Chicago, IL',
      status: 'Active',
      statusColor: '#28a745',
      materialCount: 12,
    },
    {
      id: 'S005',
      name: 'Granite Express',
      phone: '+1 (555) 567-8901',
      email: 'info@graniteexpress.com',
      location: 'Houston, TX',
      status: 'Pending',
      statusColor: '#ffc107',
      materialCount: 5,
    },
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSupplierStats = () => {
    const active = suppliers.filter(s => s.status === 'Active').length;
    const inactive = suppliers.filter(s => s.status === 'Inactive').length;
    const pending = suppliers.filter(s => s.status === 'Pending').length;
    const totalMaterials = suppliers.reduce((sum, s) => sum + s.materialCount, 0);
    return { active, inactive, pending, totalMaterials };
  };

  const stats = getSupplierStats();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Suppliers</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('SupplierRegister')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.active}</Text>
          <Text style={styles.statLabel}>Active</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#28a745' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#ffc107' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.inactive}</Text>
          <Text style={styles.statLabel}>Inactive</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#6c757d' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalMaterials}</Text>
          <Text style={styles.statLabel}>Materials</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#007bff' }]} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search suppliers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredSuppliers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SupplierItem 
            supplier={item} 
            onPress={() => {/* Navigate to supplier details */}}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statIndicator: {
    position: 'absolute',
    bottom: -15,
    width: '80%',
    height: 3,
    borderRadius: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 20,
  },
  supplierItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  supplierAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  supplierInitials: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  supplierDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  supplierActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
  materialCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
});

export default SupplierListScreen;