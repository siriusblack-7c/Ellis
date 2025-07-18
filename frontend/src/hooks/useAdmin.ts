import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminApplications, getAdminUsers, updateAdminApplicationStatus, updateAdminUserStatus } from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./useAuth";
import { sendMessage } from "@/api/messageApi";

export const useAdmin = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { adminLogin } = useAuth();

    const { data: users = [], isLoading: isLoadingUsers } = useQuery({
        queryKey: ['users'],
        queryFn: getAdminUsers
    });

    const { data: applications = [], isLoading: isLoadingApplications } = useQuery({
        queryKey: ['applications'],
        queryFn: getAdminApplications
    });

    const adminLoginHook = async (email: string, password: string) => {
        try {
            const response = await adminLogin(email, password);
            if (response as any) {
                toast({
                    title: "Login successful",
                    description: "Welcome to the admin dashboard.",
                });
                return response;
            } else {
                throw new Error('Invalid admin credentials');
            }
        } catch (error: any) {
            toast({
                title: "Login failed",
                description: "Invalid admin credentials.",
                variant: "destructive",
            });
        }
    };
    const applicationStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: 'approve' | 'reject' }) => updateAdminApplicationStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            toast({
                title: "Application status updated",
                description: "The application status has been updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update application status.",
                variant: "destructive",
            });
        }
    });

    const userStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => updateAdminUserStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: "User status updated",
                description: "The user status has been updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update user status.",
                variant: "destructive",
            });
        }
    });

    const sendMessageMutation = useMutation({
        mutationFn: ({ recipientIds, message }: { recipientIds: string[], message: string }) => sendMessage(recipientIds, message),
        onSuccess: () => {
            toast({
                title: "Message sent",
                description: "The message has been sent successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to send message.",
                variant: "destructive",
            });
        }
    });

    return {
        users,
        isLoadingUsers,
        applications,
        isLoadingApplications,
        updateApplicationStatus: applicationStatusMutation.mutate,
        updateUserStatus: userStatusMutation.mutate,
        adminLogin: adminLoginHook,
        sendMessage: sendMessageMutation.mutate
    };
}; 