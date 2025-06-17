
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  category: string;
}

interface FilterBarProps {
  category: string;
  activeFilters: FilterOption[];
  onFilterToggle: (filter: FilterOption) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({ category, activeFilters, onFilterToggle, onClearFilters }: FilterBarProps) => {
  const getFiltersForCategory = (): FilterOption[] => {
    const baseFilters: FilterOption[] = [
      { id: 'popular', label: 'Popular', category: 'filter' },
      { id: 'trending', label: 'Trending', category: 'filter' },
      { id: 'new', label: 'New', category: 'filter' },
      { id: 'featured', label: 'Featured', category: 'filter' },
      { id: 'high-rated', label: 'High Rated', category: 'filter' },
    ];

    if (category === 'capabilities') {
      return [
        ...baseFilters,
        { id: 'ai', label: 'AI & ML', category: 'filter' },
        { id: 'data', label: 'Data Analytics', category: 'filter' },
        { id: 'automation', label: 'Automation', category: 'filter' },
        { id: 'integration', label: 'Integration', category: 'filter' },
      ];
    }

    if (category === 'solutions') {
      return [
        ...baseFilters,
        { id: 'enterprise', label: 'Enterprise', category: 'filter' },
        { id: 'startup', label: 'Startup', category: 'filter' },
        { id: 'saas', label: 'SaaS', category: 'filter' },
        { id: 'ecommerce', label: 'E-commerce', category: 'filter' },
      ];
    }

    if (category === 'teams') {
      return [
        ...baseFilters,
        { id: 'development', label: 'Development', category: 'filter' },
        { id: 'design', label: 'Design', category: 'filter' },
        { id: 'marketing', label: 'Marketing', category: 'filter' },
        { id: 'consulting', label: 'Consulting', category: 'filter' },
        { id: 'small-team', label: 'Small Team (2-5)', category: 'filter' },
        { id: 'large-team', label: 'Large Team (6+)', category: 'filter' },
      ];
    }

    if (category === 'individuals') {
      return [
        ...baseFilters,
        { id: 'frontend', label: 'Frontend', category: 'filter' },
        { id: 'backend', label: 'Backend', category: 'filter' },
        { id: 'fullstack', label: 'Full-stack', category: 'filter' },
        { id: 'design', label: 'Design', category: 'filter' },
        { id: 'data-science', label: 'Data Science', category: 'filter' },
        { id: 'low-rate', label: '$50-75/hr', category: 'filter' },
        { id: 'mid-rate', label: '$75-100/hr', category: 'filter' },
        { id: 'high-rate', label: '$100+/hr', category: 'filter' },
      ];
    }

    return baseFilters;
  };

  const allFilters = getFiltersForCategory();

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {allFilters.map((filter) => {
          const isActive = activeFilters.some(f => f.id === filter.id);
          return (
            <Button
              key={filter.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterToggle(filter)}
              className="rounded-full"
            >
              {filter.label}
            </Button>
          );
        })}
        
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground rounded-full"
          >
            <X size={14} className="mr-1" />
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};
