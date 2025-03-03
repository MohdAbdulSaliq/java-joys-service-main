
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 min-h-screen">
      {/* Hero Section */}
      <div className="bg-secondary/10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Café Elegance was born from a passion for exceptional coffee and a desire to create a 
              space where community thrives.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Beginning</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2010, Café Elegance started as a small corner shop with a simple mission: 
              to serve the perfect cup of coffee in a warm, welcoming environment.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founder, Isabella Chen, trained as a barista across Europe before bringing her 
              expertise and passion back to create what has now become a beloved local institution.
            </p>
            <p className="text-muted-foreground">
              What began as a cozy café with just three tables has grown into a community hub, 
              but our commitment to quality and hospitality has never wavered.
            </p>
          </motion.div>
          
          <motion.div
            className="rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Café interior" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Our Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We source only the finest beans, working directly with farmers who share our commitment to sustainable and ethical practices."
              },
              {
                title: "Community",
                description: "More than just a café, we're a gathering place where connections are made and nurtured over exceptional coffee."
              },
              {
                title: "Creativity",
                description: "We constantly explore new flavors and techniques, pushing the boundaries of what coffee can be while respecting tradition."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
