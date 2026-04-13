import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, LabeledInput, PrimaryButton, TitleBlock } from '../components/Ui';
import { useAppContext } from '../state/AppContext';
import { colors, spacing } from '../theme/theme';

export function AuthScreen() {
  const { signIn, continueAsGuest } = useAppContext();
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLabel = mode === 'sign-in' ? 'Sign In' : 'Sign Up';

  return (
    <Screen contentStyle={styles.content} variant="dark">
      <TitleBlock
        eyebrow="Ho Chi Minh City Museum"
        title="Log in to personalize your tour"
        subtitle="A museum companion app built from the provided prototype flow."
        variant="dark"
      />

      <Card variant="dark">
        <View style={styles.modeRow}>
          <Pressable onPress={() => setMode('sign-in')}>
            <Text style={[styles.modeText, mode === 'sign-in' && styles.modeTextActive]}>Sign In</Text>
          </Pressable>
          <Pressable onPress={() => setMode('sign-up')}>
            <Text style={[styles.modeText, mode === 'sign-up' && styles.modeTextActive]}>Sign Up</Text>
          </Pressable>
        </View>

        {mode === 'sign-up' ? (
          <LabeledInput label="Full Name" value={fullName} onChangeText={setFullName} tone="dark" />
        ) : null}
        <LabeledInput
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          tone="dark"
        />
        <LabeledInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          tone="dark"
        />

        <PrimaryButton
          label={submitLabel}
          onPress={() =>
            signIn({
              fullName: mode === 'sign-up' ? fullName : undefined,
              email: email || 'guest@museum.vn',
            })
          }
          tone="dark"
        />
        <PrimaryButton
          label="Continue without login"
          onPress={continueAsGuest}
          variant="secondary"
          tone="dark"
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  modeRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  modeText: {
    color: colors.authText,
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  modeTextActive: {
    color: colors.accentSoft,
  },
});
