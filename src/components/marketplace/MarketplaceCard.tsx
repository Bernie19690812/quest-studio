
import React from 'react';
import { Star, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MarketplaceItem } from '@/pages/Marketplace';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  isFavorited: boolean;
}

export const MarketplaceCard = ({ 
  item, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorited 
}: MarketplaceCardProps) => {
  const isService = item.type === 'service';
  
  return (
    <Card className="min-w-[320px] max-w-[320px] netflix-card group cursor-pointer">
      {/* Image/Preview Area */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {item.category === 'capabilities' && '🔧'}
            {item.category === 'solutions' && '🧩'}
            {item.category === 'teams' && '👥'}
            {item.category === 'individuals' && '🧑‍💼'}
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus size={16} className="mr-1" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item);
              }}
              className="border-white/50 text-white hover:bg-white/10"
            >
              <Heart 
                size={16} 
                className={cn(
                  "transition-colors",
                  isFavorited ? "fill-red-500 text-red-500" : ""
                )} 
              />
            </Button>
          </div>
        </div>

        {/* Featured Badge */}
        {item.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1 text-foreground">{item.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1 text-muted-foreground">
              {item.description}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{item.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({item.reviewCount})
            </span>
          </div>
          <Badge 
            variant={isService ? "secondary" : "default"}
            className="text-xs"
          >
            {isService ? "Service" : "Product"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-border">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-border">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">
              ${item.price}
            </span>
            {isService && (
              <span className="text-sm text-muted-foreground">/hour</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
