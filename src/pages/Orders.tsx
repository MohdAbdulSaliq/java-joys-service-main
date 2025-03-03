
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user, isAuthenticated, setIsAuthModalOpen } = useAuth();
  const navigate = useNavigate();
  
  // Mock orders data - in a real app, this would come from an API
  const allOrders = [
    {
      id: 'ord-001',
      userId: 'user1234',
      date: '2025-03-01',
      total: 28.50,
      status: 'Delivered',
      items: [
        { name: 'Signature Latte', quantity: 2, price: 5.50 },
        { name: 'Croissant', quantity: 3, price: 3.50 },
        { name: 'Cappuccino', quantity: 2, price: 4.75 }
      ]
    },
    {
      id: 'ord-002',
      userId: 'user1234',
      date: '2025-02-25',
      total: 15.75,
      status: 'Delivered',
      items: [
        { name: 'Cappuccino', quantity: 1, price: 4.75 },
        { name: 'Chocolate Cake', quantity: 1, price: 6.50 },
        { name: 'Espresso', quantity: 2, price: 2.25 }
      ]
    },
    {
      id: 'ord-003',
      userId: 'admin',
      date: '2025-03-05',
      total: 42.25,
      status: 'Processing',
      items: [
        { name: 'Cold Brew', quantity: 3, price: 6.75 },
        { name: 'Avocado Toast', quantity: 2, price: 11.00 }
      ]
    },
    {
      id: 'ord-004',
      userId: 'user5678',
      date: '2025-03-04',
      total: 19.50,
      status: 'Delivered',
      items: [
        { name: 'Green Tea', quantity: 2, price: 3.75 },
        { name: 'Blueberry Muffin', quantity: 3, price: 4.00 }
      ]
    }
  ];

  // Filter orders based on user role
  const userOrders = user?.id === 'admin' 
    ? allOrders // Admin sees all orders
    : allOrders.filter(order => order.userId === user?.id); // Regular users see only their orders

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="pt-32 min-h-screen max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <ShoppingBag className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Please sign in to view your order history and track your current orders.
          </p>
          <Button onClick={() => setIsAuthModalOpen(true)}>
            Sign In to View Orders
          </Button>
        </motion.div>
      </div>
    );
  }

  // Admin view with header indicating they see all orders
  if (user?.id === 'admin') {
    return (
      <div className="pt-32 min-h-screen max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">All Orders (Admin View)</h1>
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Admin Dashboard
            </Button>
          </div>
          
          {userOrders.length > 0 ? (
            <div className="space-y-6">
              {userOrders.map((order) => (
                <div 
                  key={order.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="bg-secondary/20 p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                      <p className="text-sm text-muted-foreground">User ID: {order.userId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${order.total.toFixed(2)}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <ul className="divide-y divide-gray-100">
                      {order.items.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-6">
                There are no orders in the system yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Regular user view
  return (
    <div className="pt-32 min-h-screen max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <div className="bg-secondary/20 p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <ul className="divide-y divide-gray-100">
                    {order.items.map((item, index) => (
                      <li key={index} className="py-2 flex justify-between">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              When you place orders, they will appear here.
            </p>
            <Button asChild>
              <a href="/menu">Browse our Menu</a>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
