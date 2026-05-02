import React from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing } from '../theme/theme';

export function TitleBlock({
  eyebrow,
  title,
  subtitle,
  variant = 'light',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
}) {
  return (
    <View style={styles.titleWrap}>
      {eyebrow ? (
        <Text style={[styles.eyebrow, variant === 'dark' ? styles.eyebrowDark : undefined]}>
          {eyebrow}
        </Text>
      ) : null}
      <Text style={[styles.title, variant === 'dark' ? styles.titleDark : undefined]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, variant === 'dark' ? styles.subtitleDark : undefined]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export function Card({
  children,
  style,
  variant = 'light',
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'light' | 'dark';
}) {
  return <View style={[styles.card, variant === 'dark' ? styles.cardDark : undefined, style]}>{children}</View>;
}

export function Pill({
  label,
  active = false,
  onPress,
  variant = 'light',
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: 'light' | 'dark';
}) {
  const isDark = variant === 'dark';
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        active
          ? isDark
            ? styles.pillActiveDark
            : styles.pillActive
          : isDark
            ? styles.pillIdleDark
            : styles.pillIdle,
      ]}
    >
      <Text
        style={[
          styles.pillText,
          active
            ? isDark
              ? styles.pillTextActiveDark
              : styles.pillTextActive
            : isDark
              ? styles.pillTextIdleDark
              : styles.pillTextIdle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  tone = 'light',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        variant === 'primary'
          ? isDark
            ? styles.primaryButtonDark
            : styles.primaryButton
          : isDark
            ? styles.secondaryButtonDark
            : styles.secondaryButton,
      ]}
    >
      <Text
        style={
          variant === 'primary'
            ? isDark
              ? styles.primaryButtonTextDark
              : styles.primaryButtonText
            : isDark
              ? styles.secondaryButtonTextDark
              : styles.secondaryButtonText
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function LabeledInput({
  label,
  tone = 'light',
  ...props
}: TextInputProps & { label: string; tone?: 'light' | 'dark' }) {
  const isDark = tone === 'dark';
  return (
    <View style={styles.inputWrap}>
      <Text style={[styles.inputLabel, isDark ? styles.inputLabelDark : undefined]}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={isDark ? 'rgba(218, 212, 181, 0.6)' : colors.textSoft}
        style={[styles.input, isDark ? styles.inputDark : undefined]}
      />
    </View>
  );
}

export function StatTile({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Card style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

export function RowSetting({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        trackColor={{ false: '#334155', true: '#F2D16B' }}
        thumbColor={value ? colors.accent : colors.textMuted}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrap: {
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontWeight: '700',
  },
  title: {
    color: colors.accent,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  eyebrowDark: {
    color: colors.authText,
  },
  titleDark: {
    color: colors.authText,
  },
  subtitleDark: {
    color: colors.authText,
    opacity: 0.85,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    gap: spacing.sm,
  },
  cardDark: {
    backgroundColor: colors.authSurface,
    borderColor: 'rgba(218, 212, 181, 0.35)',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  pillIdle: {
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
  },
  pillActive: {
    borderColor: colors.accentSoft,
    backgroundColor: colors.accentSoft,
  },
  pillIdleDark: {
    borderColor: 'rgba(218, 212, 181, 0.35)',
    backgroundColor: 'transparent',
  },
  pillActiveDark: {
    borderColor: colors.accentSoft,
    backgroundColor: colors.accentSoft,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '700',
  },
  pillTextIdle: {
    color: colors.textMuted,
  },
  pillTextActive: {
    color: colors.accent,
  },
  pillTextIdleDark: {
    color: colors.authText,
  },
  pillTextActiveDark: {
    color: colors.accent,
  },
  button: {
    minHeight: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.accent,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  primaryButtonDark: {
    backgroundColor: colors.accentSoft,
  },
  secondaryButtonDark: {
    borderWidth: 1,
    borderColor: 'rgba(218, 212, 181, 0.5)',
    backgroundColor: 'transparent',
  },
  primaryButtonText: {
    color: colors.authText,
    fontWeight: '800',
    fontSize: 20,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 20,
  },
  primaryButtonTextDark: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 20,
  },
  secondaryButtonTextDark: {
    color: colors.authText,
    fontWeight: '700',
    fontSize: 20,
  },
  inputWrap: {
    gap: spacing.xs,
  },
  inputLabel: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accentSoft,
    paddingHorizontal: spacing.md,
    color: colors.text,
    backgroundColor: colors.surfaceSoft,
  },
  inputDark: {
    borderColor: colors.authText,
    color: colors.authText,
    backgroundColor: 'rgba(196, 187, 154, 0.1)',
  },
  inputLabelDark: {
    color: colors.authText,
  },
  statTile: {
    flex: 1,
    minWidth: 100,
  },
  statValue: {
    color: colors.textMuted,
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  settingRow: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
});
