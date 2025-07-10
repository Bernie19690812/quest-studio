
import React, { useState } from 'react';
import { Send, Paperclip, X, Grid3X3, FlaskConical, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AppLauncherDropdown } from './AppLauncherDropdown';
import { Solution, Chat } from './StudioLayout';

interface MainWorkAreaProps {
  activeSolution: Solution | null;
  activeChat: Chat | null;
  isSandboxMode?: boolean;
  onExitSandbox?: () => void;
}

interface ActiveTool {
  id: string;
  name: string;
  type: 'capability' | 'solution';
}

export const MainWorkArea = ({ 
  activeSolution, 
  activeChat, 
  isSandboxMode = false,
  onExitSandbox 
}: MainWorkAreaProps) => {
  const [message, setMessage] = useState('');
  const [activeTools, setActiveTools] = useState<ActiveTool[]>([]);
  const [sandboxMessages, setSandboxMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      if (isSandboxMode) {
        setSandboxMessages(prev => [...prev, message]);
        console.log('Sandbox message:', message);
      } else {
        console.log('Sending message:', message);
      }
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
    if (isSandboxMode) {
      // Sandbox mode doesn't support file uploads
      return;
    }
    
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

  // Show sandbox mode
  if (isSandboxMode) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <FlaskConical size={20} className="text-primary" />
            <h1 className="font-semibold text-foreground">Sandbox</h1>
            <Badge variant="secondary" className="text-xs">Experimental Mode</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onExitSandbox}>
              Exit Sandbox
            </Button>
            <Button variant="ghost" size="icon">
              <Grid3X3 size={18} />
            </Button>
            <AppLauncherDropdown />
          </div>
        </div>

        {/* Sandbox Chat Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <FlaskConical size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Capability Sandbox
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Experiment with capabilities in isolation. No history or files are saved beyond this session.
                </p>
              </div>
            </div>

            {/* Sandbox Messages */}
            {sandboxMessages.length > 0 && (
              <div className="space-y-4">
                {sandboxMessages.map((msg, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <p className="text-foreground">{msg}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Limited for sandbox */}
        <div className="border-t border-border p-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Experiment with capabilities..."
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
  }

  // Show prompt when no solution is selected
  if (!activeSolution) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
            <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Quest AI Studio
            </h2>
            <p className="text-muted-foreground mb-6">
              Select a purchased solution to start working, or visit the Marketplace to purchase new solutions.
            </p>
            <Button 
              onClick={() => window.location.href = '/marketplace'} 
              size="lg" 
              className="gap-2"
            >
              <ShoppingCart size={20} />
              Visit Marketplace
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show purchased solution workspace
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <h1 className="font-semibold text-foreground">
            {activeSolution.title}
            {activeChat && (
              <>
                <span className="text-muted-foreground"> › </span>
                {activeChat.name}
              </>
            )}
          </h1>
          {activeTools.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {activeTools.length} tool(s) active
            </div>
          )}
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

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {activeChat ? (
            // Show chat content
            <div className="space-y-4">
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
            // Show solution welcome
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {activeSolution.title}
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {activeSolution.description || 'Ready to start working on your solution. Create a new chat or select an existing one to begin.'}
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
