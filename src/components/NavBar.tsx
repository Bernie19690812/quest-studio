
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface NavBarProps {
  onProfileClick?: () => void;
}

export const NavBar = ({ onProfileClick }: NavBarProps) => {
  return (
    <nav className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/17871398-c225-43f1-aa3f-9403bcaad753.png" 
            alt="Quest AI Logo" 
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-foreground">Quest AI Marketplace</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="h-10 w-10 rounded-full p-0"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
};
