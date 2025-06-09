
import React from 'react';
import { X, CreditCard, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceItem } from '@/pages/Marketplace';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketplaceItem[];
  onRemoveItem: (itemId: string) => void;
}

export const CartDrawer = ({ isOpen, onClose, items, onRemoveItem }: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    // TODO: Implement Stripe checkout
    console.log('Proceeding to checkout with items:', items);
    alert('Checkout functionality will be implemented with Stripe integration');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-background border-l border-border shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <p className="text-muted-foreground mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add some items from the marketplace to get started
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.type === 'service' ? 'Service' : 'Product'}
                        </Badge>
                        <span className="text-sm font-semibold">
                          ${item.price}
                          {item.type === 'service' && '/hour'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full">
                <CreditCard size={16} className="mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
