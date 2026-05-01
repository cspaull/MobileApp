import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '../components/Screen';
import { JourneyStop, journeyPlans } from '../data/museumData';
import { useAppContext } from '../state/AppContext';
import { colors, radius, spacing } from '../theme/theme';

const options = ['1 hour', '2 hours', '3 hours', '6 hours'] as const;

type ScheduleMode = 'choose' | 'recommended' | 'customize';

type AssistantPlan = {
  summary: string;
  stops: JourneyStop[];
};

const customSuggestions = [
  'We have one wheelchair user and prefer fewer stairs.',
  'Family visit with children, we want a shorter route.',
  'Focus on war history and key highlights.',
];

export function ScheduleScreen() {
  const [mode, setMode] = useState<ScheduleMode>('choose');
  const [selectedDuration, setSelectedDuration] = useState<(typeof options)[number]>('1 hour');
  const [request, setRequest] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState('');
  const { completeJourney } = useAppContext();

  const plan = journeyPlans.find((entry) => entry.duration === selectedDuration) ?? journeyPlans[0];
  const customPlan = useMemo(() => buildCustomPlan(submittedRequest), [submittedRequest]);

  if (mode === 'choose') {
    return (
      <Screen contentStyle={styles.choiceScreenContent} variant="dark">
        <View style={styles.choiceScreen}>
          <View style={styles.patternOverlay} pointerEvents="none">
            <View style={[styles.patternLine, styles.patternLinePrimary]} />
            <View style={[styles.patternLine, styles.patternLineSecondary]} />
            <View style={[styles.patternLine, styles.patternLineThird]} />
            <View style={[styles.patternLine, styles.patternLineFourth]} />
          </View>

          <View style={styles.choiceHero}>
            <Image source={require('../../assets/museumlog2.png')} style={styles.choiceLogo} />
            <Text style={styles.choiceMuseumTitle}>HO CHI MINH CITY MUSEUM</Text>
            <Text style={styles.choiceMuseumSubtitle}>
              Choose how you want to create your itinerary
            </Text>
            <Text style={styles.choiceQuestion}>How would you like to{'\n'}plan your visit ?</Text>
          </View>

          <View style={styles.choiceCardList}>
            <ChoiceCard
              iconText="P"
              title="CUSTOMIZE YOUR OWN"
              subtitle="Build your own itinerary base on your interests"
              onPress={() => setMode('customize')}
            />
            <ChoiceCard
              iconText="M"
              title="MUSEUM RECOMMENDATION"
              subtitle="Let us suggest the best route for you"
              onPress={() => setMode('recommended')}
            />
          </View>

          <Text style={styles.choiceHint}>i You can change this later.</Text>
        </View>
      </Screen>
    );
  }

  if (mode === 'customize') {
    return (
      <Screen scrollable={false} contentStyle={styles.screenContent}>
        <View style={styles.screenBody}>
          <ImageBackground
            source={require('../../assets/backgr.png')}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <View style={styles.customHeroContent}>
              <Image source={require('../../assets/museumlog2.png')} style={styles.customLogo} />
              <Text style={styles.customMuseumTitle}>HO CHI MINH CITY MUSEUM</Text>
              <Text style={styles.customMuseumSubtitle}>
                Build your own itinerary base on your interests
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.customBody}>
            <ScrollView
              style={styles.customChatScroll}
              contentContainerStyle={styles.customChatScrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.assistantRow}>
                <View style={styles.assistantBadge}>
                  <Text style={styles.assistantBadgeText}>M</Text>
                </View>
                <View style={styles.assistantBubble}>
                  <Text style={styles.assistantBubbleText}>
                    {submittedRequest
                      ? customPlan.summary
                      : 'Hi! I am your assistant, what kind of experience are you looking for ?'}
                  </Text>
                </View>
              </View>

              {submittedRequest ? (
                <>
                  <View style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{submittedRequest}</Text>
                  </View>
                  <View style={styles.customPlanCard}>
                    <Text style={styles.customPlanTitle}>Suggested Route</Text>
                    {customPlan.stops.map((stop) => (
                      <View key={stop.id} style={styles.customPlanStop}>
                        <Text style={styles.customPlanTime}>{stop.timeLabel}</Text>
                        <View style={styles.customPlanCopy}>
                          <Text style={styles.customPlanStopTitle}>{stop.title}</Text>
                          <Text style={styles.customPlanStopDesc}>{stop.description}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <Pressable style={styles.completeButton} onPress={completeJourney}>
                    <Text style={styles.completeButtonText}>Use This Itinerary</Text>
                  </Pressable>
                </>
              ) : (
                <View style={styles.suggestionWrap}>
                  {customSuggestions.map((suggestion) => (
                    <Pressable
                      key={suggestion}
                      style={styles.suggestionChip}
                      onPress={() => {
                        setRequest(suggestion);
                        setSubmittedRequest(suggestion);
                      }}
                    >
                      <Text style={styles.suggestionChipText}>{suggestion}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </ScrollView>

            <View style={styles.customFooter}>
              <Pressable style={styles.changeLaterButton} onPress={() => setMode('choose')}>
                <Text style={styles.changeLaterText}>Change planning style</Text>
              </Pressable>

              <View style={styles.inputBar}>
                <TextInput
                  value={request}
                  onChangeText={setRequest}
                  placeholder="Type your request..."
                  placeholderTextColor="#BCB7AD"
                  style={styles.inputBarField}
                />
                <Pressable
                  style={styles.sendButton}
                  onPress={() => {
                    const trimmed = request.trim();
                    if (!trimmed) {
                      return;
                    }
                    setSubmittedRequest(trimmed);
                  }}
                >
                  <Text style={styles.sendButtonText}>➤</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scrollable={false} contentStyle={styles.screenContent}>
      <View style={styles.screenBody}>
        <ImageBackground
          source={require('../../assets/backgr.png')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroEyebrow}>SCHEDULE</Text>
              <Text style={styles.heroSubtitle}>SUGGESTED PLACES TO VISIT</Text>
              <Text style={styles.heroTitle}>Your Journey</Text>
            </View>
            <View style={styles.heroIconBox}>
              <Image source={require('../../assets/Save.png')} resizeMode="contain" />
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

        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.contentScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timelineWrap}>
            <Pressable style={styles.changeModeInline} onPress={() => setMode('choose')}>
              <Text style={styles.changeModeInlineText}>Change planning style</Text>
            </Pressable>

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
        </ScrollView>
      </View>
    </Screen>
  );
}

function ChoiceCard({
  iconText,
  title,
  subtitle,
  onPress,
}: {
  iconText: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.choiceCard} onPress={onPress}>
      <View style={styles.choiceIconCircle}>
        <Text style={styles.choiceIconText}>{iconText}</Text>
      </View>
      <View style={styles.choiceCardCopy}>
        <Text style={styles.choiceCardTitle}>{title}</Text>
        <Text style={styles.choiceCardSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.choiceArrow}>›</Text>
    </Pressable>
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

function buildCustomPlan(request: string): AssistantPlan {
  const normalized = request.toLowerCase();
  const wantsAccessible =
    normalized.includes('wheelchair') ||
    normalized.includes('disab') ||
    normalized.includes('khuyet tat') ||
    normalized.includes('khuyết tật') ||
    normalized.includes('stairs') ||
    normalized.includes('cau thang') ||
    normalized.includes('cầu thang') ||
    normalized.includes('accessible');
  const wantsShort =
    normalized.includes('short') ||
    normalized.includes('quick') ||
    normalized.includes('1 hour') ||
    normalized.includes('ngan') ||
    normalized.includes('ngắn');
  const wantsFamily =
    normalized.includes('family') ||
    normalized.includes('children') ||
    normalized.includes('kids') ||
    normalized.includes('tre em') ||
    normalized.includes('trẻ em');
  const wantsWar =
    normalized.includes('war') ||
    normalized.includes('history') ||
    normalized.includes('resistance');

  if (wantsAccessible) {
    return {
      summary:
        'I recommend an accessibility-friendly route focused on the 1st floor, with fewer stair transitions and comfortable rest points.',
      stops: [
        {
          id: 'lobby',
          title: 'Main Lobby & Information',
          description: 'Collect support information and confirm the easiest route through the museum.',
          timeLabel: '0:00',
        },
        {
          id: 'room-101',
          title: 'Room 101 - History of Establishment',
          description: 'A calm starting gallery with a straightforward path and broad viewing areas.',
          timeLabel: '0:20',
        },
        {
          id: 'room-102',
          title: 'Room 102 - Old Saigon Commerce',
          description: 'Continue on the same floor to avoid extra movement between levels.',
          timeLabel: '0:45',
        },
        {
          id: 'cafe',
          title: 'Museum Cafe',
          description: 'Take a seated break before deciding whether to continue to other sections.',
          timeLabel: '1:10',
        },
      ],
    };
  }

  if (wantsFamily || wantsShort) {
    return {
      summary:
        'Here is a shorter, family-friendly route with popular highlights and enough time for breaks.',
      stops: [
        {
          id: 'lobby',
          title: 'Main Lobby & Information',
          description: 'Start with a quick orientation and map for the group.',
          timeLabel: '0:00',
        },
        {
          id: 'room-105',
          title: 'Room 105 - Dong Son Antiquities',
          description: 'A strong visual stop with signature artifacts that works well for children and first-time visitors.',
          timeLabel: '0:15',
        },
        {
          id: 'room-104',
          title: 'Room 104 - Colonial Architecture',
          description: 'Explore models and displays without making the route too long.',
          timeLabel: '0:40',
        },
        {
          id: 'cafe',
          title: 'Museum Cafe',
          description: 'End with a convenient break and review favorite moments.',
          timeLabel: '1:00',
        },
      ],
    };
  }

  if (wantsWar) {
    return {
      summary:
        'I suggest a story-driven route that moves from city context into resistance-era collections and key wartime objects.',
      stops: [
        {
          id: 'lobby',
          title: 'Main Lobby & Information',
          description: 'Begin with historical orientation for the museum timeline.',
          timeLabel: '0:00',
        },
        {
          id: 'room-102',
          title: 'Room 102 - Old Saigon Commerce',
          description: 'Set the city context before moving into conflict-era galleries.',
          timeLabel: '0:30',
        },
        {
          id: 'room-203',
          title: 'Room 203 - Royal Memory',
          description: 'Bridge the dynastic and political story before resistance history.',
          timeLabel: '1:05',
        },
        {
          id: 'room-204',
          title: 'Room 204 - Resistance Memory',
          description: 'Finish with the strongest wartime collection and reflective audio guide moments.',
          timeLabel: '1:45',
        },
      ],
    };
  }

  return {
    summary:
      'I created a balanced museum route that mixes city history, standout artifacts, and a comfortable pace.',
    stops: [
      {
        id: 'lobby',
        title: 'Main Lobby & Information',
        description: 'Start with orientation and choose a comfortable pace for your visit.',
        timeLabel: '0:00',
      },
      {
        id: 'room-101',
        title: 'Room 101 - History of Establishment',
        description: 'Get a clear introduction to the museum and the city memory archive.',
        timeLabel: '0:20',
      },
      {
        id: 'room-105',
        title: 'Room 105 - Dong Son Antiquities',
        description: 'Visit one of the museum highlights and its most iconic objects.',
        timeLabel: '0:50',
      },
      {
        id: 'room-203',
        title: 'Room 203 - Royal Memory',
        description: 'Add a stronger cultural and dynastic layer to the itinerary.',
        timeLabel: '1:25',
      },
      {
        id: 'cafe',
        title: 'Museum Cafe',
        description: 'Take a break and save your favorite artifacts afterward.',
        timeLabel: '2:00',
      },
    ],
  };
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
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  patternLine: {
    position: 'absolute',
    width: '170%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    left: '-35%',
  },
  patternLinePrimary: {
    top: '20%',
    transform: [{ rotate: '45deg' }],
  },
  patternLineSecondary: {
    top: '42%',
    transform: [{ rotate: '45deg' }],
  },
  patternLineThird: {
    top: '28%',
    transform: [{ rotate: '-45deg' }],
  },
  patternLineFourth: {
    top: '56%',
    transform: [{ rotate: '-45deg' }],
  },
  choiceScreenContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  choiceScreen: {
    flex: 1,
    alignItems: 'center',
  },
  choiceHero: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  choiceLogo: {
    width: 120,
    height: 90,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },
  choiceMuseumTitle: {
    color: colors.authText,
    fontSize: 25,
    textAlign: 'center',
  },
  choiceMuseumSubtitle: {
    color: colors.authText,
    opacity: 0.85,
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
  choiceQuestion: {
    color: colors.authText,
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  choiceCardList: {
    width: '100%',
    gap: spacing.lg,
    marginTop: spacing.xxl,
  },
  choiceCard: {
    minHeight: 148,
    borderRadius: radius.lg,
    backgroundColor: '#7D1212',
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  choiceIconCircle: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    backgroundColor: colors.authText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceIconText: {
    color: colors.accent,
    fontSize: 30,
    fontWeight: '800',
  },
  choiceCardCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  choiceCardTitle: {
    color: colors.authText,
    fontSize: 25,
    lineHeight: 29,
  },
  choiceCardSubtitle: {
    color: '#F2D7C8',
    fontSize: 15,
    lineHeight: 20,
  },
  choiceArrow: {
    color: colors.authText,
    fontSize: 30,
  },
  choiceHint: {
    color: colors.authText,
    fontSize: 20,
    marginTop: spacing.xxl,
    textAlign: 'center',
  },
  hero: {
    height: 200,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    justifyContent: 'space-between',
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
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroEyebrow: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: colors.surfaceSoft,
    fontSize: 15,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
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
    fontSize: 15,
    fontWeight: '600',
  },
  optionTextActive: {
    color: colors.surface,
  },
  timelineWrap: {
    backgroundColor: '#E6DFC2',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  changeModeInline: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0D3CD',
  },
  changeModeInlineText: {
    color: colors.accentSecondary,
    fontSize: 15,
    fontWeight: '600',
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
    fontSize: 15,
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
    fontSize: 15,
    fontWeight: '700',
  },
  stopTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  stopDescription: {
    color: colors.textSoft,
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 20,
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
    fontSize: 15,
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
    fontSize: 20,
    fontWeight: '700',
  },
  timelineIconImage: {
    width: 25,
    height: 25,
    tintColor: colors.surface,
  },
  customHeroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -4 }],
  },
  customLogo: {
    width: 110,
    height: 80,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },
  customMuseumTitle: {
    color: colors.authText,
    fontSize: 25,
    textAlign: 'center',
  },
  customMuseumSubtitle: {
    color: colors.authText,
    opacity: 0.88,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
  },
  customBody: {
    flex: 1,
    backgroundColor: '#D8CFAD',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    marginTop: -12,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  customChatScroll: {
    flex: 1,
  },
  customChatScrollContent: {
    paddingBottom: spacing.md,
  },
  assistantRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  assistantBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  assistantBadgeText: {
    color: colors.authText,
    fontSize: 15,
    fontWeight: '700',
  },
  assistantBubble: {
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  assistantBubbleText: {
    color: colors.accent,
    fontSize: 20,
    lineHeight: 26,
  },
  userBubble: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#F0E6C8',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxWidth: '88%',
  },
  userBubbleText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
  },
  suggestionWrap: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  suggestionChip: {
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  suggestionChipText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 20,
  },
  customPlanCard: {
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md,
  },
  customPlanTitle: {
    color: colors.accent,
    fontSize: 25,
    fontWeight: '700',
  },
  customPlanStop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  customPlanTime: {
    color: colors.accentSecondary,
    fontSize: 15,
    width: 46,
  },
  customPlanCopy: {
    flex: 1,
    gap: 2,
  },
  customPlanStopTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  customPlanStopDesc: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 20,
  },
  customFooter: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  changeLaterButton: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  changeLaterText: {
    color: colors.accent,
    fontSize: 15,
  },
  inputBar: {
    minHeight: 52,
    borderRadius: radius.pill,
    backgroundColor: '#EAD8B9',
    paddingLeft: spacing.lg,
    paddingRight: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  inputBarField: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    paddingVertical: 0,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.authText,
    fontSize: 20,
    fontWeight: '800',
  },
});
