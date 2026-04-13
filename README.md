# Museum Companion

React Native museum companion prototype for Android, based on the PDF flow and `app.md` requirements.

## Features

- Sign in, sign up, and continue as guest
- Home dashboard with museum overview and featured artifacts
- Schedule screen with 1h, 2h, 3h, and 6h journey plans
- Map screen with floor switching and room details
- Artifact collection search and floor filtering
- Artifact detail page with simulated audio guide progress
- Profile screen with favorites, viewed stats, visit count, and preferences
- Local persistence with AsyncStorage
- Unit tests for domain and persistence helpers

## Tech

- Expo + React Native + TypeScript
- React Navigation
- AsyncStorage for small local data storage
- Jest for unit tests

## Commands

- `npm install`
- `npm run start`
- `npm run android`
- `npm run android:native`
- `npm run prebuild:android`
- `npm run test`

## Android build notes

1. Run `npm run prebuild:android` to generate the `android/` project.
2. Open Android Studio or ensure Android SDK and emulator/device are ready.
3. Run `npm run android:native` to build and launch the native Android app.
4. For a release APK, use Gradle from `android/`:

```powershell
cd android
.\gradlew assembleRelease
```

The release APK will be generated under `android\app\build\outputs\apk\release\`.

## Testing

Run:

```powershell
npm run test
```
