
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Calendar, Star, MapPin, Shield, Users } from 'lucide-react';

const ForCleaners = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Flexible Earnings",
      description: "Earn R150-300+ per hour based on your skills and service quality. Set your own rates and availability."
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Choose Your Schedule",
      description: "Work when you want. Accept jobs that fit your schedule and lifestyle. No minimum hours required."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Build Your Reputation",
      description: "Receive ratings and reviews from customers. Top-rated cleaners get priority access to premium jobs."
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Find Jobs Nearby",
      description: "Get matched with customers in your area. Integrated GPS navigation to job locations."
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Secure & Insured",
      description: "All payments are processed securely. Liability insurance coverage provided for verified cleaners."
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Growing Customer Base",
      description: "Access to thousands of customers looking for reliable cleaning services across South Africa."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Apply & Get Verified",
      description: "Complete your profile with experience, skills, and background check. Our team reviews applications within 24 hours."
    },
    {
      step: "2",
      title: "Set Your Availability",
      description: "Choose your working hours, service areas, and types of cleaning you want to offer."
    },
    {
      step: "3",
      title: "Accept Jobs",
      description: "Receive job notifications, review details, and accept bookings that work for your schedule."
    },
    {
      step: "4",
      title: "Complete & Get Paid",
      description: "Provide excellent service, get rated by customers, and receive payment within 24 hours."
    }
  ];

  const requirements = [
    "Must be 18+ years old",
    "Own transportation to job sites",
    "Basic cleaning supplies (we can provide starter kit)",
    "Smartphone with GPS capability",
    "Valid South African ID",
    "Clean criminal background check",
    "Professional references (2 minimum)",
    "Basic English communication skills"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
            alt="Sparklean Logo" 
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold text-gray-900">Sparklean</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-teal-600">Back to Home</a>
          <Button onClick={() => navigate('/auth')} className="bg-teal-600 hover:bg-teal-700 text-white">
            Apply Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Earn Money as a
          <span className="text-teal-600 block">Professional Cleaner</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join South Africa's leading on-demand cleaning platform. Connect with customers, 
          set your own schedule, and build a thriving cleaning business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg"
            onClick={() => navigate('/auth')}
          >
            Start Your Application
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg"
          >
            Download App
          </Button>
        </div>

        {/* Earnings Highlight */}
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Average Cleaner Earnings</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">R200</p>
              <p className="text-gray-600">Per Hour</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">R1,600</p>
              <p className="text-gray-600">Per Day</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">R8,000</p>
              <p className="text-gray-600">Per Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sparklean?</h2>
            <p className="text-gray-600">Join thousands of cleaners earning more with flexible work</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Get started in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Requirements</h2>
            <p className="text-gray-600">Make sure you meet these basic requirements before applying</p>
          </div>
          
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of professional cleaners and start building your business today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => navigate('/auth')}
            >
              Apply Now - It's Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForCleaners;
