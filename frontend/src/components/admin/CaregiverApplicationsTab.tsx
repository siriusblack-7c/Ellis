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


export function ApplicationsTab() {
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
        mutationFn: ({ applicationId, status }: { applicationId: string; status: 'approve' | 'reject' }) =>
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
            statusMutation.mutate({ applicationId, status: action as 'approve' | 'reject' });
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
                const statusMatch = filterStatus === "all" || app.stageStatus === filterStatus;
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
                    <Button onClick={onContact}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                    </Button>
                </div>
            </div>
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
                            <TableCell>
                                <Badge
                                    variant={
                                        app.stageStatus === "approved"
                                            ? "default"
                                            : app.stageStatus === "pending_review"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {app.stageStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {new Date(app.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleApplicationAction(app._id, 'view')}>View Application</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleApplicationAction(app._id, 'under_review')}>
                                            Mark as Under Review
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleApplicationAction(app._id, 'hired')}>
                                            Hire
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleApplicationAction(app._id, 'rejected')}
                                            className="text-red-600"
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
            {selectedApplicationForDetails && (() => {
                const applicant = users.find(u => u._id === selectedApplicationForDetails.userId);
                const applicantName = applicant ? `${applicant.firstName} ${applicant.lastName}` : "Unknown Applicant";
                return (
                    <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                    Full application details for {applicantName}.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Application Information</h3>
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                                        <Label className="text-right font-semibold">Status:</Label>
                                        <span className="col-span-2">{selectedApplicationForDetails.stageStatus}</span>

                                        <Label className="text-right font-semibold">Applied On:</Label>
                                        <span className="col-span-2">{new Date(selectedApplicationForDetails.createdAt).toLocaleDateString()}</span>

                                        <Label className="text-right font-semibold">Preferred Location:</Label>
                                        <span className="col-span-2">{selectedApplicationForDetails.preferredWorkLocation}</span>

                                        <Label className="text-right font-semibold">Availability:</Label>
                                        <span className="col-span-2">
                                            {selectedApplicationForDetails.availability.weekends && 'Weekends '}
                                            {selectedApplicationForDetails.availability.nights && 'Nights'}
                                        </span>
                                    </div>
                                </div>

                                {applicant && (
                                    <div>
                                        <h3 className="font-semibold text-lg mt-4 mb-2">Applicant Information</h3>
                                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                                            <Label className="text-right font-semibold">Name:</Label>
                                            <span className="col-span-2">{applicantName}</span>

                                            <Label className="text-right font-semibold">Email:</Label>
                                            <span className="col-span-2">{applicant.email}</span>

                                            <Label className="text-right font-semibold">Phone:</Label>
                                            <span className="col-span-2">{applicant.phoneNumber}</span>

                                            <Label className="text-right font-semibold">Bio:</Label>
                                            <span className="col-span-2">{applicant.bio}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            })()}
        </TabsContent>
    );
} 