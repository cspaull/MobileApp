import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../state/AppContext';
import { colors } from '../theme/theme';
import { ArtifactDetailScreen } from '../screens/ArtifactDetailScreen';
import { ArtifactsScreen } from '../screens/ArtifactsScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  ArtifactDetail: { artifactId: string };
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Artifact: undefined;
  Schedule: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const tabLabels: Record<keyof TabParamList, string> = {
  Home: 'Home',
  Map: 'Map',
  Artifact: 'Artifact',
  Schedule: 'Schedule',
  Profile: 'Profile',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color }) => (
          <View style={[styles.tabIcon, focused ? styles.tabIconActive : undefined]}>
            <Text style={[styles.tabIconText, { color }]}>{tabLabels[route.name].slice(0, 1)}</Text>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Artifact" component={ArtifactsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isReady, user } = useAppContext();

  if (!isReady) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.loadingText}>Preparing your museum companion...</Text>
      </View>
    );
  }

  if (!user.fullName) {
    return <AuthScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ArtifactDetail" component={ArtifactDetailScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: 16,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 15,
  },
  tabBar: {
    backgroundColor: '#FFFDF5',
    borderTopColor: colors.border,
    height: 78,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  tabIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128, 0, 0, 0.08)',
  },
  tabIconActive: {
    backgroundColor: 'rgba(128, 0, 0, 0.18)',
  },
  tabIconText: {
    fontWeight: '800',
  },
});
