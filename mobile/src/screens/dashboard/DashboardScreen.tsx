import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize } from '../../utils/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.lg * 3) / 2;

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  change?: string;
}

const DashboardScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const stats: StatCard[] = [
    {
      title: 'Total Visits',
      value: '12,000',
      icon: '📈',
      color: colors.primary,
      change: '+12%',
    },
    {
      title: 'Orders',
      value: '350',
      icon: '📋',
      color: colors.secondary,
      change: '+8%',
    },
    {
      title: 'New Customers',
      value: '120',
      icon: '👥',
      color: '#1976D2',
      change: '+15%',
    },
    {
      title: 'New Orders',
      value: '90',
      icon: '➕',
      color: '#388E3C',
      change: '+5%',
    },
  ];

  const bundleStats = [
    { label: 'Available', count: '542', color: '#4CAF50' },
    { label: 'On Hold', count: '132', color: '#FF9800' },
    { label: 'Sold', count: '93', color: '#2196F3' },
    { label: 'Reserved', count: '18', color: '#9C27B0' },
    { label: 'Returned', count: '15', color: '#F44336' },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const StatCard: React.FC<{ item: StatCard }> = ({ item }) => (
    <View style={[styles.statCard, { width: cardWidth }]}>
      <LinearGradient
        colors={[item.color, `${item.color}CC`]}
        style={styles.statCardGradient}
      >
        <View style={styles.statCardContent}>
          <View style={styles.statCardHeader}>
            <Text style={styles.iconText}>{item.icon}</Text>
            {item.change && (
              <Text style={styles.changeText}>{item.change}</Text>
            )}
          </View>
          <Text style={styles.statValue}>{item.value}</Text>
          <Text style={styles.statTitle}>{item.title}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((item, index) => (
          <StatCard key={index} item={item} />
        ))}
      </View>

      <View style={styles.bundleCard}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Bundle Overview</Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={onRefresh}
            >
              <Text style={styles.refreshIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bundleStatsContainer}>
            {bundleStats.map((stat, index) => (
              <View key={index} style={styles.bundleStatItem}>
                <View
                  style={[styles.bundleColorIndicator, { backgroundColor: stat.color }]}
                />
                <Text style={styles.bundleCount}>{stat.count}</Text>
                <Text style={styles.bundleLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.actionCard}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionText}>Add Bundle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>👤</Text>
              <Text style={styles.quickActionText}>Add Supplier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📋</Text>
              <Text style={styles.quickActionText}>New Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bestSellersCard}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Top Best Sellers</Text>
          <View style={styles.bestSellersList}>
            {['Material A', 'Material B', 'Material C'].map((material, index) => (
              <View key={index} style={styles.bestSellerItem}>
                <Text style={styles.bestSellerText}>{material}</Text>
              </View>
            ))}
          </View>
          
          <Text style={[styles.cardTitle, { marginTop: spacing.lg }]}>
            Top Materials in Stock
          </Text>
          <View style={styles.stockMaterialsList}>
            {['Granite X', 'Quartz Y', 'Marble Z'].map((material, index) => (
              <View key={index} style={styles.stockMaterialItem}>
                <Text style={styles.checkIcon}>✅</Text>
                <Text style={styles.stockMaterialText}>{material}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
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
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  welcomeText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statCardGradient: {
    padding: spacing.md,
    minHeight: 120,
  },
  statCardContent: {
    flex: 1,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconText: {
    fontSize: fontSize.xl,
  },
  changeText: {
    color: colors.onPrimary,
    fontSize: fontSize.xs,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.onPrimary,
    marginBottom: spacing.xs,
  },
  statTitle: {
    fontSize: fontSize.sm,
    color: colors.onPrimary,
    opacity: 0.9,
  },
  bundleCard: {
    margin: spacing.lg,
    marginTop: 0,
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  refreshButton: {
    padding: spacing.sm,
  },
  refreshIcon: {
    fontSize: fontSize.lg,
  },
  bundleStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  bundleStatItem: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    width: (width - spacing.lg * 2 - spacing.sm * 4) / 5,
    backgroundColor: colors.background,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  bundleColorIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  bundleCount: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bundleLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionCard: {
    margin: spacing.lg,
    marginTop: 0,
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  quickActionButton: {
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.background,
    elevation: 1,
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  quickActionIcon: {
    fontSize: fontSize.xxxl,
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: fontSize.sm,
    color: colors.text,
    textAlign: 'center',
  },
  bestSellersCard: {
    margin: spacing.lg,
    marginTop: 0,
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bestSellersList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  bestSellerItem: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.background,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  bestSellerText: {
    fontSize: fontSize.sm,
    color: colors.text,
    textAlign: 'center',
  },
  stockMaterialsList: {
    marginTop: spacing.md,
  },
  stockMaterialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  checkIcon: {
    fontSize: fontSize.md,
    marginRight: spacing.sm,
  },
  stockMaterialText: {
    fontSize: fontSize.md,
    color: colors.text,
  },
});

export default DashboardScreen;