import React, { useState } from 'react';
import { Send, Paperclip, Mic, Plus, X, Trash2, Wrench, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Solution } from './StudioLayout';

interface ActiveComponent {
  id: string;
  name: string;
  type: 'capability' | 'solution' | 'template';
}

interface MainWorkAreaProps {
  activeSolution: Solution | null;
  onCreateSolution: () => void;
}

// Mock function to get icon for component type
const getComponentIcon = (type: ActiveComponent['type']) => {
  switch (type) {
    case 'capability':
      return Brain;
    case 'solution':
      return Wrench;
    case 'template':
      return Zap;
    default:
      return Wrench;
  }
};

export const MainWorkArea = ({ activeSolution, onCreateSolution }: MainWorkAreaProps) => {
  const [message, setMessage] = useState('');
  const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>([]);
  const [currentChatName] = useState('Chat name in solution');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      console.log('Active components:', activeComponents);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeComponent = (componentId: string) => {
    setActiveComponents(prev => prev.filter(comp => comp.id !== componentId));
  };

  const clearAllComponents = () => {
    setActiveComponents([]);
  };

  // Mock function to handle drop (would be implemented with proper drag & drop)
  const handleDrop = (componentData: ActiveComponent) => {
    setActiveComponents(prev => {
      if (!prev.find(comp => comp.id === componentData.id)) {
        return [...prev, componentData];
      }
      return prev;
    });
  };

  // Show prompt when no solution is selected
  if (!activeSolution) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
              <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-lg">Quest AI Studio</h1>
              <p className="text-sm text-muted-foreground">Select or create a solution to begin</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 rounded-3xl quest-gradient flex items-center justify-center mx-auto">
              <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Quest AI Studio</h2>
              <p className="text-muted-foreground mb-6">
                Create or select a solution to start building your AI-powered applications.
              </p>
              <Button onClick={onCreateSolution} size="lg" className="bg-primary hover:bg-primary/90">
                <Plus size={20} className="mr-2" />
                Create Your First Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 flex flex-col"
      onDrop={(e) => {
        e.preventDefault();
        console.log('Component dropped');
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Header with Active Solution and Chat Name */}
      <div className="border-b border-border">
        <div className="h-16 flex items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
              <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-medium text-foreground text-lg">
                {activeSolution.title} <span className="text-muted-foreground mx-2">{'>'}</span> {currentChatName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Component(s): {activeComponents.length}
              </p>
            </div>
          </div>
        </div>

        {/* Active Components Row */}
        {activeComponents.length > 0 ? (
          <div className="px-6 pb-4">
            <div className="flex items-center gap-2">
              <ScrollArea className="flex-1">
                <div className="flex items-center gap-2 pb-2">
                  {activeComponents.map((component) => {
                    const IconComponent = getComponentIcon(component.type);
                    return (
                      <Badge
                        key={component.id}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-2 whitespace-nowrap bg-secondary border border-border rounded-full"
                      >
                        <IconComponent size={14} />
                        <span className="text-sm">{component.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 hover:bg-destructive/20 rounded-full ml-1"
                          onClick={() => removeComponent(component.id)}
                        >
                          <X size={12} />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              </ScrollArea>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllComponents}
                className="flex items-center gap-1 text-muted-foreground hover:text-destructive rounded-full px-3"
              >
                Clear Components
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-4">
            <div className="text-center py-3 text-sm text-muted-foreground border border-dashed border-border rounded-lg">
              Drag a tool from the sidebar to get started.
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Message for Active Solution */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
              <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Working on: {activeSolution.title}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {activeSolution.description || 'Your AI workspace is ready. How can I help you with this solution?'}
              </p>
            </div>
          </div>

          {/* Quick Actions for Active Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div 
              className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => handleDrop({ id: 'test-1', name: 'Field Detector', type: 'capability' })}
            >
              <h3 className="font-medium text-foreground mb-1">Test: Add Field Detector</h3>
              <p className="text-sm text-muted-foreground">Click to test adding a component</p>
            </div>
            <div 
              className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => handleDrop({ id: 'test-2', name: 'Text Extractor (OCR)', type: 'template' })}
            >
              <h3 className="font-medium text-foreground mb-1">Test: Add OCR Template</h3>
              <p className="text-sm text-muted-foreground">Click to test adding a template</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">View Chat History</h3>
              <p className="text-sm text-muted-foreground">Review previous conversations</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Solution Settings</h3>
              <p className="text-sm text-muted-foreground">Configure and manage this solution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-accent">
              <Paperclip size={18} />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="rounded-full bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-12"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                disabled={!message.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
