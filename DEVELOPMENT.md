# ElectricMap Development Guide

## Quick Start

1. **Prerequisites**

   - Node.js 16+ installed
   - Expo CLI (`npm install -g @expo/cli`)
   - iOS Simulator or Android Emulator

2. **Setup**

   ```bash
   ./setup.sh
   # OR manually:
   npm install
   cp .env.example .env
   ```

3. **Development**
   ```bash
   npm start          # Start Expo dev server
   npm run ios        # Run on iOS simulator
   npm run android    # Run on Android emulator
   npm run web        # Run in web browser
   ```

## Project Structure

```
ElectricMap/
├── App.tsx                    # Main app entry point
├── src/
│   ├── components/           # Reusable UI components
│   │   └── StationCard.tsx   # Charging station card component
│   ├── screens/              # App screens
│   │   ├── HomeScreen.tsx    # Dashboard/home screen
│   │   ├── MapScreen.tsx     # Interactive map with stations
│   │   ├── StationDetailScreen.tsx  # Station details view
│   │   └── SettingsScreen.tsx       # App settings
│   ├── types/                # TypeScript definitions
│   │   └── index.ts          # Core type definitions
│   ├── utils/                # Utility functions
│   │   └── location.ts       # Location/distance calculations
│   └── data/                 # Mock data for development
│       └── mockStations.ts   # Sample charging station data
├── assets/                   # Images, fonts, icons
└── config files...
```

## Key Features

### 📱 Navigation

- Bottom tab navigation with Home, Map, and Settings
- Stack navigation for detailed views
- Native navigation animations

### 🗺️ Map Integration

- Interactive map with charging station markers
- Color-coded availability status
- User location services
- Marker clustering for performance

### 🔌 Station Features

- Real-time availability status
- Connector type compatibility
- Pricing information
- Turn-by-turn navigation
- Station amenities listing

### ⚙️ Settings & Preferences

- Notification preferences
- Theme selection (light/dark)
- Account management
- App information

## Development Workflow

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add navigation types to `src/types/index.ts`
3. Register in navigation stack (`App.tsx`)

### Adding New Components

1. Create component in `src/components/`
2. Export from component file
3. Import and use in screens

### Working with Location

- Use `expo-location` for user positioning
- Implement proper permission handling
- Consider offline/error scenarios

### Data Management

- Currently using mock data (`src/data/mockStations.ts`)
- Ready for API integration
- Type-safe with TypeScript interfaces

## Testing

```bash
npm test              # Run Jest tests
npm run lint          # Run ESLint
```

## Building for Production

```bash
# Build for app stores
expo build:ios        # iOS build
expo build:android    # Android build

# Or with EAS (recommended)
eas build --platform ios
eas build --platform android
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
EXPO_PUBLIC_API_URL=https://api.yourservice.com
EXPO_PUBLIC_MAPS_API_KEY=your_google_maps_key
EXPO_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Common Issues

### Map not showing

- Check Google Maps API key
- Ensure location permissions are granted
- Verify network connectivity

### Navigation errors

- Check type definitions in `src/types/index.ts`
- Ensure screen names match navigation setup

### Build failures

- Clear Metro cache: `npx expo start --clear`
- Clear node_modules: `rm -rf node_modules && npm install`

## Next Steps

1. **API Integration**

   - Replace mock data with real charging station API
   - Implement authentication
   - Add real-time availability updates

2. **Enhanced Features**

   - Route planning with charging stops
   - Payment integration
   - Station reviews and ratings
   - Push notifications for charging status

3. **Performance**

   - Implement map marker clustering
   - Add offline support
   - Optimize image loading

4. **Testing**
   - Add comprehensive unit tests
   - Implement E2E testing
   - Add accessibility testing

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
