
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Star, DollarSign, Clock } from 'lucide-react';

interface CleanerProfile {
  bio: string;
  experience_years: number;
  hourly_rate: number;
  rating: number;
  total_jobs: number;
  status: 'available' | 'busy' | 'offline';
  verified: boolean;
}

interface Job {
  id: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  total_price: number;
  status: string;
  services: { name: string };
  profiles: { full_name: string };
}

const CleanerDashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<CleanerProfile | null>(null);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [earnings, setEarnings] = useState({ today: 0, week: 0, month: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCleanerProfile();
      fetchAvailableJobs();
      fetchMyJobs();
      fetchEarnings();
    }
  }, [user]);

  const fetchCleanerProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('cleaner_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const fetchAvailableJobs = async () => {
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        services (name),
        profiles (full_name)
      `)
      .is('cleaner_id', null)
      .eq('status', 'pending')
      .limit(10);

    if (data) {
      setAvailableJobs(data);
    }
  };

  const fetchMyJobs = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        services (name),
        profiles (full_name)
      `)
      .eq('cleaner_id', user.id)
      .order('scheduled_date', { ascending: false })
      .limit(10);

    if (data) {
      setMyJobs(data);
    }
  };

  const fetchEarnings = async () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const { data: todayEarnings } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('cleaner_id', user.id)
      .eq('status', 'completed')
      .gte('created_at', today);

    const { data: weekEarnings } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('cleaner_id', user.id)
      .eq('status', 'completed')
      .gte('created_at', weekAgo);

    const { data: monthEarnings } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('cleaner_id', user.id)
      .eq('status', 'completed')
      .gte('created_at', monthAgo);

    setEarnings({
      today: todayEarnings?.reduce((sum, job) => sum + Number(job.total_price), 0) || 0,
      week: weekEarnings?.reduce((sum, job) => sum + Number(job.total_price), 0) || 0,
      month: monthEarnings?.reduce((sum, job) => sum + Number(job.total_price), 0) || 0,
    });
  };

  const acceptJob = async (jobId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('bookings')
      .update({ 
        cleaner_id: user.id, 
        status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId);

    if (!error) {
      fetchAvailableJobs();
      fetchMyJobs();
    }
  };

  const updateStatus = async (status: 'available' | 'busy' | 'offline') => {
    if (!user) return;
    
    const { error } = await supabase
      .from('cleaner_profiles')
      .update({ status })
      .eq('id', user.id);

    if (!error) {
      setProfile(prev => prev ? { ...prev, status } : null);
    }
  };

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cleaner dashboard...</p>
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
              <span className="text-xl font-bold text-gray-900">Cleaner Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge 
                variant={profile.status === 'available' ? 'default' : 'secondary'}
                className={profile.status === 'available' ? 'bg-green-500' : ''}
              >
                {profile.status}
              </Badge>
              <Button onClick={() => navigate('/')} variant="ghost">Home</Button>
              <Button onClick={() => signOut()} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-xl font-bold text-gray-900">R{earnings.today}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-bold text-gray-900">R{earnings.week}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-xl font-bold text-gray-900">{profile.rating.toFixed(1)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-xl font-bold text-gray-900">{profile.total_jobs}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Controls */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability Status</h2>
          <div className="flex space-x-4">
            <Button 
              variant={profile.status === 'available' ? 'default' : 'outline'}
              onClick={() => updateStatus('available')}
              className={profile.status === 'available' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              Available
            </Button>
            <Button 
              variant={profile.status === 'busy' ? 'default' : 'outline'}
              onClick={() => updateStatus('busy')}
              className={profile.status === 'busy' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              Busy
            </Button>
            <Button 
              variant={profile.status === 'offline' ? 'default' : 'outline'}
              onClick={() => updateStatus('offline')}
              className={profile.status === 'offline' ? 'bg-gray-500 hover:bg-gray-600' : ''}
            >
              Offline
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Jobs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Jobs</h2>
            <div className="space-y-4">
              {availableJobs.length === 0 ? (
                <p className="text-gray-600">No available jobs at the moment.</p>
              ) : (
                availableJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{job.services.name}</h3>
                      <span className="font-bold text-teal-600">R{job.total_price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {job.address}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      📅 {job.scheduled_date} at {job.scheduled_time}
                    </p>
                    <Button 
                      onClick={() => acceptJob(job.id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white w-full"
                    >
                      Accept Job
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* My Jobs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Jobs</h2>
            <div className="space-y-4">
              {myJobs.length === 0 ? (
                <p className="text-gray-600">No jobs assigned yet.</p>
              ) : (
                myJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{job.services.name}</h3>
                      <Badge 
                        variant={job.status === 'completed' ? 'default' : 'secondary'}
                        className={job.status === 'completed' ? 'bg-green-500' : ''}
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      👤 {job.profiles.full_name}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {job.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      📅 {job.scheduled_date} at {job.scheduled_time} • R{job.total_price}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;
