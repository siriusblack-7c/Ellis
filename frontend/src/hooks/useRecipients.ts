import { useState, useCallback, useEffect } from 'react';
import { CareRecipient } from '@/types/recipient';
import * as recipientApi from '@/api/recipientApi';
import { useToast } from "@/components/ui/use-toast"

export const useRecipients = () => {
    const [recipients, setRecipients] = useState<CareRecipient[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchRecipients = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await recipientApi.getRecipients();
            setRecipients(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch recipients');
            toast({
                title: "Error",
                description: err.message || 'Failed to fetch recipients',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const addRecipient = async (recipientData: Omit<CareRecipient, '_id' | 'clientId' | 'createdAt' | 'updatedAt'> & { avatar?: File }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(recipientData).forEach(([key, value]) => {
                if (key === 'avatar' && value) {
                    formData.append(key, value as File);
                } else if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(item => formData.append(key, item));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });
            await recipientApi.createRecipient(formData);
            await fetchRecipients();
            toast({
                title: "Success",
                description: "Recipient added successfully.",
            });
        } catch (err: any) {
            setError(err.message || 'Failed to add recipient');
            toast({
                title: "Error",
                description: err.message || 'Failed to add recipient',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const updateRecipient = async (id: string, recipientData: Partial<CareRecipient> & { avatar?: File }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(recipientData).forEach(([key, value]) => {
                if (key === 'avatar' && value instanceof File) {
                    formData.append(key, value);
                } else if (key !== '_id' && value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(item => formData.append(key, item as string));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            await recipientApi.updateRecipient(id, formData);
            await fetchRecipients();
            toast({
                title: "Success",
                description: "Recipient updated successfully.",
            });
        } catch (err: any) {
            setError(err.message || 'Failed to update recipient');
            toast({
                title: "Error",
                description: err.message || 'Failed to update recipient',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const removeRecipient = async (id: string) => {
        setLoading(true);
        try {
            await recipientApi.deleteRecipient(id);
            await fetchRecipients();
            toast({
                title: "Success",
                description: "Recipient removed successfully.",
            });
        } catch (err: any) {
            setError(err.message || 'Failed to remove recipient');
            toast({
                title: "Error",
                description: err.message || 'Failed to remove recipient',
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipients();
    }, [fetchRecipients]);

    return { recipients, loading, error, fetchRecipients, addRecipient, updateRecipient, removeRecipient };
}; 