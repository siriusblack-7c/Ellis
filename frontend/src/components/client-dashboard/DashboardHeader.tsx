import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    name: string;
    userType: 'client' | 'caregiver';
}

export default function DashboardHeader({ name, userType }: DashboardHeaderProps) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold">Welcome, {name}!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Account type: {userType}
                </p>
            </div>
            <Button onClick={() => navigate("/")} variant="outline">
                Go Home
            </Button>
        </div>
    );
} 