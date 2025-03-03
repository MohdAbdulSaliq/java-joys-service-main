import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { AtSign, KeyRound, Loader2, User } from 'lucide-react';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    
    try {
      await login(loginEmail, loginPassword);
      resetForms();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) return;
    
    try {
      await signup(signupName, signupEmail, signupPassword);
      resetForms();
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  
  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setActiveTab('login');
  };
  
  const handleClose = () => {
    setIsAuthModalOpen(false);
    resetForms();
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Welcome to CaféElegance</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
                      className="pl-10"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 h-auto text-xs" type="button">
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="youremail@example.com"
                      className="pl-10"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6 flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our 
            <Button variant="link" className="p-0 h-auto text-sm" type="button">
              Terms of Service
            </Button> 
            {' '}and{' '}
            <Button variant="link" className="p-0 h-auto text-sm" type="button">
              Privacy Policy
            </Button>.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
