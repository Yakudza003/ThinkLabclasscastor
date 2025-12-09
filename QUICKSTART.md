# Quick Start Guide

## 🚀 Getting Started

1. **Open the application:**
   - Simply open `index.html` in your web browser, OR
   - Use a local server (recommended):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Then open: http://localhost:8000
     ```

2. **Create or Join a Room:**
   - Enter your name
   - For demo mode, enter "auto" as server URL
   - Click "Create Room" to create a new room
   - Or click "Join Room" and enter a 6-character room code

3. **Explore the Features:**
   - **Chat**: Type messages in the chat panel
   - **Mute/Unmute**: Toggle your microphone
   - **Screen Share**: Simulate screen sharing
   - **Camera**: Toggle camera view
   - **Raise Hand**: Signal to the moderator
   - **File Transfer**: Select files to send (UI only)
   - **Clipboard**: Share clipboard content (if supported)

## 🎮 Demo Mode

When you use "auto" as the server URL, demo mode is automatically enabled:
- Simulates multiple participants joining
- Shows mock chat messages
- Demonstrates participant interactions
- Shows camera feeds and status indicators

## 📦 GitHub Upload

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Class Castor web prototype"
   ```

2. **Create GitHub Repository:**
   - Go to GitHub.com
   - Click "New repository"
   - Name it: `class-castor-prototype` or `lan-classroom-prototype`
   - Don't initialize with README (we already have one)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## 🎨 Features Demonstrated

- ✅ Room creation and joining
- ✅ Participant list with status indicators
- ✅ Real-time chat interface
- ✅ Control buttons (mute, screen share, camera, etc.)
- ✅ Moderator controls (mute/kick participants)
- ✅ Brown/milk themed UI
- ✅ Responsive design
- ✅ Demo mode for testing

## 📝 Notes

- This is a **frontend prototype** - no backend functionality
- All features are simulated/mocked
- Perfect for demonstrating UI/UX concepts
- Ready for GitHub Pages deployment

