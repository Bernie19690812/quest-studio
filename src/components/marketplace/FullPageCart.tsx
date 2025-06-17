
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
      .slice(0, 12);
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

      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        {/* Cart Items */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Browse our marketplace to find amazing products and services</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-10 h-10" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                        <p className="text-muted-foreground mt-1">{item.description}</p>
                        <div className="flex items-center space-x-3 mt-3">
                          <Badge variant="outline">{item.category}</Badge>
                          <span className="text-lg font-bold">${item.price}</span>
                          {item.type === 'service' && <span className="text-sm text-muted-foreground">/hr</span>}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Cart Summary */}
              <Card className="p-6 bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
                    <p className="text-muted-foreground">{items.length} items</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      ${total.toFixed(2)}
                    </div>
                    <Button onClick={onCheckout} size="lg" className="mt-2">
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recommended Items - Horizontal Section */}
              {recommendedItems.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Recommended for You</h2>
                  <ScrollArea className="w-full">
                    <div className="flex space-x-4 pb-4">
                      {recommendedItems.map((item) => (
                        <div key={item.id} className="min-w-[280px]">
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
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
