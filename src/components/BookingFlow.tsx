
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    address: '',
    date: '',
    time: '',
    frequency: 'once',
    specialInstructions: ''
  });

  const steps = [
    { id: 1, title: 'Location', icon: MapPin },
    { id: 2, title: 'Schedule', icon: Calendar },
    { id: 3, title: 'Payment', icon: CreditCard }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const frequencies = [
    { id: 'once', label: 'One-time', discount: 0 },
    { id: 'weekly', label: 'Weekly', discount: 10 },
    { id: 'biweekly', label: 'Bi-weekly', discount: 5 },
    { id: 'monthly', label: 'Monthly', discount: 15 }
  ];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
              currentStep >= step.id 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <span className={`ml-2 font-medium ${
              currentStep >= step.id ? 'text-teal-600' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-4 ${
                currentStep > step.id ? 'bg-teal-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <Card className="p-8">
        {/* Step 1: Location */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Where should we clean?</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street, Johannesburg, 2001"
                  value={bookingData.address}
                  onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <textarea
                  id="instructions"
                  placeholder="Gate code, parking instructions, specific areas to focus on..."
                  value={bookingData.specialInstructions}
                  onChange={(e) => setBookingData({...bookingData, specialInstructions: e.target.value})}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Schedule */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When works best for you?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <Label>Preferred Time</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={bookingData.time === time ? 'default' : 'outline'}
                      onClick={() => setBookingData({...bookingData, time})}
                      className={bookingData.time === time ? 'bg-teal-600 hover:bg-teal-700' : ''}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Frequency</Label>
              <div className="grid md:grid-cols-4 gap-4 mt-2">
                {frequencies.map((freq) => (
                  <Card
                    key={freq.id}
                    className={`p-4 cursor-pointer transition-all ${
                      bookingData.frequency === freq.id 
                        ? 'ring-2 ring-teal-500 bg-teal-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setBookingData({...bookingData, frequency: freq.id})}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{freq.label}</div>
                      {freq.discount > 0 && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {freq.discount}%
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
            
            <div className="bg-teal-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Standard Clean</span>
                  <span>R299</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>R29</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R328</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <strong>💳 Secure Payment:</strong> Your payment information is encrypted and secure. 
              You'll only be charged after your cleaning is completed to your satisfaction.
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={currentStep === 3 ? () => console.log('Booking confirmed!') : nextStep}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {currentStep === 3 ? 'Confirm Booking' : 'Next Step'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingFlow;
