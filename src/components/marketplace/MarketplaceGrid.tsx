
import React from 'react';
import { MarketplaceCard } from './MarketplaceCard';
import { CategorySection } from './CategorySection';
import { SeeMoreCard } from './SeeMoreCard';
import { MarketplaceItem } from '@/pages/Marketplace';

interface MarketplaceGridProps {
  filteredItems: MarketplaceItem[];
  searchTerm: string;
  selectedCategory: string;
  cartItems: MarketplaceItem[];
  favorites: MarketplaceItem[];
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  onSeeMore: (category: string) => void;
}

export const MarketplaceGrid = ({
  filteredItems,
  searchTerm,
  selectedCategory,
  cartItems,
  favorites,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
  onSeeMore
}: MarketplaceGridProps) => {
  if (searchTerm || selectedCategory !== 'all') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <MarketplaceCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            onOpenModal={onOpenModal}
            isFavorited={favorites.some(fav => fav.id === item.id)}
          />
        ))}
      </div>
    );
  }

  const categories = [
    { id: 'solutions', title: 'AI Solutions', items: filteredItems.filter(item => item.category === 'solutions') },
    { id: 'teams', title: 'Development Teams', items: filteredItems.filter(item => item.category === 'teams') },
    { id: 'individuals', title: 'Individual Experts', items: filteredItems.filter(item => item.category === 'individuals') },
  ];

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.id}>
          <h2 className="text-xl font-semibold mb-6">{category.title}</h2>
          <CategorySection
            items={category.items}
            category={category.id}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            onOpenModal={onOpenModal}
            onSeeMore={onSeeMore}
            isFavorited={(itemId: string) => favorites.some(fav => fav.id === itemId)}
          />
        </div>
      ))}
    </div>
  );
};
