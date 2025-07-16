import User, { IUser } from '../models/User';

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email }).select('+password');
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return User.findById(id);
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, userData, { new: true });
} 