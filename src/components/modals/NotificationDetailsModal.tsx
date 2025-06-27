
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/utils/formatters';
import { Trash2, Mail, MailOpen } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  severity: string;
}

interface NotificationDetailsModalProps {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleRead: (id: string, read: boolean) => void;
}

const NotificationDetailsModal: React.FC<NotificationDetailsModalProps> = ({
  notification,
  isOpen,
  onClose,
  onDelete,
  onToggleRead,
}) => {
  if (!notification) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'success': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{getNotificationIcon(notification.type)}</span>
            {notification.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={getBadgeVariant(notification.type) as any}>
              {notification.type}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatRelativeTime(notification.created_at)}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {notification.message}
          </p>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleRead(notification.id, !notification.read)}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {notification.read ? (
                <>
                  <Mail className="w-4 h-4" />
                  Mark Unread
                </>
              ) : (
                <>
                  <MailOpen className="w-4 h-4" />
                  Mark Read
                </>
              )}
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDelete(notification.id);
                onClose();
              }}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetailsModal;
