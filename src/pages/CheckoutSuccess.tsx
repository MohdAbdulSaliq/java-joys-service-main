
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-secondary/10">
      <motion.div 
        className="max-w-md w-full mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Complete!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We've received your payment and will begin
          processing your order right away.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => navigate('/menu')}
          >
            Continue Shopping
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
