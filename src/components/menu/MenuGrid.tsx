
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { categories, getItemsByCategory, menuItems } from '@/lib/data';
import { Plus } from 'lucide-react';

const MenuGrid: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [activeCategory, setActiveCategory] = useState(categoryId || 'all');
  const { addToCart } = useCart();
  
  const displayedItems = activeCategory === 'all' 
    ? menuItems 
    : getItemsByCategory(activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category filters */}
      <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 scrollbar-hide">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          className="whitespace-nowrap"
          onClick={() => setActiveCategory('all')}
        >
          All Items
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            className="whitespace-nowrap"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Title and description */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {activeCategory === 'all' 
            ? 'Our Complete Menu' 
            : categories.find(cat => cat.id === activeCategory)?.name || 'Menu'}
        </h2>
        <p className="text-muted-foreground">
          {activeCategory === 'all' 
            ? 'Explore our full range of handcrafted coffee, teas, and delicious food.'
            : categories.find(cat => cat.id === activeCategory)?.description || ''}
        </p>
      </div>
      
      {/* Menu grid */}
      {displayedItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground mb-4">Try selecting a different category</p>
          <Button onClick={() => setActiveCategory('all')}>View All Items</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden card-hover bg-white h-full flex flex-col">
                <div className="relative pb-[75%] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-auto">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    <span className="font-bold text-primary shrink-0 ml-2">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="w-full"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
