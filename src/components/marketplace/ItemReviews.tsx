
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  rating: number;
  review: string;
  author: string;
  date: string;
  verified: boolean;
}

interface ItemReviewsProps {
  itemId: string;
  reviews: Review[];
}

export const ItemReviews: React.FC<ItemReviewsProps> = ({ itemId, reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>No reviews yet. Be the first to review this item!</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center space-x-4 pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="font-medium text-foreground">
            {averageRating.toFixed(1)}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {review.author}
                </span>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {review.date}
              </span>
            </div>
            {review.review && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.review}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <Button
          variant="ghost"
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="w-full flex items-center space-x-2"
        >
          <span>
            {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </span>
          {showAllReviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      )}
    </div>
  );
};
