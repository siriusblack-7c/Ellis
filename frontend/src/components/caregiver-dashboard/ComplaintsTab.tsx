import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    AlertTriangle,
    MessageSquare,
    CheckCircle,
} from "lucide-react";

interface Complaint {
    id: string;
    type: string;
    date: string;
    status: string;
    description: string;
}

interface ComplaintsTabProps {
    complaints: Complaint[];
    handleComplaintResponse: (complaintId: string, response: string) => void;
}

export default function ComplaintsTab({ complaints, handleComplaintResponse }: ComplaintsTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Complaints & Issues
                </CardTitle>
                <CardDescription>
                    View and respond to any complaints or concerns
                </CardDescription>
            </CardHeader>
            <CardContent>
                {complaints.length === 0 ? (
                    <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Complaints</h3>
                        <p className="text-muted-foreground">You have no pending complaints. Keep up the great work!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {complaints.map((complaint) => (
                            <Card key={complaint.id} className="border-orange-200">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{complaint.type}</CardTitle>
                                            <CardDescription>{complaint.date}</CardDescription>
                                        </div>
                                        <Badge variant={complaint.status === 'resolved' ? 'default' : 'destructive'}>
                                            {complaint.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">{complaint.description}</p>
                                    {complaint.status === 'pending' && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <MessageSquare className="w-4 h-4 mr-1" />
                                                    Respond
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Respond to Complaint</DialogTitle>
                                                    <DialogDescription>
                                                        Provide your response to this complaint
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Your Response</Label>
                                                        <Textarea
                                                            placeholder="Explain your side of the situation..."
                                                            className="min-h-[100px]"
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={() => handleComplaintResponse(complaint.id, "")}
                                                        className="w-full"
                                                    >
                                                        Submit Response
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 