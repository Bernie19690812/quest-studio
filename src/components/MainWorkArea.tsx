
import React, { useState } from 'react';
import { Send, Paperclip, X, Grid3X3, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AppLauncherDropdown } from './AppLauncherDropdown';
import { Solution, Chat, SandboxTool } from './StudioLayout';

interface MainWorkAreaProps {
  activeSolution: Solution | null;
  activeChat: Chat | null;
  onCreateSolution: () => void;
  onDropToSandbox: (tool: SandboxTool) => void;
  sandboxTools: SandboxTool[];
  onMoveFromSandbox?: (tool: SandboxTool) => void;
}

interface ActiveTool {
  id: string;
  name: string;
  type: 'capability' | 'solution';
}

export const MainWorkArea = ({ 
  activeSolution, 
  activeChat, 
  onCreateSolution, 
  onDropToSandbox,
  sandboxTools,
  onMoveFromSandbox
}: MainWorkAreaProps) => {
  const [message, setMessage] = useState('');
  const [activeTools, setActiveTools] = useState<ActiveTool[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log('Files uploaded:', Array.from(files).map(f => f.name));
      }
    };
    input.click();
  };

  const removeActiveTool = (toolId: string) => {
    setActiveTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const toolData = e.dataTransfer.getData('application/json');
      if (toolData) {
        const tool: SandboxTool = JSON.parse(toolData);
        
        // Check if dropping in active solution area and solution is selected
        if (activeSolution) {
          // Add to active tools instead of sandbox
          const newActiveTool: ActiveTool = {
            id: tool.id,
            name: tool.name,
            type: tool.type,
          };
          setActiveTools(prev => {
            const exists = prev.find(t => t.id === tool.id);
            if (exists) return prev;
            return [...prev, newActiveTool];
          });
        } else {
          onDropToSandbox(tool);
        }
      }
    } catch (error) {
      console.error('Failed to parse dropped tool data:', error);
    }
  };

  const handleMoveFromSandbox = (tool: SandboxTool) => {
    if (!activeSolution) return;
    
    const newActiveTool: ActiveTool = {
      id: tool.id,
      name: tool.name,
      type: tool.type,
    };
    
    setActiveTools(prev => {
      const exists = prev.find(t => t.id === tool.id);
      if (exists) return prev;
      return [...prev, newActiveTool];
    });
    
    if (onMoveFromSandbox) {
      onMoveFromSandbox(tool);
    }
  };

  // Show prompt when no solution is selected
  if (!activeSolution) {
    return (
      <div 
        className="flex-1 flex flex-col items-center justify-center bg-background relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-lg font-medium text-primary">Drop to add to Sandbox</p>
              <p className="text-sm text-muted-foreground">Experiment with capabilities before using in solutions</p>
            </div>
          </div>
        )}
        
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
            <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Quest AI Studio
            </h2>
            <p className="text-muted-foreground mb-6">
              Select or create a solution to begin working with AI-powered tools and capabilities.
            </p>
            <Button onClick={onCreateSolution} size="lg" className="gap-2">
              <Plus size={20} />
              Create Solution
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg quest-gradient flex items-center justify-center">
            <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">
              {activeSolution.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Capabilities: {activeTools.length}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Grid3X3 size={18} />
          </Button>
          <AppLauncherDropdown />
        </div>
      </div>

      {/* Active Tools Bar */}
      {activeTools.length > 0 && (
        <div className="px-6 py-3 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 flex-wrap">
            {activeTools.map((tool) => (
              <Badge
                key={tool.id}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20"
              >
                <span className="text-xs">{tool.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-3 w-3 hover:bg-destructive/20 rounded-full"
                  onClick={() => removeActiveTool(tool.id)}
                >
                  <X size={10} />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Sandbox Tools Available for Moving */}
      {sandboxTools.length > 0 && activeSolution && (
        <div className="px-6 py-3 border-b border-border bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Available from Sandbox:</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {sandboxTools.map((tool) => (
              <div key={tool.id} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {tool.name}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => handleMoveFromSandbox(tool)}
                >
                  <ArrowRight size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area - Updated to match the image layout */}
      <div 
        className="flex-1 overflow-y-auto relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragOver && (
          <div className="absolute inset-4 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-lg font-medium text-primary">
                {activeSolution ? 'Drop to add to Solution' : 'Drop to add to Sandbox'}
              </p>
              <p className="text-sm text-muted-foreground">
                {activeSolution ? 'Add capability to this solution' : 'Experiment before using in solution'}
              </p>
            </div>
          </div>
        )}
        
        <div className="h-full flex flex-col items-center justify-center p-6">
          {activeChat ? (
            // Show chat content
            <div className="space-y-4 w-full max-w-4xl">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {activeChat.name}
                </h3>
                <p className="text-muted-foreground">
                  Chat history and messages would appear here
                </p>
              </div>
            </div>
          ) : (
            // Show solution welcome - matching the image layout
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Working on: {activeSolution.title}
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {activeSolution.description || 'AI-powered customer service persona'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Drag capabilities from the left sidebar to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-border hover:bg-accent"
              onClick={handleFileUpload}
            >
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
