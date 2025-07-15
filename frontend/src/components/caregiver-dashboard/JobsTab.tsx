import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Calendar,
    Clock,
    DollarSign,
    MapPin,
    Pause,
    Play,
    FileText
} from "lucide-react";

interface Job {
    id: string;
    clientName: string;
    location: string;
    status: string;
    schedule: string;
    duration: string;
    rate: number;
    careRequirements: string[];
}

interface JobsTabProps {
    jobs: Job[];
    clockedIn: boolean;
    currentJobId: string | null;
    reportText: string;
    handleClockAction: (jobId: string) => void;
    setReportText: (text: string) => void;
    handleSubmitReport: () => void;
}

export default function JobsTab({
    jobs,
    clockedIn,
    currentJobId,
    reportText,
    handleClockAction,
    setReportText,
    handleSubmitReport
}: JobsTabProps) {
    return (
        <div className="grid gap-6">
            {jobs.map((job) => (
                <Card key={job.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg">{job.clientName}</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </CardDescription>
                            </div>
                            <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                                {job.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{job.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{job.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">${job.rate}/hour</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-2">Care Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.careRequirements.map((requirement, index) => (
                                    <Badge key={index} variant="outline">
                                        {requirement}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={clockedIn && currentJobId === job.id ? "destructive" : "default"}
                                size="sm"
                                onClick={() => handleClockAction(job.id)}
                                className="flex items-center gap-1"
                            >
                                {clockedIn && currentJobId === job.id ? (
                                    <>
                                        <Pause className="w-4 h-4" />
                                        Clock Out
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Clock In
                                    </>
                                )}
                            </Button>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <FileText className="w-4 h-4 mr-1" />
                                        Daily Report
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Submit Daily Report</DialogTitle>
                                        <DialogDescription>
                                            Provide details about today's care activities
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="report">Report Details</Label>
                                            <Textarea
                                                id="report"
                                                value={reportText}
                                                onChange={(e) => setReportText(e.target.value)}
                                                placeholder="Describe the care provided, client's condition, any observations..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                        <Button onClick={handleSubmitReport} className="w-full">
                                            Submit Report
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 