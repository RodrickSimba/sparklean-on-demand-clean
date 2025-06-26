
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'cleaner' | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleRoleSelect = async () => {
    if (!selectedRole || !user) return;
    
    setLoading(true);
    try {
      // Update user profile with selected role
      const { error } = await supabase
        .from('profiles')
        .update({ role: selectedRole })
        .eq('id', user.id);

      if (error) throw error;

      // If cleaner role, create cleaner profile
      if (selectedRole === 'cleaner') {
        const { error: cleanerError } = await supabase
          .from('cleaner_profiles')
          .insert({
            id: user.id,
            bio: '',
            experience_years: 0,
            status: 'offline'
          });

        if (cleanerError) throw cleanerError;
      }

      toast({
        title: "Profile setup complete!",
        description: `Welcome to Sparklean as a ${selectedRole}!`,
      });

      navigate(selectedRole === 'cleaner' ? '/cleaner-dashboard' : '/');
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
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
              alt="Sparklean Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">Sparklean</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Role</h1>
          <p className="text-gray-600">How would you like to use Sparklean?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === 'customer' 
                ? 'ring-2 ring-teal-500 bg-teal-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('customer')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm a Customer</h3>
              <p className="text-gray-600 mb-4">I want to book cleaning services for my home or office</p>
              <ul className="text-sm text-gray-500 text-left space-y-1">
                <li>• Book cleaning services</li>
                <li>• Track cleaner location</li>
                <li>• Rate and review</li>
                <li>• Manage payments</li>
              </ul>
            </div>
          </Card>

          <Card 
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === 'cleaner' 
                ? 'ring-2 ring-teal-500 bg-teal-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('cleaner')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧽</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm a Cleaner</h3>
              <p className="text-gray-600 mb-4">I want to offer my cleaning services and earn money</p>
              <ul className="text-sm text-gray-500 text-left space-y-1">
                <li>• Accept/decline jobs</li>
                <li>• Set availability</li>
                <li>• Track earnings</li>
                <li>• Build reputation</li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={handleRoleSelect}
            disabled={!selectedRole || loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
          >
            {loading ? 'Setting up...' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RoleSelection;
