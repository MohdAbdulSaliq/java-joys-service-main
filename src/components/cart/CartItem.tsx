
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/lib/data';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex border rounded-lg overflow-hidden bg-white">
      {/* Product image */}
      <div className="w-24 h-24 shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="flex-1 p-3 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm">{item.name}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 -mr-1 -mt-1 text-muted-foreground" 
            onClick={() => removeFromCart(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          {/* Price */}
          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          
          {/* Quantity controls */}
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
