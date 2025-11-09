#!/bin/bash

echo "🚀 Starting ElectricMap Development Setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "🔧 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your API keys"
fi

echo "✅ Setup complete! You can now run:"
echo "   npm start    - Start the development server"
echo "   npm run ios  - Run on iOS simulator"
echo "   npm run android - Run on Android emulator"
echo "   npm test     - Run tests"
