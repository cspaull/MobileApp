import { Artifact, UserProfile, artifacts, defaultUserProfile, relatedArtifactIds } from '../data/museumData';
import { Result, failure, success } from '../domain/result';

export type StoredMuseumState = {
  user: UserProfile;
  favorites: string[];
  viewedArtifacts: string[];
  completedJourneys: number;
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

export const getRelatedArtifacts = (artifactId: string): Artifact[] => {
  const relatedIds = relatedArtifactIds[artifactId] ?? [];

  return relatedIds
    .map((relatedId) => artifacts.find((artifact) => artifact.id === relatedId))
    .filter((artifact): artifact is Artifact => Boolean(artifact));
};

export const computeProfileStats = (state: StoredMuseumState) => ({
  favoriteCount: state.favorites.length,
  viewedCount: state.viewedArtifacts.length,
  visitCount: state.completedJourneys,
});
