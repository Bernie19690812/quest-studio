import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, User, Clock, DollarSign, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceItem } from '@/pages/Marketplace';
import { RatingsReviews } from './RatingsReviews';
import { ContactModal } from './ContactModal';

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
  const [contactModalOpen, setContactModalOpen] = useState(false);

  if (!item) return null;

  const showContactUs = item.category === 'solutions' || item.category === 'individuals' || item.category === 'teams';

  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} />);
  };

  const handleContact = () => {
    setContactModalOpen(true);
  };

  const getPricingDisplay = () => {
    if (item.category === 'capabilities') {
      return {
        price: '$0.05',
        unit: 'per API call',
        description: 'Pay as you use'
      };
    } else if (item.category === 'solutions') {
      return {
        price: 'Custom pricing',
        unit: '',
        description: 'Contact us for a quote'
      };
    } else if (item.category === 'individuals') {
      return {
        price: '$85',
        unit: 'per hour',
        description: 'Flexible hourly rates'
      };
    } else if (item.category === 'teams') {
      return {
        price: '$2,500',
        unit: 'per project',
        description: 'Starting price for projects'
      };
    }
    return { price: 'Contact for pricing', unit: '', description: '' };
  };

  const pricing = getPricingDisplay();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Header with title and basic info */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">{item.name}</h2>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.floor(item.rating || 4.5))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {item.rating || 4.5} ({item.reviewCount || 1250} reviews)
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
                  {item.category === 'teams' && item.roleComposition && (
                    <Badge variant="secondary" className="text-xs">
                      {item.roleComposition}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* 1. Product/Service Image */}
            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
                </div>
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
            </div>

            {/* 2. Pricing Section */}
            <div className="space-y-3 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <DollarSign size={20} />
                <span>Pricing</span>
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">{pricing.price}</span>
                {pricing.unit && <span className="text-muted-foreground">{pricing.unit}</span>}
              </div>
              {pricing.description && (
                <p className="text-sm text-muted-foreground">{pricing.description}</p>
              )}
            </div>

            {/* 3. Description */}
            <div className="space-y-3 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Description</h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="leading-relaxed whitespace-pre-line">{item.description}</p>
              </div>
            </div>

            {/* 4. Skills & Technologies */}
            {item.tags && (
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-foreground">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Ratings & Reviews */}
            <div className="border-b border-border pb-4">
              <RatingsReviews item={item} />
            </div>

            {/* 6. Call-to-Action Buttons - Sticky Bottom */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border pt-4 mt-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => onToggleFavorite(item)} 
                  className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 ${
                    isFavorited ? 'text-red-500 border-red-500' : ''
                  }`}
                >
                  <Heart size={16} className={isFavorited ? 'fill-current' : ''} />
                  <span className="hidden sm:inline">
                    {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                  </span>
                  <span className="sm:hidden">{isFavorited ? 'Remove' : 'Favorite'}</span>
                </Button>
                
                {showContactUs ? (
                  <Button 
                    onClick={handleContact} 
                    className="flex-1 flex items-center justify-center space-x-2 bg-purple-700 hover:bg-purple-600"
                  >
                    <Mail size={16} />
                    <span>
                      {item.category === 'individuals' ? 'Send Message' : 'Request Access'}
                    </span>
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      onAddToCart(item);
                      onClose();
                    }} 
                    className="flex-1 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        itemName={item.name}
        itemType={item.category as 'team' | 'individual' | 'solution'}
      />
    </>
  );
};
