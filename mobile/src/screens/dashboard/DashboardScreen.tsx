import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  Card,
  Text,
  IconButton,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
      icon: 'trending-up',
      color: colors.primary,
      change: '+12%',
    },
    {
      title: 'Orders',
      value: '350',
      icon: 'receipt',
      color: colors.secondary,
      change: '+8%',
    },
    {
      title: 'New Customers',
      value: '120',
      icon: 'people',
      color: '#1976D2',
      change: '+15%',
    },
    {
      title: 'New Orders',
      value: '90',
      icon: 'add-circle',
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
    <Card style={[styles.statCard, { width: cardWidth }]}>
      <LinearGradient
        colors={[item.color, `${item.color}CC`]}
        style={styles.statCardGradient}
      >
        <View style={styles.statCardContent}>
          <View style={styles.statCardHeader}>
            <Ionicons name={item.icon as any} size={24} color={colors.onPrimary} />
            {item.change && (
              <Text style={styles.changeText}>{item.change}</Text>
            )}
          </View>
          <Text style={styles.statValue}>{item.value}</Text>
          <Text style={styles.statTitle}>{item.title}</Text>
        </View>
      </LinearGradient>
    </Card>
  );

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

      <Card style={styles.bundleCard}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Bundle Overview</Text>
            <IconButton
              icon="refresh"
              size={20}
              onPress={onRefresh}
              iconColor={colors.primary}
            />
          </View>
          
          <View style={styles.bundleStatsContainer}>
            {bundleStats.map((stat, index) => (
              <Surface key={index} style={styles.bundleStatItem}>
                <View
                  style={[styles.bundleColorIndicator, { backgroundColor: stat.color }]}
                />
                <Text style={styles.bundleCount}>{stat.count}</Text>
                <Text style={styles.bundleLabel}>{stat.label}</Text>
              </Surface>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.actionCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <Surface style={styles.quickActionButton}>
              <Ionicons name="add-circle" size={32} color={colors.primary} />
              <Text style={styles.quickActionText}>Add Bundle</Text>
            </Surface>
            <Surface style={styles.quickActionButton}>
              <Ionicons name="person-add" size={32} color={colors.secondary} />
              <Text style={styles.quickActionText}>Add Supplier</Text>
            </Surface>
            <Surface style={styles.quickActionButton}>
              <Ionicons name="receipt" size={32} color={colors.accent} />
              <Text style={styles.quickActionText}>New Order</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.bestSellersCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Top Best Sellers</Text>
          <View style={styles.bestSellersList}>
            {['Material A', 'Material B', 'Material C'].map((material, index) => (
              <Surface key={index} style={styles.bestSellerItem}>
                <Text style={styles.bestSellerText}>{material}</Text>
              </Surface>
            ))}
          </View>
          
          <Text style={[styles.cardTitle, { marginTop: spacing.lg }]}>
            Top Materials in Stock
          </Text>
          <View style={styles.stockMaterialsList}>
            {['Granite X', 'Quartz Y', 'Marble Z'].map((material, index) => (
              <View key={index} style={styles.stockMaterialItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
                <Text style={styles.stockMaterialText}>{material}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    elevation: 4,
    borderRadius: 12,
    overflow: 'hidden',
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
    elevation: 2,
    borderRadius: 12,
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
    elevation: 1,
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
    elevation: 2,
    borderRadius: 12,
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
    elevation: 1,
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
  },
  quickActionText: {
    fontSize: fontSize.sm,
    color: colors.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  bestSellersCard: {
    margin: spacing.lg,
    marginTop: 0,
    elevation: 2,
    borderRadius: 12,
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
    elevation: 1,
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
  stockMaterialText: {
    fontSize: fontSize.md,
    color: colors.text,
    marginLeft: spacing.sm,
  },
});

export default DashboardScreen;