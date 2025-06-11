
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from './MarketplaceCard';
import { MarketplaceItem } from '@/pages/Marketplace';

interface CategorySectionProps {
  items: MarketplaceItem[];
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  isFavorited: (itemId: string) => boolean;
}

export const CategorySection = ({
  items,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
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
    <div className="w-full overflow-hidden">
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4 px-1">
          {items.map((item) => (
            <MarketplaceCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              onOpenModal={onOpenModal}
              isFavorited={isFavorited(item.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
