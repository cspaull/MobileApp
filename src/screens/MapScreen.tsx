import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import { Screen } from '../components/Screen';
import { rooms } from '../data/museumData';
import { colors, radius, spacing } from '../theme/theme';

type FloorLabel = '1st floor' | '2nd floor';

type Marker = {
  roomId: string;
  label: string;
  x: number;
  y: number;
};

const MAP_WIDTH = 372;
const MAP_HEIGHT = 383;
const VIEW_HEIGHT = 430;

const floorMarkers: Record<FloorLabel, Marker[]> = {
  '1st floor': [
    { roomId: 'room-101', label: '1', x: 0.34 * 372, y: 0.9 * 383 },
    { roomId: 'room-102', label: '2', x: 0.25 * 372, y: 0.82 * 383 },
    { roomId: 'room-103', label: '3', x: 0.16 * 372, y: 0.74 * 383 },
    { roomId: 'room-104', label: '4', x: 0.14 * 372, y: 0.62 * 383 },
    { roomId: 'room-105', label: '5', x: 0.24 * 372, y: 0.54 * 383 },
    { roomId: 'room-106', label: '6', x: 0.61 * 372, y: 0.2 * 383 },
    { roomId: 'room-106', label: '7', x: 0.7 * 372, y: 0.12 * 383 },
    { roomId: 'room-106', label: '8', x: 0.88 * 372, y: 0.34 * 383 },
  ],
  '2nd floor': [
    { roomId: 'room-201', label: '9', x: 0.77 * 372, y: 0.21 * 383 },
    { roomId: 'room-203', label: '10', x: 0.89 * 372, y: 0.3 * 383 },
    { roomId: 'room-204', label: '11', x: 0.82 * 372, y: 0.35 * 383 },
    { roomId: 'room-203', label: '12', x: 0.62 * 372, y: 0.25 * 383 },
    { roomId: 'room-203', label: '13', x: 0.55 * 372, y: 0.15 * 383 },
    { roomId: 'room-204', label: '14', x: 0.21 * 372, y: 0.52 * 383 },
    { roomId: 'room-204', label: '15', x: 0.12 * 372, y: 0.62 * 383 },
    { roomId: 'room-204', label: '16', x: 0.28 * 372, y: 0.7 * 383 },
    { roomId: 'room-204', label: '17', x: 0.27 * 372, y: 0.82 * 383 },
    { roomId: 'room-204', label: '18', x: 0.34 * 372, y: 0.9 * 383 },
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

  const selectedRoom =
    filteredRooms.find((room) => room.id === selectedRoomId) ?? filteredRooms[0];

  const activeMarkers = floorMarkers[selectedFloor];
  const activeFloorImage = floorImages[selectedFloor];

  const screenWidth = Dimensions.get('window').width;
  const mapWidth = screenWidth - spacing.lg * 2;
  const scale = Math.min(mapWidth / MAP_WIDTH, VIEW_HEIGHT / MAP_HEIGHT);
  const imgW = MAP_WIDTH * scale;
  const imgH = MAP_HEIGHT * scale;
  const offsetX = (mapWidth - imgW) / 2;
  const offsetY = (VIEW_HEIGHT - imgH) / 2;

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

      <View style={[styles.mapWrap, { width: mapWidth, height: VIEW_HEIGHT }]}>
        <ImageZoom
          cropWidth={mapWidth}
          cropHeight={VIEW_HEIGHT}
          imageWidth={mapWidth}
          imageHeight={VIEW_HEIGHT}
          minScale={1}
          maxScale={3}
          enableSwipeDown={false}
        >
          <View style={{ width: mapWidth, height: VIEW_HEIGHT }}>
            <ImageBackground
              source={activeFloorImage}
              resizeMode="contain"
              style={{ width: mapWidth, height: VIEW_HEIGHT }}
              imageStyle={styles.mapImage}
            >
              <View
                style={[
                  styles.mapUtilityTile,
                  {
                    left: offsetX + 0.18 * imgW,
                    top: offsetY + 0.28 * imgH,
                  },
                ]}
              >
                <Image source={require('../../assets/exit.png')} />
              </View>

              <Image
                source={require('../../assets/loca.png')}
                style={[
                  styles.currentLocationImage,
                  {
                    left: offsetX + 0.55 * imgW,
                    top: offsetY + 0.47 * imgH,
                  },
                ]}
              />

              {activeMarkers.map((marker) => (
                <Pressable
                  key={`${selectedFloor}-${marker.label}`}
                  onPress={() => setSelectedRoomId(marker.roomId)}
                  style={[
                    styles.marker,
                    {
                      left: offsetX + marker.x * scale,
                      top: offsetY + marker.y * scale,
                    },
                    marker.roomId === selectedRoom.id && styles.markerActive,
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
        </ImageZoom>
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
      <Text
        style={[
          styles.floorTabText,
          active ? styles.floorTabTextActive : styles.floorTabTextIdle,
        ]}
      >
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
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heading: {
    color: colors.accent,
    fontSize: 30,
    fontWeight: '900',
  },
  subheading: {
    marginTop: 6,
    color: colors.accent,
    fontSize: 25,
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
    width: '100%',
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
    fontSize: 20,
    fontWeight: '700',
  },
  floorTabTextActive: {
    color: colors.white,
  },
  floorTabTextIdle: {
    color: colors.text,
  },
  mapWrap: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#F6F1E1',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapUtilityTile: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2C979',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationImage: {
    position: 'absolute',
    width: 24,
    height: 24,
    marginLeft: -12,
    marginTop: -12,
  },
  marker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: '#3F8F47',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  markerActive: {
    backgroundColor: '#E7F6E8',
  },
  markerLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  markerLabelActive: {
    color: colors.accentStrong,
  },
  legendRow: {
    width: '100%',
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
  },
  legendArtifact: {
    borderColor: '#2F9443',
  },
  legendUtility: {
    borderColor: '#E1C26B',
    backgroundColor: '#F3D687',
  },
  legendText: {
    color: '#3A342E',
    fontSize: 15,
  },
  roomCard: {
    width: '100%',
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
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  roomCopy: {
    flex: 1,
    gap: 4,
  },
  roomTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  roomMeta: {
    color: '#E7C4A7',
    fontSize: 15,
    fontStyle: 'italic',
  },
  roomAction: {
    color: '#F4D4B0',
    fontSize: 20,
    fontWeight: '700',
  },
});
