
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { getFeaturedItems } from '@/lib/data';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const featuredItems = getFeaturedItems();
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Items</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular handcrafted creations, made with premium ingredients and exceptional attention to detail.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Mobile view (slider) */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex justify-between mb-4">
              <Button variant="outline" size="icon" onClick={handlePrev} className="z-10 h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {activeIndex + 1} / {featuredItems.length}
              </span>
              <Button variant="outline" size="icon" onClick={handleNext} className="z-10 h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Card className="overflow-hidden card-hover bg-white">
                  <div className="relative pb-[56.25%]">
                    <img 
                      src={featuredItems[activeIndex].image} 
                      alt={featuredItems[activeIndex].name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{featuredItems[activeIndex].name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{featuredItems[activeIndex].description}</p>
                      </div>
                      <span className="font-bold text-primary">${featuredItems[activeIndex].price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 mr-2"
                        asChild
                      >
                        <Link to={`/menu/${featuredItems[activeIndex].category}`}>Details</Link>
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => addToCart(featuredItems[activeIndex])}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Desktop view (grid) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
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
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      </div>
                      <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 mr-2"
                        asChild
                      >
                        <Link to={`/menu/${item.category}`}>Details</Link>
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/menu">
                View Full Menu
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
