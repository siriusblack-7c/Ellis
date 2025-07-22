import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import recipientRoutes from './routes/recipientRoutes';
import careRecipientRoutes from './routes/careRecipientRoutes';
import caregiverApplicationRoutes from './routes/caregiverApplicationRoutes';
import careBookingRoutes from './routes/careBookingRoutes';
import adminRoutes from './routes/adminRoutes';
import messageRoutes from './routes/messageRoutes';
import { protect } from './middlewares/authMiddleware';

dotenv.config();

// Connect to database
connectDB();

const app: Express = express();

const httpServer = http.createServer(app);

// const io = new Server(httpsServer, {
//     cors: {
//         origin: "http://localhost:5173", // URL of your React frontend
//         methods: ["GET", "POST"]
//     }
// });

const port = process.env.PORT || 5001;

app.use(cors(
    {
        origin: "https://ellis-care.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/recipients', protect, recipientRoutes);
app.use('/api/care-recipients', careRecipientRoutes);
app.use('/api/applications', caregiverApplicationRoutes);
app.use('/api/care-bookings', careBookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.send('Server is healthy and running!');
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app; 