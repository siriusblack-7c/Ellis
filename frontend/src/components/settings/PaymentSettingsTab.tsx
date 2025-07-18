import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export const PaymentSettingsTab = () => {
    const navigate = useNavigate();

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/payment-thank-you');
    };

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
                    <div className="space-y-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    + Add New Payment Method
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[555px]">
                                <DialogHeader>
                                    <DialogTitle>Add a new payment method</DialogTitle>
                                    <DialogDescription>
                                        Enter your card details. This is a demonstration and no real payment will be processed.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="card-name" className="text-right">
                                                Name on Card
                                            </Label>
                                            <Input id="card-name" placeholder="John Doe" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="card-number" className="text-right">
                                                Card Number
                                            </Label>
                                            <Input id="card-number" placeholder="**** **** **** 1234" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="expiry" className="text-right">
                                                Expiry
                                            </Label>
                                            <Input id="expiry" placeholder="MM/YY" className="col-span-2" />
                                            <Label htmlFor="cvc" className="text-right col-start-1">
                                                CVC
                                            </Label>
                                            <Input id="cvc" placeholder="123" className="col-span-2" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">
                                            Add Card & Continue
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

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