
import { useState, useMemo } from 'react';
import { MarketplaceItem } from '@/pages/Marketplace';

export const useMarketplace = (marketplaceItems: MarketplaceItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);

  const filteredItems = useMemo(() => {
    return marketplaceItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesType = selectedType === 'all' || item.type === selectedType;
      
      let matchesPrice = true;
      if (selectedPriceRange !== 'all') {
        const price = item.price;
        switch (selectedPriceRange) {
          case '0-50':
            matchesPrice = price <= 50;
            break;
          case '51-200':
            matchesPrice = price > 50 && price <= 200;
            break;
          case '201-500':
            matchesPrice = price > 200 && price <= 500;
            break;
          case '500+':
            matchesPrice = price > 500;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    });
  }, [marketplaceItems, searchTerm, selectedCategory, selectedType, selectedPriceRange]);

  const addToCart = (item: MarketplaceItem) => {
    setCartItems(prev => {
      const exists = prev.find(cartItem => cartItem.id === item.id);
      if (exists) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const toggleFavorite = (item: MarketplaceItem) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id);
      if (exists) {
        return prev.filter(fav => fav.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    selectedPriceRange,
    setSelectedPriceRange,
    showFilters,
    setShowFilters,
    cartItems,
    favorites,
    filteredItems,
    addToCart,
    removeFromCart,
    toggleFavorite,
    clearCart
  };
};
