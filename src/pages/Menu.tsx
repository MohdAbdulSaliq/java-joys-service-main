
import React from 'react';
import MenuGrid from '@/components/menu/MenuGrid';
import { useParams } from 'react-router-dom';

const Menu: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our selection of handcrafted coffee, premium teas, and freshly baked pastries.
            Everything we serve is made with care, using the finest ingredients.
          </p>
        </div>
      </div>
      
      {/* Menu Grid */}
      <MenuGrid />
    </div>
  );
};

export default Menu;
