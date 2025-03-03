
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';

const Cart: React.FC = () => {
  const { items, cartTotal, clearCart } = useCart();

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild>
            <Link to="/menu">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/menu">
                Browse Menu
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Items ({items.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearCart} 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    {cartTotal >= 20 ? (
                      <div className="flex justify-between text-green-600">
                        <span>Delivery</span>
                        <span>Free</span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>$2.99</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${cartTotal >= 20 
                        ? (cartTotal * 1.08).toFixed(2) 
                        : (cartTotal * 1.08 + 2.99).toFixed(2)
                      }
                    </span>
                  </div>
                  
                  {cartTotal < 20 && (
                    <div className="mt-4 bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                      Add ${(20 - cartTotal).toFixed(2)} more to get free delivery!
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild size="lg" className="w-full">
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
