
-- Create enum types for better data consistency
CREATE TYPE user_role AS ENUM ('customer', 'cleaner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE service_type AS ENUM ('standard', 'deep', 'move', 'construction');
CREATE TYPE cleaner_status AS ENUM ('available', 'busy', 'offline');

-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cleaner profiles table
CREATE TABLE public.cleaner_profiles (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  bio TEXT,
  experience_years INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  status cleaner_status DEFAULT 'offline',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER NOT NULL,
  service_type service_type NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service extras table
CREATE TABLE public.service_extras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  cleaner_id UUID REFERENCES public.cleaner_profiles(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  status booking_status DEFAULT 'pending',
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  address TEXT NOT NULL,
  special_instructions TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create booking extras junction table
CREATE TABLE public.booking_extras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  extra_id UUID REFERENCES public.service_extras(id) NOT NULL,
  quantity INTEGER DEFAULT 1,
  UNIQUE(booking_id, extra_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  cleaner_id UUID REFERENCES public.cleaner_profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cleaner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for cleaner profiles
CREATE POLICY "Everyone can view cleaner profiles" ON public.cleaner_profiles
  FOR SELECT USING (true);

CREATE POLICY "Cleaners can update their own profile" ON public.cleaner_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Cleaners can insert their own profile" ON public.cleaner_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for services (public read)
CREATE POLICY "Everyone can view services" ON public.services
  FOR SELECT USING (is_active = true);

-- Create RLS policies for service extras (public read)
CREATE POLICY "Everyone can view service extras" ON public.service_extras
  FOR SELECT USING (is_active = true);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = cleaner_id);

CREATE POLICY "Customers can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = customer_id OR auth.uid() = cleaner_id);

-- Create RLS policies for booking extras
CREATE POLICY "Users can view booking extras for their bookings" ON public.booking_extras
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE bookings.id = booking_extras.booking_id 
      AND (bookings.customer_id = auth.uid() OR bookings.cleaner_id = auth.uid())
    )
  );

CREATE POLICY "Customers can insert booking extras" ON public.booking_extras
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE bookings.id = booking_extras.booking_id 
      AND bookings.customer_id = auth.uid()
    )
  );

-- Create RLS policies for reviews
CREATE POLICY "Everyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default services
INSERT INTO public.services (name, description, base_price, duration_hours, service_type) VALUES
  ('Standard Clean', 'Regular maintenance cleaning for your home', 299.00, 3, 'standard'),
  ('Deep Clean', 'Thorough cleaning including baseboards, inside appliances', 599.00, 5, 'deep'),
  ('Move In/Out', 'Complete cleaning for moving situations', 499.00, 4, 'move'),
  ('Post-Construction', 'Specialized cleaning after renovations', 799.00, 6, 'construction');

-- Insert default service extras
INSERT INTO public.service_extras (name, description, price) VALUES
  ('Window Cleaning', 'Interior and exterior window cleaning', 80.00),
  ('Inside Fridge', 'Deep clean inside refrigerator', 50.00),
  ('Inside Oven', 'Deep clean inside oven', 60.00),
  ('Garage', 'Clean garage space', 120.00);
