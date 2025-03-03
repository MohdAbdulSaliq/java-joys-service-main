
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(user?.name || '');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = () => {
    if (!user) return;
    
    // In a real app, you would send this to an API
    // For now, we'll just update it in local storage
    const updatedUser = {
      ...user,
      name: name
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    
    setIsEditing(false);
    
    // Force a page reload to update the user data from localStorage
    window.location.reload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need to be logged in to view your profile
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16 min-h-screen"
    >
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="profile" className="max-w-md mx-auto">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="payments" className="flex-1">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      {profileImage ? (
                        <AvatarImage src={profileImage} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User size={32} />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <button 
                      className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full hover:bg-primary/90 transition-colors"
                      onClick={triggerFileInput}
                    >
                      <Camera size={16} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Your Profile</CardTitle>
                <CardDescription className="text-center">
                  Manage your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Account ID</p>
                      <p className="text-sm text-muted-foreground">{user.id}</p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => isEditing ? setIsEditing(false) : navigate('/')}
                >
                  {isEditing ? 'Cancel' : 'Back to Home'}
                </Button>
                {isEditing ? (
                  <Button onClick={handleProfileUpdate}>
                    Save Changes
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Saved Payment Methods</h3>
                  <p className="text-muted-foreground">
                    You don't have any saved payment methods yet.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Options</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center justify-center" 
                      onClick={() => navigate('/checkout')}
                    >
                      <img 
                        src="https://razorpay.com/assets/razorpay-glyph.svg" 
                        alt="Razorpay" 
                        className="h-10 mb-2"
                      />
                      <span>Pay with Razorpay</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center justify-center"
                      onClick={() => navigate('/checkout')}
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
                        alt="BHIM UPI" 
                        className="h-10 mb-2"
                      />
                      <span>Pay with BHIM UPI</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={logout} className="ml-auto">
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Profile;
