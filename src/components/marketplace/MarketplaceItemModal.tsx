import React from 'react';
import { X, Star, ShoppingCart, Heart, User, Clock, DollarSign, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceItem } from '@/pages/Marketplace';
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
  if (!item) return null;
  const showContactUs = item.category === 'solutions' || item.category === 'individuals' || item.category === 'teams';
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} />);
  };
  const handleContact = () => {
    // Handle contact action - could open a contact form or email
    console.log('Contact action for:', item.name);
    onClose();
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
                {item.category === 'individuals' && <Badge variant="secondary">
                    {item.level || 'Senior'}
                  </Badge>}
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
              </div>
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
            
            {showContactUs ? <div className="flex space-x-2">
                
                <Button onClick={handleContact} className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>Contact Now</span>
                </Button>
              </div> : <Button onClick={() => {
            onAddToCart(item);
            onClose();
          }} className="flex items-center space-x-2">
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};