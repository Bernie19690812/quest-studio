
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from './MarketplaceCard';
import { MarketplaceItem } from '@/pages/Marketplace';

interface CategorySectionProps {
  title: string;
  items: MarketplaceItem[];
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  favorites: MarketplaceItem[];
  renderSeeMore: () => React.ReactElement;
}

export const CategorySection = ({
  title,
  items,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
  favorites,
  renderSeeMore,
}: CategorySectionProps) => {
  const maxItems = 10;
  const displayItems = items.slice(0, maxItems);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      
      <div className="w-full overflow-hidden">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4 px-1">
            {displayItems.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                onOpenModal={onOpenModal}
                isFavorited={favorites.some(fav => fav.id === item.id)}
              />
            ))}
            
            {items.length > maxItems && renderSeeMore()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
