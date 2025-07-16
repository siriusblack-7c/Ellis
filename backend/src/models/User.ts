import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'client' | 'caregiver' | 'admin';

export interface IUser extends Document {
    googleId?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;    
}

const UserSchema: Schema = new Schema(
    {
        googleId: { type: String, unique: true, sparse: true },
        avatar: { type: String },
        country: { type: String },
        address1: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: Date },
        gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
        bio: { type: String },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, select: false },
        phoneNumber: { type: String },
        role: { type: String, enum: ['client', 'caregiver', 'admin'], default: 'client' },
        status: { type: String, enum: ['active', 'pending', 'blocked'], default: 'pending' },
        tags: { type: [String] },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User; 