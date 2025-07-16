import dotenv from 'dotenv';

dotenv.config();

const config = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ellis',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    port: process.env.PORT || 5001,
    googleClientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
};

export default config; 