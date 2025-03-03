
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Coffee, Utensils } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* About Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary">
                <Coffee className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">A Passion for Exceptional Coffee & Experience</h2>
              
              <p className="text-muted-foreground">
                Founded in 2010, Café Elegance was born out of a simple belief: that a great cup of coffee served in a welcoming space can brighten anyone's day. We source our beans directly from sustainable farms around the world, roast them in small batches to preserve their unique flavors, and prepare each cup with meticulous attention to detail.
              </p>
              
              <p className="text-muted-foreground">
                Our café was designed to be an oasis of comfort in the busy city—a place where you can slow down, connect with friends, or simply enjoy a peaceful moment with a perfect drink and delicious pastry.
              </p>
              
              <Button asChild>
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1597489276061-bc12448f4c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Café interior" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-6 max-w-xs">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Premium Beans</h3>
                    <p className="text-sm text-muted-foreground">Ethically sourced globally</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Fresh Pastries</h3>
                    <p className="text-sm text-muted-foreground">Baked in-house daily</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visit Us</h3>
              <p className="text-muted-foreground mb-4">
                123 Coffee Street<br />
                Brewtown, BC 10101
              </p>
              <Button variant="outline" asChild>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Opening Hours</h3>
              <p className="text-muted-foreground mb-4">
                Monday - Friday: 7am - 8pm<br />
                Saturday: 8am - 9pm<br />
                Sunday: 8am - 6pm
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Coffee className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Order Online</h3>
              <p className="text-muted-foreground mb-4">
                Skip the line and order ahead.<br />
                We'll have it ready when you arrive.
              </p>
              <Button variant="outline" asChild>
                <Link to="/menu">
                  Order Now
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Perfect Cup?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us at Café Elegance and discover why our customers keep coming back for more. From our artisanal coffee to our freshly baked pastries, every item is crafted with care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/menu">
                Explore Our Menu
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Find Our Location
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
