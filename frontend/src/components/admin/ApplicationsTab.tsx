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
import { MockApplication, MockUser } from "@/data/mockData";
import { MoreHorizontal, Filter, Download, Mail } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ApplicationsTabProps = {
    applications: MockApplication[];
    users: MockUser[];
    selectedApplications: string[];
    onSelectApplication: (applicationId: string, isSelected: boolean) => void;
    onSelectAllApplications: (isSelected: boolean) => void;
    onVerifyDocuments: (applicationId: string) => void;
    onFlagApplication: (applicationId: string) => void;
    filterStatus: string;
    onFilterStatusChange: (status: string) => void;
    onExport: () => void;
    onContact: () => void;
};

export function ApplicationsTab({
    applications,
    users,
    selectedApplications,
    onSelectApplication,
    onSelectAllApplications,
    onVerifyDocuments,
    onFlagApplication,
    filterStatus,
    onFilterStatusChange,
    onExport,
    onContact,
}: ApplicationsTabProps) {
    const isAllSelected =
        applications.length > 0 &&
        selectedApplications.length === applications.length;

    const getApplicantName = (userId: string) => {
        const user = users.find((u) => u.id === userId);
        return user ? `${user.first_name} ${user.last_name}` : "Unknown Applicant";
    };

    return (
        <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Select value={filterStatus} onValueChange={onFilterStatusChange}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        More Filters
                    </Button>
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
                                onCheckedChange={(checked) => onSelectAllApplications(!!checked)}
                            />
                        </TableHead>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedApplications.includes(app.id)}
                                    onCheckedChange={(checked) =>
                                        onSelectApplication(app.id, !!checked)
                                    }
                                />
                            </TableCell>
                            <TableCell>{getApplicantName(app.user_id)}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        app.status === "approved"
                                            ? "default"
                                            : app.status === "pending"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {app.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{app.years_experience} years</TableCell>
                            <TableCell>
                                {new Date(app.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>View Application</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onVerifyDocuments(app.id)}>
                                            Verify Documents
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onFlagApplication(app.id)}
                                            className="text-red-600"
                                        >
                                            Flag for Review
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabsContent>
    );
} 