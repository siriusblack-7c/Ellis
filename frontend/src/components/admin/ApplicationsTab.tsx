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
import { CaregiverApplication, ApplicationStage } from "@/types/caregiverApplication";
import { User } from "@/types/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminApplications, updateAdminApplicationStatus, getAdminUsers } from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Papa from 'papaparse';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/api/messageApi";


export function ApplicationsTab() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterStage, setFilterStage] = useState<ApplicationStage | 'all'>('all');
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedApplicationForDetails, setSelectedApplicationForDetails] = useState<CaregiverApplication | null>(null);
    const [filterLocation, setFilterLocation] = useState("");
    const [filterDate, setFilterDate] = useState<DateRange | undefined>(undefined);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMessage, setContactMessage] = useState("");


    const { data: applications = [], isLoading: isLoadingApplications } = useQuery<CaregiverApplication[]>({
        queryKey: ['adminApplications'],
        queryFn: getAdminApplications,
    });

    const { data: users = [], isLoading: isLoadingUsers } = useQuery<User[]>({
        queryKey: ['adminUsers'],
        queryFn: getAdminUsers,
    });

    const statusMutation = useMutation({
        mutationFn: ({ applicationId, action }: { applicationId: string; action: 'approve' | 'reject' }) =>
            updateAdminApplicationStatus(applicationId, action),
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
            statusMutation.mutate({ applicationId, action: action as 'approve' | 'reject' });
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
        if (filteredApplications.length === 0) {
            toast({
                title: "No applications to export",
                description: "There are no applications matching the current filters.",
                variant: "destructive"
            });
            return;
        }

        const csvData = filteredApplications.map(app => {
            const user = users.find(u => u._id === app.userId);
            return {
                "Application ID": app._id,
                "Applicant Name": user ? `${user.firstName} ${user.lastName}` : "Unknown",
                "Applicant Email": user ? user.email : "Unknown",
                "Stage": app.currentStage,
                "Status": app.stageStatus,
                "Submitted At": new Date(app.createdAt).toLocaleDateString(),
                "Years of Experience": app.yearsExperience,
                "Preferred Location": app.preferredWorkLocation,
                "Availability (Weekends)": app.availability.weekends ? 'Yes' : 'No',
                "Availability (Nights)": app.availability.nights ? 'Yes' : 'No',
                "Specialties": app.specialties?.join(', '),
                "Certifications": app.certifications?.join(', '),
                "Resume/CV": app.cvUrl,
                "Cover Letter": app.coverLetter,
                "Certification Files": app.certificationFilesUrls?.join(', '),
                "Video Interview": app.videoInterviewUrl,
                "Admin Notes": app.adminNotes,
                "Training Agreement Accepted": app.trainingAgreementAccepted ? 'Yes' : 'No',
                "Internship Selection": app.internshipSelection,
                "Career Path Selection": app.careerPathSelection,
            }
        });

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'applications.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onContact = () => {
        if (selectedApplications.length === 0) {
            toast({
                title: "No Applications Selected",
                description: "Please select at least one application to contact.",
                variant: "destructive",
            });
            return;
        }
        setIsContactModalOpen(true);
    };

    const handleSendMessage = async () => {
        const recipientIds = selectedApplications.map(appId => {
            const app = applications.find(a => a._id === appId);
            return app ? app.userId : '';
        }).filter(id => id !== '');

        if (recipientIds.length === 0) {
            toast({
                title: "Error",
                description: "Could not find users for the selected applications.",
                variant: "destructive",
            });
            return;
        }

        try {
            await sendMessage(recipientIds, contactMessage);
            toast({
                title: "Message Sent",
                description: `Message sent to ${recipientIds.length} applicants.`,
            });
            setIsContactModalOpen(false);
            setContactMessage("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message.",
                variant: "destructive",
            });
        }
    };

    const getApplicantName = (userId: string) => {
        const user = users.find((u) => u._id === userId);
        return user ? `${user.firstName} ${user.lastName}` : "Unknown Applicant";
    };

    const getApplicantDetails = (userId: string) => {
        return users.find((u) => u._id === userId);
    }

    const filteredApplications = applications
        .filter(
            (app) => {
                const statusMatch = filterStatus === "all" || app.stageStatus === filterStatus;
                const stageMatch = filterStage === 'all' || app.currentStage === filterStage;
                const locationMatch = !filterLocation || (app.preferredWorkLocation && app.preferredWorkLocation.toLowerCase().includes(filterLocation.toLowerCase()));
                const dateMatch = !filterDate || !filterDate.from || (
                    new Date(app.createdAt) >= filterDate.from &&
                    (!filterDate.to || new Date(app.createdAt) <= filterDate.to)
                );
                return statusMatch && stageMatch && locationMatch && dateMatch;
            }
        )
        .sort((a, b) => {
            const isAsc = sortDirection === 'asc';
            switch (sortBy) {
                case 'applicant':
                    return isAsc
                        ? getApplicantName(a.userId).localeCompare(getApplicantName(b.userId))
                        : getApplicantName(b.userId).localeCompare(getApplicantName(a.userId));
                case 'stage':
                    return isAsc
                        ? a.currentStage.localeCompare(b.currentStage)
                        : b.currentStage.localeCompare(a.currentStage);
                case 'status':
                    return isAsc
                        ? a.stageStatus.localeCompare(b.stageStatus)
                        : b.stageStatus.localeCompare(a.stageStatus);
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
        <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="not_submitted">Not Submitted</SelectItem>
                            <SelectItem value="pending_review">Pending Review</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterStage} onValueChange={(value) => setFilterStage(value as ApplicationStage | 'all')}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by stage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Stages</SelectItem>
                            <SelectItem value="application">Application</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
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
                    <Button onClick={onContact}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                    </Button>
                </div>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={(checked) => handleSelectAllApplications(!!checked)}
                                />
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('applicant')}>
                                    Applicant
                                    {sortBy === 'applicant' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('stage')}>
                                    Stage
                                    {sortBy === 'stage' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('status')}>
                                    Status
                                    {sortBy === 'status' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('createdAt')}>
                                    Applied On
                                    {sortBy === 'createdAt' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplications.map((app) => (
                            <TableRow key={app._id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedApplications.includes(app._id)}
                                        onCheckedChange={(checked) =>
                                            handleSelectApplication(app._id, !!checked)
                                        }
                                    />
                                </TableCell>
                                <TableCell>{getApplicantName(app.userId)}</TableCell>
                                <TableCell>{app.currentStage}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            app.stageStatus === "pending_review"
                                                ? "secondary"
                                                : app.stageStatus === "rejected"
                                                    ? "destructive"
                                                    : app.stageStatus === "approved"
                                                        ? "default"
                                                        : "outline"
                                        }
                                    >
                                        {app.stageStatus.replace('_', ' ')}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleApplicationAction(app._id, 'view')}>View Application</DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleApplicationAction(app._id, 'approve')}
                                                disabled={app.stageStatus !== 'pending_review'}
                                            >
                                                Approve
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleApplicationAction(app._id, 'reject')}
                                                className="text-red-600"
                                                disabled={app.stageStatus !== 'pending_review'}
                                            >
                                                Reject
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedApplicationForDetails && (() => {
                return (
                    <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                    Full details for the application.
                                </DialogDescription>
                            </DialogHeader>
                            {selectedApplicationForDetails && (
                                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">Applicant Information</h3>
                                        {getApplicantDetails(selectedApplicationForDetails.userId)
                                            ? Object.entries(getApplicantDetails(selectedApplicationForDetails.userId)!).map(([key, value]) => {
                                                if (key === 'password' || key.startsWith('_')) return null;
                                                const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
                                                return (
                                                    <div key={key} className="grid grid-cols-3 gap-2 text-sm">
                                                        <span className="font-semibold capitalize col-span-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                                        <span className="col-span-2">{displayValue || 'N/A'}</span>
                                                    </div>
                                                );
                                            })
                                            : <p>User details not found.</p>
                                        }
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mt-4 mb-2">Application Data</h3>
                                        {Object.entries(selectedApplicationForDetails).map(([key, value]) => {
                                            if (key.startsWith('_') || key === 'userId') return null;

                                            let displayValue;
                                            if (key === 'availability') {
                                                displayValue = `Weekends: ${value.weekends ? 'Yes' : 'No'}, Nights: ${value.nights ? 'Yes' : 'No'}`;
                                            } else {
                                                displayValue = Array.isArray(value)
                                                    ? value.join(', ')
                                                    : typeof value === 'boolean'
                                                        ? value ? 'Yes' : 'No'
                                                        : (key.includes('Date') || key.includes('At')) && typeof value === 'string'
                                                            ? new Date(value).toLocaleString()
                                                            : String(value);
                                            }

                                            return (
                                                <div key={key} className="grid grid-cols-3 gap-2 text-sm">
                                                    <span className="font-semibold capitalize col-span-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                                    <span className="col-span-2">{displayValue || 'N/A'}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                )
            })()}
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contact Applicants</DialogTitle>
                        <DialogDescription>
                            You are about to send a message to {selectedApplications.length} selected applicant(s).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <Textarea
                            placeholder="Type your message here..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            rows={5}
                        />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsContactModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSendMessage}>Send Message</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </TabsContent>
    );
} 