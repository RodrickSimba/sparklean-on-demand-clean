
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useServices, useServiceExtras } from '@/hooks/useServices';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ServiceSelector = () => {
  const { data: services = [], isLoading: servicesLoading } = useServices();
  const { data: extras = [], isLoading: extrasLoading } = useServiceExtras();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  React.useEffect(() => {
    if (services.length > 0 && !selectedService) {
      // Auto-select the first service (Standard Clean)
      const standardService = services.find(s => s.service_type === 'standard') || services[0];
      setSelectedService(standardService.id);
    }
  }, [services, selectedService]);

  const selectedServiceData = services.find(s => s.id === selectedService);
  const totalPrice = (selectedServiceData?.base_price || 0) + 
    selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return sum + (extra?.price || 0);
    }, 0);

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleContinue = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Store selected service and extras in localStorage for the booking flow
    localStorage.setItem('selectedService', JSON.stringify({
      service: selectedServiceData,
      extras: selectedExtras.map(id => extras.find(e => e.id === id)).filter(Boolean),
      totalPrice
    }));
    
    navigate('/booking');
  };

  if (servicesLoading || extrasLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Service</h2>
        <p className="text-gray-600">Select the type of cleaning that fits your needs</p>
      </div>

      {/* Service Types */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg relative ${
              selectedService === service.id 
                ? 'ring-2 ring-teal-500 bg-teal-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            {service.service_type === 'standard' && (
              <Badge className="absolute -top-2 -right-2 bg-teal-600 text-white">
                Popular
              </Badge>
            )}
            <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <div className="text-sm text-gray-500 mb-3">⏱️ {service.duration_hours} hours</div>
            <div className="text-2xl font-bold text-teal-600">R{service.base_price}</div>
          </Card>
        ))}
      </div>

      {/* Extras */}
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Extra Services</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {extras.map((extra) => (
            <label key={extra.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                checked={selectedExtras.includes(extra.id)}
                onChange={() => toggleExtra(extra.id)}
              />
              <span className="flex-1 text-gray-700">{extra.name}</span>
              <span className="text-teal-600 font-semibold">+R{extra.price}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Service Summary</h3>
            <p className="text-gray-600">{selectedServiceData?.name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-teal-600">R{totalPrice}</div>
            <div className="text-sm text-gray-500">Total price</div>
          </div>
        </div>
        <Button 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg"
          onClick={handleContinue}
        >
          {user ? 'Continue to Booking' : 'Sign In to Continue'}
        </Button>
      </Card>
    </div>
  );
};

export default ServiceSelector;
