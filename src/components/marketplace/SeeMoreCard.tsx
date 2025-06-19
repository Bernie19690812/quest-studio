
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SeeMoreCardProps {
  category: 'solutions' | 'teams' | 'individuals';
  totalCount: number;
}

export const SeeMoreCard = ({ category, totalCount }: SeeMoreCardProps) => {
  const handleSeeMore = () => {
    // This could be implemented to filter by category in the future
    console.log(`See more ${category} items`);
  };

  return (
    <Card className="netflix-card min-w-[280px] max-w-[280px] cursor-pointer group bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all">
      <div onClick={handleSeeMore} className="p-6 h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
          <ArrowRight size={24} className="text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">
            See All {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <p className="text-sm text-muted-foreground">
            Browse {totalCount} more items
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          View All
        </Button>
      </div>
    </Card>
  );
};
