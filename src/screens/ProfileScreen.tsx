import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, Pill, PrimaryButton, RowSetting, StatTile, TitleBlock } from '../components/Ui';
import { artifacts } from '../data/museumData';
import { useAppContext } from '../state/AppContext';
import { colors, spacing } from '../theme/theme';

export function ProfileScreen() {
  const { user, stats, favorites, updatePreferences, logout } = useAppContext();
  const favoriteArtifacts = artifacts.filter((artifact) => favorites.includes(artifact.id));

  return (
    <Screen>
      <TitleBlock
        eyebrow={user.authMode === 'guest' ? 'Guest' : 'Profile'}
        title={user.authMode === 'guest' ? 'Guest Mode' : user.fullName}
        subtitle={user.authMode === 'guest' ? 'Not logged in' : user.email}
      />

      <View style={styles.statsRow}>
        <StatTile value={String(stats.favoriteCount)} label="Favorite" />
        <StatTile value={String(stats.viewedCount)} label="Viewed" />
        <StatTile value={String(stats.visitCount)} label="Visit" />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Favorite Artifacts</Text>
        {favoriteArtifacts.length ? (
          favoriteArtifacts.map((artifact) => (
            <View key={artifact.id} style={styles.favoriteRow}>
              <View style={styles.favoriteCopy}>
                <Text style={styles.favoriteTitle}>{artifact.title}</Text>
                <Text style={styles.favoriteMeta}>{artifact.floorLabel}</Text>
              </View>
              <Pill label={artifact.badge} active />
            </View>
          ))
        ) : (
          <Text style={styles.emptyState}>
            You do not have a favorite artifact yet. Save one from the artifact detail view.
          </Text>
        )}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Customize</Text>
        <RowSetting
          label="Notifications"
          value={user.notificationsEnabled}
          onValueChange={(value) => updatePreferences({ notificationsEnabled: value })}
        />
        <View style={styles.languageRow}>
          <Text style={styles.languageLabel}>Language</Text>
          <Pill
            label={user.language}
            active
            onPress={() =>
              updatePreferences({ language: user.language === 'English' ? 'Vietnamese' : 'English' })
            }
          />
        </View>
      </Card>

      <PrimaryButton label="Log Out" onPress={logout} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  favoriteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  favoriteCopy: {
    flex: 1,
    gap: 4,
  },
  favoriteTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  favoriteMeta: {
    color: colors.textSoft,
  },
  emptyState: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageLabel: {
    color: colors.text,
    fontWeight: '600',
  },
});
