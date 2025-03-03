
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Café<span className="text-primary">Elegance</span></h2>
            <p className="text-muted-foreground">
              Exceptional coffee & food in an elegant atmosphere, made with love and served with pleasure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-foreground/80 hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/career" className="text-foreground/80 hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/80">
                  123 Coffee Street, Brewtown, BC 10101
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-foreground/80">hello@cafeelegance.com</span>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-foreground/80">Monday - Friday</span>
                <span className="font-medium">7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-foreground/80">Saturday</span>
                <span className="font-medium">8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-foreground/80">Sunday</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Café Elegance. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
