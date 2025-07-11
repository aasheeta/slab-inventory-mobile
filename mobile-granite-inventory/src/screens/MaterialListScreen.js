import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MaterialItem = ({ material, onPress }) => (
  <TouchableOpacity style={styles.materialItem} onPress={onPress}>
    <View style={styles.materialImageContainer}>
      <Ionicons name="layers" size={40} color="#007bff" />
    </View>
    <View style={styles.materialInfo}>
      <Text style={styles.materialName}>{material.name}</Text>
      <Text style={styles.materialType}>{material.type}</Text>
      <View style={styles.materialDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="cube-outline" size={14} color="#666" />
          <Text style={styles.detailText}>{material.stock} units</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={14} color="#666" />
          <Text style={styles.detailText}>${material.pricePerUnit}/unit</Text>
        </View>
      </View>
      <View style={styles.supplierInfo}>
        <Ionicons name="business-outline" size={14} color="#666" />
        <Text style={styles.supplierText}>{material.supplier}</Text>
      </View>
    </View>
    <View style={styles.materialActions}>
      <View style={[styles.stockIndicator, { backgroundColor: material.stockColor }]}>
        <Text style={styles.stockText}>{material.stockStatus}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </View>
  </TouchableOpacity>
);

const MaterialListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const materials = [
    {
      id: 'M001',
      name: 'Black Galaxy Granite',
      type: 'Granite',
      stock: 45,
      stockStatus: 'In Stock',
      stockColor: '#28a745',
      pricePerUnit: 120,
      supplier: 'Stone Masters Ltd',
    },
    {
      id: 'M002',
      name: 'Calacatta Quartz',
      type: 'Quartz',
      stock: 12,
      stockStatus: 'Low Stock',
      stockColor: '#ffc107',
      pricePerUnit: 180,
      supplier: 'Premium Stones Inc',
    },
    {
      id: 'M003',
      name: 'Carrara Marble',
      type: 'Marble',
      stock: 0,
      stockStatus: 'Out of Stock',
      stockColor: '#dc3545',
      pricePerUnit: 95,
      supplier: 'Italian Marble Co',
    },
    {
      id: 'M004',
      name: 'Kashmir White Granite',
      type: 'Granite',
      stock: 67,
      stockStatus: 'In Stock',
      stockColor: '#28a745',
      pricePerUnit: 135,
      supplier: 'Stone Masters Ltd',
    },
    {
      id: 'M005',
      name: 'Emperador Dark Marble',
      type: 'Marble',
      stock: 23,
      stockStatus: 'In Stock',
      stockColor: '#28a745',
      pricePerUnit: 110,
      supplier: 'Marble World',
    },
  ];

  const filters = ['All', 'Granite', 'Quartz', 'Marble'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || material.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStockSummary = () => {
    const inStock = materials.filter(m => m.stock > 20).length;
    const lowStock = materials.filter(m => m.stock > 0 && m.stock <= 20).length;
    const outOfStock = materials.filter(m => m.stock === 0).length;
    return { inStock, lowStock, outOfStock };
  };

  const stockSummary = getStockSummary();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Materials</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('MaterialRegister')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stock Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{stockSummary.inStock}</Text>
          <Text style={styles.summaryLabel}>In Stock</Text>
          <View style={[styles.summaryIndicator, { backgroundColor: '#28a745' }]} />
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{stockSummary.lowStock}</Text>
          <Text style={styles.summaryLabel}>Low Stock</Text>
          <View style={[styles.summaryIndicator, { backgroundColor: '#ffc107' }]} />
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{stockSummary.outOfStock}</Text>
          <Text style={styles.summaryLabel}>Out of Stock</Text>
          <View style={[styles.summaryIndicator, { backgroundColor: '#dc3545' }]} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search materials..."
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
        data={filteredMaterials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MaterialItem 
            material={item} 
            onPress={() => {/* Navigate to material details */}}
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  summaryIndicator: {
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
  materialItem: {
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
  materialImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  materialInfo: {
    flex: 1,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  materialType: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
    marginBottom: 8,
  },
  materialDetails: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  supplierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  materialActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stockIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  stockText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
});

export default MaterialListScreen;