
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { bookingId, latitude, longitude, status } = await req.json()

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: 'Booking ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Update booking with location and status
    const { data, error } = await supabaseClient
      .from('bookings')
      .update({
        cleaner_location_lat: latitude,
        cleaner_location_lng: longitude,
        status: status || 'in_progress',
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to update tracking info' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Broadcast the update to all subscribers
    const channel = supabaseClient.channel(`booking_${bookingId}`)
    await channel.send({
      type: 'broadcast',
      event: 'location_update',
      payload: {
        bookingId,
        latitude,
        longitude,
        status,
        timestamp: new Date().toISOString()
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Location updated successfully',
        data: data?.[0]
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
