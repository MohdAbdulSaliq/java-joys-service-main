
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, setIsAuthModalOpen } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Café<span className="text-primary">Elegance</span></h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link font-medium">Home</Link>
            <Link to="/menu" className="nav-link font-medium">Menu</Link>
            <Link to="/about" className="nav-link font-medium">About</Link>
            <Link to="/contact" className="nav-link font-medium">Contact</Link>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              className="relative p-2" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {/* Auth Button or User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary/90 hover:bg-primary"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-4 bg-background shadow-lg">
            <Link to="/" className="block py-2 text-lg font-medium">Home</Link>
            <Link to="/menu" className="block py-2 text-lg font-medium">Menu</Link>
            <Link to="/about" className="block py-2 text-lg font-medium">About</Link>
            <Link to="/contact" className="block py-2 text-lg font-medium">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
