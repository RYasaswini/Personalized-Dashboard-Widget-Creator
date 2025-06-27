
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatRelativeTime } from '@/utils/formatters';
import { Trash2, Eye } from 'lucide-react';

interface Activity {
  id: string;
  user_name: string;
  action: string;
  created_at: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
  onActivityClick?: (activity: Activity) => void;
  onClearAll?: () => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities, 
  loading = false,
  onActivityClick,
  onClearAll
}) => {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </CardTitle>
        {activities.length > 0 && (
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
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📊</div>
              <p>No recent activity</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex space-x-3 items-start hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                onClick={() => onActivityClick?.(activity)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">
                    {getInitials(activity.user_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user_name}</span>{' '}
                    <span className="text-gray-600 dark:text-gray-300">{activity.action}</span>
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-400">
                      {formatRelativeTime(activity.created_at)}
                    </p>
                    <Eye className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
