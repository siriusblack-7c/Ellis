import * as applicationDataAccess from '../data-access/caregiverApplication';
import { ICaregiverApplication, ApplicationStage, StageStatus } from '../models/CaregiverApplication';
import { IUser } from '../models/User';
import mongoose from 'mongoose';

const STAGE_ORDER: ApplicationStage[] = ['application', 'interview', 'training', 'internship', 'hired'];

export const createApplication = async (
    data: Partial<ICaregiverApplication>,
    user: IUser
) => {
    if (user.role !== 'caregiver') {
        throw new Error('Only users with the caregiver role can apply.');
    }

    const existingApplication = await applicationDataAccess.findByUserId(user._id);
    if (existingApplication) {
        throw new Error('You have already submitted an application.');
    }

    data.userId = new mongoose.Types.ObjectId(user._id);
    data.currentStage = 'application';
    data.stageStatus = 'pending_review';
    return applicationDataAccess.create(data);
};

export const getUserApplication = async (user: IUser) => {
    return applicationDataAccess.findByUserId(user._id);
};

export const getAllApplications = async (user: IUser) => {
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

    // When a user submits a step, set it to pending review
    const isUserSubmission = user.role === 'caregiver' &&
        (data.videoInterviewUrl || data.trainingAgreementAccepted || data.internshipSelection || data.careerPathSelection);

    if (isUserSubmission) {
        data.stageStatus = 'pending_review';
    }

    return applicationDataAccess.updateById(applicationId, data);
};


export const updateApplicationStageStatus = async (
    applicationId: string,
    action: 'approve' | 'reject',
    user: IUser
) => {
    if (user.role !== 'admin') {
        throw new Error('Not authorized to update application status.');
    }

    const application = await applicationDataAccess.findById(applicationId);
    if (!application) {
        throw new Error('Application not found.');
    }

    if (action === 'approve') {
        if (application.stageStatus !== 'pending_review') {
            throw new Error('This stage has not been submitted for review.');
        }

        if (application.currentStage === 'hired') {
            return applicationDataAccess.updateById(applicationId, {
                stageStatus: 'approved',
            });
        }

        const currentStageIndex = STAGE_ORDER.indexOf(application.currentStage);
        if (currentStageIndex < STAGE_ORDER.length - 1) {
            const nextStage = STAGE_ORDER[currentStageIndex + 1];
            return applicationDataAccess.updateById(applicationId, {
                currentStage: nextStage,
                stageStatus: 'not_submitted',
            });
        }
    } else if (action === 'reject') {
        if (application.currentStage === 'application') {
            return applicationDataAccess.updateById(applicationId, {
                currentStage: 'rejected',
                stageStatus: 'rejected',
            });
        }
        return applicationDataAccess.updateById(applicationId, {
            stageStatus: 'rejected',
        });
    }

    return application;
}; 