
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Services = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLearnMore = (serviceType: string) => {
    if (user) {
      navigate('/booking', { state: { preselectedService: serviceType } });
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
            alt="Sparklean Logo" 
            className="w-16 h-16 object-contain"
          />
          <span className="text-2xl font-bold text-white">Sparklean</span>
        </div>
        <div className="flex items-center space-x-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="text-white hover:text-teal-300"
          >
            Back to Home
          </Button>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.user_metadata?.full_name || user.email}</span>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Dashboard
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Professional Cleaning Services
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            From residential deep cleans to commercial maintenance, we deliver exceptional results every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Residential Cleaning */}
          <Card className="bg-slate-800 border-slate-700 p-8 hover:bg-slate-750 transition-colors">
            <div className="text-center h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6">Residential Cleaning</h3>
              <p className="text-gray-300 mb-8 flex-grow">
                Professional home cleaning services for a spotless living space
              </p>
              <Button 
                onClick={() => handleLearnMore('residential')}
                className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </Card>

          {/* Commercial Cleaning */}
          <Card className="bg-slate-800 border-slate-700 p-8 hover:bg-slate-750 transition-colors">
            <div className="text-center h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6">Commercial Cleaning</h3>
              <p className="text-gray-300 mb-8 flex-grow">
                Office and business cleaning solutions to maintain professional environments
              </p>
              <Button 
                onClick={() => handleLearnMore('commercial')}
                className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </Card>

          {/* Specialized Cleaning */}
          <Card className="bg-slate-800 border-slate-700 p-8 hover:bg-slate-750 transition-colors">
            <div className="text-center h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6">Specialized Cleaning</h3>
              <p className="text-gray-300 mb-8 flex-grow">
                Expert carpet, upholstery, and deep cleaning services
              </p>
              <Button 
                onClick={() => handleLearnMore('specialized')}
                className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            onClick={() => user ? navigate('/booking') : navigate('/auth')}
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 text-xl"
          >
            Book Your Service Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
