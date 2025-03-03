
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Coffee } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Café interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/90 text-white mb-6">
              <Coffee className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Premium Specialty Coffee</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Experience the Art of <span className="text-primary">Perfect Coffee</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
          >
            Discover our meticulously crafted coffees and delicious baked goods in an elegant, welcoming space designed for connection and comfort.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/menu">
                Explore Our Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/about">
                Learn About Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-1 h-10 rounded-full bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white h-1/3 animate-[scroll_2s_ease-in-out_infinite]"></div>
        </div>
        <span className="text-white/70 text-sm mt-2">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
