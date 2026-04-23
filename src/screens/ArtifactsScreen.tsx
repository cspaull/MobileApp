import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '../components/Screen';
import { artifacts } from '../data/museumData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/theme';

const floorFilters = ['All', '1st floor', '2nd floor'] as const;

export function ArtifactsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<(typeof floorFilters)[number]>('All');

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((artifact) => {
      const matchesFloor = selectedFloor === 'All' || artifact.floorLabel === selectedFloor;
      const searchable = `${artifact.title} ${artifact.dynastyOrCollection} ${artifact.type}`.toLowerCase();
      const matchesQuery = searchable.includes(query.trim().toLowerCase());

      return matchesFloor && matchesQuery;
    });
  }, [query, selectedFloor]);

  return (
    <Screen contentStyle={styles.screenContent}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>ARTIFACTS</Text>
          <Text style={styles.headerSubtitle}>COLLECTION</Text>
        </View>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>F</Text>
        </Pressable>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>Q</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for artifacts..."
          placeholderTextColor="#B98F87"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterRow}>
        {floorFilters.map((filter) => {
          const active = selectedFloor === filter;

          return (
            <Pressable
              key={filter}
              style={[styles.filterPill, active && styles.filterPillActive]}
              onPress={() => setSelectedFloor(filter)}
            >
              <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.grid}>
        {filteredArtifacts.map((artifact) => (
          <Pressable
            key={artifact.id}
            style={styles.gridCard}
            onPress={() => navigation.navigate('ArtifactDetail', { artifactId: artifact.id })}
          >
            <View style={styles.floorBadge}>
              <Text style={styles.floorBadgeText}>{artifact.floorLabel}</Text>
            </View>
            <View style={styles.iconZone}>
              <Text style={styles.cardIcon}>{iconForArtifact(artifact.type)}</Text>
            </View>
            <View style={styles.cardCopy}>
              <Text style={styles.cardEra}>{artifact.era}</Text>
              <Text style={styles.cardTitle}>{artifact.title}</Text>
              <Text style={styles.cardMeta}>{artifact.dynastyOrCollection}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function iconForArtifact(type: string) {
  switch (type) {
    case 'Antiquity':
      return 'U';
    case 'Weapon':
      return 'W';
    case 'Map':
      return 'M';
    case 'Textile':
      return 'T';
    case 'Scale Model':
      return 'B';
    default:
      return '*';
  }
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '400',
  },
  headerSubtitle: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: '400',
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9CCA3',
  },
  filterButtonText: {
    color: colors.textMuted,
    fontSize: 22,
    fontWeight: '700',
  },
  searchBar: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
  },
  searchIcon: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterPill: {
    minWidth: 96,
    minHeight: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  filterPillActive: {
    backgroundColor: colors.accent,
  },
  filterPillText: {
    color: colors.text,
    fontSize: 14,
  },
  filterPillTextActive: {
    color: colors.surface,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  gridCard: {
    width: '47.8%',
    minHeight: 206,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.14)',
    overflow: 'hidden',
  },
  floorBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#F4D4CF',
  },
  floorBadgeText: {
    color: '#CA6D5D',
    fontSize: 11,
  },
  iconZone: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7DDBD',
  },
  cardIcon: {
    color: colors.accent,
    fontSize: 42,
    lineHeight: 44,
    fontWeight: '700',
  },
  cardCopy: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    gap: 2,
  },
  cardEra: {
    color: '#A27E70',
    fontSize: 11,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 20,
  },
  cardMeta: {
    color: colors.textSoft,
    fontSize: 11,
  },
});
