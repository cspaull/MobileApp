import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { UserProfile } from '../data/museumData';
import {
  StoredMuseumState,
  computeProfileStats,
  hydrateMuseumState,
  initialMuseumState,
  markArtifactViewed,
  toggleFavorite,
} from '../utils/museum';

type AppContextValue = StoredMuseumState & {
  isReady: boolean;
  stats: ReturnType<typeof computeProfileStats>;
  signIn: (payload: { fullName?: string; email: string }) => void;
  continueAsGuest: () => void;
  updatePreferences: (payload: Partial<Pick<UserProfile, 'language' | 'notificationsEnabled'>>) => void;
  logout: () => void;
  toggleArtifactFavorite: (artifactId: string) => void;
  recordArtifactView: (artifactId: string) => void;
  completeJourney: () => void;
};

const STORAGE_KEY = 'museum-companion-state';

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredMuseumState>(initialMuseumState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((rawValue) => {
        const result = hydrateMuseumState(rawValue);

        if (isMounted) {
          setState(result.ok ? result.value : initialMuseumState);
          setIsReady(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setState(initialMuseumState);
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {
      // Persist best effort only. UI state remains usable even if storage fails.
    });
  }, [isReady, state]);

  const signIn = useCallback((payload: { fullName?: string; email: string }) => {
    setState((current) => ({
      ...current,
      user: {
        ...current.user,
        fullName: payload.fullName?.trim() || payload.email.split('@')[0] || 'Museum Guest',
        email: payload.email,
        authMode: 'signed-in',
      },
    }));
  }, []);

  const continueAsGuest = useCallback(() => {
    setState((current) => ({
      ...current,
      user: {
        ...current.user,
        fullName: 'Guest',
        email: '',
        authMode: 'guest',
      },
    }));
  }, []);

  const updatePreferences = useCallback(
    (payload: Partial<Pick<UserProfile, 'language' | 'notificationsEnabled'>>) => {
      setState((current) => ({
        ...current,
        user: {
          ...current.user,
          ...payload,
        },
      }));
    },
    [],
  );

  const logout = useCallback(() => {
    setState((current) => ({
      ...current,
      user: {
        ...current.user,
        fullName: '',
        email: '',
        authMode: 'guest',
      },
    }));
  }, []);

  const toggleArtifactFavoriteAction = useCallback((artifactId: string) => {
    setState((current) => ({
      ...current,
      favorites: toggleFavorite(current.favorites, artifactId),
    }));
  }, []);

  const recordArtifactView = useCallback((artifactId: string) => {
    setState((current) => {
      if (current.viewedArtifacts.includes(artifactId)) {
        return current;
      }

      return {
        ...current,
        viewedArtifacts: markArtifactViewed(current.viewedArtifacts, artifactId),
      };
    });
  }, []);

  const completeJourney = useCallback(() => {
    setState((current) => ({
      ...current,
      completedJourneys: current.completedJourneys + 1,
    }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      isReady,
      stats: computeProfileStats(state),
      signIn,
      continueAsGuest,
      updatePreferences,
      logout,
      toggleArtifactFavorite: toggleArtifactFavoriteAction,
      recordArtifactView,
      completeJourney,
    }),
    [
      completeJourney,
      continueAsGuest,
      isReady,
      logout,
      recordArtifactView,
      signIn,
      state,
      toggleArtifactFavoriteAction,
      updatePreferences,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}
