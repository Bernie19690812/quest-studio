
import React from 'react';
import { X, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceItem } from '@/pages/Marketplace';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketplaceItem[];
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
}

export const FavoritesDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onAddToCart, 
  onToggleFavorite 
}: FavoritesDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-background border-l border-border shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Favorites</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <Heart size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No favorites yet</p>
            <p className="text-sm text-muted-foreground">
              Click the heart icon on items to add them to your favorites
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleFavorite(item)}
                      className="h-6 w-6"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.type === 'service' ? 'Service' : 'Product'}
                      </Badge>
                      <span className="text-sm font-semibold">
                        ${item.price}
                        {item.type === 'service' && '/hour'}
                      </span>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAddToCart(item)}
                    >
                      <Plus size={12} className="mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
