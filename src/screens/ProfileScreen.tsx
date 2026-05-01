import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { Screen } from '../components/Screen';
import { artifacts } from '../data/museumData';
import { useAppContext } from '../state/AppContext';
import { colors, radius, spacing } from '../theme/theme';

export function ProfileScreen() {
  const { user, stats, favorites, updatePreferences, logout } = useAppContext();
  const favoriteArtifacts = artifacts.filter((artifact) => favorites.includes(artifact.id));

  return (
    <Screen contentStyle={styles.screenContent}>
      <View style={styles.header}>
        <View style={styles.profileIconBox}>
        <Image
          source={require('../../assets/guesticon.png')} // 👉 đổi đúng path của bạn
          resizeMode="contain"
        />
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>
            {user.authMode === 'guest' ? 'GUEST' : user.fullName.toUpperCase()}
          </Text>
          <Text style={styles.profileMeta}>
            {user.authMode === 'guest' ? 'Not logged in' : user.email}
          </Text>
          <View style={styles.modePill}>
            <Text style={styles.modePillText}>
              {user.authMode === 'guest' ? 'Guest Mode' : user.language}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pageBody}>
        <View style={styles.statsRow}>
          <StatBox label="Favourite" value={stats.favoriteCount} />
          <StatBox label="Viewed" value={stats.viewedCount} />
          <StatBox label="Visit" value={stats.visitCount} />
        </View>

        <SectionHeader title="Favourite Artifacts" />
        {favoriteArtifacts.length ? (
          favoriteArtifacts.map((artifact) => (
            <View key={artifact.id} style={styles.favoriteItem}>
              <View>
                <Text style={styles.favoriteTitle}>{artifact.title}</Text>
                <Text style={styles.favoriteMeta}>{artifact.floorLabel}</Text>
              </View>
              <Text style={styles.rowChevron}>&gt;</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyBlock}>
            <Text style={styles.emptyText}>You do not have a favorite artifact yet.</Text>
            <Text style={styles.emptySubtext}>
              Press the button H when viewing an artifact to save it.
            </Text>
          </View>
        )}

        <SectionHeader title="Customize" />
        <SettingsRow
          icon={require('../../assets/bell.png')}
          title="Notification"
          subtitle="New events and exhibitions"
          onPress={() =>
            updatePreferences({ notificationsEnabled: !user.notificationsEnabled })
          }
        />

        <SettingsRow
          icon={require('../../assets/la.png')}
          title="Language"
          subtitle={user.language}
          onPress={() =>
            updatePreferences({ language: user.language === 'English' ? 'Vietnamese' : 'English' })
          }
        />

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.settingsRow} onPress={onPress}>
      <View style={styles.settingsIconWrap}>
        <Image
          source={icon}
          style={styles.settingsIconImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.settingsCopy}>
        <Text style={styles.settingsTitle}>{title}</Text>
        <Text style={styles.settingsSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.rowChevron}>&gt;</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    padding: 0,
    gap: 0,
    backgroundColor: '#E6DFC2',
  },
  header: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  profileIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    color: colors.surfaceSoft,
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
  },
  profileCopy: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: '400',
  },
  profileMeta: {
    color: '#E0BCB1',
    fontSize: 15,
    fontStyle: 'italic',
  },
  modePill: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 4,
  },
  modePillText: {
    color: colors.surface,
    fontSize: 15,
  },
  pageBody: {
    flexGrow: 1,
    backgroundColor: '#E6DFC2',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    minHeight: 84,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  statValue: {
    color: colors.textMuted,
    fontSize: 20,
    fontWeight: '300',
  },
  statLabel: {
    color: colors.accentSecondary,
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 2,
  },
  sectionLine: {
    width: 26,
    height: 2,
    backgroundColor: colors.accent,
  },
  sectionTitle: {
    color: colors.accent,
    fontSize: 25,
    fontWeight: '700',
  },
  emptyBlock: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
  },
  emptyText: {
    color: colors.textSoft,
    fontSize: 15,
    fontStyle: 'italic',
  },
  emptySubtext: {
    color: colors.textSoft,
    fontSize: 15,
    textAlign: 'center',
  },
  favoriteItem: {
    minHeight: 68,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.14)',
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  favoriteMeta: {
    color: colors.textSoft,
    fontSize: 15,
  },
  rowChevron: {
    color: colors.border,
    fontSize: 24,
    fontWeight: '700',
  },
  settingsRow: {
    minHeight: 74,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.14)',
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F8ECE9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    color: colors.accentSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  settingsCopy: {
    flex: 1,
  },
  settingsTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  settingsSubtitle: {
    color: colors.textSoft,
    fontSize: 15,
  },
  logoutButton: {
    marginTop: spacing.sm,
    minHeight: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D19C8F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.accentSecondary,
    fontSize: 20,
    fontWeight: '500',
  },
  settingsIconImage: {
    width: 18,
    height: 18,
    tintColor: colors.accentSecondary, // 👉 đổi màu nếu icon 1 màu
  },
});
