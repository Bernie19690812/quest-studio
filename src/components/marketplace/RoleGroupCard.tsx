
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RoleGroup {
  id: string;
  name: string;
  description: string;
  count: number;
  icon: string;
  averageRate: number;
}

interface RoleGroupCardProps {
  roleGroup: RoleGroup;
  onSelect: (roleGroup: RoleGroup) => void;
}

export const RoleGroupCard = ({ roleGroup, onSelect }: RoleGroupCardProps) => {
  return (
    <Card 
      className="netflix-card min-w-[280px] max-w-[280px] cursor-pointer group hover:border-primary/40 transition-all"
      onClick={() => onSelect(roleGroup)}
    >
      <div className="p-6 h-full flex flex-col justify-between space-y-4">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto">
            <span className="text-2xl">{roleGroup.icon}</span>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-1">{roleGroup.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{roleGroup.description}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="text-xs">
              {roleGroup.count} available
            </Badge>
            <span className="text-sm text-muted-foreground">
              From ${roleGroup.averageRate}/hr
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center space-x-2"
        >
          <span>View Professionals</span>
          <ArrowRight size={14} />
        </Button>
      </div>
    </Card>
  );
};
