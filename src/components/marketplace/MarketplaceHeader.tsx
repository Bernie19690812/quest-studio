
import React from 'react';
import { Search, Filter, ShoppingCart, Heart, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from './FilterBar';

interface MarketplaceHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  cartItemsCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const MarketplaceHeader = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedPriceRange,
  onPriceRangeChange,
  cartItemsCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  showFilters,
  onToggleFilters
}: MarketplaceHeaderProps) => {
  return (
    <>
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
            <span>Studio</span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFavorites}
            className="relative"
          >
            <Heart size={16} />
            {favoritesCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {favoritesCount}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCart}
            className="relative"
          >
            <ShoppingCart size={16} />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search solutions, teams, and talent..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>

        {showFilters && (
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            selectedType={selectedType}
            onTypeChange={onTypeChange}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={onPriceRangeChange}
          />
        )}
      </div>
    </>
  );
};
