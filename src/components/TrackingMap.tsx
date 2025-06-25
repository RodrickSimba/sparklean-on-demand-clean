
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TrackingMap = () => {
  const { user } = useAuth();
  const { data: bookings = [] } = useBookings();
  const { toast } = useToast();
  
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [liveLocation, setLiveLocation] = useState<{lat: number, lng: number} | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Get active bookings (in progress)
  const activeBookings = bookings.filter((booking: any) => 
    booking.status === 'in_progress' || booking.status === 'confirmed'
  );

  useEffect(() => {
    if (!selectedBooking) return;

    // Subscribe to real-time location updates
    const channel = supabase
      .channel(`booking_${selectedBooking.id}`)
      .on('broadcast', { event: 'location_update' }, (payload) => {
        console.log('Location update received:', payload);
        setLiveLocation({
          lat: payload.payload.latitude,
          lng: payload.payload.longitude
        });
        
        // Update booking status if changed
        if (payload.payload.status !== selectedBooking.status) {
          toast({
            title: "Status Updated",
            description: `Your booking status changed to ${payload.payload.status}`,
          });
        }
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
        setConnectionStatus(status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedBooking, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Cleaner Assigned';
      case 'in_progress': return 'Cleaning in Progress';
      case 'completed': return 'Completed';
      default: return 'Pending';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600">Please sign in to track your cleaning services.</p>
        </Card>
      </div>
    );
  }

  if (activeBookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Active Bookings</h2>
          <p className="text-gray-600 mb-6">
            You don't have any active cleaning services to track right now.
          </p>
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => window.location.href = '/services'}
          >
            Book a Cleaning Service
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Tracking</h2>
        <p className="text-gray-600">Track your cleaner's location and service progress in real-time</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking List */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Bookings</h3>
            <div className="space-y-4">
              {activeBookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedBooking?.id === booking.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {booking.scheduled_date}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {booking.services?.name || 'Cleaning Service'}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {booking.address}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2">
          {selectedBooking ? (
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Cleaner Location</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      connectionStatus === 'SUBSCRIBED' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      {connectionStatus === 'SUBSCRIBED' ? 'Live' : 'Connecting...'}
                    </span>
                  </div>
                </div>
                
                {/* Map placeholder - In a real app, this would be Google Maps or similar */}
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">
                      {liveLocation 
                        ? `Lat: ${liveLocation.lat.toFixed(4)}, Lng: ${liveLocation.lng.toFixed(4)}`
                        : 'Waiting for location update...'
                      }
                    </p>
                  </div>
                  
                  {/* Animated pulse effect when live */}
                  {connectionStatus === 'SUBSCRIBED' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-teal-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Booking Details */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Service</label>
                    <p className="text-gray-900">{selectedBooking.services?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date & Time</label>
                    <p className="text-gray-900">
                      {selectedBooking.scheduled_date} at {selectedBooking.scheduled_time}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{selectedBooking.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Price</label>
                    <p className="text-gray-900">R{selectedBooking.total_price}</p>
                  </div>
                </div>

                {selectedBooking.special_instructions && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-500">Special Instructions</label>
                    <p className="text-gray-900">{selectedBooking.special_instructions}</p>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call Cleaner</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a Booking to Track
              </h3>
              <p className="text-gray-600">
                Choose an active booking from the list to see live tracking information.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
