
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const CleanerRoleSetup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Automatically set up cleaner role when component mounts
    handleCleanerSetup();
  }, []);

  const handleCleanerSetup = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Update user profile with cleaner role
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'cleaner' })
        .eq('id', user.id);

      if (error) throw error;

      // Create cleaner profile
      const { error: cleanerError } = await supabase
        .from('cleaner_profiles')
        .insert({
          id: user.id,
          bio: '',
          experience_years: 0,
          status: 'offline'
        });

      if (cleanerError) throw cleanerError;

      toast({
        title: "Welcome to Sparklean!",
        description: "Your cleaner profile has been set up successfully.",
      });

      navigate('/cleaner-dashboard');
    } catch (error: any) {
      toast({
        title: "Error setting up profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
              alt="Sparklean Logo" 
              className="w-20 h-20 object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">Sparklean</span>
          </div>
          
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🧽</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Setting up your Cleaner Profile</h1>
          <p className="text-gray-600 mb-8">
            {loading ? 'Please wait while we set up your cleaner account...' : 'Welcome to the Sparklean cleaner community!'}
          </p>
          
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CleanerRoleSetup;
