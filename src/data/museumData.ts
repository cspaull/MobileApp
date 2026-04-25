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
  floorLabel: '1st floor' | '2nd floor';
  roomName: string;
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
    id: 'kham-sai-dai-quan-phong',
    title: 'Kham Sai Dai Quan Phong Emblem',
    era: '19th century',
    roomName: 'Room of Administrative Geography',
    floorLabel: '1st floor',
    tags: ['Emblem', 'Metal', 'Most Popular'],
    material: 'Ivory',
    origin: 'Northern Viet Nam',
    size: '2.5x8.5 cm',
    summary:
      'The "Kham Sai Dai Quan Phong” emblem  (the emblem of a high-ranking official in charge of foreign affairs) from the Nguyễn Dynasty (created in the intercalary 6th month of the 26th year of Tự Đức\'s reign), 1873.',
    audioDurationSeconds: 165,
    badge: 'Most Popular',
  },
  {
    id: 'ta-quan-chi-an',
    title: "Ta Quan Chi An Seal",
    era: '19th century',
    roomName: 'Room of Administrative Geography',
    floorLabel: '2nd floor',
    tags: ['Seal','Metal','Rare'],
    material: 'Ivory',
    origin: 'Northern Viet Nam',
    size: '7x7 cm',
    summary:
      'The seal "Ta Quan Chi An" awarded to Do Thong che Ta Quan Dinh Than sach Le Van Duyet (cast in the first year of King Gia Long), in 1802.',
    audioDurationSeconds: 165,
    badge: 'Newly Displayed',
  },
  {
    id: 'luong-tai-hau-chi-an',
    title: 'Luong Tai Hau Chi An Seal',
    era: '19th century',
    roomName: 'Room of Administrative Geography',
    floorLabel: '1st floor',
    tags: ['Seal','Metal', 'Rare'],
    material: 'Cooper',
    origin: 'Northern Viet Nam',
    size: '7x7 cm',
    summary:
      'The seal "Luong Tai hau chi an" of marquis Luong Tai, cast in the 14th year of King Minh Menh (1833).',
    audioDurationSeconds: 150,
    badge: 'Extremely Rare',
  },
  {
    id: 'canh-hung-thong-bao',
    title: 'Canh Hung Thong Bao',
    era: '18th century',
    roomName: 'VietNam Currency Room',
    floorLabel: '2nd floor',
    tags: ['Coin', 'Metal', 'Currency'],
    material: 'Cooper',
    origin: 'Diameter: 5.2cm',
    size: 'Central VietNam',
    summary:
      'Commemorative/Reward coin of the Lê Dynasty (Great Lê): Cảnh Hưng Thông Bảo (1740 - 1786)',
    audioDurationSeconds: 140,
    badge: 'Popular',
  },
  {
    id: 'the-thieu-tri',
    title: 'The Thieu Tri Prize Money',
    era: '19th century',
    roomName: 'VietNam Currency Room',
    floorLabel: '1st floor',
    tags: ['Coin', 'Metal', 'Currency'],
    material: 'Silver',
    origin: 'VietNam',
    size: 'Diameter: 6.6cm',
    summary:
      'The Thieu Tri prize money was cast during the reign of King Thieu Tri (1841 - 1847) in a round shape with square holes, made of gold-plated silver with edges and edges with serrated holes, 6.6cm in diameter, 0.2cm thick.',
    audioDurationSeconds: 135,
    badge: 'Family Favorite',
  },
  {
    id: 'minh-mang-era-silver-bar',
    title: 'Minh Mang Era Silver Bar',
    era: '19th century',
    roomName: 'VietNam Currency Room',
    floorLabel: '2nd floor',
    tags: ['Coin', 'Metal', 'Currency'],
    material: 'Silver',
    origin: 'VietNam',
    size: '11.8x2.85x1.55cm',
    summary:
      'The ten-tael silver bar from the Minh Mang era, also known as a "silver ingot," is rectangular in shape with a concave, boat-like front surface. It measures 11.8cm in length, 2.85cm in width, 1.55cm in thickness, and weighs 380.6g.',
    audioDurationSeconds: 155,
    badge: 'Powerful Story',
  },
  {
    id: 'revolver',
    title: 'Revolver',
    era: '1945 - 1975',
    roomName: 'Resistance War Against America Room',
    floorLabel: '2nd floor',
    tags: ['History', 'War'],
    material: 'Steel',
    origin: 'VietNam',
    size: 'Multiple Size',
    summary:
      'Revolver - Confiscated from French soldiers at the District 6 police station on June 23, 1945, by Comrade Vu Thanh Hung, Deputy Squad Leader of the Faci Factory Self-Defense Force. It was subsequently used during the Resistance War against the French (1945-1954).',
    audioDurationSeconds: 155,
    badge: 'Powerful Story',
  },
  {
    id: 'carrier-bicycle',
    title: 'Carrier Bicycle',
    era: '1945 - 1975',
    roomName: 'Resistance War Against America',
    floorLabel: '2nd floor',
    tags: ['History', 'War'],
    material: 'Steel',
    origin: 'VietNam',
    size: 'Multiple Size',
    summary:
      'During the Dien Bien Phu Campaign, our soldiers and frontline laborers utilized more than 21,000 pack bicycles, famously known as the "pack bicycle corps," operating across a total distance of nearly 1,500km.',
    audioDurationSeconds: 155,
    badge: 'Powerful Story',
  },
  {
    id: 'canteen',
    title: 'Canteen',
    era: '1945 - 1975',
    roomName: 'Resistance War Against America',
    floorLabel: '2nd floor',
    tags: ['Metal', 'Supply'],
    material: 'Steel',
    origin: 'VietNam',
    size: 'Mixed Size',
    summary:
      'Revolver - Confiscated from French soldiers at the District 6 police station on June 23, 1945, by Comrade Vu Thanh Hung, Deputy Squad Leader of the Faci Factory Self-Defense Force. It was subsequently used during the Resistance War against the French (1945-1954).',
    audioDurationSeconds: 155,
    badge: 'Powerful Story',
  },
];

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
