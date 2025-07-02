
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MarketplaceItem } from '@/pages/Marketplace';

interface ReviewModalProps {
  item: MarketplaceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (itemId: string, rating: number, review: string) => void;
  existingReview?: {
    rating: number;
    review: string;
  } | null;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  item,
  isOpen,
  onClose,
  onSubmitReview,
  existingReview
}) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [review, setReview] = useState(existingReview?.review || '');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (item && rating > 0) {
      onSubmitReview(item.id, rating, review);
      onClose();
    }
  };

  const handleClose = () => {
    setRating(existingReview?.rating || 0);
    setReview(existingReview?.review || '');
    setHoveredStar(0);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{existingReview ? 'Edit Review' : 'Write a Review'}</span>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={16} />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Item Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Rating *</Label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="p-1 rounded transition-colors hover:bg-muted"
                  onMouseEnter={() => setHoveredStar(i + 1)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(i + 1)}
                >
                  <Star
                    size={24}
                    className={`${
                      i < (hoveredStar || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-sm font-medium">
              Your Review (Optional)
            </Label>
            <Textarea
              id="review"
              placeholder="Share your experience with this item..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">
              {review.length}/500 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={rating === 0}
              className="flex-1"
            >
              {existingReview ? 'Update Review' : 'Submit Review'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
