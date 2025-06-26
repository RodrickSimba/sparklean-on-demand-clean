
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Star, CreditCard, Bell } from 'lucide-react';

interface UserProfile {
  role: 'customer' | 'cleaner' | 'admin';
  full_name: string;
  phone: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { data: bookings = [] } = useBookings();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('role, full_name, phone')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || !profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
                alt="Sparklean Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/')} variant="ghost">Home</Button>
              <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile.full_name || user.email}!
          </h1>
          <p className="text-gray-600">
            {profile.role === 'customer' ? 'Manage your cleaning bookings and preferences' : 'Manage your cleaning services and availability'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/services')}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Book Service</h3>
                <p className="text-sm text-gray-600">Schedule cleaning</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tracking')}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Service</h3>
                <p className="text-sm text-gray-600">Live tracking</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/payments')}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Payments</h3>
                <p className="text-sm text-gray-600">Billing history</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Alerts & updates</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-4">Ready to book your first cleaning service?</p>
              <Button onClick={() => navigate('/services')} className="bg-teal-600 hover:bg-teal-700 text-white">
                Book Now
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      booking.status === 'completed' ? 'bg-green-500' :
                      booking.status === 'in_progress' ? 'bg-blue-500' :
                      booking.status === 'confirmed' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.services?.name}</h4>
                      <p className="text-sm text-gray-600">
                        {booking.scheduled_date} at {booking.scheduled_time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R{booking.total_price}</p>
                    <p className="text-sm text-gray-600 capitalize">{booking.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
