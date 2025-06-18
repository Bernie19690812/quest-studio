
import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, User, Clock, DollarSign, UserCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RequestAccessModal } from './RequestAccessModal';
import { MarketplaceItem } from '@/pages/Marketplace';

interface MarketplaceItemModalProps {
  item: MarketplaceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  isFavorited: boolean;
}

interface Review {
  id: string;
  rating: number;
  reviewer: string;
  company?: string;
  comment: string;
  date: string;
}

const dummyReviews: Review[] = [
  {
    id: '1',
    rating: 5,
    reviewer: 'Sarah Chen',
    company: 'TechCorp',
    comment: 'Exceptional work quality and great communication throughout the project.',
    date: '2024-01-15'
  },
  {
    id: '2',
    rating: 4,
    reviewer: 'Mike Johnson',
    company: 'StartupXYZ',
    comment: 'Very professional and delivered on time. Would definitely work with again.',
    date: '2024-01-10'
  },
  {
    id: '3',
    rating: 5,
    reviewer: 'Emily Rodriguez',
    comment: 'Outstanding results and innovative solutions. Highly recommended!',
    date: '2024-01-05'
  }
];

const skillsMatrix = [
  { skill: 'React', level: 95 },
  { skill: 'TypeScript', level: 90 },
  { skill: 'Node.js', level: 85 },
  { skill: 'Python', level: 80 },
  { skill: 'AWS', level: 75 },
  { skill: 'UI/UX Design', level: 70 }
];

export const MarketplaceItemModal = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorited
}: MarketplaceItemModalProps) => {
  const [isRequestAccessOpen, setIsRequestAccessOpen] = useState(false);

  if (!item) return null;

  const showRequestAccess = item.category === 'solutions' || item.category === 'individuals' || item.category === 'teams';

  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} />);
  };

  const handleRequestAccess = () => {
    setIsRequestAccessOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-2xl font-bold text-foreground mb-2">{item.name}</DialogTitle>
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.floor(item.rating))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {item.rating} ({item.reviewCount} reviews)
                    </span>
                  </div>
                  <Badge variant="outline">
                    {item.type === 'service' ? 'Service' : 'Product'}
                  </Badge>
                  {item.category === 'individuals' && <Badge variant="secondary">
                      {item.level || 'Senior'}
                    </Badge>}
                </div>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                {item.category === 'individuals' ? (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
                    <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
                  </div>
                )}
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>)}
              </div>
            </div>

            {/* Skills Matrix for individuals */}
            {item.category === 'individuals' && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Skills Matrix</h3>
                <div className="space-y-3">
                  {skillsMatrix.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings & Reviews */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Ratings & Reviews</h3>
              <div className="space-y-4">
                {dummyReviews.map((review) => (
                  <div key={review.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{review.reviewer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{review.reviewer}</p>
                            {review.company && <p className="text-xs text-muted-foreground">{review.company}</p>}
                          </div>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Pricing</h3>
              <div className="flex items-center space-x-2">
                <DollarSign size={20} className="text-primary" />
                <span className="text-2xl font-bold text-foreground">
                  ${item.price}
                  {item.type === 'service' && <span className="text-base font-normal text-muted-foreground">/hour</span>}
                </span>
              </div>
            </div>

            {/* For individuals, show additional info */}
            {item.category === 'individuals' && <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Professional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Experience: 5+ years</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Available: Full-time</span>
                  </div>
                </div>
              </div>}

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={() => onToggleFavorite(item)} className={`flex items-center space-x-2 ${isFavorited ? 'text-red-500 border-red-500' : ''}`}>
                <Heart size={16} className={isFavorited ? 'fill-current' : ''} />
                <span>{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </Button>
              
              {showRequestAccess ? <Button onClick={handleRequestAccess} className="flex items-center space-x-2">
                  <UserCheck size={16} />
                  <span>Request Access</span>
                </Button> : <Button onClick={() => {
              onAddToCart(item);
              onClose();
            }} className="flex items-center space-x-2">
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </Button>}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RequestAccessModal
        isOpen={isRequestAccessOpen}
        onClose={() => setIsRequestAccessOpen(false)}
        itemName={item.name}
        itemType={item.category as 'solution' | 'team' | 'individual'}
      />
    </>
  );
};
