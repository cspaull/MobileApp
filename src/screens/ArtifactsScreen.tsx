import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '../components/Screen';
import { artifacts } from '../data/museumData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/theme';
import { getArtifactCategory, getArtifactImageSource } from '../utils/museum';

const floorFilters = ['All', '1st floor', '2nd floor'] as const;

export function ArtifactsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<(typeof floorFilters)[number]>('All');

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((artifact) => {
      const matchesFloor = selectedFloor === 'All' || artifact.floorLabel === selectedFloor;
      const searchable = `${artifact.title} ${artifact.roomName} ${artifact.tags.join(' ')}`.toLowerCase();
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
          <Image
            source={require('../../assets/mdi_filter-outline.png')}
            style={styles.filterIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for artifacts..."
          placeholderTextColor="#C87F72"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {floorFilters.map((filter) => {
          const active = selectedFloor === filter;

          return (
            <Pressable
              key={filter}
              style={[styles.filterPill, active ? styles.filterPillActive : styles.filterPillIdle]}
              onPress={() => setSelectedFloor(filter)}
            >
              <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.grid}>
        {filteredArtifacts.map((artifact) => (
          <Pressable
            key={artifact.id}
            style={styles.gridCard}
            onPress={() => navigation.navigate('ArtifactDetail', { artifactId: artifact.id })}
          >
            <View style={styles.imagePanel}>
              <View style={styles.floorBadge}>
                <Text style={styles.floorBadgeText}>{artifact.floorLabel}</Text>
              </View>

              <Image
                source={getArtifactImageSource(artifact.id)}
                resizeMode="contain"
                style={styles.artifactImage}
              />
            </View>

            <View style={styles.cardCopy}>
              <Text style={styles.cardEra}>{artifact.era}</Text>
              <Text numberOfLines={2} style={styles.cardTitle}>
                {artifact.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardMeta}>
                {getArtifactCategory(artifact)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
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
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '400',
  },
  headerSubtitle: {
    color: colors.accent,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '400',
  },
  filterButton: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2C39E',
  },
  filterIcon: {
    width: 26,
    height: 26,
    tintColor: '#7B6049',
  },
  searchBar: {
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: 'rgba(86, 76, 72, 0.28)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 6,
  },
  searchIcon: {
    color: colors.accent,
    fontSize: 22,
    lineHeight: 22,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontStyle: 'italic',
    paddingVertical: 0,
  },
  filterRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  filterPill: {
    minWidth: 170,
    minHeight: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
  },
  filterPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterPillIdle: {
    backgroundColor: '#FCFCFC',
    borderColor: '#B9B9B9',
  },
  filterPillText: {
    fontSize: 16,
    color: colors.text,
  },
  filterPillTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  gridCard: {
    width: '48.5%',
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: '#B8B1A6',
    overflow: 'hidden',
  },
  imagePanel: {
    minHeight: 128,
    backgroundColor: '#E6DDBF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  artifactImage: {
    width: '72%',
    height: 88,
  },
  floorBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#EDC0AB',
  },
  floorBadgeText: {
    color: '#B64735',
    fontSize: 12,
  },
  cardCopy: {
    minHeight: 88,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#B8B1A6',
    backgroundColor: colors.surface,
  },
  cardEra: {
    color: '#B45B52',
    fontSize: 13,
    fontStyle: 'italic',
  },
  cardTitle: {
    marginTop: 2,
    color: colors.text,
    fontSize: 15,
    lineHeight: 19,
  },
  cardMeta: {
    marginTop: 1,
    color: colors.textSoft,
    fontSize: 12,
    fontStyle: 'italic',
  },
});
