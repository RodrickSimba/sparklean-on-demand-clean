
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (user) {
      navigate('/services');
    } else {
      navigate('/auth');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/services');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
            alt="Sparklean Logo" 
            className="w-20 h-20 object-contain"
          />
          <span className="text-2xl font-bold text-gray-900">Sparklean</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/for-cleaners" className="text-gray-600 hover:text-teal-600">For Cleaners</a>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.user_metadata?.full_name || 'User'}</span>
              <Button onClick={() => navigate('/dashboard')} variant="outline">Dashboard</Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="outline">Sign In</Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Professional Cleaning
          <span className="text-teal-600 block">On Demand</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Book trusted, vetted cleaners in minutes. Track them in real-time. 
          Pay seamlessly after completion. Your home, sparkling clean.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg"
            onClick={handleBookNow}
          >
            Book Your First Clean
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg"
            onClick={handleGetStarted}
          >
            Get Started Now
          </Button>
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧽</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Selection</h3>
              <p className="text-gray-600">Choose from various cleaning packages with transparent pricing and flexible scheduling options.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">Schedule your cleaning in just a few simple steps with instant confirmation and flexible payment options.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Tracking</h3>
              <p className="text-gray-600">Track your cleaner's location and service progress in real-time with ETA updates and arrival alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
