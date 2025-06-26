
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { CreditCard, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { user } = useAuth();
  const { data: bookings = [] } = useBookings();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal' | 'ozow' | 'payshap'>('card');
  const navigate = useNavigate();

  const completedBookings = bookings.filter((booking: any) => booking.status === 'completed');
  const pendingPayments = bookings.filter((booking: any) => booking.status === 'confirmed' || booking.status === 'in_progress');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost" 
              className="text-teal-600 hover:text-teal-700 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src="/lovable-uploads/8b7d38d6-4431-439d-abaf-81097dfd8444.png" 
              alt="Sparklean Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">Payment Center</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Payment Methods */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === 'card' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod('card')}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-teal-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                </div>
              </div>
            </div>

            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === 'paypal' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod('paypal')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">PayPal</h3>
                  <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                </div>
              </div>
            </div>

            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === 'ozow' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod('ozow')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">O</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ozow</h3>
                  <p className="text-sm text-gray-600">Instant EFT payments</p>
                </div>
              </div>
            </div>

            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === 'payshap' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod('payshap')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">PayShap</h3>
                  <p className="text-sm text-gray-600">QR code payments</p>
                </div>
              </div>
            </div>
          </div>

          {selectedMethod === 'card' && (
            <div className="space-y-4">
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
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Save Payment Method
              </Button>
            </div>
          )}

          {selectedMethod === 'ozow' && (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">You will be redirected to Ozow to complete your payment securely.</p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Pay with Ozow
              </Button>
            </div>
          )}

          {selectedMethod === 'payshap' && (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Scan the QR code with your PayShap app to complete payment.</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Generate PayShap QR Code
              </Button>
            </div>
          )}
        </Card>

        {/* Pending Payments */}
        {pendingPayments.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Payments</h2>
            <div className="space-y-4">
              {pendingPayments.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.services?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.scheduled_date} • {booking.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R{booking.total_price}</p>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white mt-2">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Payment History */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment History</h2>
          
          {completedBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payment history</h3>
              <p className="text-gray-600">Your completed payments will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{booking.services?.name}</h3>
                      <p className="text-sm text-gray-600">
                        {booking.scheduled_date} • {booking.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R{booking.total_price}</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
