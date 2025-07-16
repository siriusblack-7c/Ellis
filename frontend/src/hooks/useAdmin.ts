import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllApplications,
    getAllUsers,
    changeApplicationStatus,
    updateUserStatus
} from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";

export const useAdmin = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: users = [], isLoading: isLoadingUsers } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers
    });

    const { data: applications = [], isLoading: isLoadingApplications } = useQuery({
        queryKey: ['applications'],
        queryFn: getAllApplications
    });

    const applicationStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => changeApplicationStatus(id, status),
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
        mutationFn: ({ id, status }: { id: string, status: string }) => updateUserStatus(id, status),
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

    return {
        users,
        isLoadingUsers,
        applications,
        isLoadingApplications,
        updateApplicationStatus: applicationStatusMutation.mutate,
        updateUserStatus: userStatusMutation.mutate
    };
}; 