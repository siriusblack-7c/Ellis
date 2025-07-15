import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import careRecipientRoutes from './routes/careRecipientRoutes';
import caregiverApplicationRoutes from './routes/caregiverApplicationRoutes';

dotenv.config();

// Connect to database
connectDB();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // URL of your React frontend
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipients', careRecipientRoutes);
app.use('/api/applications', caregiverApplicationRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.send('Server is healthy and running!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app; 