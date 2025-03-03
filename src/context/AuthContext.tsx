
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { toast } = useToast();

  // Simulate checking for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    
    try {
      // Check if it's the admin account
      if (email === 'admin@cafeelegance.com' && password === 'coffee123') {
        const adminUser = {
          id: 'admin',
          name: 'Admin User',
          email: email
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        setIsAuthModalOpen(false);
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard",
        });
        return;
      }
      
      // Regular user login
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create user object using the actual email from the form
      const normalUser = {
        id: `user${Date.now()}`,
        name: email.split('@')[0], // Generate a name from the email
        email: email
      };
      
      setUser(normalUser);
      localStorage.setItem('user', JSON.stringify(normalUser));
      setIsAuthModalOpen(false);
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${normalUser.name}`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    
    try {
      // Mock signup - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new user with the provided name and email
      const newUser = {
        id: `user${Date.now()}`,
        name,
        email
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      
      toast({
        title: "Account created!",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
