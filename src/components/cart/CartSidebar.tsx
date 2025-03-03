
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingBag, X, Trash2, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

const CartSidebar: React.FC = () => {
  const { items, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
  
  // Close cart when pressing escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isCartOpen, setIsCartOpen]);
  
  // Prevent scrolling on the body when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Your Cart</h2>
                <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-sm">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Cart Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
                <Button asChild>
                  <Link to="/menu" onClick={() => setIsCartOpen(false)}>
                    Browse Menu
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 px-4 py-2">
                  <div className="space-y-4">
                    {items.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t mt-auto">
                  {/* Clear cart button */}
                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full mb-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  )}
                  
                  {/* Total and checkout */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button asChild className="w-full mb-2" size="lg">
                    <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                      Proceed to Checkout
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
