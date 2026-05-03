# Museum Companion

Museum Companion is a mobile museum guide prototype built with Expo, React Native, and TypeScript. The app is designed to support visitors during their museum visit with artifact discovery, QR-based navigation, suggested tour schedules, and a lightweight personal profile experience.

The product focuses on making the visit easier to explore on a phone: users can browse collections, search and filter artifacts, open detailed artifact pages, simulate an audio-guide flow, view room and floor information, and save favorite items for later.

## Highlights

- Guest-first onboarding with a simple authentication entry screen
- Home dashboard with museum overview, featured artifacts, and quick journey entry
- Artifact collection browsing with:
  - text search
  - floor filter
  - category filter
  - QR scanning to jump directly to an artifact
- Artifact detail experience with:
  - summary and metadata
  - simulated audio guide progress
  - favorite toggle
  - related artifact suggestions
- Schedule planner with 1-hour, 2-hour, 3-hour, and 6-hour museum journeys
- Map screen with floor switching and room-focused exploration
- Profile screen with:
  - saved favorites
  - viewed artifact statistics
  - visit progress
  - user preferences
- Local persistence using AsyncStorage so app state survives reloads

## Screens

- `AuthScreen`: sign in, sign up, or continue as guest
- `HomeScreen`: museum overview and featured content
- `ArtifactsScreen`: collection search, QR scan, and filtering
- `ArtifactDetailScreen`: artifact story, metadata, favorites, audio guide, related items
- `ScheduleScreen`: recommended museum routes by visit duration
- `MapScreen`: floor-based map browsing
- `ProfileScreen`: personal stats and settings

## Tech Stack

- Expo
- React Native
- TypeScript
- React Navigation
- AsyncStorage
- Expo Camera
- Jest

## Project Commands

```bash
npm install
npm run start
npm run android
npm run android:native
npm run prebuild:android
npm run test
```

## Run On Android

1. Install dependencies:

```bash
npm install
```

2. Start the Expo project:

```bash
npm run start
```

3. Run on Android:

- Press `a` from the Expo terminal if an Android emulator is already open, or
- use:

```bash
npm run android
```

If you need the native Android project:

```bash
npm run prebuild:android
npm run android:native
```

## Testing

Run unit tests with:

```bash
npm run test
```

## Notes

- The app currently uses local museum data stored in `src/data/museumData.ts`.
- Artifact progress, favorites, viewed history, and profile preferences are stored locally.
- This project is currently a prototype focused on visitor experience and UI flow rather than production backend integration.
