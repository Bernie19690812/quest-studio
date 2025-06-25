
import React from 'react';
import { 
  Folder, 
  User, 
  ShoppingCart,
  Wrench,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ActiveSection } from './StudioLayout';

interface LeftSidebarProps {
  activeSection: ActiveSection;
  onSectionClick: (section: ActiveSection) => void;
  isToolsDrawerOpen: boolean;
}

const topSectionItems = [
  {
    id: 'solutions' as const,
    icon: Folder,
    label: 'My Solutions',
  },
  {
    id: 'tools' as const,
    icon: Wrench,
    label: 'My Tools',
  },
];

const bottomSectionItems = [
  {
    id: 'marketplace' as const,
    icon: ShoppingCart,
    label: 'Marketplace',
  },
  {
    id: 'profile' as const,
    icon: User,
    label: 'Profile',
  },
];

export const LeftSidebar = ({ activeSection, onSectionClick, isToolsDrawerOpen }: LeftSidebarProps) => {
  const navigate = useNavigate();

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      navigate('/marketplace');
      return;
    }
    onSectionClick(section);
  };

  return (
    <div className="w-16 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <div className="w-8 h-8 quest-gradient rounded-lg flex items-center justify-center">
          <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-5 h-5" />
        </div>
      </div>

      {/* Top Section */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {topSectionItems.map((item) => (
            <li key={item.id} className="px-2">
              <div className="relative group">
                <button
                  onClick={() => handleSectionClick(item.id)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    (activeSection === item.id || (item.id === 'tools' && isToolsDrawerOpen))
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon size={20} />
                  
                  {/* Active indicator */}
                  {(activeSection === item.id || (item.id === 'tools' && isToolsDrawerOpen)) && (
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

      {/* Bottom Section */}
      <nav className="pb-4">
        <ul className="space-y-2">
          {bottomSectionItems.map((item) => (
            <li key={item.id} className="px-2">
              <div className="relative group">
                <button
                  onClick={() => handleSectionClick(item.id)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon size={20} />
                  
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
    </div>
  );
};
