import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppContext } from '../state/AppContext';
import { colors, radius, spacing } from '../theme/theme';
import {
  getArtifactById,
  getArtifactCategory,
  getArtifactImageSource,
  getArtifactLocationLabel,
  getRelatedArtifacts,
} from '../utils/museum';

export function ArtifactDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ArtifactDetail'>>();
  const { favorites, toggleArtifactFavorite, recordArtifactView } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const artifactResult = getArtifactById(route.params.artifactId);
  const artifact = artifactResult.ok ? artifactResult.value : undefined;

  useEffect(() => {
    if (!artifact) {
      return;
    }

    recordArtifactView(artifact.id);
  }, [artifact, recordArtifactView]);

  useEffect(() => {
    if (!isPlaying || !artifact) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((current) =>
        current + 1 >= artifact.audioDurationSeconds ? artifact.audioDurationSeconds : current + 1,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [artifact, isPlaying]);

  useEffect(() => {
    if (artifact && elapsedSeconds >= artifact.audioDurationSeconds) {
      setIsPlaying(false);
    }
  }, [artifact, elapsedSeconds]);

  useEffect(() => {
    setElapsedSeconds(0);
    setIsPlaying(false);
  }, [artifact?.id]);

  const relatedArtifacts = useMemo(
    () => (artifact ? getRelatedArtifacts(artifact.id) : []),
    [artifact],
  );

  if (!artifact) {
    return (
      <Screen>
        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackTitle}>Artifact not found</Text>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const progress = elapsedSeconds / artifact.audioDurationSeconds;
  const isFavorite = favorites.includes(artifact.id);

  return (
    <Screen contentStyle={styles.screenContent}>
      <View style={styles.hero}>
        <Pressable style={[styles.floatingIconButton, styles.leftAction]} onPress={() => navigation.goBack()}>
          <Text style={styles.floatingIconText}>&lt;</Text>
        </Pressable>
        <Pressable
          style={[styles.floatingIconButton, styles.rightAction]}
          onPress={() => toggleArtifactFavorite(artifact.id)}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? 'H' : 'h'}</Text>
        </Pressable>

        <View style={styles.heroDiscOuter}>
          <Image
            source={getArtifactImageSource(artifact.id)}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <Text style={styles.era}>{artifact.era}</Text>
      <Text style={styles.title}>{artifact.title}</Text>
      <Text style={styles.meta}>
        {getArtifactCategory(artifact)} - {getArtifactLocationLabel(artifact)}
      </Text>

      <View style={styles.tagRow}>
        {artifact.tags.slice(0, 3).map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.audioCard}>
        <Pressable style={styles.playButton} onPress={() => setIsPlaying((current) => !current)}>
          <Text style={styles.playIcon}>{isPlaying ? 'II' : '>'}</Text>
        </Pressable>
        <View style={styles.audioContent}>
          <Text style={styles.audioTitle}>AUDIO GUIDE - ENGLISH</Text>
          <View style={styles.audioProgressTrack}>
            <View style={[styles.audioProgressFill, { width: `${Math.max(progress * 100, 5)}%` }]} />
          </View>
          <Text style={styles.audioTime}>
            {formatTime(elapsedSeconds)} / {formatTime(artifact.audioDurationSeconds)}
          </Text>
        </View>
      </View>

      <Text style={styles.body}>{artifact.summary}</Text>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
      </View>

      <View style={styles.infoGrid}>
        <InfoTile label="AGE" value={artifact.era === '2nd c. BCE' ? '200 BCE' : artifact.era} />
        <InfoTile label="MATERIAL" value={artifact.material} />
        <InfoTile label="SIZE" value={artifact.size} />
        <InfoTile label="ORIGIN" value={artifact.origin} />
      </View>

      <View style={styles.relatedHeader}>
        <View style={styles.relatedLine} />
        <Text style={styles.relatedTitle}>Related Artifacts</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
        {relatedArtifacts.map((related) => (
          <Pressable
            key={related.id}
            style={styles.relatedCard}
            onPress={() => navigation.push('ArtifactDetail', { artifactId: related.id })}
          >
            <View style={styles.relatedBadge}>
              <Text style={styles.relatedBadgeText}>{related.floorLabel}</Text>
            </View>
            <View style={styles.relatedIconZone}>
              <Image
                source={getArtifactImageSource(related.id)}
                style={styles.relatedImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.relatedCopy}>
              <Text style={styles.relatedEra}>{related.era}</Text>
              <Text style={styles.relatedCardTitle}>{related.title}</Text>
              <Text style={styles.relatedMeta}>{getArtifactCategory(related)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoTile}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  fallbackCard: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  fallbackTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  backButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  backButtonText: {
    color: colors.surface,
    fontWeight: '700',
  },
  hero: {
    minHeight: 260,
    borderRadius: radius.lg,
    backgroundColor: '#D8CCA5',
    borderWidth: 2,
    borderColor: '#2A9DFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  floatingIconButton: {
    position: 'absolute',
    top: spacing.sm,
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(128,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  floatingIconText: {
    color: colors.surfaceSoft,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '700',
  },
  leftAction: {
    left: spacing.sm,
  },
  rightAction: {
    right: spacing.sm,
    backgroundColor: '#E3D8B7',
  },
  favoriteIcon: {
    color: colors.accent,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '700',
  },
  heroDiscOuter: {
    width: 208,
    height: 208,
    borderRadius: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: 400,
    height: 400,
  },
  era: {
    color: colors.accentSecondary,
    fontSize: 16,
    marginTop: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 34,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  meta: {
    color: colors.textSoft,
    fontSize: 15,
    fontStyle: 'italic',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    borderRadius: radius.pill,
    backgroundColor: '#F0D3CD',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    color: '#B35A4B',
    fontSize: 12,
  },
  audioCard: {
    minHeight: 92,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: colors.surfaceSoft,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '700',
  },
  audioContent: {
    flex: 1,
    gap: 4,
  },
  audioTitle: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '700',
  },
  audioProgressTrack: {
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.26)',
    overflow: 'hidden',
  },
  audioProgressFill: {
    height: '100%',
    backgroundColor: '#DDB0A6',
  },
  audioTime: {
    color: '#E4CCC6',
    fontSize: 12,
  },
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  dividerRow: {
    paddingVertical: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(92, 15, 15, 0.28)',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  infoTile: {
    width: '47.8%',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.15)',
    padding: spacing.md,
    gap: 4,
  },
  infoLabel: {
    color: '#9E8B76',
    fontSize: 11,
  },
  infoValue: {
    color: colors.text,
    fontSize: 15,
  },
  relatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  relatedLine: {
    width: 26,
    height: 2,
    backgroundColor: colors.accent,
  },
  relatedTitle: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  relatedRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  relatedCard: {
    width: 154,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.15)',
    overflow: 'hidden',
  },
  relatedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    borderRadius: radius.pill,
    backgroundColor: '#F4D4CF',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  relatedBadgeText: {
    color: '#CA6D5D',
    fontSize: 10,
  },
  relatedIconZone: {
    minHeight: 88,
    backgroundColor: '#E7DDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedImage: {
    width: 66,
    height: 66,
  },
  relatedCopy: {
    padding: 10,
    gap: 2,
  },
  relatedEra: {
    color: '#A27E70',
    fontSize: 10,
  },
  relatedCardTitle: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 16,
  },
  relatedMeta: {
    color: colors.textSoft,
    fontSize: 10,
  },
});
