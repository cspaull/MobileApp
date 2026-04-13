export type AuthMode = 'guest' | 'signed-in';

export type UserProfile = {
  fullName: string;
  email: string;
  authMode: AuthMode;
  notificationsEnabled: boolean;
  language: string;
};

export type Artifact = {
  id: string;
  title: string;
  era: string;
  dynastyOrCollection: string;
  floorLabel: string;
  roomCode: string;
  roomName: string;
  type: string;
  tags: string[];
  material: string;
  origin: string;
  size: string;
  summary: string;
  audioDurationSeconds: number;
  badge: string;
};

export type Room = {
  id: string;
  title: string;
  subtitle: string;
  floor: '1st floor' | '2nd floor';
  artifactCount: number;
  isCurrentLocation?: boolean;
};

export type JourneyStop = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  highlight?: string;
};

export type JourneyPlan = {
  duration: '1 hour' | '2 hours' | '3 hours' | '6 hours';
  startLabel: string;
  endLabel: string;
  stops: JourneyStop[];
};

export const defaultUserProfile: UserProfile = {
  fullName: '',
  email: '',
  authMode: 'guest',
  notificationsEnabled: true,
  language: 'English',
};

export const artifacts: Artifact[] = [
  {
    id: 'dong-son-bronze-drums',
    title: 'Dong Son Bronze Drums',
    era: '2nd c. BCE',
    dynastyOrCollection: 'Dong Son Culture',
    floorLabel: '1st floor',
    roomCode: 'Room 105',
    roomName: 'Dong Son Antiquities',
    type: 'Antiquity',
    tags: ['Metal', 'Audio Guide', 'Most Popular'],
    material: 'Brass',
    origin: 'Northern Viet Nam',
    size: 'Diameter: 79 cm',
    summary:
      'A ceremonial drum decorated with star motifs, birds, boats, and dancers that captures the vibrancy of Dong Son spiritual life.',
    audioDurationSeconds: 165,
    badge: 'Most Popular',
  },
  {
    id: 'nguyen-anh-sword',
    title: "Nguyen Anh's Sword",
    era: '18th c.',
    dynastyOrCollection: 'Nguyen Dynasty',
    floorLabel: '2nd floor',
    roomCode: 'Room 203',
    roomName: 'Resistance Memory',
    type: 'Weapon',
    tags: ['Nguyen Dynasty', 'Rare'],
    material: 'Damascus Steel & Gold',
    origin: 'Hue, VN',
    size: '105 cm long',
    summary:
      'An imperial sword associated with Emperor Gia Long, combining military prestige with highly detailed royal craftsmanship.',
    audioDurationSeconds: 165,
    badge: 'Newly Displayed',
  },
  {
    id: 'old-map-gia-dinh',
    title: 'Old Map Of Gia Dinh',
    era: '19th c.',
    dynastyOrCollection: 'Ancient Map',
    floorLabel: '1st floor',
    roomCode: 'Room 102',
    roomName: 'Old Saigon Commerce',
    type: 'Map',
    tags: ['Ancient Map', 'Rare'],
    material: 'Ink on paper',
    origin: 'Gia Dinh',
    size: '70 x 110 cm',
    summary:
      'A carefully preserved city map that documents urban growth, trade routes, and administrative planning in old Gia Dinh.',
    audioDurationSeconds: 150,
    badge: 'Extremely Rare',
  },
  {
    id: 'royal-costumes',
    title: 'Royal Costumes',
    era: '17th c.',
    dynastyOrCollection: 'Vietnamese Culture',
    floorLabel: '2nd floor',
    roomCode: 'Room 106',
    roomName: 'Traditional Costumes',
    type: 'Textile',
    tags: ['Culture', 'Ceremony'],
    material: 'Silk & embroidery',
    origin: 'Central Viet Nam',
    size: 'Multiple garments',
    summary:
      'Court garments that reveal hierarchy, symbolism, and the handwork behind ceremonial dress in pre-modern Viet Nam.',
    audioDurationSeconds: 140,
    badge: 'Popular',
  },
  {
    id: 'saigon-1900-model',
    title: 'Saigon 1900 Model',
    era: '19th c.',
    dynastyOrCollection: 'Colonial Architecture',
    floorLabel: '1st floor',
    roomCode: 'Room 104',
    roomName: 'Colonial Architecture',
    type: 'Scale Model',
    tags: ['City', 'Architecture'],
    material: 'Wood & mixed media',
    origin: 'Saigon',
    size: '120 x 90 cm',
    summary:
      'A scale model that helps visitors read the changing urban identity of Saigon during the colonial era.',
    audioDurationSeconds: 135,
    badge: 'Family Favorite',
  },
  {
    id: 'resistance-weapons',
    title: 'Resistance Weapons',
    era: '1945 - 1975',
    dynastyOrCollection: 'Resistance War Against America',
    floorLabel: '2nd floor',
    roomCode: 'Room 204',
    roomName: 'Resistance Memory',
    type: 'Weapon',
    tags: ['History', 'War'],
    material: 'Steel & wood',
    origin: 'Southern Viet Nam',
    size: 'Mixed collection',
    summary:
      'A focused collection of wartime objects that speaks to improvisation, resilience, and the lived reality of resistance.',
    audioDurationSeconds: 155,
    badge: 'Powerful Story',
  },
];

export const relatedArtifactIds: Record<string, string[]> = {
  'dong-son-bronze-drums': ['nguyen-anh-sword', 'old-map-gia-dinh', 'royal-costumes'],
  'nguyen-anh-sword': ['dong-son-bronze-drums', 'old-map-gia-dinh', 'royal-costumes'],
  'old-map-gia-dinh': ['dong-son-bronze-drums', 'nguyen-anh-sword', 'royal-costumes'],
  'royal-costumes': ['dong-son-bronze-drums', 'old-map-gia-dinh', 'saigon-1900-model'],
  'saigon-1900-model': ['old-map-gia-dinh', 'royal-costumes', 'resistance-weapons'],
  'resistance-weapons': ['nguyen-anh-sword', 'saigon-1900-model', 'royal-costumes'],
};

export const rooms: Room[] = [
  {
    id: 'room-101',
    title: 'Room 101',
    subtitle: 'History of Establishment',
    floor: '1st floor',
    artifactCount: 12,
  },
  {
    id: 'room-102',
    title: 'Room 102',
    subtitle: 'Old Saigon Commerce',
    floor: '1st floor',
    artifactCount: 15,
  },
  {
    id: 'room-103',
    title: 'Room 103',
    subtitle: 'You are here',
    floor: '1st floor',
    artifactCount: 0,
    isCurrentLocation: true,
  },
  {
    id: 'room-104',
    title: 'Room 104',
    subtitle: 'Colonial Architecture',
    floor: '1st floor',
    artifactCount: 10,
  },
  {
    id: 'room-105',
    title: 'Room 105',
    subtitle: 'Dong Son Antiquities',
    floor: '1st floor',
    artifactCount: 18,
  },
  {
    id: 'room-106',
    title: 'Room 106',
    subtitle: 'Traditional Costumes',
    floor: '1st floor',
    artifactCount: 8,
  },
  {
    id: 'room-201',
    title: 'Room 201',
    subtitle: 'Resistance Gallery',
    floor: '2nd floor',
    artifactCount: 14,
  },
  {
    id: 'room-203',
    title: 'Room 203',
    subtitle: 'Royal Memory',
    floor: '2nd floor',
    artifactCount: 7,
  },
  {
    id: 'room-204',
    title: 'Room 204',
    subtitle: 'Resistance Memory',
    floor: '2nd floor',
    artifactCount: 11,
  },
];

export const journeyPlans: JourneyPlan[] = [
  {
    duration: '1 hour',
    startLabel: 'Main Lobby & Information',
    endLabel: 'Museum Cafe',
    stops: [
      {
        id: 'lobby',
        title: 'Main Lobby & Information',
        description: 'Get the audio guide and view the overview diagram.',
        timeLabel: '0:00',
        highlight: 'Buy Ticket',
      },
      {
        id: 'room-105',
        title: 'Room 105 - Dong Son Antiquities',
        description: 'Admire bronze drums and early brass tools.',
        timeLabel: '0:10',
      },
      {
        id: 'room-102',
        title: 'Room 102 - City History',
        description: 'Follow the 300-year journey of Saigon formation.',
        timeLabel: '0:35',
      },
      {
        id: 'cafe',
        title: 'Museum Cafe',
        description: 'Relax at the vintage garden cafe.',
        timeLabel: '1:00',
        highlight: 'Garden Cafe',
      },
    ],
  },
  {
    duration: '2 hours',
    startLabel: 'Main Lobby & Information',
    endLabel: 'Gift Corner',
    stops: [
      {
        id: 'lobby',
        title: 'Main Lobby & Information',
        description: 'Collect the route card and choose your preferred floor.',
        timeLabel: '0:00',
      },
      {
        id: 'room-101',
        title: 'Room 101 - History of Establishment',
        description: 'Understand how the museum and city memory archive began.',
        timeLabel: '0:20',
      },
      {
        id: 'room-105',
        title: 'Room 105 - Dong Son Antiquities',
        description: 'Pause for the signature bronze drum audio guide.',
        timeLabel: '0:50',
      },
      {
        id: 'room-203',
        title: 'Room 203 - Royal Memory',
        description: 'See the sword of Nguyen Anh and related court objects.',
        timeLabel: '1:25',
      },
      {
        id: 'gift',
        title: 'Gift Corner',
        description: 'Browse museum keepsakes before heading out.',
        timeLabel: '2:00',
      },
    ],
  },
  {
    duration: '3 hours',
    startLabel: 'Main Lobby & Information',
    endLabel: 'Museum Cafe',
    stops: [
      {
        id: 'lobby',
        title: 'Main Lobby & Information',
        description: 'Start with orientation, tickets, and route suggestions.',
        timeLabel: '0:00',
      },
      {
        id: 'room-104',
        title: 'Room 104 - Colonial Architecture',
        description: 'Explore shifting city forms through maps and models.',
        timeLabel: '0:35',
      },
      {
        id: 'room-102',
        title: 'Room 102 - Old Saigon Commerce',
        description: 'Trace mercantile life and urban expansion.',
        timeLabel: '1:05',
      },
      {
        id: 'room-203',
        title: 'Room 203 - Royal Memory',
        description: 'Listen to the sword audio guide and compare dynastic symbols.',
        timeLabel: '1:50',
      },
      {
        id: 'room-204',
        title: 'Room 204 - Resistance Memory',
        description: 'Close with the wartime collection on the second floor.',
        timeLabel: '2:30',
      },
      {
        id: 'cafe',
        title: 'Museum Cafe',
        description: 'Rest, reflect, and save your favorite artifacts.',
        timeLabel: '3:00',
      },
    ],
  },
  {
    duration: '6 hours',
    startLabel: 'Main Lobby & Information',
    endLabel: 'Full Museum Loop',
    stops: [
      {
        id: 'lobby',
        title: 'Main Lobby & Information',
        description: 'Plan a full-day museum route with breaks.',
        timeLabel: '0:00',
      },
      {
        id: 'room-101',
        title: 'Room 101 - History of Establishment',
        description: 'Cover the founding story and museum mission.',
        timeLabel: '0:30',
      },
      {
        id: 'room-102',
        title: 'Room 102 - Old Saigon Commerce',
        description: 'Dive deep into city trade, maps, and archival images.',
        timeLabel: '1:20',
      },
      {
        id: 'room-105',
        title: 'Room 105 - Dong Son Antiquities',
        description: 'Spend extra time with bronze drums and ritual objects.',
        timeLabel: '2:15',
      },
      {
        id: 'cafe-break',
        title: 'Museum Cafe Break',
        description: 'Pause for coffee before moving upstairs.',
        timeLabel: '3:10',
      },
      {
        id: 'room-203',
        title: 'Room 203 - Royal Memory',
        description: 'Compare court objects, weaponry, and dynastic motifs.',
        timeLabel: '4:00',
      },
      {
        id: 'room-204',
        title: 'Room 204 - Resistance Memory',
        description: 'Finish with a broader reading of 20th-century resistance.',
        timeLabel: '5:05',
      },
      {
        id: 'exit',
        title: 'Full Museum Loop',
        description: 'Complete your day and review favorites in your profile.',
        timeLabel: '6:00',
      },
    ],
  },
];
