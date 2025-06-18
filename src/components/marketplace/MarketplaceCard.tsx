
import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Plus, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RequestAccessModal } from './RequestAccessModal';
import { MarketplaceItem } from '@/pages/Marketplace';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  isFavorited: boolean;
}

export const MarketplaceCard = ({ 
  item, 
  onAddToCart, 
  onToggleFavorite, 
  onOpenModal,
  isFavorited 
}: MarketplaceCardProps) => {
  const [isRequestAccessOpen, setIsRequestAccessOpen] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  const showRequestAccess = item.category === 'solutions' || item.category === 'individuals' || item.category === 'teams';

  // Enhanced team names for team category
  const getTeamDisplayName = () => {
    if (item.category === 'teams') {
      const teamNames = ['W4D Squad', 'BuildForce', 'SprintCore', 'DevForce', 'CodeCraft'];
      return teamNames[Math.floor(Math.random() * teamNames.length)];
    }
    return item.name;
  };

  const displayName = item.category === 'teams' ? getTeamDisplayName() : item.name;

  // Visual differentiation based on category
  const getCardClassName = () => {
    let baseClass = "netflix-card min-w-[280px] max-w-[280px] cursor-pointer group";
    
    if (item.category === 'solutions') {
      return `${baseClass} border-l-4 border-l-blue-500`;
    } else if (item.category === 'teams') {
      return `${baseClass} border-l-4 border-l-purple-500`;
    }
    
    return baseClass;
  };

  return (
    <>
      <Card className={getCardClassName()}>
        <div onClick={() => onOpenModal(item)} className="p-0">
          {/* Image Area */}
          <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
            {item.featured && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            <div className="text-center space-y-2">
              {item.category === 'individuals' ? (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
              ) : item.category === 'teams' ? (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <div className="text-white font-bold text-lg">
                    {displayName.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
                </div>
              )}
            </div>
            
            {/* Overlay with actions on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/90 text-black hover:bg-white"
              >
                View Details
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-tight">
                {displayName}
              </h3>
              {item.category === 'individuals' && (
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-primary">Frontend Developer</p>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {item.level || 'Senior'}
                  </Badge>
                </div>
              )}
              {item.category === 'teams' && (
                <div className="mt-1">
                  <p className="text-xs text-purple-600">Cross-functional Squad</p>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-2 py-0">
                  +{item.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {renderStars(Math.floor(item.rating))}
              <span className="text-xs text-muted-foreground ml-1">
                {item.rating} ({item.reviewCount})
              </span>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold text-foreground">
                  ${item.price}
                </span>
                {item.type === 'service' && (
                  <span className="text-xs text-muted-foreground">/hr</span>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item);
                  }}
                  className={`h-8 w-8 rounded-full ${isFavorited ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  <Heart size={14} className={isFavorited ? 'fill-current' : ''} />
                </Button>
                
                {showRequestAccess ? (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsRequestAccessOpen(true);
                    }}
                    className="h-8 w-8 rounded-full border-border hover:bg-accent"
                  >
                    <UserCheck size={14} />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="h-8 w-8 rounded-full border-border hover:bg-accent"
                  >
                    <Plus size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <RequestAccessModal
        isOpen={isRequestAccessOpen}
        onClose={() => setIsRequestAccessOpen(false)}
        itemName={displayName}
        itemType={item.category as 'solution' | 'team' | 'individual'}
      />
    </>
  );
};
