import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { artifacts } from '../data/museumData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/theme';
import { getArtifactCategory, getArtifactImageSource } from '../utils/museum';

const overviewStats = [
  { label: 'Floors', value: '2', icon: require('../../assets/floor.png') },
  { label: 'Artifacts', value: '40,000', icon: require('../../assets/artifacts.png') },
  { label: 'Audio', value: '32', icon: require('../../assets/audio.png') },
];

const touristAreas = [
  { title: '1st floor', subtitle: 'City History' },
  { title: '2nd floor', subtitle: 'Resistance' },
];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const featuredArtifacts = artifacts.slice(0, 3);

  return (
    <Screen scrollable={false} contentStyle={styles.screenContent}>
      <View style={styles.screenBody}>
        <ImageBackground
          source={require('../../assets/backgr.png')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>WELCOME TO</Text>
            <Text style={styles.heroTitle}>Ho Chi Minh City{'\n'}Museum</Text>

            <View style={styles.heroChips}>
              <View style={styles.heroChip}>
                <Text style={styles.heroChipText}>65 Ly Tu Trong, District 1</Text>
              </View>
              <View style={styles.heroChip}>
                <Text style={styles.heroChipText}>8:00-17:00</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.contentScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pageBody}>
            <Pressable
              style={styles.journeyCard}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Schedule' })}
            >
              <View style={styles.journeyIcon}>
                <Image source={require('../../assets/uiw_map.png')} resizeMode="contain" />
              </View>
              <View style={styles.journeyCopy}>
                <Text style={styles.journeyTitle}>START YOUR JOURNEY</Text>
                <Text style={styles.journeySubtitle}>The suggested roadmap for you</Text>
              </View>
              <Text style={styles.journeyArrow}>&gt;</Text>
            </Pressable>

            <SectionHeader title="Museum Overview" />
            <View style={styles.statsRow}>
              {overviewStats.map((item) => (
                <View key={item.label} style={styles.statCard}>
                  <Image source={item.icon} style={styles.statImage} resizeMode="contain" />
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>

            <SectionHeader title="Tourist Area" />
            <View style={styles.areaRow}>
              {touristAreas.map((area) => (
                <View key={area.title} style={styles.areaCard}>
                  <Text style={styles.areaEyebrow}>{area.title}</Text>
                  <Text style={styles.areaTitle}>{area.subtitle}</Text>
                </View>
              ))}
            </View>

            <SectionHeader title="Popular Artifacts" />
            <View style={styles.artifactList}>
              {featuredArtifacts.map((artifact) => (
                <Pressable
                  key={artifact.id}
                  style={styles.artifactCard}
                  onPress={() => navigation.navigate('ArtifactDetail', { artifactId: artifact.id })}
                >
                  <View style={styles.artifactIconTile}>
                    <Image
                      source={getArtifactImageSource(artifact.id)}
                      style={styles.artifactPreview}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.artifactCopy}>
                    <Text style={styles.artifactTitle}>{artifact.title}</Text>
                    <Text style={styles.artifactMeta}>
                      {artifact.era} - {artifact.floorLabel}
                    </Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{getArtifactCategory(artifact)}</Text>
                    </View>
                  </View>
                  <Text style={styles.artifactChevron}>&gt;</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
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

const styles = StyleSheet.create({
  screenContent: {
    padding: 0,
    gap: 0,
    flex: 1,
  },
  screenBody: {
    flex: 1,
  },
  hero: {
    height: 300,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 25,
    justifyContent: 'flex-end',
    backgroundColor: colors.accent,
    overflow: 'hidden',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  contentScroll: {
    flex: 1,
    backgroundColor: '#E6DFC2',
  },
  contentScrollContent: {
    paddingBottom: 0,
  },
  heroContent: {
    transform: [{ translateY: -12 }],
  },
  heroEyebrow: {
    color: colors.surfaceSoft,
    opacity: 0.9,
    fontSize: 15,
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    fontStyle: 'italic',
    marginTop: 4,
  },
  heroChips: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginTop: spacing.lg,
  },
  heroChip: {
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroChipText: {
    color: colors.surface,
    fontSize: 15,
  },
  pageBody: {
    backgroundColor: '#E6DFC2',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  journeyCard: {
    minHeight: 92,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  journeyIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  journeyCopy: {
    flex: 1,
    gap: 2,
  },
  journeyTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '700',
  },
  journeySubtitle: {
    color: colors.surfaceSoft,
    fontSize: 15,
    fontStyle: 'italic',
  },
  journeyArrow: {
    color: colors.surfaceSoft,
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 'auto',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minHeight: 84,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statImage: {
    width: 24,
    height: 20,
  },
  statValue: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 15,
    fontStyle: 'italic',
  },
  areaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  areaCard: {
    flex: 1,
    minHeight: 86,
    borderRadius: radius.md,
    padding: spacing.md,
    justifyContent: 'space-between',
    backgroundColor: colors.accent,
  },
  areaEyebrow: {
    color: '#F6D3B5',
    fontSize: 15,
  },
  areaTitle: {
    color: colors.surface,
    fontSize: 18,
    lineHeight: 24,
  },
  artifactList: {
    gap: spacing.sm,
  },
  artifactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.15)',
    padding: spacing.md,
  },
  artifactIconTile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE6CD',
  },
  artifactPreview: {
    width: 36,
    height: 36,
  },
  artifactCopy: {
    flex: 1,
    gap: 2,
  },
  artifactTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  artifactMeta: {
    color: colors.textMuted,
    fontSize: 15,
    fontStyle: 'italic',
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: '#F4D4CF',
  },
  badgeText: {
    color: colors.accentSecondary,
    fontSize: 15,
  },
  artifactChevron: {
    color: colors.border,
    fontSize: 24,
    fontWeight: '700',
  },
});
