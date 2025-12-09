// Class Castor - Main Application Logic

class ClassCastorApp {
    constructor() {
        this.currentUser = {
            name: 'You',
            id: this.generateId(),
            isMuted: false,
            isSharingScreen: false,
            isCameraOn: false,
            handRaised: false
        };
        
        this.currentRoom = {
            code: null,
            participants: [],
            isConnected: false
        };
        
        this.demoMode = false;
        this.demoInterval = null;
        this.chatMessages = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showWelcomeModal();
    }
    
    setupEventListeners() {
        // Welcome Modal
        document.getElementById('createRoomBtn').addEventListener('click', () => this.createRoom());
        document.getElementById('joinRoomBtn').addEventListener('click', () => this.showJoinModal());
        document.getElementById('joinRoomConfirmBtn').addEventListener('click', () => this.joinRoom());
        
        // Room Management
        document.getElementById('leaveRoomBtn').addEventListener('click', () => this.leaveRoom());
        
        // Chat
        document.getElementById('sendChatBtn').addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
        
        // Controls
        document.getElementById('muteBtn').addEventListener('click', () => this.toggleMute());
        document.getElementById('screenShareBtn').addEventListener('click', () => this.toggleScreenShare());
        document.getElementById('cameraBtn').addEventListener('click', () => this.toggleCamera());
        document.getElementById('raiseHandBtn').addEventListener('click', () => this.toggleRaiseHand());
        document.getElementById('fileTransferBtn').addEventListener('click', () => this.showFileTransfer());
        document.getElementById('clipboardBtn').addEventListener('click', () => this.shareClipboard());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());
        
        // File Input
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileSelect(e));
    }
    
    showWelcomeModal() {
        const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
        modal.show();
    }
    
    showJoinModal() {
        const welcomeModal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
        if (welcomeModal) welcomeModal.hide();
        
        const modal = new bootstrap.Modal(document.getElementById('joinRoomModal'));
        modal.show();
        
        document.getElementById('roomCodeInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinRoom();
        });
    }
    
    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    createRoom() {
        const userName = document.getElementById('userName').value.trim() || 'You';
        const serverUrl = document.getElementById('serverUrl').value.trim();
        
        this.currentUser.name = userName;
        this.currentRoom.code = this.generateRoomCode();
        this.currentRoom.isConnected = true;
        this.demoMode = serverUrl.toLowerCase() === 'auto' || !serverUrl;
        
        // Close welcome modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
        if (modal) modal.hide();
        
        // Update UI
        this.updateUI();
        document.getElementById('appContainer').classList.remove('d-none');
        
        // Add current user to participants
        this.addParticipant(this.currentUser);
        
        // Start demo mode if enabled
        if (this.demoMode) {
            this.startDemoMode();
        }
        
        this.addSystemMessage(`Room created! Share code: ${this.currentRoom.code}`);
    }
    
    joinRoom() {
        const roomCode = document.getElementById('roomCodeInput').value.trim().toUpperCase();
        const userName = document.getElementById('userName').value.trim() || 'You';
        
        if (roomCode.length !== 6) {
            alert('Room code must be 6 characters');
            return;
        }
        
        this.currentUser.name = userName;
        this.currentRoom.code = roomCode;
        this.currentRoom.isConnected = true;
        this.demoMode = true; // Auto-enable demo for join
        
        // Close modals
        const joinModal = bootstrap.Modal.getInstance(document.getElementById('joinRoomModal'));
        if (joinModal) joinModal.hide();
        
        const welcomeModal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
        if (welcomeModal) welcomeModal.hide();
        
        // Update UI
        this.updateUI();
        document.getElementById('appContainer').classList.remove('d-none');
        
        // Add current user to participants
        this.addParticipant(this.currentUser);
        
        // Start demo mode
        this.startDemoMode();
        
        this.addSystemMessage(`Joined room ${roomCode}!`);
    }
    
    leaveRoom() {
        if (confirm('Are you sure you want to leave the room?')) {
            this.stopDemoMode();
            this.currentRoom.isConnected = false;
            this.currentRoom.participants = [];
            this.chatMessages = [];
            
            document.getElementById('appContainer').classList.add('d-none');
            this.showWelcomeModal();
            
            // Reset UI
            document.getElementById('participantList').innerHTML = '';
            document.getElementById('chatMessages').innerHTML = '';
            document.getElementById('cameraGrid').innerHTML = '';
        }
    }
    
    updateUI() {
        document.getElementById('currentRoomCode').textContent = this.currentRoom.code;
        document.getElementById('currentUserName').textContent = this.currentUser.name;
        this.updateParticipantCount();
    }
    
    addParticipant(participant) {
        // Check if participant already exists
        const exists = this.currentRoom.participants.find(p => p.id === participant.id);
        if (exists) return;
        
        this.currentRoom.participants.push(participant);
        this.renderParticipants();
        this.updateParticipantCount();
        this.renderCameraFeeds();
    }
    
    removeParticipant(participantId) {
        this.currentRoom.participants = this.currentRoom.participants.filter(p => p.id !== participantId);
        this.renderParticipants();
        this.updateParticipantCount();
        this.renderCameraFeeds();
    }
    
    renderParticipants() {
        const container = document.getElementById('participantList');
        container.innerHTML = '';
        
        this.currentRoom.participants.forEach(participant => {
            const isYou = participant.id === this.currentUser.id;
            const item = document.createElement('div');
            item.className = `participant-item ${isYou ? 'you' : ''} fade-in`;
            
            const statusClass = participant.isMuted ? 'muted' : (participant.isSpeaking ? 'speaking' : '');
            const handRaised = participant.handRaised ? '<span class="status-indicator hand-raised"></span>' : '';
            
            item.innerHTML = `
                <div class="participant-info">
                    <div class="participant-avatar">${participant.name.charAt(0).toUpperCase()}</div>
                    <div class="participant-details">
                        <div class="participant-name">${participant.name} ${isYou ? '(You)' : ''}</div>
                        <div class="participant-status">
                            ${handRaised}
                            <span class="status-indicator ${statusClass}"></span>
                            ${participant.isMuted ? 'Muted' : participant.isSpeaking ? 'Speaking' : 'Connected'}
                        </div>
                    </div>
                </div>
                ${!isYou ? `
                    <div class="participant-actions">
                        <button onclick="app.muteParticipant('${participant.id}')" title="Mute">
                            <i class="fas fa-microphone-slash"></i>
                        </button>
                        <button onclick="app.kickParticipant('${participant.id}')" title="Kick">
                            <i class="fas fa-user-times"></i>
                        </button>
                    </div>
                ` : ''}
            `;
            
            container.appendChild(item);
        });
    }
    
    updateParticipantCount() {
        document.getElementById('participantCount').textContent = this.currentRoom.participants.length;
    }
    
    renderCameraFeeds() {
        const container = document.getElementById('cameraGrid');
        container.innerHTML = '';
        
        this.currentRoom.participants.forEach(participant => {
            if (participant.isCameraOn || participant.id === this.currentUser.id) {
                const isYou = participant.id === this.currentUser.id;
                const feed = document.createElement('div');
                feed.className = `camera-item ${isYou ? 'you' : ''} fade-in`;
                
                feed.innerHTML = `
                    <div class="camera-placeholder">
                        <i class="fas fa-video fa-3x"></i>
                        <p>${participant.name}</p>
                    </div>
                    <div class="camera-label">
                        <i class="fas fa-circle"></i>
                        ${participant.name} ${isYou ? '(You)' : ''}
                        ${participant.isMuted ? '<i class="fas fa-microphone-slash ms-auto"></i>' : ''}
                    </div>
                `;
                
                container.appendChild(feed);
            }
        });
    }
    
    // Chat Functions
    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addChatMessage(this.currentUser.name, message, true);
        input.value = '';
        
        // In demo mode, simulate responses
        if (this.demoMode) {
            setTimeout(() => {
                const demoParticipants = this.currentRoom.participants.filter(p => p.id !== this.currentUser.id);
                if (demoParticipants.length > 0) {
                    const randomParticipant = demoParticipants[Math.floor(Math.random() * demoParticipants.length)];
                    const responses = [
                        'That\'s a great point!',
                        'I agree with that.',
                        'Can you explain more?',
                        'Thanks for sharing!',
                        'Let me think about that...',
                        'Good idea!'
                    ];
                    const response = responses[Math.floor(Math.random() * responses.length)];
                    this.addChatMessage(randomParticipant.name, response, false);
                }
            }, 1000 + Math.random() * 2000);
        }
    }
    
    addChatMessage(author, content, isOwn) {
        const message = {
            author,
            content,
            time: new Date(),
            isOwn
        };
        
        this.chatMessages.push(message);
        this.renderChatMessages();
    }
    
    addSystemMessage(content) {
        const container = document.getElementById('chatMessages');
        const message = document.createElement('div');
        message.className = 'system-message fade-in';
        message.innerHTML = `<i class="fas fa-info-circle"></i> ${content}`;
        container.appendChild(message);
        container.scrollTop = container.scrollHeight;
    }
    
    renderChatMessages() {
        const container = document.getElementById('chatMessages');
        container.innerHTML = '';
        
        this.chatMessages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${msg.isOwn ? 'own' : 'other'} fade-in`;
            
            const timeStr = msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageDiv.innerHTML = `
                <div class="chat-message-header">
                    <span class="chat-message-author">${msg.author}</span>
                    <span class="chat-message-time">${timeStr}</span>
                </div>
                <div class="chat-message-content">${this.escapeHtml(msg.content)}</div>
            `;
            
            container.appendChild(messageDiv);
        });
        
        container.scrollTop = container.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Control Functions
    toggleMute() {
        this.currentUser.isMuted = !this.currentUser.isMuted;
        const btn = document.getElementById('muteBtn');
        
        if (this.currentUser.isMuted) {
            btn.classList.add('muted');
            btn.querySelector('i').classList.remove('fa-microphone');
            btn.querySelector('i').classList.add('fa-microphone-slash');
            btn.querySelector('.control-label').textContent = 'Unmute';
        } else {
            btn.classList.remove('muted');
            btn.querySelector('i').classList.remove('fa-microphone-slash');
            btn.querySelector('i').classList.add('fa-microphone');
            btn.querySelector('.control-label').textContent = 'Mute';
        }
        
        this.renderParticipants();
    }
    
    toggleScreenShare() {
        this.currentUser.isSharingScreen = !this.currentUser.isSharingScreen;
        const btn = document.getElementById('screenShareBtn');
        const view = document.getElementById('screenShareView');
        const cameraView = document.getElementById('cameraView');
        
        if (this.currentUser.isSharingScreen) {
            btn.classList.add('active');
            view.classList.remove('d-none');
            cameraView.classList.add('d-none');
            
            // Simulate screen share
            this.simulateScreenShare();
            this.addSystemMessage('You started sharing your screen');
        } else {
            btn.classList.remove('active');
            view.classList.add('d-none');
            cameraView.classList.remove('d-none');
            this.addSystemMessage('You stopped sharing your screen');
        }
    }
    
    simulateScreenShare() {
        const content = document.getElementById('screenShareContent');
        content.innerHTML = `
            <div class="placeholder-screen">
                <i class="fas fa-desktop fa-5x"></i>
                <p>Screen Share Active</p>
                <p style="font-size: 0.85rem; margin-top: 1rem;">In a real implementation, your screen would be displayed here</p>
            </div>
        `;
        
        document.getElementById('screenShareOwner').textContent = `${this.currentUser.name} (You)`;
    }
    
    toggleCamera() {
        this.currentUser.isCameraOn = !this.currentUser.isCameraOn;
        const btn = document.getElementById('cameraBtn');
        
        if (this.currentUser.isCameraOn) {
            btn.classList.add('active');
            btn.querySelector('.control-label').textContent = 'Stop Camera';
        } else {
            btn.classList.remove('active');
            btn.querySelector('.control-label').textContent = 'Camera';
        }
        
        this.renderCameraFeeds();
    }
    
    toggleRaiseHand() {
        this.currentUser.handRaised = !this.currentUser.handRaised;
        const btn = document.getElementById('raiseHandBtn');
        
        if (this.currentUser.handRaised) {
            btn.classList.add('active');
            this.addSystemMessage('You raised your hand');
        } else {
            btn.classList.remove('active');
            this.addSystemMessage('You lowered your hand');
        }
        
        this.renderParticipants();
    }
    
    showFileTransfer() {
        document.getElementById('fileInput').click();
    }
    
    handleFileSelect(event) {
        const files = event.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                this.addSystemMessage(`File selected: ${file.name} (${this.formatFileSize(file.size)})`);
                // In real implementation, file would be sent via data channel
            });
        }
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    shareClipboard() {
        if (navigator.clipboard) {
            navigator.clipboard.readText().then(text => {
                if (text) {
                    this.addSystemMessage(`Clipboard shared: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
                }
            }).catch(() => {
                this.addSystemMessage('Could not access clipboard');
            });
        } else {
            this.addSystemMessage('Clipboard API not available');
        }
    }
    
    showSettings() {
        alert('Settings panel would open here in a full implementation');
    }
    
    // Moderator Functions
    muteParticipant(participantId) {
        const participant = this.currentRoom.participants.find(p => p.id === participantId);
        if (participant) {
            participant.isMuted = true;
            this.renderParticipants();
            this.addSystemMessage(`${participant.name} has been muted`);
        }
    }
    
    kickParticipant(participantId) {
        const participant = this.currentRoom.participants.find(p => p.id === participantId);
        if (participant && confirm(`Kick ${participant.name} from the room?`)) {
            this.removeParticipant(participantId);
            this.addSystemMessage(`${participant.name} has been removed from the room`);
        }
    }
    
    // Demo Mode
    startDemoMode() {
        if (this.demoInterval) return;
        
        // Add demo participants
        const demoNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
        const numParticipants = 2 + Math.floor(Math.random() * 3); // 2-4 additional participants
        
        for (let i = 0; i < numParticipants; i++) {
            setTimeout(() => {
                const demoParticipant = {
                    id: this.generateId(),
                    name: demoNames[i % demoNames.length],
                    isMuted: Math.random() > 0.7,
                    isSharingScreen: false,
                    isCameraOn: Math.random() > 0.5,
                    handRaised: false,
                    isSpeaking: false
                };
                this.addParticipant(demoParticipant);
                this.addSystemMessage(`${demoParticipant.name} joined the room`);
            }, 1000 + i * 2000);
        }
        
        // Simulate chat messages
        this.demoInterval = setInterval(() => {
            if (this.currentRoom.participants.length > 1) {
                const demoParticipants = this.currentRoom.participants.filter(p => p.id !== this.currentUser.id);
                if (demoParticipants.length > 0 && Math.random() > 0.7) {
                    const participant = demoParticipants[Math.floor(Math.random() * demoParticipants.length)];
                    const messages = [
                        'Hello everyone!',
                        'Can someone help me with this?',
                        'Great presentation!',
                        'I have a question...',
                        'Thanks for the help!',
                        'This is working well!'
                    ];
                    const message = messages[Math.floor(Math.random() * messages.length)];
                    this.addChatMessage(participant.name, message, false);
                }
            }
        }, 5000);
        
        // Simulate participant actions
        setInterval(() => {
            if (this.currentRoom.participants.length > 1) {
                const demoParticipants = this.currentRoom.participants.filter(p => p.id !== this.currentUser.id);
                if (demoParticipants.length > 0) {
                    const participant = demoParticipants[Math.floor(Math.random() * demoParticipants.length)];
                    
                    // Randomly toggle speaking status
                    if (Math.random() > 0.8) {
                        participant.isSpeaking = !participant.isSpeaking;
                        this.renderParticipants();
                    }
                }
            }
        }, 3000);
    }
    
    stopDemoMode() {
        if (this.demoInterval) {
            clearInterval(this.demoInterval);
            this.demoInterval = null;
        }
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ClassCastorApp();
    // Make app globally accessible for onclick handlers
    window.app = app;
});

