
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Check } from 'lucide-react';
import BackButton from '@/components/BackButton';

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

  const renderServiceCards = (serviceList: any[]) => (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {serviceList.map((service, index) => (
        <Card key={index} className="bg-white border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          
          <div className="mb-6">
            <h4 className="text-gray-900 font-semibold mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {service.includes.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <Check className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
              alt="Sparklean Logo" 
              className="w-16 h-16 object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">Sparklean</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {user && (
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Professional Cleaning Services
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            From residential deep cleans to commercial maintenance, we deliver exceptional results every time.
          </p>
        </div>

        {/* Service Categories Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Residential Cleaning */}
          <Card className="bg-white border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/8f3542e3-961f-4bef-9561-90ea784cbca1.png" 
                alt="Residential Cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Residential Cleaning</h3>
            <p className="text-gray-600 mb-6">Professional home cleaning services for a spotless living space</p>
            <Button 
              onClick={() => document.getElementById('residential-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
            >
              Learn More
            </Button>
          </Card>

          {/* Commercial Cleaning */}
          <Card className="bg-white border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/231994cf-ecbd-43a9-b127-940919a8ef5a.png" 
                alt="Commercial Cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial Cleaning</h3>
            <p className="text-gray-600 mb-6">Office and business cleaning solutions to maintain professional environments</p>
            <Button 
              onClick={() => document.getElementById('commercial-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
            >
              Learn More
            </Button>
          </Card>

          {/* Specialized Cleaning */}
          <Card className="bg-white border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/34c8310e-ba6e-4177-8df8-92be3e43d0e1.png" 
                alt="Specialized Cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialized Cleaning</h3>
            <p className="text-gray-600 mb-6">Expert carpet, upholstery, and deep cleaning services</p>
            <Button 
              onClick={() => document.getElementById('specialized-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-600 hover:bg-teal-700 text-white w-full py-3 text-lg"
            >
              Learn More
            </Button>
          </Card>
        </div>

        {/* Detailed Services Sections */}
        
        {/* Residential Cleaning */}
        <div id="residential-section" className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/8f3542e3-961f-4bef-9561-90ea784cbca1.png" 
                  alt="Residential Cleaning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Residential Cleaning</h2>
            </div>
            <p className="text-gray-600">Professional home cleaning services for a spotless living space</p>
          </div>
          {renderServiceCards(services.residential)}
        </div>

        {/* Commercial Cleaning */}
        <div id="commercial-section" className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/231994cf-ecbd-43a9-b127-940919a8ef5a.png" 
                  alt="Commercial Cleaning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Commercial Cleaning</h2>
            </div>
            <p className="text-gray-600">Office and business cleaning solutions to maintain professional environments</p>
          </div>
          {renderServiceCards(services.commercial)}
        </div>

        {/* Specialized Cleaning */}
        <div id="specialized-section" className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/34c8310e-ba6e-4177-8df8-92be3e43d0e1.png" 
                  alt="Specialized Cleaning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Specialized Cleaning Services</h2>
            </div>
            <p className="text-gray-600">Expert carpet, upholstery, and deep cleaning services</p>
          </div>
          {renderServiceCards(services.specialized)}
        </div>
      </div>
    </div>
  );
};

export default Services;
