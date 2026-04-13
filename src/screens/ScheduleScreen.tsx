import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, Pill, PrimaryButton, TitleBlock } from '../components/Ui';
import { journeyPlans } from '../data/museumData';
import { useAppContext } from '../state/AppContext';
import { colors, spacing } from '../theme/theme';

const options = ['1 hour', '2 hours', '3 hours', '6 hours'] as const;

export function ScheduleScreen() {
  const [selectedDuration, setSelectedDuration] = useState<(typeof options)[number]>('1 hour');
  const { completeJourney } = useAppContext();

  const plan = journeyPlans.find((entry) => entry.duration === selectedDuration) ?? journeyPlans[0];

  return (
    <Screen>
      <TitleBlock
        eyebrow="Schedule"
        title="Suggested places to visit"
        subtitle="Choose the route length that best matches your museum pace."
      />

      <View style={styles.optionsRow}>
        {options.map((option) => (
          <Pill
            key={option}
            label={option}
            active={selectedDuration === option}
            onPress={() => setSelectedDuration(option)}
          />
        ))}
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Your Journey</Text>
        <Text style={styles.sectionSubtitle}>
          Start: {plan.startLabel} • End: {plan.endLabel}
        </Text>

        {plan.stops.map((stop, index) => (
          <View key={stop.id} style={styles.stopRow}>
            <View style={styles.timeline}>
              <Text style={styles.timeLabel}>{stop.timeLabel}</Text>
              {index < plan.stops.length - 1 ? <View style={styles.timelineLine} /> : null}
            </View>
            <View style={styles.stopCard}>
              <Text style={styles.stopTitle}>{stop.title}</Text>
              <Text style={styles.stopDescription}>{stop.description}</Text>
              {stop.highlight ? <Text style={styles.stopHighlight}>{stop.highlight}</Text> : null}
            </View>
          </View>
        ))}

        <PrimaryButton label="Mark Journey Completed" onPress={completeJourney} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  stopRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timeline: {
    width: 60,
    alignItems: 'center',
  },
  timeLabel: {
    color: colors.accent,
    fontWeight: '800',
  },
  timelineLine: {
    marginTop: spacing.xs,
    flex: 1,
    width: 2,
    backgroundColor: colors.borderSoft,
  },
  stopCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.md,
    backgroundColor: colors.surface,
    gap: 6,
  },
  stopTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  stopDescription: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  stopHighlight: {
    color: colors.accent,
    fontWeight: '700',
  },
});
