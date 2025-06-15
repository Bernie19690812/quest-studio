
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Wrench, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: 'capabilities' | 'solutions' | 'teams' | 'individuals';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const categoryConfig = {
  capabilities: {
    label: 'Capability',
    icon: Brain,
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  solutions: {
    label: 'Solution',
    icon: Wrench,
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400'
  },
  teams: {
    label: 'Team',
    icon: Users,
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    textColor: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  individuals: {
    label: 'Individual',
    icon: User,
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    textColor: 'text-orange-700 dark:text-orange-300',
    borderColor: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400'
  }
};

const sizeConfig = {
  sm: { text: 'text-xs', icon: 12, padding: 'px-2 py-1' },
  md: { text: 'text-sm', icon: 14, padding: 'px-3 py-1.5' },
  lg: { text: 'text-base', icon: 16, padding: 'px-4 py-2' }
};

export const CategoryBadge = ({ 
  category, 
  size = 'sm', 
  showIcon = true, 
  className 
}: CategoryBadgeProps) => {
  const config = categoryConfig[category];
  const sizeConf = sizeConfig[size];
  const IconComponent = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        config.bgColor,
        config.textColor,
        config.borderColor,
        sizeConf.text,
        sizeConf.padding,
        'font-medium border',
        showIcon && 'flex items-center gap-1.5',
        className
      )}
    >
      {showIcon && (
        <IconComponent 
          size={sizeConf.icon} 
          className={config.iconColor}
        />
      )}
      {config.label}
    </Badge>
  );
};
