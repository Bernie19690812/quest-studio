
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
      { id: 'popular', label: 'Popular', category: 'popularity' },
      { id: 'trending', label: 'Trending', category: 'popularity' },
      { id: 'new', label: 'New', category: 'popularity' },
      { id: 'featured', label: 'Featured', category: 'popularity' },
      { id: 'high-rated', label: 'High Rated', category: 'rating' },
    ];

    if (category === 'capabilities') {
      return [
        ...baseFilters,
        { id: 'ai', label: 'AI & ML', category: 'type' },
        { id: 'data', label: 'Data Analytics', category: 'type' },
        { id: 'automation', label: 'Automation', category: 'type' },
        { id: 'integration', label: 'Integration', category: 'type' },
      ];
    }

    if (category === 'solutions') {
      return [
        ...baseFilters,
        { id: 'enterprise', label: 'Enterprise', category: 'type' },
        { id: 'startup', label: 'Startup', category: 'type' },
        { id: 'saas', label: 'SaaS', category: 'type' },
        { id: 'ecommerce', label: 'E-commerce', category: 'type' },
      ];
    }

    if (category === 'teams') {
      return [
        ...baseFilters,
        { id: 'development', label: 'Development', category: 'skill' },
        { id: 'design', label: 'Design', category: 'skill' },
        { id: 'marketing', label: 'Marketing', category: 'skill' },
        { id: 'consulting', label: 'Consulting', category: 'skill' },
        { id: 'small-team', label: 'Small Team (2-5)', category: 'size' },
        { id: 'large-team', label: 'Large Team (6+)', category: 'size' },
      ];
    }

    if (category === 'individuals') {
      return [
        ...baseFilters,
        { id: 'frontend', label: 'Frontend', category: 'role' },
        { id: 'backend', label: 'Backend', category: 'role' },
        { id: 'fullstack', label: 'Full-stack', category: 'role' },
        { id: 'design', label: 'Design', category: 'role' },
        { id: 'data-science', label: 'Data Science', category: 'role' },
        { id: 'low-rate', label: '$50-75/hr', category: 'rate' },
        { id: 'mid-rate', label: '$75-100/hr', category: 'rate' },
        { id: 'high-rate', label: '$100+/hr', category: 'rate' },
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
