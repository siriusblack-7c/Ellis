import { Response } from 'express';
import * as applicationService from '../services/caregiverApplicationService';
import { IRequest } from '../middlewares/authMiddleware';

export const createApplication = async (req: IRequest, res: Response) => {
    try {
        const application = await applicationService.applyToBeCaregiver(
            req.body,
            req.user!
        );
        res.status(201).json(application);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getMyApplication = async (req: IRequest, res: Response) => {
    try {
        const application = await applicationService.getUserApplication(req.user!);
        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }
        res.status(200).json(application);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listApplications = async (req: IRequest, res: Response) => {
    try {
        const applications = await applicationService.getAllApplications(req.user!);
        res.status(200).json(applications);
    } catch (error: any) {
        res.status(403).json({ message: error.message });
    }
};

export const getApplicationById = async (req: IRequest, res: Response) => {
    try {
        const application = await applicationService.getApplicationDetails(
            req.params.id,
            req.user!
        );
        res.status(200).json(application);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const changeApplicationStatus = async (req: IRequest, res: Response) => {
    try {
        const { status } = req.body;
        const application = await applicationService.updateApplicationStatus(
            req.params.id,
            status,
            req.user!
        );
        res.status(200).json(application);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}; 