import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "./TryNowButton.css";

export const TryNowButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/book-care");
    };

    return (
        <div className="text-center mt-12 -mb-12">
            <Button
                onClick={handleClick}
                className="wave-btn h-auto rounded-full p-0"
                variant="default"
            >
                <span className="wave-container rounded-full">
                    <div className="flex flex-col items-center px-16 p-2">
                        <span className="text-xl font-bold tracking-wider leading-none">
                            TRY NOW!
                        </span>
                        <span className="text-xs font-light mt-1">Book a caregiver</span>
                    </div>
                </span>
            </Button>
        </div>
    );
}; 