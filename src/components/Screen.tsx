import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors, spacing } from '../theme/theme';

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  contentStyle?: ViewStyle;
  variant?: 'light' | 'dark';
};

export function Screen({
  children,
  scrollable = true,
  contentStyle,
  variant = 'light',
}: Props) {
  const gradientColors =
    variant === 'dark'
      ? ([colors.authBackground, colors.accentSecondary, colors.authBackground] as const)
      : ([colors.backgroundAlt, colors.background, '#F7F2E3'] as const);
  const body = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.scrollContent, contentStyle]}>{children}</View>
  );

  return (
    <LinearGradient colors={gradientColors} style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          {body}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
});
