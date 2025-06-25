
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Phone, MessageSquare } from 'lucide-react';

const TrackingMap = () => {
  const [cleanerLocation, setCleanerLocation] = useState({ lat: -26.2041, lng: 28.0473 });
  const [eta, setEta] = useState(12);

  const cleaner = {
    name: "Sarah Johnson",
    rating: 4.9,
    completedJobs: 247,
    photo: "/placeholder.svg",
    phone: "+27 123 456 789"
  };

  useEffect(() => {
    // Simulate cleaner movement
    const interval = setInterval(() => {
      setCleanerLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      setEta(prev => Math.max(1, prev - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Cleaner is On The Way!</h2>
        <p className="text-gray-600">Track your cleaner's live location and estimated arrival time</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map Placeholder */}
        <Card className="p-6 h-96 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-blue-100/50" />
          <div className="text-center z-10">
            <MapPin className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Map</h3>
            <p className="text-gray-600">Real-time cleaner tracking</p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-teal-600 font-medium">Sarah is {eta} minutes away</span>
            </div>
          </div>
        </Card>

        {/* Cleaner Info */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={cleaner.photo} alt={cleaner.name} />
                <AvatarFallback className="bg-teal-600 text-white text-xl">
                  {cleaner.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{cleaner.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{cleaner.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{cleaner.completedJobs} jobs completed</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                On the way
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What to expect:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sarah will arrive with all necessary equipment</li>
                <li>• Standard clean includes all rooms and bathrooms</li>
                <li>• Estimated duration: 2-3 hours</li>
                <li>• You'll receive updates throughout the service</li>
              </ul>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Service Progress</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-teal-500 rounded-full" />
                <span className="text-sm text-gray-900">Booking confirmed</span>
                <span className="text-xs text-gray-500">10:30 AM</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-900 font-medium">En route to your location</span>
                <span className="text-xs text-gray-500">Now</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <span className="text-sm text-gray-500">Service in progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <span className="text-sm text-gray-500">Service completed</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
