
import React from 'react';
import { 
  Folder, 
  User, 
  ShoppingCart,
  Wrench,
  Lock,
  Unlock,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveSection } from './StudioLayout';

interface LeftSidebarProps {
  activeSection: ActiveSection;
  onSectionClick: (section: ActiveSection) => void;
  isPinned: boolean;
  onTogglePin: () => void;
  isSandbox: boolean;
}

const topSectionItems = [
  {
    id: 'solutions' as const,
    icon: Folder,
    label: 'My Solutions',
  },
];

const toolsSectionItems = [
  {
    id: 'tools' as const,
    icon: Wrench,
    label: 'My Tools',
  },
  {
    id: 'marketplace' as const,
    icon: ShoppingCart,
    label: 'Marketplace',
  },
];

const sandboxItem = {
  id: 'sandbox' as const,
  icon: Zap,
  label: 'Sandbox',
};

const bottomSectionItems = [
  {
    id: 'profile' as const,
    icon: User,
    label: 'Profile',
  },
];

export const LeftSidebar = ({ 
  activeSection, 
  onSectionClick, 
  isPinned, 
  onTogglePin,
  isSandbox 
}: LeftSidebarProps) => {
  return (
    <div className={cn(
      "bg-card border-r border-border flex flex-col transition-all duration-300",
      isPinned ? "w-16" : "w-12"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <div className="w-8 h-8 quest-gradient rounded-lg flex items-center justify-center">
          <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-5 h-5" />
        </div>
      </div>

      {/* Lock Toggle */}
      <div className="px-2 py-2 border-b border-border">
        <button
          onClick={onTogglePin}
          className={cn(
            "w-12 h-8 rounded-md flex items-center justify-center transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
          )}
        >
          {isPinned ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
      </div>

      {/* Top Section - Solutions */}
      <nav className="py-4">
        <ul className="space-y-2">
          {topSectionItems.map((item) => (
            <li key={item.id} className="px-2">
              <div className="relative group">
                <button
                  onClick={() => onSectionClick(item.id)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon size={20} />
                  
                  {activeSection === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-sm" />
                  )}
                </button>

                {isPinned && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sandbox Section */}
      <div className="px-2 border-t border-border pt-4">
        <div className="relative group">
          <button
            onClick={() => onSectionClick('sandbox')}
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 relative",
              "hover:bg-accent hover:text-accent-foreground",
              isSandbox
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <sandboxItem.icon size={20} />
            
            {isSandbox && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-sm" />
            )}
          </button>

          {isPinned && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {sandboxItem.label}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45" />
            </div>
          )}
        </div>
      </div>

      {/* Tools & Marketplace Section */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {toolsSectionItems.map((item) => (
            <li key={item.id} className="px-2">
              <div className="relative group">
                <button
                  onClick={() => onSectionClick(item.id)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon size={20} />
                  
                  {activeSection === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-sm" />
                  )}
                </button>

                {isPinned && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section - Profile */}
      <nav className="pb-4">
        <ul className="space-y-2">
          {bottomSectionItems.map((item) => (
            <li key={item.id} className="px-2">
              <div className="relative group">
                <button
                  onClick={() => onSectionClick(item.id)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon size={20} />
                  
                  {activeSection === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-sm" />
                  )}
                </button>

                {isPinned && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
