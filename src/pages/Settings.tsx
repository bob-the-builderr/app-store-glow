import React, { useState, useEffect } from 'react';
import { User, LogOut, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Settings: React.FC = () => {
  const { user, signOut, updatePassword, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  // Profile state
  const [profile, setProfile] = useState<{ display_name?: string }>({});
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setProfile(data);
        }
        setIsLoadingProfile(false);
      }
    };
    
    loadProfile();
  }, [user?.id]);

  // Cleanup function to clear state when component unmounts
  useEffect(() => {
    return () => {
      // Clear all state when component unmounts
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswords(false);
      setIsUpdatingPassword(false);
      setIsUpdatingProfile(false);
      setIsLoadingProfile(false);
      setProfile({});
    };
  }, []);

  // Prevent autocomplete by temporarily making fields readonly
  useEffect(() => {
    const inputs = document.querySelectorAll('input[type="password"], input[type="text"]');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.setAttribute('readonly', 'readonly');
        setTimeout(() => {
          input.removeAttribute('readonly');
        }, 100);
      }
    });
  }, []);

  // Handle profile update
  const handleProfileUpdate = async () => {
    setIsUpdatingProfile(true);
    const { error } = await updateProfile(profile);
    if (!error) {
      // Profile updated successfully
    }
    setIsUpdatingProfile(false);
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (!currentPassword) {
      // Handle missing current password
      return;
    }
    
    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    
    if (newPassword.length < 6) {
      // Handle password too short
      return;
    }
    
    setIsUpdatingPassword(true);
    const { error } = await updatePassword(currentPassword, newPassword);
    if (!error) {
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setIsUpdatingPassword(false);
  };

  return (
    <div className="space-y-6">
      {/* Hidden dummy form to prevent autocomplete */}
      <form style={{ display: 'none' }}>
        <input type="text" name="fakeusernameremembered" />
        <input type="password" name="fakepasswordremembered" />
      </form>
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

                           {/* Profile Section */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Profile Info</h2>
                <p className="text-sm text-muted-foreground">Manage your account information</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <div className="p-3 rounded-lg bg-background border">
                  <p className="text-sm text-foreground">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="display_name" className="text-sm font-medium">Display Name</Label>
                <Input
                  id="display_name"
                  type="text"
                  placeholder="Enter your display name"
                  value={profile.display_name || ''}
                  onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                  disabled={isLoadingProfile}
                  className="text-foreground"
                  autoComplete="off"
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleProfileUpdate}
                  disabled={isUpdatingProfile || isLoadingProfile}
                  className="w-full"
                >
                  {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

                           {/* Password Management Section */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Password Management</h2>
                <p className="text-sm text-muted-foreground">Change your account password</p>
              </div>
            </CardTitle>
          </CardHeader>
                     <CardContent className="space-y-4">
             <div className="grid gap-4">
               <div className="space-y-2">
                 <Label htmlFor="current_password" className="text-sm font-medium">Current Password</Label>
                 <div className="relative">
                   <Input
                     id="current_password"
                     type={showPasswords ? "text" : "password"}
                     placeholder="Enter your current password"
                     value={currentPassword}
                     onChange={(e) => setCurrentPassword(e.target.value)}
                     className="text-foreground"
                     autoComplete="new-password"
                     autoCorrect="off"
                     autoCapitalize="off"
                     spellCheck="false"
                   />
                   <Button
                     type="button"
                     variant="ghost"
                     size="sm"
                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-foreground"
                     onClick={() => setShowPasswords(!showPasswords)}
                   >
                     {showPasswords ? (
                       <EyeOff className="h-4 w-4" />
                     ) : (
                       <Eye className="h-4 w-4" />
                     )}
                   </Button>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <Label htmlFor="new_password" className="text-sm font-medium">New Password</Label>
                 <div className="relative">
                   <Input
                     id="new_password"
                     type={showPasswords ? "text" : "password"}
                     placeholder="Enter new password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     className="text-foreground"
                     autoComplete="new-password"
                     autoCorrect="off"
                     autoCapitalize="off"
                     spellCheck="false"
                   />
                   <Button
                     type="button"
                     variant="ghost"
                     size="sm"
                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-foreground"
                     onClick={() => setShowPasswords(!showPasswords)}
                   >
                     {showPasswords ? (
                       <EyeOff className="h-4 w-4" />
                     ) : (
                       <Eye className="h-4 w-4" />
                     )}
                   </Button>
                 </div>
               </div>
              
                             <div className="space-y-2">
                 <Label htmlFor="confirm_password" className="text-sm font-medium">Confirm New Password</Label>
                 <div className="relative">
                   <Input
                     id="confirm_password"
                     type={showPasswords ? "text" : "password"}
                     placeholder="Confirm new password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     className="text-foreground"
                     autoComplete="new-password"
                     autoCorrect="off"
                     autoCapitalize="off"
                     spellCheck="false"
                   />
                   <Button
                     type="button"
                     variant="ghost"
                     size="sm"
                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-foreground"
                     onClick={() => setShowPasswords(!showPasswords)}
                   >
                     {showPasswords ? (
                       <EyeOff className="h-4 w-4" />
                     ) : (
                       <Eye className="h-4 w-4" />
                     )}
                   </Button>
                 </div>
                 {confirmPassword && newPassword !== confirmPassword && (
                   <p className="text-xs text-red-500">Passwords do not match</p>
                 )}
                 {newPassword && newPassword.length < 6 && (
                   <p className="text-xs text-red-500">Password must be at least 6 characters</p>
                 )}
               </div>
              
              <div className="pt-4">
                                 <Button 
                   onClick={handlePasswordUpdate}
                   disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                   className="w-full"
                 >
                   {isUpdatingPassword ? 'Updating...' : 'Change Password'}
                 </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Section */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Sign Out</h2>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full justify-start text-foreground"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
    </div>
  );
};

export default Settings;
