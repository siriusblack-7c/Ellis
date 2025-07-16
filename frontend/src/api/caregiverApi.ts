import axios from "@/lib/axios";
import { CareBooking } from "@/types/careBooking";

export const getMyJobs = async (): Promise<CareBooking[]> => {
    const response = await axios.get("/care-bookings/my-jobs");
    return response.data;
}; 