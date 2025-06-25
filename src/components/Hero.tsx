
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Clock, MapPin, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">✨</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Sparklean</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-teal-600">
            For Cleaners
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Book Now
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
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
                Book Your First Clean
                <span className="ml-2">→</span>
              </Button>
              <Button size="lg" variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-4 text-lg">
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
              
              <Button className="w-full mt-8 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-4 text-lg">
                Get Started Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
