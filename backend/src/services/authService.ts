import jwt from 'jsonwebtoken';
import * as userDataAccess from '../data-access/user';
import { IUser } from '../models/User';
import config from '../config';

const generateToken = (id: string) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

export const register = async (userData: Partial<IUser>) => {
    const { firstName, lastName, email, password, phoneNumber, role } = userData;

    if (!firstName || !lastName || !email || !password) {
        throw new Error('Please provide all required fields: first name, last name, email, and password.');
    }

    const userExists = await userDataAccess.findUserByEmail(email);

    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await userDataAccess.createUser({ firstName, lastName, email, password, phoneNumber, role });

    if (user) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id as string),
        };
    } else {
        throw new Error('Invalid user data');
    }
};

export const login = async (userData: Partial<IUser>) => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    const user = await userDataAccess.findUserByEmail(email);

    if (user && (await (user as any).comparePassword(password))) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id as string),
        };
    } else {
        throw new Error('Invalid credentials');
    }
}; 