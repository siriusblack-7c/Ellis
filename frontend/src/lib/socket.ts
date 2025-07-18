import { io } from 'socket.io-client';

const URL = `${import.meta.env.VITE_API_BASE_URL}`; // Your backend server URL
const socket = io(URL, {
    autoConnect: false, // Don't connect automatically
});

export default socket; 