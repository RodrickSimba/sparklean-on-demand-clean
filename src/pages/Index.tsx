
import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceSelector from '../components/ServiceSelector';
import BookingFlow from '../components/BookingFlow';
import TrackingMap from '../components/TrackingMap';
import { Button } from '@/components/ui/button';
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
    </div>
  );
};

export default Index;
