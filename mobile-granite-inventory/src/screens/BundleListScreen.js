import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BundleItem = ({ bundle, onPress }) => (
  <TouchableOpacity style={styles.bundleItem} onPress={onPress}>
    <View style={styles.bundleHeader}>
      <Text style={styles.bundleId}>#{bundle.id}</Text>
      <View style={[styles.statusBadge, { backgroundColor: bundle.statusColor }]}>
        <Text style={styles.statusText}>{bundle.status}</Text>
      </View>
    </View>
    <Text style={styles.bundleMaterial}>{bundle.material}</Text>
    <View style={styles.bundleDetails}>
      <View style={styles.detailItem}>
        <Ionicons name="cube-outline" size={16} color="#666" />
        <Text style={styles.detailText}>{bundle.dimensions}</Text>
      </View>
      <View style={styles.detailItem}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.detailText}>{bundle.location}</Text>
      </View>
    </View>
    <View style={styles.bundleFooter}>
      <Text style={styles.bundlePrice}>${bundle.price}</Text>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </View>
  </TouchableOpacity>
);

const BundleListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const bundles = [
    {
      id: 'B001',
      material: 'Granite Black Galaxy',
      dimensions: '120x60x3cm',
      location: 'Warehouse A',
      status: 'Available',
      statusColor: '#28a745',
      price: 1200,
    },
    {
      id: 'B002',
      material: 'Quartz Calacatta',
      dimensions: '140x70x2cm',
      location: 'Warehouse B',
      status: 'On Hold',
      statusColor: '#ffc107',
      price: 1800,
    },
    {
      id: 'B003',
      material: 'Marble Carrara',
      dimensions: '100x50x3cm',
      location: 'Warehouse A',
      status: 'Sold',
      statusColor: '#dc3545',
      price: 950,
    },
    {
      id: 'B004',
      material: 'Granite Kashmir White',
      dimensions: '130x65x3cm',
      location: 'Warehouse C',
      status: 'Reserved',
      statusColor: '#17a2b8',
      price: 1350,
    },
  ];

  const filters = ['All', 'Available', 'On Hold', 'Sold', 'Reserved'];

  const filteredBundles = bundles.filter(bundle => {
    const matchesSearch = bundle.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bundle.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || bundle.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bundles</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BundleRegister')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bundles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        horizontal 
        style={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredBundles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BundleItem 
            bundle={item} 
            onPress={() => {/* Navigate to bundle details */}}
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  bundleItem: {
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
  bundleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bundleId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  bundleMaterial: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  bundleDetails: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  bundleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bundlePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
});

export default BundleListScreen;