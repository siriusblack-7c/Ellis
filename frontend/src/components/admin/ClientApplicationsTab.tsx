import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Download, Mail, ArrowUp, ArrowDown } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { CareRecipient } from "@/types/recipient";
import { useQuery } from "@tanstack/react-query";
import { getClientApplications } from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ClientApplicationsTab() {
    const { toast } = useToast();
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedApplicationForDetails, setSelectedApplicationForDetails] = useState<CareRecipient | null>(null);

    const { data: applications = [], isLoading } = useQuery<CareRecipient[]>({
        queryKey: ['clientApplications'],
        queryFn: getClientApplications,
    });

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const handleSelectApplication = (applicationId: string, isSelected: boolean) => {
        setSelectedApplications((prev) =>
            isSelected ? [...prev, applicationId] : prev.filter((id) => id !== applicationId)
        );
    };

    const handleSelectAllApplications = (isSelected: boolean) => {
        setSelectedApplications(isSelected ? sortedApplications.map((a) => a._id) : []);
    };

    const handleViewDetails = (application: CareRecipient) => {
        setSelectedApplicationForDetails(application);
        setIsDetailsDialogOpen(true);
    };

    const sortedApplications = [...applications].sort((a, b) => {
        const isAsc = sortDirection === 'asc';
        switch (sortBy) {
            case 'name': {
                const nameA = a.clientId ? `${a.clientId.firstName} ${a.clientId.lastName}` : '';
                const nameB = b.clientId ? `${b.clientId.firstName} ${b.clientId.lastName}` : '';
                return isAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            }
            case 'recipientName':
                return isAsc
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            case 'createdAt':
                return isAsc
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;
        }
    });

    const isAllSelected =
        sortedApplications.length > 0 &&
        selectedApplications.length === sortedApplications.length;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <TabsContent value="client-applications" className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* Add filters here if needed */}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button>
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
                                <Button variant="ghost" onClick={() => handleSort('name')}>
                                    Client Name
                                    {sortBy === 'name' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort('recipientName')}>
                                    Recipient Name
                                    {sortBy === 'recipientName' && (sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 inline-block" /> : <ArrowDown className="ml-2 h-4 w-4 inline-block" />)}
                                </Button>
                            </TableHead>
                            <TableHead>Care Needs</TableHead>
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
                        {sortedApplications.map((app) => (
                            <TableRow key={app._id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedApplications.includes(app._id)}
                                        onCheckedChange={(checked) =>
                                            handleSelectApplication(app._id, !!checked)
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    {app.clientId ? (
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={`${import.meta.env.VITE_API_BASE_URL}${app.clientId.avatar}`} />
                                                <AvatarFallback>{app.clientId.firstName.charAt(0)}{app.clientId.lastName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{app.clientId.firstName} {app.clientId.lastName}</div>
                                                <div className="text-sm text-muted-foreground">{app.clientId.email}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-muted-foreground">Unknown Client</div>
                                    )}
                                </TableCell>
                                <TableCell>{app.name}</TableCell>
                                <TableCell>
                                    {app.careNeeds.map((need) => (
                                        <Badge key={need} variant="secondary" className="mr-1">
                                            {need}
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleViewDetails(app)}>
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-lg lg:min-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Client Application Details</DialogTitle>
                        <DialogDescription>
                            Full details for the client application.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedApplicationForDetails && (
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 border-b pb-1">Recipient Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    {Object.entries(selectedApplicationForDetails).map(([key, value]) => {
                                        if (key === '_id' || key === 'clientId' || key === 'updatedAt' || !value) return null;

                                        const displayValue = Array.isArray(value)
                                            ? value.join(', ')
                                            : typeof value === 'boolean'
                                                ? value ? 'Yes' : 'No'
                                                : (key.includes('Date') || key.includes('At')) && typeof value === 'string'
                                                    ? new Date(value).toLocaleString()
                                                    : String(value);

                                        return (
                                            <div key={key} className="grid grid-cols-2 text-sm">
                                                <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                                <span>{displayValue}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {selectedApplicationForDetails.clientId && (
                                <div>
                                    <h3 className="text-lg font-semibold mt-4 mb-2 border-b pb-1">Client Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                        {Object.entries(selectedApplicationForDetails.clientId).map(([key, value]) => {
                                            if (key === '_id' || key === 'password' || key === 'role' || key === 'status' || key === 'messages' || key === 'updatedAt' || !value) return null;

                                            const displayValue = Array.isArray(value)
                                                ? value.join(', ')
                                                : typeof value === 'boolean'
                                                    ? value ? 'Yes' : 'No'
                                                    : (key.includes('Date') || key.includes('At')) && typeof value === 'string'
                                                        ? new Date(value).toLocaleString()
                                                        : String(value);

                                            return (
                                                <div key={key} className="grid grid-cols-2 text-sm">
                                                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                                    <span>{displayValue}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </TabsContent>
    );
} 