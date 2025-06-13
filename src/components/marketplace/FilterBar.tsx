
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

const filtersByCategory = {
  capabilities: [
    { id: 'ai-model', label: 'AI Model', category: 'type' },
    { id: 'api', label: 'API', category: 'type' },
    { id: 'analytics', label: 'Analytics', category: 'type' },
    { id: 'popular', label: 'Popular', category: 'popularity' },
    { id: 'trending', label: 'Trending', category: 'popularity' },
    { id: 'new', label: 'New', category: 'popularity' },
  ],
  solutions: [
    { id: 'e-commerce', label: 'E-commerce', category: 'category' },
    { id: 'crm', label: 'CRM', category: 'category' },
    { id: 'analytics', label: 'Analytics', category: 'category' },
    { id: 'popular', label: 'Popular', category: 'popularity' },
    { id: 'featured', label: 'Featured', category: 'popularity' },
  ],
  teams: [
    { id: 'frontend', label: 'Frontend', category: 'role' },
    { id: 'backend', label: 'Backend', category: 'role' },
    { id: 'fullstack', label: 'Full-stack', category: 'role' },
    { id: 'high-rated', label: '4.5+ Rating', category: 'rating' },
    { id: 'large-team', label: 'Large Team', category: 'size' },
    { id: 'small-team', label: 'Small Team', category: 'size' },
  ],
  individuals: [
    { id: 'frontend-dev', label: 'Frontend Dev', category: 'role' },
    { id: 'backend-dev', label: 'Backend Dev', category: 'role' },
    { id: 'designer', label: 'Designer', category: 'role' },
    { id: 'low-rate', label: '$50-75/hr', category: 'rate' },
    { id: 'mid-rate', label: '$75-100/hr', category: 'rate' },
    { id: 'high-rate', label: '$100+/hr', category: 'rate' },
    { id: 'react', label: 'React', category: 'skill' },
    { id: 'python', label: 'Python', category: 'skill' },
    { id: 'high-rated', label: '4.5+ Rating', category: 'rating' },
  ],
};

export const FilterBar = ({ category, activeFilters, onFilterToggle, onClearFilters }: FilterBarProps) => {
  const availableFilters = filtersByCategory[category as keyof typeof filtersByCategory] || [];

  const isFilterActive = (filter: FilterOption) => {
    return activeFilters.some(f => f.id === filter.id);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {availableFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={isFilterActive(filter) ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterToggle(filter)}
            className="h-8 rounded-full border-border hover:bg-accent"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-8 text-muted-foreground hover:text-foreground"
        >
          <X size={14} className="mr-1" />
          Clear all
        </Button>
      )}
    </div>
  );
};
