
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  cleaner_profiles: {
    id: string;
  };
  profiles: {
    full_name: string;
  };
}

interface ReviewSystemProps {
  bookingId?: string;
  cleanerId?: string;
  showReviewForm?: boolean;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ 
  bookingId, 
  cleanerId, 
  showReviewForm = false 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cleanerId) {
      fetchReviews();
    }
  }, [cleanerId]);

  const fetchReviews = async () => {
    if (!cleanerId) return;
    
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        cleaner_profiles (id),
        profiles (full_name)
      `)
      .eq('cleaner_id', cleanerId)
      .order('created_at', { ascending: false });

    if (data) {
      setReviews(data);
    }
  };

  const submitReview = async () => {
    if (!user || !bookingId || !cleanerId || rating === 0) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          booking_id: bookingId,
          customer_id: user.id,
          cleaner_id: cleanerId,
          rating,
          comment
        });

      if (error) throw error;

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback.",
      });

      setRating(0);
      setComment('');
      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Error submitting review",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const StarRating: React.FC<{ 
    value: number; 
    onChange?: (rating: number) => void; 
    readonly?: boolean 
  }> = ({ value, onChange, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onChange?.(star)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            disabled={readonly}
          >
            <Star
              className={`w-5 h-5 ${
                star <= value 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Review Form */}
      {showReviewForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
          
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="mt-2">
                <StarRating value={rating} onChange={setRating} />
              </div>
            </div>
            
            <div>
              <Label htmlFor="comment">Comment (Optional)</Label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this cleaner..."
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={4}
              />
            </div>
            
            <Button 
              onClick={submitReview}
              disabled={rating === 0 || loading}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </Card>
      )}

      {/* Reviews Display */}
      {reviews.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Reviews ({reviews.length})
          </h3>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <StarRating value={review.rating} readonly />
                    <span className="font-medium text-gray-900">
                      {review.profiles.full_name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-gray-700">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReviewSystem;
