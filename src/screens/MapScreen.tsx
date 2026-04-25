import React, { useMemo, useState } from 'react';
import {
  DimensionValue,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Screen } from '../components/Screen';
import { rooms } from '../data/museumData';
import { colors, radius, spacing } from '../theme/theme';

type FloorLabel = '1st floor' | '2nd floor';

type Marker = {
  roomId: string;
  label: string;
  top: DimensionValue;
  left: DimensionValue;
  kind?: 'artifact' | 'current';
};

const floorMarkers: Record<FloorLabel, Marker[]> = {
  '1st floor': [
    { roomId: 'room-101', label: '1', top: '79%', left: '24%' },
    { roomId: 'room-102', label: '2', top: '74%', left: '19%' },
    { roomId: 'room-103', label: '3', top: '69%', left: '14%', kind: 'current' },
    { roomId: 'room-104', label: '4', top: '56%', left: '10%' },
    { roomId: 'room-105', label: '5', top: '51%', left: '15%' },
    { roomId: 'room-106', label: '6', top: '20%', left: '69%' },
    { roomId: 'room-106', label: '7', top: '14%', left: '74%' },
    { roomId: 'room-106', label: '8', top: '22%', left: '89%' },
  ],
  '2nd floor': [
    { roomId: 'room-201', label: '9', top: '33%', left: '87%' },
    { roomId: 'room-203', label: '10', top: '38%', left: '82%' },
    { roomId: 'room-204', label: '11', top: '42%', left: '78%' },
    { roomId: 'room-203', label: '12', top: '18%', left: '60%' },
    { roomId: 'room-203', label: '13', top: '15%', left: '55%' },
    { roomId: 'room-204', label: '14', top: '52%', left: '6%' },
    { roomId: 'room-204', label: '15', top: '57%', left: '1%' },
    { roomId: 'room-204', label: '16', top: '63%', left: '21%' },
    { roomId: 'room-204', label: '17', top: '82%', left: '21%' },
    { roomId: 'room-204', label: '18', top: '86%', left: '26%' },
  ],
};

const floorImages: Record<FloorLabel, ImageSourcePropType> = {
  '1st floor': require('../../assets/Map.png'),
  '2nd floor': require('../../assets/Map.png'),
};

const floorCardIcons: Record<FloorLabel, string> = {
  '1st floor': 'MUSEUM',
  '2nd floor': 'ROOM',
};

export function MapScreen() {
  const [selectedFloor, setSelectedFloor] = useState<FloorLabel>('1st floor');
  const [selectedRoomId, setSelectedRoomId] = useState('room-101');

  const filteredRooms = useMemo(
    () => rooms.filter((room) => room.floor === selectedFloor),
    [selectedFloor],
  );

  const selectedRoom = filteredRooms.find((room) => room.id === selectedRoomId) ?? filteredRooms[0];
  const activeMarkers = floorMarkers[selectedFloor];
  const activeFloorImage = floorImages[selectedFloor];

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>MAP</Text>
          <Text style={styles.subheading}>Floor Layout</Text>
        </View>

        <View style={styles.locationBadge}>
          <View style={styles.locationPin} />
          <View style={styles.locationLine} />
        </View>
      </View>

      <View style={styles.floorTabs}>
        <FloorTab
          label="1st floor"
          active={selectedFloor === '1st floor'}
          onPress={() => {
            setSelectedFloor('1st floor');
            setSelectedRoomId('room-101');
          }}
        />
        <FloorTab
          label="2nd floor"
          active={selectedFloor === '2nd floor'}
          onPress={() => {
            setSelectedFloor('2nd floor');
            setSelectedRoomId('room-201');
          }}
        />
      </View>

      <View style={styles.mapWrap}>
        <ImageBackground
          source={activeFloorImage}
          resizeMode="contain"
          style={styles.mapCanvas}
          imageStyle={styles.mapImage}
        >
          <View style={styles.mapUtilityTile}>
            <Text style={styles.mapUtilityIcon}>U</Text>
          </View>

          <View style={styles.currentLocationPin}>
            <View style={styles.currentLocationDot} />
          </View>

          {activeMarkers.map((marker) => (
            <Pressable
              key={`${selectedFloor}-${marker.label}-${marker.top}-${marker.left}`}
              onPress={() => setSelectedRoomId(marker.roomId)}
              style={[
                styles.marker,
                { top: marker.top, left: marker.left },
                marker.roomId === selectedRoom.id && styles.markerActive,
                marker.kind === 'current' && styles.markerCurrent,
              ]}
            >
              <Text
                style={[
                  styles.markerLabel,
                  marker.roomId === selectedRoom.id && styles.markerLabelActive,
                ]}
              >
                {marker.label}
              </Text>
            </Pressable>
          ))}
        </ImageBackground>
      </View>

      <View style={styles.legendRow}>
        <LegendItem label="Your location" tone="location" />
        <LegendItem label="Artifact" tone="artifact" />
        <LegendItem label="Utilities" tone="utility" />
      </View>

      <Pressable style={styles.roomCard}>
        <View style={styles.roomIconTile}>
          <Text style={styles.roomIconText}>{floorCardIcons[selectedFloor]}</Text>
        </View>

        <View style={styles.roomCopy}>
          <Text style={styles.roomTitle}>
            {selectedRoom.title} - {selectedRoom.subtitle}
          </Text>
          <Text style={styles.roomMeta}>
            {selectedRoom.floor} - {selectedRoom.artifactCount} Artifacts
          </Text>
        </View>

        <Text style={styles.roomAction}>GUIDE {'>'}</Text>
      </Pressable>
    </Screen>
  );
}

function FloorTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.floorTab, active ? styles.floorTabActive : styles.floorTabIdle]}
    >
      <Text style={[styles.floorTabText, active ? styles.floorTabTextActive : styles.floorTabTextIdle]}>
        {label}
      </Text>
    </Pressable>
  );
}

function LegendItem({
  label,
  tone,
}: {
  label: string;
  tone: 'location' | 'artifact' | 'utility';
}) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendSwatch,
          tone === 'location'
            ? styles.legendLocation
            : tone === 'artifact'
              ? styles.legendArtifact
              : styles.legendUtility,
        ]}
      />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heading: {
    color: colors.accent,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
  },
  subheading: {
    marginTop: 6,
    color: colors.accent,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  locationBadge: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#B8A883',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationPin: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#CC4631',
    borderWidth: 1,
    borderColor: colors.accentStrong,
  },
  locationLine: {
    width: 1,
    height: 18,
    backgroundColor: colors.textMuted,
  },
  floorTabs: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  floorTab: {
    flex: 1,
    minHeight: 42,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  floorTabActive: {
    backgroundColor: '#AB2E1C',
    borderColor: '#AB2E1C',
  },
  floorTabIdle: {
    backgroundColor: '#F5F5F5',
    borderColor: '#B9B9B9',
  },
  floorTabText: {
    fontSize: 15,
    fontWeight: '700',
  },
  floorTabTextActive: {
    color: colors.white,
  },
  floorTabTextIdle: {
    color: colors.text,
  },
  mapWrap: {
    gap: spacing.sm,
  },
  mapCanvas: {
    position: 'relative',
    height: 430,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapUtilityTile: {
    position: 'absolute',
    top: '28%',
    left: '18%',
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2C979',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapUtilityIcon: {
    color: '#5C7CE2',
    fontSize: 14,
    fontWeight: '700',
  },
  currentLocationPin: {
    position: 'absolute',
    top: '47%',
    left: '55%',
    width: 18,
    height: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B11E1E',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#B11E1E',
  },
  marker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: '#3F8F47',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerActive: {
    backgroundColor: '#E7F6E8',
    transform: [{ scale: 1.08 }],
  },
  markerCurrent: {
    borderColor: '#7D7D7D',
  },
  markerLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  markerLabelActive: {
    color: colors.accentStrong,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendSwatch: {
    width: 14,
    height: 14,
    borderRadius: 5,
    borderWidth: 2,
  },
  legendLocation: {
    borderColor: '#A30E0E',
    backgroundColor: 'transparent',
  },
  legendArtifact: {
    borderColor: '#2F9443',
    backgroundColor: 'transparent',
  },
  legendUtility: {
    borderColor: '#E1C26B',
    backgroundColor: '#F3D687',
  },
  legendText: {
    color: '#3A342E',
    fontSize: 14,
  },
  roomCard: {
    minHeight: 96,
    borderRadius: 22,
    backgroundColor: '#9B0000',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  roomIconTile: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomIconText: {
    color: '#F7E5C3',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  roomCopy: {
    flex: 1,
    gap: 4,
  },
  roomTitle: {
    color: colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  roomMeta: {
    color: '#E7C4A7',
    fontSize: 14,
    fontStyle: 'italic',
  },
  roomAction: {
    color: '#F4D4B0',
    fontSize: 15,
    fontWeight: '700',
  },
});
