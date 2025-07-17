import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import * as userDataAccess from '../data-access/user';
import { IUser } from '../models/User';
import config from '../config';

const client = new OAuth2Client(config.googleClientId);

const generateToken = (user: IUser) => {
    return jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }, config.jwtSecret, {
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
            token: generateToken(user),
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
            token: generateToken(user),
        };
    } else {
        throw new Error('Invalid credentials');
    }
};

export const googleLogin = async (token: string) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
        throw new Error('Invalid Google token');
    }

    const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

    let user = await userDataAccess.findUserByGoogleId(googleId);

    if (!user) {
        user = await userDataAccess.findUserByEmail(email!);
        if (user) {
            user.googleId = googleId;
            await user.save();
        } else {
            user = await userDataAccess.createUser({
                googleId,
                email: email!,
                firstName: firstName!,
                lastName: lastName!,
                password: `google-${googleId}` // Dummy password for Google users
            });
        }
    }

    if (user) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            token: generateToken(user),
        };
    } else {
        throw new Error('Could not login with Google');
    }
};

export const updateUserProfile = async (userId: string, userData: Partial<IUser>) => {
    const updatedUser = await userDataAccess.updateUser(userId, userData);
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
};

export const changePassword = async (userId: string, oldPassword?: string, newPassword?: string) => {
    if (!oldPassword || !newPassword) {
        throw new Error('Please provide old and new passwords');
    }

    const user = await userDataAccess.findUserById(userId);

    if (!user || !(await (user as any).comparePassword(oldPassword))) {
        throw new Error('Invalid credentials');
    }

    user.password = newPassword;
    await user.save();
};

export const getProfile = async (userId: string) => {
    const user = await userDataAccess.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const adminLogin = async (userData: Partial<IUser>) => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    if (email === 'admin@admin.com' && password === 'admin') {
        const adminUser = {
            _id: 'admin',
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@admin.com',
            role: 'admin',
        } as IUser;
        return {
            ...adminUser,
            token: generateToken(adminUser),
        };
    } else {
        throw new Error('Invalid credentials');
    }
}