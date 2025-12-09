# Class Castor / LAN Classroom - Web Prototype

A web-based prototype of **Class Castor** (LAN Classroom) - a real-time classroom/meeting collaboration system. This prototype demonstrates the UI/UX and frontend functionality without backend integration.

![Python](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)

## 🌟 Features

### Core Features (Prototype)

- **Room Management**
  - Create rooms with auto-generated 6-character codes
  - Join existing rooms with room codes
  - Room code validation

- **Real-time UI Components**
  - Modern brown/milk themed interface
  - Participant list sidebar
  - Text chat panel
  - Control bar with action buttons
  - Screen share viewer area
  - Camera view area

- **Interactive Controls**
  - Mute/Unmute button
  - Screen sharing toggle
  - Camera toggle
  - Raise hand feature
  - File transfer UI
  - Clipboard sharing UI

- **Moderator Features (UI)**
  - Mute participants
  - Kick participants
  - Spotlight participants
  - Participant management

- **Demo Mode**
  - Simulates multiple participants
  - Mock chat messages
  - Simulated screen sharing
  - Interactive UI demonstrations

## 🚀 Quick Start

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/YOUR_USERNAME/class-castor-prototype.git
cd class-castor-prototype
```

2. Open `index.html` in a modern web browser:
   - Simply double-click `index.html`, or
   - Use a local server (recommended):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (http-server)
     npx http-server
     
     # PHP
     php -S localhost:8000
     ```

3. Access the application:
   - Open browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
class-castor-prototype/
├── index.html          # Main application page
├── css/
│   └── style.css       # Custom styling with brown/milk theme
├── js/
│   └── app.js          # Main application logic and mock functionality
├── assets/             # Images and icons (if needed)
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## 🎨 UI Features

### Color Theme
- **Primary Brown**: Rich, warm brown tones
- **Milk/Cream**: Soft, light cream accents
- **Modern Design**: Clean, minimalist interface

### Layout Components
- **Top Bar**: Room info, connection status, user name
- **Sidebar**: Participant list with status indicators
- **Main Area**: Screen share viewer and camera feeds
- **Chat Panel**: Message history and input
- **Control Bar**: Action buttons (mute, share, camera, etc.)

## 🧪 Demo Mode

The prototype includes a demo mode that simulates:
- Multiple participants joining/leaving
- Chat messages from different users
- Screen sharing preview
- Participant status changes
- File transfer notifications

### Using Demo Mode

1. Click "Create Room" or "Join Room"
2. Enter a name (or use default)
3. The demo will automatically simulate:
   - Other participants joining
   - Chat messages appearing
   - Screen sharing activation
   - Participant interactions

## 🛠️ Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Custom styling and animations
- **JavaScript (ES6+)**: Application logic and interactivity
- **Bootstrap 5**: Responsive grid and components
- **Font Awesome**: Icons (via CDN)

## 📝 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 🔮 Future Implementation

This prototype demonstrates the frontend UI/UX. For full functionality, the following would need to be implemented:

- **Backend Signaling Server**: WebSocket server for room management
- **WebRTC Integration**: Real peer-to-peer connections
- **Media Capture**: Actual screen/camera/audio capture APIs
- **File Transfer**: Real file chunking and transfer
- **Database**: User accounts, room persistence, history

## 📄 License

This project is a prototype demonstration. License to be determined.

## 🤝 Contributing

This is a prototype project. Contributions and suggestions are welcome!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a frontend prototype without backend functionality. All features are simulated for demonstration purposes.

