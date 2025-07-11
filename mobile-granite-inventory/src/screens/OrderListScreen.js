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

const OrderItem = ({ order, onPress }) => (
  <TouchableOpacity style={styles.orderItem} onPress={onPress}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderId}>#{order.id}</Text>
      <View style={[styles.statusBadge, { backgroundColor: order.statusColor }]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
    </View>
    
    <Text style={styles.customerName}>{order.customerName}</Text>
    
    <View style={styles.orderDetails}>
      <View style={styles.detailItem}>
        <Ionicons name="calendar-outline" size={14} color="#666" />
        <Text style={styles.detailText}>{order.date}</Text>
      </View>
      <View style={styles.detailItem}>
        <Ionicons name="time-outline" size={14} color="#666" />
        <Text style={styles.detailText}>Due: {order.dueDate}</Text>
      </View>
      <View style={styles.detailItem}>
        <Ionicons name="cube-outline" size={14} color="#666" />
        <Text style={styles.detailText}>{order.itemCount} items</Text>
      </View>
    </View>
    
    <View style={styles.orderFooter}>
      <Text style={styles.orderTotal}>${order.total.toLocaleString()}</Text>
      <View style={styles.priorityIndicator}>
        <Ionicons 
          name={order.priority === 'High' ? 'alert-circle' : order.priority === 'Medium' ? 'warning' : 'checkmark-circle'} 
          size={16} 
          color={order.priority === 'High' ? '#dc3545' : order.priority === 'Medium' ? '#ffc107' : '#28a745'} 
        />
        <Text style={[styles.priorityText, { 
          color: order.priority === 'High' ? '#dc3545' : order.priority === 'Medium' ? '#ffc107' : '#28a745' 
        }]}>
          {order.priority}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const OrderListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const orders = [
    {
      id: 'ORD001',
      customerName: 'Luxury Kitchen Design',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      status: 'In Progress',
      statusColor: '#007bff',
      total: 15400,
      itemCount: 5,
      priority: 'High',
    },
    {
      id: 'ORD002',
      customerName: 'Modern Home Builders',
      date: '2024-01-14',
      dueDate: '2024-02-15',
      status: 'Pending',
      statusColor: '#ffc107',
      total: 8750,
      itemCount: 3,
      priority: 'Medium',
    },
    {
      id: 'ORD003',
      customerName: 'Elite Contractors',
      date: '2024-01-12',
      dueDate: '2024-01-25',
      status: 'Completed',
      statusColor: '#28a745',
      total: 12300,
      itemCount: 4,
      priority: 'Low',
    },
    {
      id: 'ORD004',
      customerName: 'Residential Renovations',
      date: '2024-01-10',
      dueDate: '2024-02-01',
      status: 'Quoted',
      statusColor: '#6c757d',
      total: 6200,
      itemCount: 2,
      priority: 'Medium',
    },
    {
      id: 'ORD005',
      customerName: 'Premium Interiors',
      date: '2024-01-08',
      dueDate: '2024-01-22',
      status: 'Cancelled',
      statusColor: '#dc3545',
      total: 9800,
      itemCount: 3,
      priority: 'Low',
    },
  ];

  const filters = ['All', 'Pending', 'In Progress', 'Completed', 'Quoted', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getOrderStats = () => {
    const pending = orders.filter(o => o.status === 'Pending').length;
    const inProgress = orders.filter(o => o.status === 'In Progress').length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const totalValue = orders.reduce((sum, o) => sum + o.total, 0);
    return { pending, inProgress, completed, totalValue };
  };

  const stats = getOrderStats();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('OrderRegister')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#ffc107' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.inProgress}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#007bff' }]} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
          <View style={[styles.statIndicator, { backgroundColor: '#28a745' }]} />
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
            placeholder="Search orders..."
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
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItem 
            order={item} 
            onPress={() => {/* Navigate to order details */}}
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
  orderItem: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
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
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  orderDetails: {
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
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  priorityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OrderListScreen;