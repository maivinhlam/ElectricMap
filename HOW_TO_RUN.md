# 🚀 How to Run Your Motorcycle Viewer App

## Prerequisites

Before running the app, make sure you have:

1. **Node.js** (version 16 or later)
2. **npm** or **yarn**
3. **Expo CLI** (we'll install this)

## Step-by-Step Instructions

### 1. Navigate to Project Directory

```bash
cd /Users/maivinhlam/workspace/ElectricMap
```

### 2. Install Expo CLI (if not already installed)

```bash
npm install -g @expo/cli
```

### 3. Install Project Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

or

```bash
expo start
```

### 5. Run on Your Device

After running `npm start`, you'll see a QR code and several options:

#### Option A: Use Expo Go App (Recommended for beginners)

1. **Install Expo Go** on your phone:
   - iOS: Download from App Store
   - Android: Download from Google Play Store
2. **Scan the QR code** with your phone camera or Expo Go app
3. The app will load on your phone!

#### Option B: Use iOS Simulator (Mac only)

```bash
npm run ios
```

- Requires Xcode installed
- Will open iOS Simulator automatically

#### Option C: Use Android Emulator

```bash
npm run android
```

- Requires Android Studio and emulator setup
- Will open Android emulator automatically

#### Option D: Run in Web Browser

```bash
npm run web
```

- Opens in your web browser
- Good for quick testing

## Troubleshooting

### If Expo CLI installation fails:

```bash
# Try with npx (no global installation needed)
npx expo start
```

### If dependencies installation fails:

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### If app doesn't start:

```bash
# Clear Expo cache
npx expo start --clear
```

## What You'll See

Once the app runs successfully, you'll see:

1. **Home Screen** with motorcycle images
2. **Search bar** at the top for finding motorcycles
3. **Menu button** (☰) to open the sidebar
4. **Grid of motorcycle images** you can tap to view

## App Features to Test

1. **Search**: Type "Honda", "SH", or "2024" in the search bar
2. **Menu**: Tap ☰ to see brands → models → years hierarchy
3. **Image Viewer**: Tap any image to view full-screen with zoom/rotate
4. **Filtering**: Use the sidebar to filter by brand, model, or year

## Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web

# Run tests
npm test

# Check for linting errors
npm run lint
```

## Next Steps

Once the app is running:

1. **Test all features** (search, menu, image viewer)
2. **Add real motorcycle images** by updating URLs in `src/data/motorcycleData.ts`
3. **Customize the UI** by modifying styles in the screen files
4. **Add more motorcycles** to the database

## Need Help?

If you encounter any issues:

1. Make sure you're in the correct directory: `/Users/maivinhlam/workspace/ElectricMap`
2. Check that all dependencies are installed: `npm install`
3. Try clearing cache: `npx expo start --clear`
4. Restart your terminal and try again

---

**Happy coding! 🏍️✨**
