import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import authApi from "@/api/authApi";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key } from "lucide-react";

const accountSettingsSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type AccountSettingsData = z.infer<typeof accountSettingsSchema>;

export const AccountSettingsTab = () => {
    const { toast } = useToast();
    const accountForm = useForm<AccountSettingsData>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: AccountSettingsData) => {
        try {
            await authApi.changePassword({ oldPassword: data.currentPassword, newPassword: data.newPassword });
            toast({
                title: "Password Updated",
                description: "Your password has been changed successfully.",
            });
            accountForm.reset();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to change password. Please check your current password.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Account & Security
                    </CardTitle>
                    <CardDescription>
                        Manage your password settings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...accountForm}>
                        <form onSubmit={accountForm.handleSubmit(onSubmit)} className="space-y-6">
                            {/* <div className="space-y-4">
                                <h3 className="text-lg font-medium flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Email Settings
                                </h3>

                                <FormField
                                    control={accountForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator /> */}

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium flex items-center gap-2">
                                    <Key className="w-4 h-4" />
                                    Password Settings
                                </h3>

                                <FormField
                                    control={accountForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="Enter current password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={accountForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="password" placeholder="Enter new password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={accountForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="password" placeholder="Confirm new password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-end">
                                <Button type="submit" disabled={accountForm.formState.isSubmitting}>
                                    {accountForm.formState.isSubmitting ? "Updating..." : "Update Password"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}; 