
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from './MarketplaceCard';
import { MarketplaceItem } from '@/pages/Marketplace';

interface CategorySectionProps {
  items: MarketplaceItem[];
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  isFavorited: (itemId: string) => boolean;
}

export const CategorySection = ({
  items,
  onAddToCart,
  onToggleFavorite,
  isFavorited,
}: CategorySectionProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No items available in this category
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {items.map((item) => (
          <MarketplaceCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorited={isFavorited(item.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
