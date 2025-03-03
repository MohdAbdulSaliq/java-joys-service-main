
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

// Mock orders data (in a real app, this would come from a database)
const mockOrders = [
  {
    id: 'order_123',
    paymentId: 'pay_abc123',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'New York',
      zip: '10001',
      phone: '+1 555-123-4567'
    },
    items: [
      { id: '1', name: 'Cappuccino', price: 4.99, quantity: 2 },
      { id: '3', name: 'Croissant', price: 3.49, quantity: 1 }
    ],
    total: 13.47,
    status: 'completed',
    date: '2023-05-15T10:30:00Z'
  },
  {
    id: 'order_456',
    paymentId: 'pay_def456',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      address: '456 Elm St',
      city: 'Boston',
      zip: '02108',
      phone: '+1 555-987-6543'
    },
    items: [
      { id: '2', name: 'Latte', price: 5.49, quantity: 1 },
      { id: '4', name: 'Blueberry Muffin', price: 3.99, quantity: 2 }
    ],
    total: 13.47,
    status: 'processing',
    date: '2023-05-16T14:45:00Z'
  }
];

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check admin credentials
    if (email === 'admin@cafeelegance.com' && password === 'coffee123') {
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      onLogin();
    } else {
      setError('Invalid email or password');
      toast({
        title: "Login failed",
        description: "Invalid email or password. Use admin@cafeelegance.com and coffee123",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Login to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="admin@cafeelegance.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground w-full text-center">
            Admin credentials: admin@cafeelegance.com / coffee123
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const OrdersTab = () => {
  const [orders, setOrders] = useState(mockOrders);
  const { toast } = useToast();
  
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Orders</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs uppercase font-semibold ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Customer</h4>
                  <p>{order.customer.name}</p>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.address}, {order.customer.city}, {order.customer.zip}</p>
                  <p>{order.customer.phone}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  <ul className="space-y-1">
                    {order.items.map(item => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => updateOrderStatus(order.id, 'completed')}
                disabled={order.status === 'completed'}
              >
                Mark as Completed
              </Button>
              <Button 
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                disabled={order.status === 'cancelled'}
              >
                Cancel Order
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MenuTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Menu</h2>
      <p className="text-muted-foreground">
        This section would allow you to add, edit, or remove menu items.
        In a real application, this would be connected to a database.
      </p>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Website
          </Button>
        </div>
        
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          
          <TabsContent value="menu">
            <MenuTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
