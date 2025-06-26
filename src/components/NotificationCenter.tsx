
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Bell, CheckCircle, Calendar, MapPin, Star } from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'reminder' | 'promotion' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

const NotificationCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    // Simulate notifications based on user bookings and activity
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your cleaning service for tomorrow at 2:00 PM has been confirmed. Your cleaner will arrive on time.',
        read: false,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        type: 'reminder',
        title: 'Service Reminder',
        message: 'Your cleaning service is scheduled for today at 2:00 PM. Make sure someone is available to provide access.',
        read: false,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off your next deep cleaning service! Use code DEEP20 at checkout.',
        read: true,
        created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        type: 'payment',
        title: 'Payment Processed',
        message: 'Your payment of R299 for standard cleaning has been successfully processed.',
        read: true,
        created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
      }
    ];

    setNotifications(mockNotifications);
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-yellow-600" />;
      case 'promotion':
        return <Star className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-teal-600" />
              <span className="text-xl font-bold text-gray-900">Notifications</span>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button 
                onClick={markAllAsRead}
                variant="outline"
                className="text-teal-600 border-teal-600"
              >
                Mark All as Read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Notifications will appear here.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-4 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className={`mt-1 text-sm ${
                      !notification.read ? 'text-gray-700' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
