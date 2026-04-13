import {
  computeProfileStats,
  getArtifactById,
  hydrateMuseumState,
  initialMuseumState,
  markArtifactViewed,
  toggleFavorite,
} from '../src/utils/museum';

describe('museum utils', () => {
  it('hydrates defaults when no saved state exists', () => {
    const result = hydrateMuseumState(null);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(initialMuseumState);
    }
  });

  it('returns an error result when saved state is invalid JSON', () => {
    const result = hydrateMuseumState('{broken');

    expect(result.ok).toBe(false);
  });

  it('toggles favorites on and off', () => {
    const once = toggleFavorite([], 'dong-son-bronze-drums');
    const twice = toggleFavorite(once, 'dong-son-bronze-drums');

    expect(once).toContain('dong-son-bronze-drums');
    expect(twice).not.toContain('dong-son-bronze-drums');
  });

  it('records viewed artifacts without duplicates', () => {
    const first = markArtifactViewed([], 'old-map-gia-dinh');
    const second = markArtifactViewed(first, 'old-map-gia-dinh');

    expect(second).toHaveLength(1);
  });

  it('computes profile stats from stored state', () => {
    const stats = computeProfileStats({
      ...initialMuseumState,
      favorites: ['a', 'b'],
      viewedArtifacts: ['a'],
      completedJourneys: 3,
    });

    expect(stats).toEqual({
      favoriteCount: 2,
      viewedCount: 1,
      visitCount: 3,
    });
  });

  it('resolves artifacts through the result pattern', () => {
    const result = getArtifactById('dong-son-bronze-drums');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.title).toBe('Dong Son Bronze Drums');
    }
  });
});
