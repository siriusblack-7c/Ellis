import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { User as UserType } from "@/types/user";

const profileSettingsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    birthDate: z.date({
        required_error: "Date of birth is required",
    }),
    gender: z.string().min(1, "Gender is required"),
    addressStreet: z.string().min(1, "Address is required"),
    addressCity: z.string().min(1, "City is required"),
    addressState: z.string().min(1, "State is required"),
    addressZip: z.string().min(1, "Zip code is required"),
    addressCountry: z.string().min(1, "Country is required"),
    bio: z.string().optional(),
});

type ProfileSettingsData = z.infer<typeof profileSettingsSchema>;

export const ProfileSettingsTab = () => {
    const { user, updateUser } = useAuth();
    const { toast } = useToast();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const profileForm = useForm<ProfileSettingsData>({
        resolver: zodResolver(profileSettingsSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: new Date(),
            gender: "",
            addressStreet: "",
            addressCity: "",
            addressState: "",
            addressZip: "",
            addressCountry: "",
            bio: "",
        },
    });

    useEffect(() => {
        if (user) {
            setAvatarPreview(user.avatar ? `http://localhost:5001${user.avatar}` : null);
            profileForm.reset({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
                gender: user.gender,
                addressStreet: user.address1,
                addressCity: user.city,
                addressState: user.state,
                addressZip: user.zip,
                addressCountry: user.country,
                bio: user.bio,
            });
        }
    }, [user, profileForm]);

    const onAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: ProfileSettingsData) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            const value = (data as any)[key];
            if (value instanceof Date) {
                formData.append(key, value.toISOString());
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            await updateUser(formData as Partial<UserType>);
            toast({
                title: "Profile Updated",
                description: "Your profile has been updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Avatar Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                        Upload a profile picture to help caregivers recognize you
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                        {avatarPreview && <AvatarImage src={avatarPreview} alt="Profile picture" />}
                        <AvatarFallback className="text-lg">
                            {profileForm.watch("firstName")?.[0]}
                            {profileForm.watch("lastName")?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("avatar-upload")?.click()}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload New Picture
                        </Button>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={onAvatarUpload}
                            className="hidden"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                            JPG, PNG or GIF. Max file size 2MB.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Information Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                    </CardTitle>
                    <CardDescription>
                        Update your personal information and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={profileForm.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="tel" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="birthDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date of Birth</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Address Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">Address Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={profileForm.control}
                                        name="addressStreet"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>Street Address</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="addressCity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="addressState"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State/Province</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="addressZip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Zip/Postal Code</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="addressCountry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Bio Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">About You</h3>
                                <FormField
                                    control={profileForm.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Tell us about yourself and what you're looking for..."
                                                    className="min-h-[120px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="flex justify-end">
                                <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                                    {profileForm.formState.isSubmitting ? "Saving..." : "Save All Changes"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}; 