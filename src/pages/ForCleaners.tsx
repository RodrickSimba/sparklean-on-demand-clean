
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, DollarSign, Clock, Shield, Users, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForCleaners = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
            alt="Sparklean Logo" 
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-gray-900">Sparklean</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            For Customers
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Join as Cleaner
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Join South Africa's Leading
              <span className="text-teal-600"> Cleaning Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Be your own boss, set your schedule, and earn great money providing 
              professional cleaning services to customers in your area.
            </p>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
              Start Your Application
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">R500+</div>
              <div className="text-gray-600">Average per job</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600">Flexible scheduling</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
              <div className="text-gray-600">Customer satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">1000+</div>
              <div className="text-gray-600">Active cleaners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Sparklean?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <DollarSign className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Great Earnings</h3>
              <p className="text-gray-600">
                Earn R300-800 per job with tips. Set your own rates and keep 85% of what you charge.
              </p>
            </Card>

            <Card className="p-6">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Schedule</h3>
              <p className="text-gray-600">
                Work when you want. Choose your hours, days, and service areas. Perfect for part-time or full-time.
              </p>
            </Card>

            <Card className="p-6">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Insurance Covered</h3>
              <p className="text-gray-600">
                All jobs are fully insured. We provide liability coverage and bonding protection.
              </p>
            </Card>

            <Card className="p-6">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Steady Work</h3>
              <p className="text-gray-600">
                Access to thousands of customers. Regular recurring bookings available in your area.
              </p>
            </Card>

            <Card className="p-6">
              <MapPin className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Jobs</h3>
              <p className="text-gray-600">
                Work in your neighborhood. Our smart matching connects you with nearby customers.
              </p>
            </Card>

            <Card className="p-6">
              <Star className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Your Reputation</h3>
              <p className="text-gray-600">
                Earn 5-star ratings and build a loyal customer base. Top cleaners get priority bookings.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How to Get Started
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Apply Online</h3>
                <p className="text-gray-600">
                  Complete our simple application form. Tell us about your cleaning experience and availability.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Background Check</h3>
                <p className="text-gray-600">
                  We'll verify your identity, check references, and ensure you're ready to provide excellent service.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Earning</h3>
                <p className="text-gray-600">
                  Once approved, you can start accepting bookings immediately. Get paid weekly via direct deposit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Cleaning Business?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join hundreds of cleaners already earning great money with Sparklean
          </p>
          <Button 
            size="lg" 
            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            Apply Now - It's Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForCleaners;
