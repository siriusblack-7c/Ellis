import { io } from 'socket.io-client';

const URL = 'http://localhost:5001'; // Your backend server URL
const socket = io(URL, {
    autoConnect: false, // Don't connect automatically
});

export default socket; 