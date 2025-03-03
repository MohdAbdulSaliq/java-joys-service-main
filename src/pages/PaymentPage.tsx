
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const RazorpayTab = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful",
        description: "Your payment has been processed successfully",
      });
      navigate('/checkout/success');
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <img 
            src="https://razorpay.com/assets/razorpay-glyph.svg" 
            alt="Razorpay" 
            className="h-14" 
          />
        </div>
        <CardTitle className="text-center">Pay with Razorpay</CardTitle>
        <CardDescription className="text-center">
          Secure payment processing by Razorpay
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="123" type="password" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-name">Name on Card</Label>
          <Input id="card-name" placeholder="Jane Doe" />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const UPITab = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = () => {
    if (!upiId || !upiId.includes('@')) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful",
        description: "Your UPI payment has been processed successfully",
      });
      navigate('/checkout/success');
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
            alt="BHIM UPI" 
            className="h-14" 
          />
        </div>
        <CardTitle className="text-center">Pay with BHIM UPI</CardTitle>
        <CardDescription className="text-center">
          Fast and secure payment with UPI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="upi-id">UPI ID</Label>
          <Input 
            id="upi-id" 
            placeholder="yourname@upi" 
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Enter your UPI ID (e.g., yourname@paytm, yourname@ybl)
          </p>
        </div>
        
        <div className="bg-primary/5 p-4 rounded-md">
          <h3 className="font-medium mb-2">How to Pay with UPI</h3>
          <ol className="text-sm space-y-2 pl-5 list-decimal">
            <li>Enter your UPI ID above</li>
            <li>Click on "Pay Now"</li>
            <li>Approve the payment request on your UPI app</li>
            <li>Wait for confirmation</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const PaymentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need to be logged in to access the payment page
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16 min-h-screen"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center">Choose Payment Method</h1>
            <p className="text-center text-muted-foreground mt-2">
              Select your preferred payment option
            </p>
          </div>
          
          <Tabs defaultValue="razorpay" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
              <TabsTrigger value="upi">BHIM UPI</TabsTrigger>
            </TabsList>
            
            <TabsContent value="razorpay">
              <RazorpayTab />
            </TabsContent>
            
            <TabsContent value="upi">
              <UPITab />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => navigate('/checkout')}>
              Back to Checkout
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
