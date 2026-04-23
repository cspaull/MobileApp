import type { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

import { ArtifactDetailScreen } from '../screens/ArtifactDetailScreen';
import { ArtifactsScreen } from '../screens/ArtifactsScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { useAppContext } from '../state/AppContext';
import { colors } from '../theme/theme';

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Artifact: undefined;
  Schedule: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  ArtifactDetail: { artifactId: string };
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

// 👉 DÙNG ICON PNG
const tabIcons: Record<keyof TabParamList, any> = {
  Home: require('../../assets/icons/home.png'),
  Map: require('../../assets/icons/map.png'),
  Artifact: require('../../assets/icons/artifact.png'),
  Schedule: require('../../assets/icons/schedule.png'),
  Profile: require('../../assets/icons/profile.png'),
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,   // 👉 màu đỏ khi chọn
        tabBarInactiveTintColor: colors.text,   // 👉 màu xám/đen khi không chọn
        tabBarLabelStyle: styles.tabLabel,

        // 👉 ICON
        tabBarIcon: ({ color, focused }) => (
          <Image
            source={tabIcons[route.name]}
            style={[
              styles.iconImage,
              {
                tintColor: color,
                transform: [{ scale: focused ? 1.1 : 1 }],
              },
            ]}
            resizeMode="contain"
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: tabLabels.Home }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: tabLabels.Map }} />
      <Tab.Screen name="Artifact" component={ArtifactsScreen} options={{ title: tabLabels.Artifact }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: tabLabels.Schedule }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: tabLabels.Profile }} />
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
    height: 72,
    paddingTop: 6,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});