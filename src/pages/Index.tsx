
import React, { useState } from 'react';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';
import MetricCard from '@/components/MetricCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import NotificationCenter from '@/components/NotificationCenter';
import ActivityFeed from '@/components/ActivityFeed';
import LoadingSpinner from '@/components/LoadingSpinner';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationDetailsModal from '@/components/modals/NotificationDetailsModal';
import UserSettingsModal from '@/components/modals/UserSettingsModal';
import ActivityDetailsModal from '@/components/modals/ActivityDetailsModal';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import { User, DollarSign, TrendingUp, Users, UserPlus, Settings, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Chart data remains static for demo purposes
const chartData = [
  { month: 'Jan', users: 4000, revenue: 2400 },
  { month: 'Feb', users: 3000, revenue: 1398 },
  { month: 'Mar', users: 2000, revenue: 9800 },
  { month: 'Apr', users: 2780, revenue: 3908 },
  { month: 'May', users: 1890, revenue: 4800 },
  { month: 'Jun', users: 2390, revenue: 3800 }
];

const Index: React.FC = () => {
  const { user, signOut } = useAuth();
  const {
    dashboardData,
    notifications,
    activities,
    loading,
    error,
    refetch,
    deleteNotification,
    toggleNotificationRead,
    deleteActivity,
    clearAllNotifications,
    clearAllActivities,
  } = useDashboardData();

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getInitials = (name: string | null) => {
    if (!name) return user?.email?.[0].toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center animate-fade-in">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={handleRefresh} className="mr-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Today's Performance Overview</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your business.</p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="hover:scale-105 transition-transform"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:scale-110 transition-transform">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500 text-white text-sm">
                          {getInitials(user?.user_metadata?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 animate-scale-in" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowUserSettings(true)} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <MetricCard
              title="Total Users"
              value={formatNumber(dashboardData.total_users)}
              change="+12.5%"
              changeType="positive"
              icon={<Users className="w-4 h-4" />}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MetricCard
              title="New Signups Today"
              value={dashboardData.new_signups_today.toString()}
              icon={<UserPlus className="w-4 h-4" />}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <MetricCard
              title="Active Users"
              value={formatNumber(dashboardData.active_users)}
              icon={<User className="w-4 h-4" />}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <MetricCard
              title="Revenue Today"
              value={formatCurrency(dashboardData.revenue_today)}
              change="+8.7%"
              changeType="positive"
              icon={<DollarSign className="w-4 h-4" />}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <MetricCard
              title="Conversion Rate"
              value={formatPercentage(dashboardData.conversion_rate)}
              change="-2.1%"
              changeType="negative"
              icon={<TrendingUp className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Charts and Secondary Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <AnalyticsChart data={chartData} />
          </div>
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <NotificationCenter 
              notifications={notifications}
              onNotificationClick={setSelectedNotification}
              onClearAll={clearAllNotifications}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <ActivityFeed 
              activities={activities}
              onActivityClick={setSelectedActivity}
              onClearAll={clearAllActivities}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Generate Report', desc: 'Create monthly analytics', color: 'blue' },
                { title: 'Export Data', desc: 'Download CSV or PDF', color: 'green' },
                { title: 'User Settings', desc: 'Manage preferences', color: 'purple' },
                { title: 'View Analytics', desc: 'Detailed insights', color: 'orange' }
              ].map((action, index) => (
                <button 
                  key={action.title}
                  className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-md animate-fade-in"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className={`text-${action.color}-600 dark:text-${action.color}-400 font-medium`}>{action.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{action.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NotificationDetailsModal
        notification={selectedNotification}
        isOpen={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onDelete={deleteNotification}
        onToggleRead={toggleNotificationRead}
      />

      <ActivityDetailsModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onDelete={deleteActivity}
      />

      <UserSettingsModal
        isOpen={showUserSettings}
        onClose={() => setShowUserSettings(false)}
      />
    </div>
  );
};

export default Index;
