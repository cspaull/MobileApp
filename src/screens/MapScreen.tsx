import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Card, Pill, TitleBlock } from '../components/Ui';
import { rooms } from '../data/museumData';
import { colors, spacing } from '../theme/theme';

export function MapScreen() {
  const [selectedFloor, setSelectedFloor] = useState<'1st floor' | '2nd floor'>('1st floor');
  const [selectedRoomId, setSelectedRoomId] = useState('room-101');

  const filteredRooms = useMemo(
    () => rooms.filter((room) => room.floor === selectedFloor),
    [selectedFloor],
  );

  const selectedRoom = filteredRooms.find((room) => room.id === selectedRoomId) ?? filteredRooms[0];

  return (
    <Screen>
      <TitleBlock
        eyebrow="Map"
        title="Floor layout"
        subtitle="Browse rooms, locate highlighted areas, and preview exhibit density."
      />

      <View style={styles.floorSwitch}>
        <Pill
          label="1st floor"
          active={selectedFloor === '1st floor'}
          onPress={() => {
            setSelectedFloor('1st floor');
            setSelectedRoomId('room-101');
          }}
        />
        <Pill
          label="2nd floor"
          active={selectedFloor === '2nd floor'}
          onPress={() => {
            setSelectedFloor('2nd floor');
            setSelectedRoomId('room-201');
          }}
        />
      </View>

      <Card>
        <View style={styles.mapGrid}>
          {filteredRooms.map((room) => (
            <Pressable
              key={room.id}
              onPress={() => setSelectedRoomId(room.id)}
              style={[
                styles.roomTile,
                room.id === selectedRoom.id && styles.roomTileActive,
                room.isCurrentLocation && styles.currentTile,
              ]}
            >
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomSubtitle}>{room.subtitle}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.detailTitle}>
          {selectedRoom.title} - {selectedRoom.subtitle}
        </Text>
        <Text style={styles.detailText}>
          {selectedRoom.floor} • {selectedRoom.artifactCount} artifacts
        </Text>
        <Text style={styles.detailText}>
          Guide: Follow the highlighted path from the lobby to this room for a balanced route.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  floorSwitch: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  roomTile: {
    width: '47%',
    minHeight: 120,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentSoft,
    backgroundColor: colors.surfaceSoft,
    gap: 8,
  },
  roomTileActive: {
    borderColor: colors.accent,
    backgroundColor: '#E8D8D8',
  },
  currentTile: {
    borderStyle: 'dashed',
  },
  roomTitle: {
    color: colors.text,
    fontWeight: '800',
  },
  roomSubtitle: {
    color: colors.textSoft,
    lineHeight: 20,
  },
  detailTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  detailText: {
    color: colors.textMuted,
    lineHeight: 21,
  },
});
