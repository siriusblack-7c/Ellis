import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Filter, Download, Mail, Calendar as CalendarIcon, ArrowUp, ArrowDown } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CaregiverApplication } from "@/types/caregiverApplication";
import { User } from "@/types/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminApplications, updateAdminApplicationStatus, getAdminUsers } from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


export function CaregiverApplicationsTab() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedApplicationForDetails, setSelectedApplicationForDetails] = useState<CaregiverApplication | null>(null);
    const [filterLocation, setFilterLocation] = useState("");
    const [filterDate, setFilterDate] = useState<DateRange | undefined>(undefined);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");


    const { data: applications = [], isLoading: isLoadingApplications } = useQuery<CaregiverApplication[]>({
        queryKey: ['adminApplications'],
        queryFn: getAdminApplications,
    });

    const { data: users = [], isLoading: isLoadingUsers } = useQuery<User[]>({
        queryKey: ['adminUsers'],
        queryFn: getAdminUsers,
    });

    const statusMutation = useMutation({
        mutationFn: ({ applicationId, status }: { applicationId: string; status: string }) =>
            updateAdminApplicationStatus(applicationId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
            toast({
                title: "Success",
                description: "Application status updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update application status.",
                variant: "destructive",
            });
        },
    });

    const handleSelectApplication = (applicationId: string, isSelected: boolean) => {
        setSelectedApplications((prev) =>
            isSelected ? [...prev, applicationId] : prev.filter((id) => id !== applicationId)
        );
    };

    const handleSelectAllApplications = (isSelected: boolean) => {
        setSelectedApplications(isSelected ? filteredApplications.map((a) => a._id) : []);
    };

    const handleApplicationAction = (applicationId: string, action: string) => {
        if (action === 'view') {
            const application = applications.find(a => a._id === applicationId);
            if (application) {
                setSelectedApplicationForDetails(application);
                setIsDetailsDialogOpen(true);
            }
        } else {
            statusMutation.mutate({ applicationId, status: action });
        }
    };

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const onExport = () => {
        console.log("Exporting applications");
    };

    const onContact = () => {
        console.log("Contacting applicants");
    };

    const getApplicantName = (userId: string) => {
        const user = users.find((u) => u._id === userId);
        return user ? `${user.firstName} ${user.lastName}` : "Unknown Applicant";
    };

    const filteredApplications = applications
        .filter(
            (app) => {
                const statusMatch = filterStatus === "all" || app.status === filterStatus;
                const locationMatch = !filterLocation || (app.preferredWorkLocation && app.preferredWorkLocation.toLowerCase().includes(filterLocation.toLowerCase()));
                const dateMatch = !filterDate || !filterDate.from || (
                    new Date(app.createdAt) >= filterDate.from &&
                    (!filterDate.to || new Date(app.createdAt) <= filterDate.to)
                );
                return statusMatch && locationMatch && dateMatch;
            }
        )
        .sort((a, b) => {
            const isAsc = sortDirection === 'asc';
            switch (sortBy) {
                case 'applicant':
                    return isAsc
                        ? getApplicantName(a.userId).localeCompare(getApplicantName(b.userId))
                        : getApplicantName(b.userId).localeCompare(getApplicantName(a.userId));
                case 'status':
                    return isAsc
                        ? a.status.localeCompare(b.status)
                        : b.status.localeCompare(a.status);
                case 'createdAt':
                    return isAsc
                        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

    const isAllSelected =
        filteredApplications.length > 0 &&
        selectedApplications.length === filteredApplications.length;


    if (isLoadingApplications || isLoadingUsers) {
        return <div>Loading...</div>;
    }

    return (
        <TabsContent value="caregiver-applications" className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                More Filters
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">More Filters</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Filter applications by additional criteria.
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            value={filterLocation}
                                            onChange={(e) => setFilterLocation(e.target.value)}
                                            placeholder="e.g., New York"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label>Date Range</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !filterDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {filterDate?.from ? (
                                                        filterDate.to ? (
                                                            <>
                                                                {format(filterDate.from, "LLL dd, y")} -{" "}
                                                                {format(filterDate.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(filterDate.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick a date range</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={filterDate?.from}
                                                    selected={filterDate}
                                                    onSelect={setFilterDate}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={onExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" onClick={onContact}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                    </Button>
                </div>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={(isChecked) => handleSelectAllApplications(Boolean(isChecked))}
                                />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('applicant')}
                            >
                                Applicant
                                {sortBy === 'applicant' && (sortDirection === 'asc' ? <ArrowUp className="inline-block ml-1 h-4 w-4" /> : <ArrowDown className="inline-block ml-1 h-4 w-4" />)}
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('status')}
                            >
                                Status
                                {sortBy === 'status' && (sortDirection === 'asc' ? <ArrowUp className="inline-block ml-1 h-4 w-4" /> : <ArrowDown className="inline-block ml-1 h-4 w-4" />)}
                            </TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort('createdAt')}
                            >
                                Applied At
                                {sortBy === 'createdAt' && (sortDirection === 'asc' ? <ArrowUp className="inline-block ml-1 h-4 w-4" /> : <ArrowDown className="inline-block ml-1 h-4 w-4" />)}
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplications.map((application) => {
                            const user = users.find((u) => u._id === application.userId);
                            return (
                                <TableRow key={application._id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedApplications.includes(application._id)}
                                            onCheckedChange={(isChecked) =>
                                                handleSelectApplication(application._id, Boolean(isChecked))
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{getApplicantName(application.userId)}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {user?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                application.status === "hired"
                                                    ? "default"
                                                    : application.status === "rejected"
                                                        ? "destructive"
                                                        : "outline"
                                            }
                                        >
                                            {application.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{user?.phone}</div>
                                    </TableCell>
                                    <TableCell>{application.preferredWorkLocation || "N/A"}</TableCell>
                                    <TableCell>
                                        {new Date(application.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => handleApplicationAction(application._id, 'view')}
                                                >
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleApplicationAction(application._id, 'under_review')}
                                                >
                                                    Mark as Under Review
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleApplicationAction(application._id, 'hired')}
                                                >
                                                    Mark as Hired
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleApplicationAction(application._id, 'rejected')}
                                                >
                                                    Mark as Rejected
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            {selectedApplicationForDetails && (
                <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>
                                Review the full details of the caregiver application.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                                <div className="space-y-2">
                                    <p><strong>Applicant Name:</strong> {getApplicantName(selectedApplicationForDetails.userId)}</p>
                                    <p><strong>Email:</strong> {users.find(u => u._id === selectedApplicationForDetails.userId)?.email}</p>
                                    <p><strong>Phone:</strong> {users.find(u => u._id === selectedApplicationForDetails.userId)?.phone}</p>
                                    <p><strong>Date of Birth:</strong> {new Date(selectedApplicationForDetails.dateOfBirth).toLocaleDateString()}</p>
                                    <p><strong>Gender:</strong> {selectedApplicationForDetails.gender}</p>
                                    <p><strong>Nationality:</strong> {selectedApplicationForDetails.nationality}</p>
                                    <p><strong>Address:</strong> {`${selectedApplicationForDetails.address.street}, ${selectedApplicationForDetails.address.city}, ${selectedApplicationForDetails.address.state} ${selectedApplicationForDetails.address.zipCode}, ${selectedApplicationForDetails.address.country}`}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Professional Details</h3>
                                <div className="space-y-2">
                                    <p><strong>Years of Experience:</strong> {selectedApplicationForDetails.yearsOfExperience}</p>
                                    <p><strong>Work Preference:</strong> {selectedApplicationForDetails.workPreference.join(', ')}</p>
                                    <p><strong>Preferred Work Location:</strong> {selectedApplicationForDetails.preferredWorkLocation}</p>
                                    <p><strong>Skills:</strong></p>
                                    <ul className="list-disc list-inside">
                                        {selectedApplicationForDetails.skills.map(skill => <li key={skill}>{skill}</li>)}
                                    </ul>
                                    <p><strong>Availability:</strong> {selectedApplicationForDetails.availability}</p>
                                    <p><strong>Resume/CV:</strong> <a href={selectedApplicationForDetails.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Document</a></p>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </TabsContent>
    );
}