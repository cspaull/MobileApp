import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, Pill, PrimaryButton, StatTile, TitleBlock } from '../components/Ui';
import { artifacts } from '../data/museumData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppContext } from '../state/AppContext';
import { colors, spacing } from '../theme/theme';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAppContext();
  const featuredArtifacts = artifacts.slice(0, 3);

  return (
    <Screen>
      <TitleBlock
        eyebrow="Welcome To"
        title="Ho Chi Minh City Museum"
        subtitle={`65 Ly Tu Trong, District 1 • 08:00 - 17:00 • Hello ${user.fullName}`}
      />

      <Card style={styles.heroCard}>
        <Text style={styles.heroTitle}>Start your journey</Text>
        <Text style={styles.heroCopy}>
          The suggested roadmap is tailored for a compact, phone-friendly museum visit.
        </Text>
        <PrimaryButton label="Explore Artifacts" onPress={() => navigation.navigate('MainTabs')} />
      </Card>

      <View style={styles.statsRow}>
        <StatTile value="2" label="Floors" />
        <StatTile value="40,000" label="Artifacts" />
        <StatTile value="32" label="Audio Guides" />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Museum Overview</Text>
        <View style={styles.pillRow}>
          <Pill label="1st floor • City History" active />
          <Pill label="2nd floor • Resistance" />
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Popular Artifacts</Text>

      {featuredArtifacts.map((artifact) => (
        <Pressable
          key={artifact.id}
          onPress={() => navigation.navigate('ArtifactDetail', { artifactId: artifact.id })}
        >
          <Card>
            <Text style={styles.artifactTitle}>{artifact.title}</Text>
            <Text style={styles.artifactMeta}>
              {artifact.era} • {artifact.floorLabel}
            </Text>
            <Text style={styles.artifactSummary}>{artifact.badge}</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: colors.accent,
  },
  heroTitle: {
    color: colors.authText,
    fontSize: 24,
    fontWeight: '800',
  },
  heroCopy: {
    color: colors.authText,
    lineHeight: 22,
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  artifactTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  artifactMeta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  artifactSummary: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
