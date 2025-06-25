
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Booking {
  id: string;
  customer_id: string;
  cleaner_id?: string;
  service_id: string;
  status: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  special_instructions?: string;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  special_instructions?: string;
  total_price: number;
  extras?: string[];
}

export const useBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          services (name, description),
          booking_extras (
            id,
            service_extras (name, price)
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useCreateBooking = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      if (!user) throw new Error('User not authenticated');
      
      // Create the booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: user.id,
          service_id: bookingData.service_id,
          scheduled_date: bookingData.scheduled_date,
          scheduled_time: bookingData.scheduled_time,
          address: bookingData.address,
          special_instructions: bookingData.special_instructions,
          total_price: bookingData.total_price,
        })
        .select()
        .single();
      
      if (bookingError) throw bookingError;
      
      // Add extras if any
      if (bookingData.extras && bookingData.extras.length > 0) {
        const extraInserts = bookingData.extras.map(extraId => ({
          booking_id: booking.id,
          extra_id: extraId,
        }));
        
        const { error: extrasError } = await supabase
          .from('booking_extras')
          .insert(extraInserts);
        
        if (extrasError) throw extrasError;
      }
      
      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
