import * as applicationDataAccess from '../data-access/caregiverApplication';
import { ICaregiverApplication, ApplicationStatus } from '../models/CaregiverApplication';
import { IUser } from '../models/User';
import mongoose from 'mongoose';

export const createApplication = async (
    data: Partial<ICaregiverApplication>,
    user: IUser
) => {
    // A user can only apply if they are a caregiver
    if (user.role !== 'caregiver') {
        throw new Error('Only users with the caregiver role can apply.');
    }

    // Check if user already has an application
    const existingApplication = await applicationDataAccess.findByUserId(user._id);
    if (existingApplication) {
        throw new Error('You have already submitted an application.');
    }

    data.userId = new mongoose.Types.ObjectId(user._id);
    return applicationDataAccess.create(data);
};

export const getUserApplication = async (user: IUser) => {
    return applicationDataAccess.findByUserId(user._id);
};

export const getAllApplications = async (user: IUser) => {
    // Only admins can see all applications
    if (user.role !== 'admin') {
        throw new Error('Not authorized to view all applications.');
    }
    return applicationDataAccess.findAll();
};

export const getApplicationDetails = async (
    applicationId: string,
    user: IUser
) => {
    const application = await applicationDataAccess.findById(applicationId);
    if (!application) {
        throw new Error('Application not found.');
    }

    // Admins can see any application. Users can only see their own.
    if (user.role !== 'admin' && !application.userId.equals(user._id)) {
        throw new Error('Not authorized to view this application.');
    }

    return application;
};

export const updateApplication = async (
    applicationId: string,
    data: Partial<ICaregiverApplication>,
    user: IUser
) => {
    const application = await applicationDataAccess.findById(applicationId);
    if (!application) {
        throw new Error('Application not found.');
    }

    if (user.role !== 'admin' && !application.userId.equals(user._id)) {
        throw new Error('Not authorized to update this application.');
    }

    return applicationDataAccess.updateById(applicationId, data);
};

export const updateApplicationStatus = async (
    applicationId: string,
    status: ApplicationStatus,
    user: IUser
) => {
    // Only admins can update the status
    if (user.role !== 'admin') {
        throw new Error('Not authorized to update application status.');
    }

    return applicationDataAccess.updateById(applicationId, { status });
}; 