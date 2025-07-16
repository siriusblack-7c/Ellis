import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key } from "lucide-react";

export const PaymentSettingsTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        Payment Methods
                    </CardTitle>
                    <CardDescription>
                        Manage your payment methods and billing preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Saved Payment Methods */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Saved Payment Methods</h3>

                        {/* Mock credit card */}
                        <div className="p-4 border rounded-lg bg-muted/50">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                        VISA
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• 1234</p>
                                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="outline" size="sm">Remove</Button>
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full">
                            + Add New Payment Method
                        </Button>
                    </div>

                    <Separator />

                    {/* Billing Address */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Address Line 1</Label>
                                <Input defaultValue="123 Main St" />
                            </div>
                            <div>
                                <Label>Address Line 2</Label>
                                <Input placeholder="Apt, Suite, etc." />
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input defaultValue="New York" />
                            </div>
                            <div>
                                <Label>State</Label>
                                <Input defaultValue="NY" />
                            </div>
                            <div>
                                <Label>ZIP Code</Label>
                                <Input defaultValue="10001" />
                            </div>
                            <div>
                                <Label>Country</Label>
                                <Select defaultValue="US">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="US">United States</SelectItem>
                                        <SelectItem value="CA">Canada</SelectItem>
                                        <SelectItem value="UK">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Billing Preferences */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing Preferences</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Auto-pay</h4>
                                    <p className="text-sm text-muted-foreground">Automatically pay invoices when due</p>
                                </div>
                                <input type="checkbox" className="rounded" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Email notifications</h4>
                                    <p className="text-sm text-muted-foreground">Receive billing notifications via email</p>
                                </div>
                                <input type="checkbox" className="rounded" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">SMS notifications</h4>
                                    <p className="text-sm text-muted-foreground">Receive payment reminders via SMS</p>
                                </div>
                                <input type="checkbox" className="rounded" />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button>
                            Save Payment Settings
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}; 