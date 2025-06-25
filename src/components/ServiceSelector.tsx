
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'standard',
    name: 'Standard Clean',
    description: 'Regular maintenance cleaning for your home',
    duration: '2-3 hours',
    price: 299,
    popular: true
  },
  {
    id: 'deep',
    name: 'Deep Clean',
    description: 'Thorough cleaning including baseboards, inside appliances',
    duration: '4-6 hours',
    price: 599
  },
  {
    id: 'move',
    name: 'Move In/Out',
    description: 'Complete cleaning for moving situations',
    duration: '3-5 hours',
    price: 499
  },
  {
    id: 'construction',
    name: 'Post-Construction',
    description: 'Specialized cleaning after renovations',
    duration: '4-8 hours',
    price: 799
  }
];

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState<string>('standard');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const extras = [
    { id: 'windows', name: 'Window Cleaning', price: 80 },
    { id: 'fridge', name: 'Inside Fridge', price: 50 },
    { id: 'oven', name: 'Inside Oven', price: 60 },
    { id: 'garage', name: 'Garage', price: 120 }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);
  const totalPrice = (selectedServiceData?.price || 0) + 
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
            {service.popular && (
              <Badge className="absolute -top-2 -right-2 bg-teal-600 text-white">
                Popular
              </Badge>
            )}
            <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <div className="text-sm text-gray-500 mb-3">⏱️ {service.duration}</div>
            <div className="text-2xl font-bold text-teal-600">R{service.price}</div>
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
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg">
          Continue to Booking
        </Button>
      </Card>
    </div>
  );
};

export default ServiceSelector;
