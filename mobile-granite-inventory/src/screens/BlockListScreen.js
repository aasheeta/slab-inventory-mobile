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

const BlockItem = ({ block, onPress }) => (
  <TouchableOpacity style={styles.blockItem} onPress={onPress}>
    <View style={styles.blockHeader}>
      <Text style={styles.blockId}>#{block.id}</Text>
      <View style={[styles.statusBadge, { backgroundColor: block.statusColor }]}>
        <Text style={styles.statusText}>{block.status}</Text>
      </View>
    </View>
    
    <Text style={styles.blockMaterial}>{block.material}</Text>
    
    <View style={styles.blockDetails}>
      <View style={styles.detailItem}>
        <Ionicons name="cube-outline" size={16} color="#666" />
        <Text style={styles.detailText}>{block.dimensions}</Text>
      </View>
      <View style={styles.detailItem}>
        <Ionicons name="scale-outline" size={16} color="#666" />
        <Text style={styles.detailText}>{block.weight} kg</Text>
      </View>
      <View style={styles.detailItem}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.detailText}>{block.location}</Text>
      </View>
      <View style={styles.detailItem}>
        <Ionicons name="business-outline" size={16} color="#666" />
        <Text style={styles.detailText}>{block.supplier}</Text>
      </View>
    </View>
    
    <View style={styles.blockFooter}>
      <Text style={styles.blockPrice}>${block.price.toLocaleString()}</Text>
      <Text style={styles.possibleBundles}>{block.possibleBundles} bundles possible</Text>
    </View>
  </TouchableOpacity>
);

const BlockListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const blocks = [
    {
      id: 'BLK001',
      material: 'Granite Black Galaxy',
      dimensions: '320x180x180cm',
      weight: 18500,
      location: 'Yard A, Section 1',
      supplier: 'Stone Masters Ltd',
      status: 'Available',
      statusColor: '#28a745',
      price: 45000,
      possibleBundles: 12,
    },
    {
      id: 'BLK002',
      material: 'Quartz Calacatta Gold',
      dimensions: '310x190x170cm',
      weight: 17200,
      location: 'Yard B, Section 2',
      supplier: 'Premium Stones Inc',
      status: 'In Processing',
      statusColor: '#007bff',
      price: 52000,
      possibleBundles: 15,
    },
    {
      id: 'BLK003',
      material: 'Marble Carrara White',
      dimensions: '300x170x160cm',
      weight: 15800,
      location: 'Yard A, Section 3',
      supplier: 'Italian Marble Co',
      status: 'Reserved',
      statusColor: '#17a2b8',
      price: 38000,
      possibleBundles: 10,
    },
    {
      id: 'BLK004',
      material: 'Granite Kashmir White',
      dimensions: '330x200x185cm',
      weight: 19800,
      location: 'Yard C, Section 1',
      supplier: 'Stone Masters Ltd',
      status: 'Sold',
      statusColor: '#dc3545',
      price: 48000,
      possibleBundles: 14,
    },
  ];

  const filters = ['All', 'Available', 'In Processing', 'Reserved', 'Sold'];

  const filteredBlocks = blocks.filter(block => {
    const matchesSearch = block.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         block.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         block.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || block.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getBlockStats = () => {
    const available = blocks.filter(b => b.status === 'Available').length;
    const processing = blocks.filter(b => b.status === 'In Processing').length;
    const reserved = blocks.filter(b => b.status === 'Reserved').length;
    const totalValue = blocks.reduce((sum, b) => sum + b.price, 0);
    return { available, processing, reserved, totalValue };
  };

  const stats = getBlockStats();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blocks</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BlockRegister')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.available}</Text>
          <Text style={styles.statLabel}>Available</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#28a745' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.processing}</Text>
          <Text style={styles.statLabel}>Processing</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#007bff' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.reserved}</Text>
          <Text style={styles.statLabel}>Reserved</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#17a2b8' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${Math.round(stats.totalValue / 1000)}K</Text>
          <Text style={styles.statLabel}>Total Value</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#6f42c1' }]} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search blocks..."
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
        data={filteredBlocks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlockItem 
            block={item} 
            onPress={() => {/* Navigate to block details */}}
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
  blockItem: {
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
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  blockId: {
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
  blockMaterial: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  blockDetails: {
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
  blockFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  possibleBundles: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default BlockListScreen;