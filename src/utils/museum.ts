import type { ImageSourcePropType } from 'react-native';

import { Artifact, UserProfile, artifacts, defaultUserProfile } from '../data/museumData';
import { Result, failure, success } from '../domain/result';

export type StoredMuseumState = {
  user: UserProfile;
  favorites: string[];
  viewedArtifacts: string[];
  completedJourneys: number;
};

const artifactImages: Record<string, ImageSourcePropType> = {
  'kham-sai-dai-quan-phong': require('../../assets/artifacts/art_1.png'),
  'ta-quan-chi-an': require('../../assets/artifacts/art_2.png'),
  'luong-tai-hau-chi-an': require('../../assets/artifacts/art_3.png'),
  'canh-hung-thong-bao': require('../../assets/artifacts/art_9.png'),
  'the-thieu-tri': require('../../assets/artifacts/art_10.png'),
  'minh-mang-era-silver-bar': require('../../assets/artifacts/art_11.png'),
  revolver: require('../../assets/artifacts/art_16.png'),
  'carrier-bicycle': require('../../assets/artifacts/art_17.png'),
  canteen: require('../../assets/artifacts/art_18.png'),
};

export const initialMuseumState: StoredMuseumState = {
  user: defaultUserProfile,
  favorites: [],
  viewedArtifacts: [],
  completedJourneys: 0,
};

export const hydrateMuseumState = (rawValue: string | null): Result<StoredMuseumState> => {
  if (!rawValue) {
    return success(initialMuseumState);
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<StoredMuseumState>;

    return success({
      user: parsed.user ?? defaultUserProfile,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      viewedArtifacts: Array.isArray(parsed.viewedArtifacts) ? parsed.viewedArtifacts : [],
      completedJourneys:
        typeof parsed.completedJourneys === 'number' ? parsed.completedJourneys : 0,
    });
  } catch {
    return failure('Unable to parse saved museum state.');
  }
};

export const toggleFavorite = (favorites: string[], artifactId: string): string[] =>
  favorites.includes(artifactId)
    ? favorites.filter((currentId) => currentId !== artifactId)
    : [artifactId, ...favorites];

export const markArtifactViewed = (viewedArtifacts: string[], artifactId: string): string[] =>
  viewedArtifacts.includes(artifactId) ? viewedArtifacts : [artifactId, ...viewedArtifacts];

export const getArtifactById = (artifactId: string): Result<Artifact> => {
  const artifact = artifacts.find((entry) => entry.id === artifactId);

  return artifact ? success(artifact) : failure(`Artifact ${artifactId} was not found.`);
};

export const getArtifactImageSource = (artifactId: string): ImageSourcePropType =>
  artifactImages[artifactId] ?? require('../../assets/artifacts.png');

export const getArtifactCategory = (artifact: Artifact): string =>
  artifact.tags.find((tag) => !['Most Popular', 'Newly Displayed', 'Extremely Rare', 'Popular', 'Family Favorite', 'Powerful Story', 'Rare'].includes(tag)) ??
  artifact.tags[0] ??
  artifact.roomName;

export const getArtifactLocationLabel = (artifact: Artifact): string =>
  `${artifact.floorLabel} - ${artifact.roomName}`;

export const getRelatedArtifacts = (artifactId: string): Artifact[] => {
  const artifact = artifacts.find((entry) => entry.id === artifactId);

  if (!artifact) {
    return [];
  }

  return artifacts
    .filter((entry) => entry.id !== artifact.id)
    .map((entry) => {
      const sharedTags = entry.tags.filter((tag) => artifact.tags.includes(tag)).length;
      const sameRoom = entry.roomName === artifact.roomName ? 4 : 0;
      const sameFloor = entry.floorLabel === artifact.floorLabel ? 2 : 0;
      const score = sharedTags * 3 + sameRoom + sameFloor;

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ entry }) => entry);
};

export const computeProfileStats = (state: StoredMuseumState) => ({
  favoriteCount: state.favorites.length,
  viewedCount: state.viewedArtifacts.length,
  visitCount: state.completedJourneys,
});
