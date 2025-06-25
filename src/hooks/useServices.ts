
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  duration_hours: number;
  service_type: string;
  is_active: boolean;
}

export interface ServiceExtra {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data as Service[];
    },
  });
};

export const useServiceExtras = () => {
  return useQuery({
    queryKey: ['service-extras'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_extras')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data as ServiceExtra[];
    },
  });
};
