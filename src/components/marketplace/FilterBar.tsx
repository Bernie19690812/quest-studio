
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
    // Resource Type Filters
    { id: 'development', label: 'Development', category: 'resource-type' },
    { id: 'design', label: 'Design', category: 'resource-type' },
    { id: 'marketing', label: 'Marketing', category: 'resource-type' },
    { id: 'data-science', label: 'Data Science', category: 'resource-type' },
    { id: 'devops', label: 'DevOps', category: 'resource-type' },
    { id: 'security', label: 'Security', category: 'resource-type' },
    { id: 'product', label: 'Product', category: 'resource-type' },
    { id: 'qa', label: 'QA & Testing', category: 'resource-type' },
    // Role-based filters
    { id: 'frontend', label: 'Frontend', category: 'role' },
    { id: 'backend', label: 'Backend', category: 'role' },
    { id: 'fullstack', label: 'Full-stack', category: 'role' },
    // Rating filters
    { id: 'high-rated', label: '4.5+ Rating', category: 'rating' },
    // Size filters
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

// Define filter sections for better organization
const getFilterSections = (category: string) => {
  const filters = filtersByCategory[category as keyof typeof filtersByCategory] || [];
  
  if (category === 'teams') {
    return [
      {
        title: 'Resource Type',
        filters: filters.filter(f => f.category === 'resource-type')
      },
      {
        title: 'Team Size',
        filters: filters.filter(f => f.category === 'size')
      },
      {
        title: 'Rating',
        filters: filters.filter(f => f.category === 'rating')
      }
    ];
  }
  
  // For other categories, group by category
  const categories = [...new Set(filters.map(f => f.category))];
  return categories.map(cat => ({
    title: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
    filters: filters.filter(f => f.category === cat)
  }));
};

export const FilterBar = ({ category, activeFilters, onFilterToggle, onClearFilters }: FilterBarProps) => {
  const filterSections = getFilterSections(category);

  const isFilterActive = (filter: FilterOption) => {
    return activeFilters.some(f => f.id === filter.id);
  };

  return (
    <div className="space-y-4 mb-6">
      {filterSections.map((section, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">{section.title}</h4>
          <div className="flex flex-wrap gap-2">
            {section.filters.map((filter) => (
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
        </div>
      ))}
      
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {activeFilters.map((filter) => (
              <Badge key={filter.id} variant="secondary" className="text-xs">
                {filter.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-3 w-3 ml-1 hover:bg-destructive/20"
                  onClick={() => onFilterToggle(filter)}
                >
                  <X size={8} />
                </Button>
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 text-xs text-muted-foreground hover:text-foreground ml-auto"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
