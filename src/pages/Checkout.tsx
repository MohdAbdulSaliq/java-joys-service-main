
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  // If cart is empty, redirect to menu
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/menu');
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
    }
  }, [items, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['name', 'email', 'address', 'city', 'zip', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill out all required fields: ${emptyFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Start payment process
    setIsProcessing(true);
    
    try {
      // Here we would typically make an API call to initialize Razorpay
      // For demo purposes, we'll simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open Razorpay checkout
      openRazorpay();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      toast({
        title: "Payment failed",
        description: "Unable to initialize payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const openRazorpay = () => {
    // In a real implementation, this data would come from your backend
    const options = {
      key: 'rzp_test_yourkeyhere', // Replace with your Razorpay key
      amount: cartTotal * 100, // Amount in paisa
      currency: 'INR',
      name: 'Coffee Haven',
      description: 'Purchase from Coffee Haven',
      image: 'https://your-logo-url.com/logo.png',
      handler: function(response: any) {
        // Handle successful payment
        handlePaymentSuccess(response);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#8B5CF6'
      }
    };

    // For demo purposes, we'll simulate a successful payment
    // In a real app, you would load the Razorpay SDK and open the payment modal
    simulatePayment();
  };

  const simulatePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      handlePaymentSuccess({ razorpay_payment_id: 'pay_' + Math.random().toString(36).substring(2, 15) });
    }, 2000);
  };

  const handlePaymentSuccess = (response: any) => {
    // Process successful payment
    const orderData = {
      items,
      total: cartTotal,
      paymentId: response.razorpay_payment_id,
      customer: formData,
      date: new Date().toISOString()
    };
    
    console.log('Order completed:', orderData);
    
    // Clear cart and redirect to success page
    clearCart();
    setIsProcessing(false);
    
    toast({
      title: "Payment successful!",
      description: `Your order has been placed. Order ID: ${response.razorpay_payment_id}`,
    });
    
    navigate('/checkout/success');
  };

  return (
    <div className="pt-16 min-h-screen bg-secondary/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    Please provide your details for delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          placeholder="John Doe" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        placeholder="123 Main St, Apt 4B" 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          placeholder="New York" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input 
                          id="zip" 
                          name="zip" 
                          value={formData.zip} 
                          onChange={handleInputChange} 
                          placeholder="10001" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="+1 (555) 123-4567" 
                          required 
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg" 
                    disabled={isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
