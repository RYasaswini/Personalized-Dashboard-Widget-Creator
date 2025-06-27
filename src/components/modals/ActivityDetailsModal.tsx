
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatRelativeTime } from '@/utils/formatters';
import { Trash2, Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  user_name: string;
  action: string;
  created_at: string;
}

interface ActivityDetailsModalProps {
  activity: ActivityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  activity,
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!activity) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getActionIcon = (action: string) => {
    if (action.includes('signed up')) return '👋';
    if (action.includes('purchased') || action.includes('bought')) return '💳';
    if (action.includes('logged in')) return '🔑';
    if (action.includes('updated')) return '✏️';
    return '📝';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {getInitials(activity.user_name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{getActionIcon(activity.action)}</span>
                <span className="font-medium">{activity.user_name}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {activity.action}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {formatRelativeTime(activity.created_at)}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDelete(activity.id);
                onClose();
              }}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Trash2 className="w-4 h-4" />
              Delete Activity
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 hover:scale-105 transition-transform"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsModal;
