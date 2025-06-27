
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardData {
  id: string;
  total_users: number;
  new_signups_today: number;
  active_users: number;
  revenue_today: number;
  conversion_rate: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  read: boolean;
  severity: string;
  created_at: string;
}

export interface Activity {
  id: string;
  user_name: string;
  action: string;
  created_at: string;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      const [dashboardResponse, notificationsResponse, activitiesResponse] = await Promise.all([
        supabase.from('dashboard_data').select('*').eq('user_id', user.id).single(),
        supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      if (dashboardResponse.error) throw dashboardResponse.error;
      if (notificationsResponse.error) throw notificationsResponse.error;
      if (activitiesResponse.error) throw activitiesResponse.error;

      setDashboardData(dashboardResponse.data);
      // Cast the type to ensure compatibility
      setNotifications(notificationsResponse.data.map(n => ({
        ...n,
        type: n.type as 'success' | 'warning' | 'info' | 'error'
      })));
      setActivities(activitiesResponse.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id: string) => {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (!error) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
    return { error };
  };

  const toggleNotificationRead = async (id: string, read: boolean) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read })
      .eq('id', id);
    
    if (!error) {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read } : n)
      );
    }
    return { error };
  };

  const deleteActivity = async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) {
      setActivities(prev => prev.filter(a => a.id !== id));
    }
    return { error };
  };

  const clearAllNotifications = async () => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', user?.id);
    
    if (!error) {
      setNotifications([]);
    }
    return { error };
  };

  const clearAllActivities = async () => {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('user_id', user?.id);
    
    if (!error) {
      setActivities([]);
    }
    return { error };
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return {
    dashboardData,
    notifications,
    activities,
    loading,
    error,
    refetch: fetchDashboardData,
    deleteNotification,
    toggleNotificationRead,
    deleteActivity,
    clearAllNotifications,
    clearAllActivities,
  };
};
