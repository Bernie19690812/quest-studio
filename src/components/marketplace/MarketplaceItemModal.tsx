
import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, User, Clock, DollarSign, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MarketplaceItem } from '@/pages/Marketplace';

interface Review {
  id: string;
  rating: number;
  reviewer: string;
  company?: string;
  comment: string;
  date: string;
}

interface MarketplaceItemModalProps {
  item: MarketplaceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  isFavorited: boolean;
}

export const MarketplaceItemModal = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorited
}: MarketplaceItemModalProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!item) return null;

  const showContactUs = item.category === 'solutions' || item.category === 'individuals' || item.category === 'teams';

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      rating: 5,
      reviewer: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      comment: 'Outstanding quality and excellent support. Highly recommended for any team looking to improve their workflow.',
      date: '2024-01-15'
    },
    {
      id: '2',
      rating: 4,
      reviewer: 'Mike Chen',
      company: 'StartupXYZ',
      comment: 'Great value for money. The implementation was smooth and the results exceeded our expectations.',
      date: '2024-01-10'
    },
    {
      id: '3',
      rating: 5,
      reviewer: 'Emily Rodriguez',
      comment: 'Perfect solution for our needs. The team was professional and delivered exactly what we needed.',
      date: '2024-01-08'
    },
    {
      id: '4',
      rating: 4,
      reviewer: 'James Wilson',
      company: 'InnovateLab',
      comment: 'Solid performance and great customer service. Would definitely work with them again.',
      date: '2024-01-05'
    },
    {
      id: '5',
      rating: 5,
      reviewer: 'Lisa Park',
      company: 'FutureTech',
      comment: 'Exceptional work quality and timely delivery. Exceeded all our requirements.',
      date: '2024-01-03'
    },
    {
      id: '6',
      rating: 4,
      reviewer: 'David Thompson',
      comment: 'Very satisfied with the results. Professional team with great communication throughout.',
      date: '2023-12-28'
    }
  ];

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 5);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  const handleContact = () => {
    console.log('Contact action for:', item.name);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">{item.name}</h2>
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
                {item.category === 'individuals' && (
                  <Badge variant="secondary">
                    {item.level || 'Senior'}
                  </Badge>
                )}
                {item.category === 'teams' && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Cross-functional Team
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              {item.category === 'individuals' ? (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto">
                  <User size={24} className="text-white" />
                </div>
              ) : item.category === 'teams' ? (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
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

          {/* Team composition for teams */}
          {item.category === 'teams' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Team Composition</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-50">Scrum Master</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50">Frontend Developers (2)</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-yellow-50">Backend Developers (2)</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-purple-50">DevOps Engineer</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              {item.category === 'individuals' ? 'Skills & Technologies' : 'Technologies & Expertise'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Ratings & Reviews Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Ratings & Reviews</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{item.rating}</span>
                <div className="flex items-center space-x-1">
                  {renderStars(Math.floor(item.rating))}
                </div>
                <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {review.reviewer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{review.reviewer}</span>
                        {review.company && (
                          <span className="text-xs text-muted-foreground">• {review.company}</span>
                        )}
                        <span className="text-xs text-muted-foreground">• {review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {mockReviews.length > 5 && (
                <Button
                  variant="outline"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="w-full flex items-center space-x-2"
                >
                  <span>{showAllReviews ? 'Show Less' : `View All ${mockReviews.length} Reviews`}</span>
                  {showAllReviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Pricing</h3>
            <div className="flex items-center space-x-2">
              <DollarSign size={20} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">
                ${item.price}
                {item.type === 'service' && (
                  <span className="text-base font-normal text-muted-foreground">/hour</span>
                )}
              </span>
            </div>
          </div>

          {/* For individuals, show additional info */}
          {item.category === 'individuals' && (
            <div className="space-y-3">
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
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => onToggleFavorite(item)}
              className={`flex items-center space-x-2 ${
                isFavorited ? 'text-red-500 border-red-500' : ''
              }`}
            >
              <Heart size={16} className={isFavorited ? 'fill-current' : ''} />
              <span>{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
            </Button>
            
            {showContactUs ? (
              <Button
                onClick={handleContact}
                className="flex items-center space-x-2"
              >
                <Mail size={16} />
                <span>Contact Team</span>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                className="flex items-center space-x-2"
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
