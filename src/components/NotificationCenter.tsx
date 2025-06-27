
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/utils/formatters';
import { Trash2, Eye } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  severity: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  loading?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  onClearAll?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications, 
  loading = false,
  onNotificationClick,
  onClearAll
}) => {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getNotificationColor = (type: string) => {
    const colors = {
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
      error: 'bg-red-500',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getNotificationBadgeVariant = (type: string) => {
    const variants = {
      success: 'default',
      warning: 'secondary',
      info: 'outline',
      error: 'destructive',
    };
    return variants[type as keyof typeof variants] || 'default';
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Notifications
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {notifications.filter(n => !n.read).length} new
          </Badge>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-6 px-2 text-xs hover:scale-105 transition-transform"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">🔔</div>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer hover:scale-[1.02] ${
                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : 'border-l-4 border-transparent'
                }`}
                onClick={() => onNotificationClick?.(notification)}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={getNotificationBadgeVariant(notification.type) as any}
                        className="text-xs ml-2"
                      >
                        {notification.type}
                      </Badge>
                      <Eye className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 truncate">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {formatRelativeTime(notification.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
