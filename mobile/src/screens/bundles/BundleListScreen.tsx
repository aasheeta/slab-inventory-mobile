import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Searchbar,
  Card,
  Text,
  Chip,
  FAB,
  IconButton,
  ActivityIndicator,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getBundles, deleteBundle } from '../../services/api';
import { colors, spacing, fontSize } from '../../utils/theme';

interface Bundle {
  id: string;
  code: string;
  material: string;
  supplier: string;
  status: 'available' | 'hold' | 'sold' | 'reserved' | 'returned';
  dimensions: string;
  location: string;
  price: number;
  createdAt: string;
}

const BundleListScreen: React.FC = ({ navigation }: any) => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [filteredBundles, setFilteredBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statusColors = {
    available: '#4CAF50',
    hold: '#FF9800',
    sold: '#2196F3',
    reserved: '#9C27B0',
    returned: '#F44336',
  };

  const statuses = ['all', 'available', 'hold', 'sold', 'reserved', 'returned'];

  useEffect(() => {
    loadBundles();
  }, []);

  useEffect(() => {
    filterBundles();
  }, [bundles, searchQuery, selectedStatus]);

  const loadBundles = async () => {
    try {
      setLoading(true);
      const response = await getBundles();
      if (response.success) {
        setBundles(response.data || []);
      } else {
        Alert.alert('Error', 'Failed to load bundles');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load bundles');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBundles();
    setRefreshing(false);
  };

  const filterBundles = () => {
    let filtered = bundles;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(bundle => bundle.status === selectedStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(bundle =>
        bundle.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bundle.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bundle.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBundles(filtered);
  };

  const handleDeleteBundle = (bundle: Bundle) => {
    Alert.alert(
      'Delete Bundle',
      `Are you sure you want to delete bundle ${bundle.code}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await deleteBundle(bundle.id);
            if (response.success) {
              loadBundles();
            } else {
              Alert.alert('Error', 'Failed to delete bundle');
            }
          },
        },
      ]
    );
  };

  const renderBundleCard = ({ item }: { item: Bundle }) => (
    <Card style={styles.bundleCard}>
      <Card.Content>
        <View style={styles.bundleHeader}>
          <View style={styles.bundleInfo}>
            <Text style={styles.bundleCode}>{item.code}</Text>
            <Text style={styles.bundleMaterial}>{item.material}</Text>
          </View>
          <Chip
            style={[
              styles.statusChip,
              { backgroundColor: statusColors[item.status] },
            ]}
            textStyle={styles.statusText}
          >
            {item.status.toUpperCase()}
          </Chip>
        </View>

        <View style={styles.bundleDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="business" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Supplier: {item.supplier}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="resize" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Dimensions: {item.dimensions}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Location: {item.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cash" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Price: ${item.price.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.bundleActions}>
          <IconButton
            icon="pencil"
            size={20}
            iconColor={colors.primary}
            onPress={() => navigation.navigate('Add Bundle', { bundle: item })}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor={colors.error}
            onPress={() => handleDeleteBundle(item)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  const renderStatusFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={statuses}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Chip
            style={[
              styles.filterChip,
              selectedStatus === item && styles.activeFilterChip,
            ]}
            textStyle={[
              styles.filterChipText,
              selectedStatus === item && styles.activeFilterChipText,
            ]}
            onPress={() => setSelectedStatus(item)}
          >
            {item === 'all' ? 'All' : item.charAt(0).toUpperCase() + item.slice(1)}
          </Chip>
        )}
        contentContainerStyle={styles.filterList}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading bundles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.searchContainer}>
        <Searchbar
          placeholder="Search bundles..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </Surface>

      {renderStatusFilter()}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredBundles.length} bundle{filteredBundles.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredBundles}
        renderItem={renderBundleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Add Bundle')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  searchContainer: {
    margin: spacing.md,
    borderRadius: 8,
    elevation: 2,
  },
  searchbar: {
    backgroundColor: colors.surface,
  },
  filterContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  filterList: {
    paddingRight: spacing.md,
  },
  filterChip: {
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    color: colors.textSecondary,
  },
  activeFilterChipText: {
    color: colors.onPrimary,
  },
  resultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  resultsText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 80,
  },
  bundleCard: {
    margin: spacing.md,
    marginTop: 0,
    elevation: 2,
    borderRadius: 12,
  },
  bundleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  bundleInfo: {
    flex: 1,
  },
  bundleCode: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bundleMaterial: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  statusChip: {
    marginLeft: spacing.md,
  },
  statusText: {
    color: colors.onPrimary,
    fontSize: fontSize.xs,
    fontWeight: 'bold',
  },
  bundleDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    fontSize: fontSize.sm,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  bundleActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default BundleListScreen;