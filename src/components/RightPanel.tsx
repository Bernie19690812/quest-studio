
import React from 'react';
import { X, Settings, ShoppingBag, FileText, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ActiveSection } from './StudioLayout';

interface RightPanelProps {
  isOpen: boolean;
  activeSection: ActiveSection;
  onClose: () => void;
}

const panelContent = {
  solutions: {
    title: 'My Solutions',
    icon: FileText,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-foreground">Customer Support Bot</h4>
            <p className="text-sm text-muted-foreground mt-1">AI-powered customer service solution</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Last updated: 2 hours ago</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-800/20 dark:text-green-400">Active</span>
            </div>
          </div>
          <div className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-foreground">Data Analysis Pipeline</h4>
            <p className="text-sm text-muted-foreground mt-1">Automated data processing and insights</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Last updated: 1 day ago</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full dark:bg-yellow-800/20 dark:text-yellow-400">Draft</span>
            </div>
          </div>
        </div>
        <Button className="w-full" variant="outline">
          Create New Solution
        </Button>
      </div>
    ),
  },
  items: {
    title: 'My Items',
    icon: Settings,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-lg">
            <h4 className="font-medium text-foreground">Custom Models</h4>
            <p className="text-sm text-muted-foreground mt-1">3 trained models</p>
          </div>
          <div className="p-3 border border-border rounded-lg">
            <h4 className="font-medium text-foreground">Datasets</h4>
            <p className="text-sm text-muted-foreground mt-1">12 datasets uploaded</p>
          </div>
          <div className="p-3 border border-border rounded-lg">
            <h4 className="font-medium text-foreground">API Keys</h4>
            <p className="text-sm text-muted-foreground mt-1">5 active keys</p>
          </div>
        </div>
        <Button className="w-full" variant="outline">
          Manage Items
        </Button>
      </div>
    ),
  },
  marketplace: {
    title: 'Marketplace',
    icon: ShoppingBag,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-foreground">GPT-4 Integration</h4>
            <p className="text-sm text-muted-foreground mt-1">Premium AI model access</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-foreground">$29/month</span>
              <Button size="sm">Install</Button>
            </div>
          </div>
          <div className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-foreground">Vision API</h4>
            <p className="text-sm text-muted-foreground mt-1">Image and video analysis</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-foreground">$15/month</span>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        </div>
        <Button className="w-full">
          Browse All Extensions
        </Button>
      </div>
    ),
  },
  profile: {
    title: 'Profile',
    icon: UserCircle,
    content: (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <UserCircle size={32} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground">John Doe</h3>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-lg">
            <h4 className="font-medium text-foreground">Usage</h4>
            <p className="text-sm text-muted-foreground mt-1">1,250 / 5,000 credits used</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
          <div className="p-3 border border-border rounded-lg">
            <h4 className="font-medium text-foreground">Plan</h4>
            <p className="text-sm text-muted-foreground mt-1">Pro Plan - $49/month</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button className="w-full" variant="outline">
            Account Settings
          </Button>
          <Button className="w-full" variant="outline">
            Billing
          </Button>
        </div>
      </div>
    ),
  },
};

export const RightPanel = ({ isOpen, activeSection, onClose }: RightPanelProps) => {
  const content = activeSection ? panelContent[activeSection] : null;

  return (
    <div className={cn(
      "bg-card border-l border-border transition-all duration-300 overflow-hidden",
      isOpen ? "w-80" : "w-0"
    )}>
      {isOpen && content && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <content.icon size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">{content.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {content.content}
          </div>
        </div>
      )}
    </div>
  );
};
