# 🏍️ MotorcycleViewer

A React Native app for viewing Vietnamese motorcycle images with advanced search and filtering capabilities.

## ✨ Features

- 🏍️ **Browse Vietnamese Motorcycles**: Explore popular brands like Honda, Yamaha, Suzuki, and SYM
- 🔍 **Smart Search**: Real-time search with autocomplete across brands, models, and years
- 📱 **Hierarchical Menu**: Organized sidebar with brand → model → year navigation
- 🖼️ **Advanced Image Viewer**: Full-screen viewing with zoom, pan, and rotation
- 💾 **Persistent Storage**: Remembers your last viewed image
- 📱 **Cross-Platform**: Works on both iOS and Android

## 🏍️ Supported Motorcycles

### Honda

- SH (2023-2024)
- Winner X (2023-2024)
- Blade (2024)

### Yamaha

- Sirius (2023-2024)
- Exciter (2024)
- Janus (2024)

### Suzuki

- Satria F150 (2024)
- Raider R150 (2024)

### SYM

- Attila Elizabeth (2024)

## 🚀 Quick Start

1. **Install dependencies**:

```bash
npm install
```

2. **Start the development server**:

```bash
npm start
```

3. **Run on your device**:

```bash
npm run ios     # iOS
npm run android # Android
npm run web     # Web
```

## 📱 App Structure

### Home Screen

- **Top Search Bar**: Type to find motorcycles instantly
- **Menu Button**: Access the sidebar for organized browsing
- **Image Grid**: Browse all motorcycle images in a responsive grid
- **Last Viewed**: Quick access to your most recent image

### Search Functionality

- **Real-time Results**: See suggestions as you type
- **Multi-category Search**: Find by brand name, model, or year
- **Smart Filtering**: Automatically filters the image grid

### Sidebar Menu

- **Brand Hierarchy**:
  - Tap a brand to see its models
  - Tap a model to see available years
  - Tap a year to see specific images
- **Visual Indicators**: Selected items are highlighted
- **Show All Button**: Reset filters to see everything

### Image Viewer

- **Full-Screen Display**: Immersive viewing experience
- **Zoom & Pan**: Pinch to zoom, drag to move around
- **Rotation Controls**: Rotate images left or right
- **Reset Function**: Return to original size and orientation

## 🛠️ Technical Features

### Built With

- **React Native** + **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for smooth navigation
- **AsyncStorage** for data persistence

### Architecture

```
src/
├── screens/                    # App screens
│   ├── SimpleMotorcycleHomeScreen.tsx  # Main browsing interface
│   └── SimpleImageViewerScreen.tsx     # Full-screen image viewer
├── data/
│   └── motorcycleData.ts      # Vietnamese motorcycle database
├── utils/
│   └── search.ts              # Search and filtering logic
└── types/
    └── index.ts               # TypeScript definitions
```

### Data Structure

```typescript
MotorcycleBrand {
  id: string
  name: string
  models: MotorcycleModel[]
}

MotorcycleModel {
  id: string
  name: string
  years: MotorcycleYear[]
}

MotorcycleImage {
  id: string
  url: string
  title: string
  year: number
}
```

## 🎯 Usage Examples

### Search Examples

- Type "Honda" → See all Honda motorcycles
- Type "SH" → See Honda SH models
- Type "2024" → See all 2024 models
- Type "Sirius" → See Yamaha Sirius motorcycles

### Navigation Flow

1. **Browse All** → See everything at once
2. **Filter by Brand** → Tap Honda in sidebar
3. **Filter by Model** → Tap SH under Honda
4. **Filter by Year** → Tap 2024 under SH
5. **View Image** → Tap any image to view full-screen

### Image Viewer Controls

- **Pinch**: Zoom in/out
- **Drag**: Move around when zoomed
- **Rotate Buttons**: Turn image left or right
- **Reset Button**: Return to original view
- **Back Button**: Return to grid

## 🔧 Development

### Adding New Motorcycles

1. Open `src/data/motorcycleData.ts`
2. Add to existing brand or create new brand
3. Include model details and image URLs
4. Images will automatically appear in the app

### Customizing UI

- **Colors**: Modify the StyleSheet objects in each screen
- **Layout**: Adjust the grid columns in FlatList
- **Search**: Enhance the search algorithm in `utils/search.ts`

## 📋 Future Enhancements

- [ ] **Real Image URLs**: Replace placeholder URLs with actual motorcycle images
- [ ] **Image Caching**: Store images locally for offline viewing
- [ ] **Favorites System**: Let users save favorite motorcycles
- [ ] **Comparison Tool**: Side-by-side model comparison
- [ ] **Push Notifications**: New model alerts
- [ ] **Social Sharing**: Share favorite motorcycles
- [ ] **Advanced Filters**: Filter by engine size, price range, etc.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for motorcycle enthusiasts in Vietnam** 🇻🇳
