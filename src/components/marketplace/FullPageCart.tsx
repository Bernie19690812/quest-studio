
import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from './MarketplaceCard';
import { MarketplaceItem } from '@/pages/Marketplace';

interface FullPageCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketplaceItem[];
  allItems: MarketplaceItem[];
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  onCheckout: () => void;
  isFavorited: (itemId: string) => boolean;
}

export const FullPageCart = ({
  isOpen,
  onClose,
  items,
  allItems,
  onRemoveItem,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
  onCheckout,
  isFavorited
}: FullPageCartProps) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Get recommended items based on cart contents
  const getRecommendedItems = () => {
    const cartCategories = items.map(item => item.category);
    const cartTags = items.flatMap(item => item.tags);
    const cartItemIds = items.map(item => item.id);

    return allItems
      .filter(item => 
        !cartItemIds.includes(item.id) &&
        (cartCategories.includes(item.category) || 
         item.tags.some(tag => cartTags.includes(tag)))
      )
      .slice(0, 8);
  };

  const recommendedItems = getRecommendedItems();

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Back to Marketplace</span>
            </Button>
            <h1 className="text-xl font-bold text-foreground">My Cart ({items.length})</h1>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Cart Items - Left Side */}
        <div className="flex-1 p-6 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Browse our marketplace to find amazing products and services</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <span className="text-sm font-bold">${item.price}</span>
                        {item.type === 'service' && <span className="text-xs text-muted-foreground">/hr</span>}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recommendations - Right Side */}
        <div className="w-96 border-l border-border p-6 overflow-y-auto">
          <div className="sticky top-0 bg-background pb-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Recommended for You</h2>
          </div>
          
          {recommendedItems.length > 0 && (
            <div className="space-y-4">
              {recommendedItems.map((item) => (
                <div key={item.id} className="scale-90 origin-top">
                  <MarketplaceCard
                    item={item}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    onOpenModal={onOpenModal}
                    isFavorited={isFavorited(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Checkout Footer */}
      {items.length > 0 && (
        <div className="sticky bottom-0 bg-background border-t border-border p-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              Total: ${total.toFixed(2)}
            </div>
            <Button onClick={onCheckout} size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
