
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Check } from 'lucide-react';

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

  const services = {
    residential: [
      {
        title: "Standard House Cleaning",
        description: "Dusting, sweeping, mopping, vacuuming, bathroom & kitchen cleaning, and general tidying.",
        includes: [
          "All rooms cleaned",
          "Kitchen & bathroom sanitized", 
          "Floors mopped & vacuumed",
          "Surfaces dusted"
        ]
      },
      {
        title: "Deep Cleaning",
        description: "Full home sanitation including inside appliances, under furniture, baseboards, tiles/grout, etc.",
        includes: [
          "Inside appliances",
          "Under furniture cleaning",
          "Baseboards & tiles/grout",
          "Complete sanitization"
        ]
      },
      {
        title: "Move-In/Move-Out Cleaning",
        description: "Full house clean-up before or after relocation, including cupboards, walls, and floors.",
        includes: [
          "Complete property clean",
          "Cupboards & storage",
          "Wall cleaning",
          "Floor deep clean"
        ]
      },
      {
        title: "Post-Construction Cleaning",
        description: "Safe removal of dust, paint, debris, and fine construction residue from newly built or renovated homes.",
        includes: [
          "Construction dust removal",
          "Paint & debris cleanup",
          "Fine residue cleaning",
          "Final polish"
        ]
      }
    ],
    commercial: [
      {
        title: "Office Cleaning (Daily, Weekly, or Monthly)",
        description: "Desks, floors, kitchens, bathrooms, reception areas—after-hours or daytime service available.",
        includes: [
          "Desk & workspace cleaning",
          "Floor maintenance",
          "Kitchen & bathroom cleaning",
          "Reception area care"
        ]
      },
      {
        title: "Post-Renovation Commercial Cleaning",
        description: "Deep dust removal, glass/window cleaning, and waste removal after commercial renovations.",
        includes: [
          "Deep dust removal",
          "Glass & window cleaning",
          "Waste removal",
          "Complete restoration"
        ]
      }
    ],
    specialized: [
      {
        title: "Carpet Cleaning",
        description: "Steam or dry extraction for offices, lounges, and high-traffic areas.",
        includes: [
          "Steam cleaning",
          "Dry extraction",
          "Stain removal",
          "High-traffic area focus"
        ]
      },
      {
        title: "Upholstery Cleaning",
        description: "Sofas, chairs, ottomans, and other furniture using non-damaging professional methods.",
        includes: [
          "Fabric protection",
          "Non-damaging methods",
          "Furniture restoration",
          "Professional equipment"
        ]
      }
    ]
  };

  const renderServiceCards = (serviceList: any[], icon: string) => (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {serviceList.map((service, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700 p-6 hover:bg-slate-750 transition-colors">
          <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
          <p className="text-gray-300 mb-4">{service.description}</p>
          
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {service.includes.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <Button 
            onClick={() => handleLearnMore(service.title.toLowerCase().replace(/\s+/g, '-'))}
            className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
          >
            Book This Service
          </Button>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
            alt="Sparklean Logo" 
            className="w-20 h-20 object-contain"
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
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.user_metadata?.full_name || user.email}</span>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Professional Cleaning Services
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            From residential deep cleans to commercial maintenance, we deliver exceptional results every time.
          </p>
        </div>

        {/* Residential Cleaning */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">🏠</span>
              <h2 className="text-3xl font-bold text-white">Residential Cleaning</h2>
            </div>
          </div>
          {renderServiceCards(services.residential, '🏠')}
        </div>

        {/* Commercial Cleaning */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">🏢</span>
              <h2 className="text-3xl font-bold text-white">Commercial Cleaning</h2>
            </div>
          </div>
          {renderServiceCards(services.commercial, '🏢')}
        </div>

        {/* Specialized Cleaning */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">🧽</span>
              <h2 className="text-3xl font-bold text-white">Specialized Cleaning Services</h2>
            </div>
          </div>
          {renderServiceCards(services.specialized, '🧽')}
        </div>
      </div>
    </div>
  );
};

export default Services;
