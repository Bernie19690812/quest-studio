
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  MessageSquare,
  LayoutPanelLeft,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveSection } from './StudioLayout';

interface LeftSidebarProps {
  activeSection: ActiveSection;
  onSectionClick: (section: ActiveSection) => void;
}

const sidebarItems = [
  {
    id: 'solutions' as const,
    icon: LayoutDashboard,
    label: 'My Solutions',
    isExternal: false,
  },
  {
    id: 'items' as const,
    icon: LayoutPanelLeft,
    label: 'My Items',
    isExternal: false,
  },
  {
    id: 'marketplace' as const,
    icon: MessageSquare,
    label: 'Marketplace',
    isExternal: true,
  },
  {
    id: 'profile' as const,
    icon: User,
    label: 'Profile',
    isExternal: false,
  },
];

export const LeftSidebar = ({ activeSection, onSectionClick }: LeftSidebarProps) => {
  return (
    <div className="w-16 bg-card border-r border-border flex flex-col">
      {/* Logo/Brand */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">Q</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
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
                  {item.isExternal && (
                    <ExternalLink size={10} className="absolute top-1 right-1" />
                  )}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-sm" />
                  )}
                </button>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  );
};
