import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, Pill, TitleBlock } from '../components/Ui';
import { artifacts } from '../data/museumData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../theme/theme';

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
    <Screen>
      <TitleBlock
        eyebrow="Artifacts"
        title="Collection"
        subtitle="Search for artifacts, filter by floor, and jump into detailed stories."
      />

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for artifacts..."
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        {floorFilters.map((filter) => (
          <Pill
            key={filter}
            label={filter}
            active={selectedFloor === filter}
            onPress={() => setSelectedFloor(filter)}
          />
        ))}
      </View>

      {filteredArtifacts.map((artifact) => (
        <Pressable
          key={artifact.id}
          onPress={() => navigation.navigate('ArtifactDetail', { artifactId: artifact.id })}
        >
          <Card>
            <Text style={styles.era}>{artifact.era}</Text>
            <Text style={styles.title}>{artifact.title}</Text>
            <Text style={styles.meta}>
              {artifact.dynastyOrCollection} • {artifact.floorLabel}
            </Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.accentSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    color: colors.text,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  era: {
    color: colors.accent,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    lineHeight: 21,
  },
});
