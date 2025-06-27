
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { User, Settings, Save } from 'lucide-react';

interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchProfile();
    }
  }, [isOpen, user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  const saveProfile = async () => {
    if (!user || !profile) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        username: profile.username,
        full_name: profile.full_name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      onClose();
    }
    setSaving(false);
  };

  const getInitials = (name: string | null) => {
    if (!name) return user?.email?.[0].toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md animate-scale-in">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            User Settings
          </DialogTitle>
        </DialogHeader>
        
        {profile && (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-20 h-20 border-4 border-blue-100 dark:border-blue-900">
                <AvatarImage src={profile.avatar_url || ''} />
                <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.full_name || ''}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="Enter your full name"
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username || ''}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  placeholder="Enter your username"
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                onClick={saveProfile}
                disabled={saving}
                className="flex-1 flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 hover:scale-105 transition-transform"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingsModal;
