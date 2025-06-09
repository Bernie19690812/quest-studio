
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
    <Card className="min-w-[280px] max-w-[320px] group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {item.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item);
            }}
          >
            <Heart 
              size={16} 
              className={cn(
                "transition-colors",
                isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )} 
            />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
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
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">
              ${item.price}
            </span>
            {isService && (
              <span className="text-sm text-muted-foreground">/hour</span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Plus size={16} className="mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
