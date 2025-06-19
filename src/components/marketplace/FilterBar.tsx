
import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
}

export const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedPriceRange,
  onPriceRangeChange,
}: FilterBarProps) => {
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'teams', label: 'Teams' },
    { id: 'individuals', label: 'Individuals' },
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'product', label: 'Products' },
    { id: 'service', label: 'Services' },
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: '0-50', label: '$0 - $50' },
    { id: '51-200', label: '$51 - $200' },
    { id: '201-500', label: '$201 - $500' },
    { id: '500+', label: '$500+' },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Type</label>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => onTypeChange(type.id)}
              className="rounded-full"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Price Range</label>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <Button
              key={range.id}
              variant={selectedPriceRange === range.id ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange(range.id)}
              className="rounded-full"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
