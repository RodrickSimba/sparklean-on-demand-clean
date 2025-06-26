
import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceSelector from '../components/ServiceSelector';
import BookingFlow from '../components/BookingFlow';
import TrackingMap from '../components/TrackingMap';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle URL-based routing
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/services') {
      setCurrentView('services');
    } else if (path === '/booking') {
      setCurrentView('booking');
    } else if (path === '/tracking') {
      setCurrentView('tracking');
    } else {
      setCurrentView('home');
    }
  }, [location]);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    navigate(view === 'home' ? '/' : `/${view}`);
  };

  const renderView = () => {
    switch (currentView) {
      case 'services':
        return <ServiceSelector />;
      case 'booking':
        return <BookingFlow />;
      case 'tracking':
        return <TrackingMap />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView !== 'home' && (
        <div className="bg-white border-b px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => handleViewChange('home')}
              className="text-teal-600 hover:text-teal-700"
            >
              ← Back to Home
            </Button>
            
            <div className="flex space-x-4">
              <Button
                variant={currentView === 'services' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('services')}
                className={currentView === 'services' ? 'bg-teal-600 text-white' : ''}
              >
                Services
              </Button>
              <Button
                variant={currentView === 'booking' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('booking')}
                className={currentView === 'booking' ? 'bg-teal-600 text-white' : ''}
                disabled={!user}
              >
                Booking
              </Button>
              <Button
                variant={currentView === 'tracking' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('tracking')}
                className={currentView === 'tracking' ? 'bg-teal-600 text-white' : ''}
                disabled={!user}
              >
                Track Service
              </Button>
            </div>
          </div>
        </div>
      )}

      {renderView()}

      {/* Demo Navigation */}
      {currentView === 'home' && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Sparklean Features</h2>
              <p className="text-gray-600">See how our platform works for customers and cleaners</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleViewChange('services')}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧽</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Selection</h3>
                  <p className="text-sm text-gray-600">Choose from various cleaning packages with transparent pricing and flexible scheduling options</p>
                </div>
              </Card>

              <Card 
                className={`p-6 cursor-pointer hover:shadow-lg transition-shadow ${!user ? 'opacity-50' : ''}`}
                onClick={() => user ? handleViewChange('booking') : navigate('/auth')}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy Booking</h3>
                  <p className="text-sm text-gray-600">
                    {user ? 'Schedule your cleaning in just a few simple steps with instant confirmation' : 'Sign in to schedule your cleaning'}
                  </p>
                </div>
              </Card>

              <Card 
                className={`p-6 cursor-pointer hover:shadow-lg transition-shadow ${!user ? 'opacity-50' : ''}`}
                onClick={() => user ? handleViewChange('tracking') : navigate('/auth')}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Live Tracking</h3>
                  <p className="text-sm text-gray-600">
                    {user ? 'Track your cleaner\'s location and service progress in real-time with ETA updates' : 'Sign in to track your cleaners'}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
