
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Clock, MapPin, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const handleHowItWorks = () => {
    // Scroll to how it works section
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
            alt="Sparklean Logo" 
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-gray-900">Sparklean</span>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-gray-600">
              Welcome, {user.user_metadata?.full_name || user.email}
            </span>
          )}
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-teal-600"
            onClick={() => navigate('/for-cleaners')}
          >
            For Cleaners
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={handleAuthAction}
          >
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your space.
              <span className="text-teal-600"> Spotless.</span>
              <br />
              On-demand.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional cleaning services at your fingertips. Book in seconds, 
              track in real-time, and enjoy a pristine home without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg"
                onClick={() => navigate('/services')}
              >
                Book Your First Clean
                <span className="ml-2">→</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-4 text-lg"
                onClick={handleHowItWorks}
              >
                How It Works
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Insured & Vetted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Same-day Booking</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Card */}
          <div className="relative">
            <Card className="p-8 bg-white shadow-2xl border-0 rounded-3xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Book in 3 Steps</h3>
                <p className="text-gray-600">Quick, easy, professional</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Choose Location</h4>
                    <p className="text-sm text-gray-600">Enter your address and service type</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pick Time</h4>
                    <p className="text-sm text-gray-600">Select your preferred date and time</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Relax & Enjoy</h4>
                    <p className="text-sm text-gray-600">Track your cleaner and enjoy results</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-8 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-4 text-lg"
                onClick={() => navigate('/services')}
              >
                Get Started Now
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Sparklean Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and reliable cleaning services</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧽</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Selection</h3>
              <p className="text-gray-600">Choose from various cleaning packages with transparent pricing. Standard, deep clean, move-in/out, and post-construction options available.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">Schedule your cleaning in just a few simple steps. Pick your date, time, and any extras. Secure payment processing included.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Tracking</h3>
              <p className="text-gray-600">Track your cleaner's location and service progress in real-time. Get updates and notifications throughout the cleaning process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
