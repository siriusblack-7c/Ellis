import dotenv from 'dotenv';

dotenv.config();

const config = {
    mongoUri: process.env.MONGO_URI as string,
    jwtSecret: process.env.JWT_SECRET as string,
    port: process.env.PORT || 5000,
};

export default config; 