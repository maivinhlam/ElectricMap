# ElectricMap

A React Native app for finding electric vehicle charging stations.

## Features

- 🗺️ Interactive map showing charging stations
- 📍 Location-based station discovery
- ⚡ Real-time availability status
- 🔌 Connector type compatibility
- 💰 Pricing information
- 🛣️ Navigation integration
- 📱 Cross-platform (iOS & Android)

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/electric-map.git
cd electric-map
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your preferred platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## Project Structure

```
ElectricMap/
├── src/
│   ├── components/     # Reusable components
│   ├── screens/        # Screen components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── assets/             # Images, fonts, and other assets
├── App.tsx             # Main app component
└── package.json        # Dependencies and scripts
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **TypeScript** - Type safety
- **React Native Maps** - Map integration
- **Expo Location** - Location services

## Features in Detail

### Home Screen

- Quick statistics
- Quick action buttons
- Latest news and updates

### Map Screen

- Interactive map with station markers
- Color-coded availability status
- Location services integration
- Station details on marker press

### Station Details

- Complete station information
- Connector types and pricing
- Available amenities
- Navigation integration
- Reservation functionality

### Settings Screen

- User preferences
- Notification settings
- Account management
- App information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Electric vehicle charging data providers
- React Native community
- Expo team for excellent development tools
