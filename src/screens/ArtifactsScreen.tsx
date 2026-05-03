import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '../components/Screen';
import { artifacts } from '../data/museumData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, spacing } from '../theme/theme';
import { getArtifactCategory, getArtifactImageSource } from '../utils/museum';

const floorFilters = ['All', '1st floor', '2nd floor'] as const;

export function ArtifactsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<(typeof floorFilters)[number]>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const categories = useMemo(
    () => ['All', ...new Set(artifacts.map((artifact) => getArtifactCategory(artifact)))],
    [],
  );

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((artifact) => {
      const matchesFloor = selectedFloor === 'All' || artifact.floorLabel === selectedFloor;
      const matchesCategory =
        selectedCategory === 'All' || getArtifactCategory(artifact) === selectedCategory;
      const searchable =
        `${artifact.title} ${artifact.roomName} ${artifact.tags.join(' ')}`.toLowerCase();
      const matchesQuery = searchable.includes(query.trim().toLowerCase());
      return matchesFloor && matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory, selectedFloor]);

  async function handleOpenQR() {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setScanned(false);
    setQrVisible(true);
  }

  function handleBarCodeScanned({ data }: { data: string }) {
    if (scanned) return;
    setScanned(true);
    setQrVisible(false);

    const artifactId = data.startsWith('artifact:') ? data.replace('artifact:', '') : data;
    const found = artifacts.find((artifact) => artifact.id === artifactId);

    if (found) {
      navigation.navigate('ArtifactDetail', { artifactId: found.id });
      return;
    }

    alert(`Could not find artifact: "${artifactId}"`);
  }

  function handleResetFilters() {
    setSelectedFloor('All');
    setSelectedCategory('All');
  }

  return (
    <Screen contentStyle={styles.screenContent}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>ARTIFACTS</Text>
          <Text style={styles.headerSubtitle}>COLLECTION</Text>
        </View>

        <View style={styles.headerButtons}>
          <Pressable style={styles.filterButton} onPress={handleOpenQR}>
            <Image source={require('../../assets/qr.png')} />
          </Pressable>

          <Pressable style={styles.filterButton} onPress={() => setFilterVisible(true)}>
            <Image
              source={require('../../assets/mdi_filter-outline.png')}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      <Modal visible={qrVisible} animationType="slide" onRequestClose={() => setQrVisible(false)}>
        <View style={styles.cameraContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={handleBarCodeScanned}
          />

          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanHint}>Point the camera at an artifact QR code.</Text>
          </View>

          <Pressable style={styles.closeBtn} onPress={() => setQrVisible(false)}>
            <Text style={styles.closeBtnText}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        visible={filterVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.filterModalBackdrop}>
          <View style={styles.filterModalCard}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter Artifacts</Text>
              <Pressable onPress={() => setFilterVisible(false)} style={styles.filterModalClose}>
                <Text style={styles.filterModalCloseText}>X</Text>
              </Pressable>
            </View>

            <Text style={styles.filterSectionLabel}>Floor</Text>
            <View style={styles.filterOptionWrap}>
              {floorFilters.map((filter) => {
                const active = selectedFloor === filter;
                return (
                  <Pressable
                    key={filter}
                    style={[styles.modalPill, active ? styles.modalPillActive : styles.modalPillIdle]}
                    onPress={() => setSelectedFloor(filter)}
                  >
                    <Text style={[styles.modalPillText, active && styles.modalPillTextActive]}>
                      {filter}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.filterSectionLabel}>Category</Text>
            <View style={styles.filterOptionWrap}>
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <Pressable
                    key={category}
                    style={[styles.modalPill, active ? styles.modalPillActive : styles.modalPillIdle]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[styles.modalPillText, active && styles.modalPillTextActive]}>
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.filterActions}>
              <Pressable style={styles.secondaryAction} onPress={handleResetFilters}>
                <Text style={styles.secondaryActionText}>Reset</Text>
              </Pressable>
              <Pressable
                style={styles.primaryAction}
                onPress={() => setFilterVisible(false)}
              >
                <Text style={styles.primaryActionText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for artifacts..."
          placeholderTextColor="#C87F72"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterRow}
      >
        {floorFilters.map((filter) => {
          const active = selectedFloor === filter;
          return (
            <Pressable
              key={filter}
              style={[styles.filterPill, active ? styles.filterPillActive : styles.filterPillIdle]}
              onPress={() => setSelectedFloor(filter)}
            >
              <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {selectedCategory !== 'All' ? (
        <View style={styles.activeFiltersRow}>
          <View style={styles.activeFilterChip}>
            <Text style={styles.activeFilterText}>{selectedCategory}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.grid}>
        {filteredArtifacts.map((artifact) => (
          <Pressable
            key={artifact.id}
            style={styles.gridCard}
            onPress={() => navigation.navigate('ArtifactDetail', { artifactId: artifact.id })}
          >
            <View style={styles.imagePanel}>
              <View style={styles.floorBadge}>
                <Text style={styles.floorBadgeText}>{artifact.floorLabel}</Text>
              </View>
              <Image
                source={getArtifactImageSource(artifact.id)}
                resizeMode="contain"
                style={styles.artifactImage}
              />
            </View>
            <View style={styles.cardCopy}>
              <Text style={styles.cardEra}>{artifact.era}</Text>
              <Text numberOfLines={2} style={styles.cardTitle}>
                {artifact.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardMeta}>
                {getArtifactCategory(artifact)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.accent,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '400',
  },
  headerSubtitle: {
    color: colors.accent,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '400',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingLeft: 5,
  },
  filterButton: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2C39E',
  },
  filterIcon: {
    width: 26,
    height: 26,
    tintColor: '#7B6049',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  scanFrame: {
    width: 240,
    height: 240,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#FFD97D',
    backgroundColor: 'transparent',
  },
  scanHint: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
    opacity: 0.85,
  },
  closeBtn: {
    position: 'absolute',
    bottom: 52,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: radius.pill,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  filterModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  filterModalCard: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterModalTitle: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '700',
  },
  filterModalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
  },
  filterModalCloseText: {
    color: colors.accentStrong,
    fontSize: 16,
    fontWeight: '700',
  },
  filterSectionLabel: {
    color: colors.textSoft,
    fontSize: 16,
    fontWeight: '600',
  },
  filterOptionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  modalPill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 2,
  },
  modalPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  modalPillIdle: {
    backgroundColor: '#FCFCFC',
    borderColor: '#B9B9B9',
  },
  modalPillText: {
    color: colors.text,
    fontSize: 16,
  },
  modalPillTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  secondaryAction: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryActionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  primaryAction: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  primaryActionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  searchBar: {
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: 'rgba(86, 76, 72, 0.28)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 6,
  },
  searchIcon: {
    color: colors.accent,
    fontSize: 22,
    lineHeight: 22,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontStyle: 'italic',
    paddingVertical: 0,
  },
  filterRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  filterScroll: {
    flexGrow: 0,
  },
  activeFiltersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  activeFilterChip: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    backgroundColor: '#F0D3CD',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeFilterText: {
    color: '#B35A4B',
    fontSize: 15,
    fontWeight: '600',
  },
  filterPill: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
  },
  filterPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterPillIdle: {
    backgroundColor: '#FCFCFC',
    borderColor: '#B9B9B9',
  },
  filterPillText: {
    fontSize: 20,
    color: colors.text,
  },
  filterPillTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    rowGap: spacing.md,
  },
  gridCard: {
    width: '48.5%',
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: '#B8B1A6',
    overflow: 'hidden',
  },
  imagePanel: {
    minHeight: 128,
    backgroundColor: '#E6DDBF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  artifactImage: {
    width: '72%',
    height: 88,
  },
  floorBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#EDC0AB',
  },
  floorBadgeText: {
    color: '#B64735',
    fontSize: 15,
  },
  cardCopy: {
    minHeight: 88,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#B8B1A6',
    backgroundColor: colors.surface,
  },
  cardEra: {
    color: '#B45B52',
    fontSize: 15,
    fontStyle: 'italic',
  },
  cardTitle: {
    marginTop: 2,
    color: colors.text,
    fontSize: 20,
    lineHeight: 24,
  },
  cardMeta: {
    marginTop: 1,
    color: colors.textSoft,
    fontSize: 15,
    fontStyle: 'italic',
  },
});
