import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'react-native';
import { Screen } from '../components/Screen';
import { useAppContext } from '../state/AppContext';
import { colors, radius, spacing } from '../theme/theme';

type AuthMode = 'sign-in' | 'sign-up';

export function AuthScreen() {
  const { signIn, continueAsGuest } = useAppContext();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLabel = mode === 'sign-in' ? 'SIGN IN' : 'SIGN UP';
  const titleCopy = useMemo(
    () => ({
      title: 'HO CHI MINH CITY MUSEUM',
      subtitle: 'Log in to personalize your tour',
    }),
    [],
  );

  return (
    <Screen contentStyle={styles.screenContent} variant="dark">
      <View style={styles.patternOverlay} pointerEvents="none">
        <View style={[styles.patternLine, styles.patternLinePrimary]} />
        <View style={[styles.patternLine, styles.patternLineSecondary]} />
        <View style={[styles.patternLine, styles.patternLineThird]} />
        <View style={[styles.patternLine, styles.patternLineFourth]} />
      </View>

      <View style={styles.centered}>
        {/* <Text style={styles.museumIcon}>M</Text> */}
        <Image
          source={require('D:/museumcompa/assets/museumlog2.png')} // đường dẫn tới ảnh của bạn
          style={styles.logo}
        />
        <Text style={styles.title}>{titleCopy.title}</Text>
        <Text style={styles.subtitle}>{titleCopy.subtitle}</Text>

        <View style={styles.segmentedControl}>
          {(['sign-in', 'sign-up'] as const).map((item) => {
            const active = item === mode;

            return (
              <Pressable
                key={item}
                style={[styles.segment, active && styles.segmentActive]}
                onPress={() => setMode(item)}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                  {item === 'sign-in' ? 'SIGN IN' : 'SIGN UP'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.form}>
          {mode === 'sign-up' ? (
            <AuthField label="FULL NAME" value={fullName} onChangeText={setFullName} />
          ) : null}
          <AuthField
            label="EMAIL"
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthField
            label="PASSWORD"
            value={password}
            onChangeText={setPassword}
            placeholder="**********"
            secureTextEntry
          />
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() =>
            signIn({
              fullName: mode === 'sign-up' ? fullName : undefined,
              email: email || 'guest@museum.vn',
            })
          }
        >
          <Text style={styles.primaryButtonText}>{submitLabel}</Text>
        </Pressable>

        <Pressable style={styles.guestButton} onPress={continueAsGuest}>
          <Text style={styles.guestButtonText}>Continue without login -&gt;</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

type AuthFieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
};

function AuthField({ label, ...props }: AuthFieldProps) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="rgba(218, 212, 181, 0.48)"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
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
  centered: {
    gap: spacing.md,
    alignItems: 'center',
  },
  museumIcon: {
    color: colors.authText,
    fontSize: 54,
    lineHeight: 56,
    fontWeight: '700',
  },
  title: {
    color: colors.authText,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '300',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: -10,
    color: colors.authText,
    opacity: 0.9,
    fontSize: 16,
    fontStyle: 'italic',
  },
  segmentedControl: {
    marginTop: spacing.lg,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: radius.pill,
    padding: 3,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.accentSoft,
  },
  segmentText: {
    color: colors.authText,
    fontWeight: '800',
    fontSize: 16,
  },
  segmentTextActive: {
    color: colors.accent,
  },
  form: {
    width: '100%',
    gap: spacing.sm,
  },
  fieldBlock: {
    width: '100%',
    gap: 6,
  },
  fieldLabel: {
    color: colors.authText,
    fontSize: 14,
  },
  input: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(218, 212, 181, 0.45)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: spacing.md,
    color: colors.authText,
    fontSize: 16,
  },
  primaryButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    marginTop: spacing.xs,
  },
  primaryButtonText: {
    color: colors.accent,
    fontSize: 17,
    fontWeight: '800',
  },
  guestButton: {
    paddingTop: 2,
  },
  guestButtonText: {
    color: colors.authText,
    fontSize: 15,
  },
  logo: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
    marginBottom: -75,
    marginTop: -120,
  },
});
