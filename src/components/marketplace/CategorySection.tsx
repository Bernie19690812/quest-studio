
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from './MarketplaceCard';
import { SeeMoreCard } from './SeeMoreCard';
import { CategoryBadge } from './CategoryBadge';
import { MarketplaceItem } from '@/pages/Marketplace';

interface CategorySectionProps {
  items: MarketplaceItem[];
  category: string;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  onSeeMore: (category: string) => void;
  isFavorited: (itemId: string) => boolean;
  maxItems?: number;
}

export const CategorySection = ({
  items,
  category,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
  onSeeMore,
  isFavorited,
  maxItems = 10,
}: CategorySectionProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No items available in this category
      </div>
    );
  }

  const displayItems = items.slice(0, maxItems);
  const hasMoreItems = items.length > maxItems;

  return (
    <div className="w-full overflow-hidden">
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4 px-1">
          {displayItems.map((item) => (
            <div key={item.id} className="relative">
              <MarketplaceCard
                item={item}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                onOpenModal={onOpenModal}
                isFavorited={isFavorited(item.id)}
              />
              {/* Category Badge Overlay */}
              <div className="absolute top-3 left-3 z-10">
                <CategoryBadge 
                  category={item.category} 
                  size="sm"
                  className="shadow-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                />
              </div>
            </div>
          ))}
          
          {hasMoreItems && (
            <SeeMoreCard 
              category={category}
              onSeeMore={() => onSeeMore(category)}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
