import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { Screen } from '../components/Screen';
import { journeyPlans } from '../data/museumData';
import { useAppContext } from '../state/AppContext';
import { colors, radius, spacing } from '../theme/theme';

const options = ['1 hour', '2 hours', '3 hours', '6 hours'] as const;

export function ScheduleScreen() {
  const [selectedDuration, setSelectedDuration] = useState<(typeof options)[number]>('1 hour');
  const { completeJourney } = useAppContext();

  const plan = journeyPlans.find((entry) => entry.duration === selectedDuration) ?? journeyPlans[0];

  return (
    <Screen contentStyle={styles.screenContent}>
      <View style={styles.hero}>
        <ImageBackground
          source={require('../../assets/backgr.png')}
          style={{ flex: 1 }}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroEyebrow}>SCHEDULE</Text>
              <Text style={styles.heroSubtitle}>SUGGESTED PLACES TO VISIT</Text>
              <Text style={styles.heroTitle}>Your Journey</Text>
            </View>
            <View style={styles.heroIconBox}>
            <Image
              source={require('../../assets/Save.png')} 
              resizeMode="contain"
            />
            </View>
          </View>

          <View style={styles.optionRow}>
            {options.map((option) => {
              const active = selectedDuration === option;

              return (
                <Pressable
                  key={option}
                  style={[styles.optionPill, active && styles.optionPillActive]}
                  onPress={() => setSelectedDuration(option)}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ImageBackground>
      </View>

      <View style={styles.timelineWrap}>
        {plan.stops.map((stop, index) => (
          <View key={stop.id} style={styles.stopRow}>
            <View style={styles.timelineColumn}>
              <View style={styles.timelineIcon}>
              <Image
                source={iconForStop(stop)}
                style={styles.timelineIconImage}
                resizeMode="contain"
              />
              </View>
              {index < plan.stops.length - 1 ? <View style={styles.timelineLine} /> : null}
            </View>

            <View style={styles.stopCard}>
              <View style={styles.stopTopRow}>
                <Text style={styles.stopLabel}>
                  {index === 0
                    ? 'STARTING POINT'
                    : index === plan.stops.length - 1
                      ? 'END POINT'
                      : `LOCATION ${index}`}
                </Text>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeBadgeText}>{stop.timeLabel}</Text>
                </View>
              </View>
              <Text style={styles.stopTitle}>{stop.title}</Text>
              <Text style={styles.stopDescription}>{stop.description}</Text>
              <View style={styles.stopTags}>
                <Tag label={stop.title.split(' - ')[0]} />
                {stop.highlight ? <Tag label={stop.highlight} /> : null}
              </View>
            </View>
          </View>
        ))}

        <Pressable style={styles.completeButton} onPress={completeJourney}>
          <Text style={styles.completeButtonText}>Mark Journey Completed</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

function iconForStop(stop: { id: string; description: string; title: string }) {
  const text = `${stop.id} ${stop.description} ${stop.title}`.toLowerCase();

  if (text.includes('lobby')) return require('../../assets/OpenDoor.png');
  if (text.includes('cafe')) return require('../../assets/hot.png');
  if (text.includes('gift')) return require('../../assets/bear.png');
  if (text.includes('sword')) return require('../../assets/Sword.png');
  if (text.includes('drums')) return require('../../assets/drum.png');
  if (text.includes('loop')) return require('../../assets/Balcony.png');
  return require('../../assets/Document.png');
}

const styles = StyleSheet.create({
  screenContent: {
    padding: 0,
    gap: 0,
  },
  hero: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  
  heroImage: {
    opacity: 1, // Chỉnh độ "chìm" của hình (0.1 đến 0.5 là đẹp)
    width: '130%',
    height: '120%',
    resizeMode: 'contain', // Hoặc 'contain' tùy vào tỉ lệ hình bạn muốn
    // textAlign: 'right', 
    // Nếu muốn hình nằm lệch sang phải như mẫu, có thể dùng các thuộc tính sau:
    top: 0,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroEyebrow: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: colors.surfaceSoft,
    fontSize: 13,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 2,
  },
  heroIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconText: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  optionPill: {
    minHeight: 28,
    borderRadius: radius.pill,
    backgroundColor: '#F1E9D1',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionPillActive: {
    backgroundColor: '#B9402A',
  },
  optionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextActive: {
    color: colors.surface,
  },
  timelineWrap: {
    backgroundColor: '#E6DFC2',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  stopRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineColumn: {
    width: 32,
    alignItems: 'center',
  },
  timelineIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineIconText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '700',
  },
  timelineLine: {
    flex: 1,
    width: 3,
    backgroundColor: '#B78661',
    marginTop: 2,
  },
  stopCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(92, 15, 15, 0.14)',
    padding: spacing.sm,
    gap: 3,
  },
  stopTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopLabel: {
    color: '#B05546',
    fontSize: 11,
    fontWeight: '700',
  },
  timeBadge: {
    borderRadius: radius.pill,
    backgroundColor: '#F9E1A8',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timeBadgeText: {
    color: '#C87118',
    fontSize: 10,
    fontWeight: '700',
  },
  stopTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  stopDescription: {
    color: colors.textSoft,
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  stopTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  tag: {
    borderRadius: radius.pill,
    backgroundColor: '#F4D4CF',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: colors.accentSecondary,
    fontSize: 11,
  },
  completeButton: {
    marginTop: spacing.sm,
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
  timelineIconImage: {
    width: 25,
    height: 25,
    tintColor: colors.surface, // 👉 để icon trắng trên nền đỏ
  },
});
