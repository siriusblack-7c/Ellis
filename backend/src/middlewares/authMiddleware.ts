import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { findUserById } from '../data-access/user';
import { IUser } from '../models/User';

export interface IRequest extends Request {
    user?: IUser | null;
    file?: Express.Multer.File;
}

export const protect = async (req: IRequest, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, config.jwtSecret) as IUser;

            // If user is admin, trust the token and avoid DB lookup
            if (decoded.role === 'admin') {
                req.user = decoded;
                return next();
            }

            // For other users, verify they exist in the DB
            const user = await findUserById(decoded.id);
            if (user?.status === 'blocked') {
                return res.status(401).json({ message: 'Not authorized, user is blocked' });
            }
            if (!user) {
                console.log(decoded, 'decoded');
                console.log('User not found');
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user;

            next();
        } catch (error) {
            console.error(error, 'Token failed');
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log('No token');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: IRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'User role not authorized' });
        }
        next();
    };
}; 