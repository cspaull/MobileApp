import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, Pill, PrimaryButton } from '../components/Ui';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppContext } from '../state/AppContext';
import { colors, spacing } from '../theme/theme';
import { getArtifactById, getRelatedArtifacts } from '../utils/museum';

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

  const relatedArtifacts = useMemo(
    () => (artifact ? getRelatedArtifacts(artifact.id) : []),
    [artifact],
  );

  useEffect(() => {
    setElapsedSeconds(0);
    setIsPlaying(false);
  }, [artifact?.id]);

  if (!artifact) {
    return (
      <Screen>
        <Card>
          <Text style={styles.title}>Artifact not found</Text>
          <PrimaryButton label="Back" onPress={() => navigation.goBack()} />
        </Card>
      </Screen>
    );
  }

  const progress = elapsedSeconds / artifact.audioDurationSeconds;
  const isFavorite = favorites.includes(artifact.id);

  return (
    <Screen>
      <PrimaryButton label="Back" onPress={() => navigation.goBack()} variant="secondary" />

      <Card>
        <Text style={styles.era}>{artifact.era}</Text>
        <Text style={styles.title}>{artifact.title}</Text>
        <Text style={styles.meta}>
          {artifact.dynastyOrCollection} • {artifact.floorLabel}, {artifact.roomCode}
        </Text>
        <View style={styles.tagsRow}>
          {artifact.tags.map((tag) => (
            <Pill key={tag} label={tag} active />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Audio Guide - English</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.max(progress * 100, 4)}%` }]} />
        </View>
        <Text style={styles.meta}>
          {elapsedSeconds}s / {artifact.audioDurationSeconds}s
        </Text>
        <PrimaryButton
          label={isPlaying ? 'Pause Audio' : 'Play Audio'}
          onPress={() => setIsPlaying((current) => !current)}
        />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Story</Text>
        <Text style={styles.body}>{artifact.summary}</Text>
        <Text style={styles.detailLine}>Material: {artifact.material}</Text>
        <Text style={styles.detailLine}>Size: {artifact.size}</Text>
        <Text style={styles.detailLine}>Origin: {artifact.origin}</Text>
        <PrimaryButton
          label={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
          onPress={() => toggleArtifactFavorite(artifact.id)}
          variant={isFavorite ? 'secondary' : 'primary'}
        />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Related Artifacts</Text>
        {relatedArtifacts.map((related) => (
          <Pressable
            key={related.id}
            onPress={() => navigation.push('ArtifactDetail', { artifactId: related.id })}
          >
            <View style={styles.relatedRow}>
              <Text style={styles.relatedTitle}>{related.title}</Text>
              <Text style={styles.meta}>{related.era}</Text>
            </View>
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  era: {
    color: colors.accentSoft,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  body: {
    color: colors.textMuted,
    lineHeight: 23,
  },
  detailLine: {
    color: colors.text,
    fontSize: 14,
  },
  relatedRow: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSoft,
    gap: 4,
  },
  relatedTitle: {
    color: colors.accent,
    fontWeight: '700',
  },
});
