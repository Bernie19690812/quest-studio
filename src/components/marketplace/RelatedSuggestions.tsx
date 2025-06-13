
import React from 'react';
import { Button } from '@/components/ui/button';
import { MarketplaceCard } from './MarketplaceCard';
import { MarketplaceItem } from '@/pages/Marketplace';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RelatedSuggestionsProps {
  cartItems: MarketplaceItem[];
  allItems: MarketplaceItem[];
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  isFavorited: (itemId: string) => boolean;
}

export const RelatedSuggestions = ({
  cartItems,
  allItems,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
  isFavorited,
}: RelatedSuggestionsProps) => {
  const getSuggestedItems = (): MarketplaceItem[] => {
    if (cartItems.length === 0) return [];

    const cartCategories = cartItems.map(item => item.category);
    const cartTags = cartItems.flatMap(item => item.tags);
    const cartItemIds = cartItems.map(item => item.id);

    // Logic for smart suggestions
    let suggestions: MarketplaceItem[] = [];

    // If cart has frontend and backend devs, suggest scrum master or QA
    const hasFrontend = cartItems.some(item => 
      item.tags.some(tag => tag.toLowerCase().includes('frontend') || tag.toLowerCase().includes('react'))
    );
    const hasBackend = cartItems.some(item => 
      item.tags.some(tag => tag.toLowerCase().includes('backend') || tag.toLowerCase().includes('node'))
    );

    if (hasFrontend && hasBackend) {
      suggestions.push(
        ...allItems.filter(item => 
          !cartItemIds.includes(item.id) &&
          (item.tags.some(tag => tag.toLowerCase().includes('scrum')) ||
           item.tags.some(tag => tag.toLowerCase().includes('qa')) ||
           item.tags.some(tag => tag.toLowerCase().includes('testing')))
        ).slice(0, 2)
      );
    }

    // Add items from same categories
    suggestions.push(
      ...allItems.filter(item => 
        !cartItemIds.includes(item.id) &&
        !suggestions.some(s => s.id === item.id) &&
        cartCategories.includes(item.category)
      ).slice(0, 3)
    );

    // Add items with similar tags
    suggestions.push(
      ...allItems.filter(item => 
        !cartItemIds.includes(item.id) &&
        !suggestions.some(s => s.id === item.id) &&
        item.tags.some(tag => cartTags.includes(tag))
      ).slice(0, 3)
    );

    return suggestions.slice(0, 6);
  };

  const suggestedItems = getSuggestedItems();

  if (suggestedItems.length === 0) return null;

  const handleAddAll = () => {
    suggestedItems.forEach(item => onAddToCart(item));
  };

  return (
    <div className="border-t border-border pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">You may also like</h3>
        <Button variant="outline" size="sm" onClick={handleAddAll}>
          Add All to Cart
        </Button>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          {suggestedItems.map((item) => (
            <div key={item.id} className="min-w-[240px]">
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
  );
};
