
import React, { useState } from 'react';
import { Send, Paperclip, X, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AppLauncherDropdown } from './AppLauncherDropdown';
import { Solution, Chat } from './StudioLayout';

interface MainWorkAreaProps {
  activeSolution: Solution | null;
  activeChat: Chat | null;
  onCreateSolution: () => void;
}

interface ActiveTool {
  id: string;
  name: string;
  type: 'capability' | 'solution';
}

export const MainWorkArea = ({ activeSolution, activeChat, onCreateSolution }: MainWorkAreaProps) => {
  const [message, setMessage] = useState('');
  const [activeTools, setActiveTools] = useState<ActiveTool[]>([
    { id: '1', name: 'Field Detector', type: 'capability' },
    { id: '2', name: 'Text Extractor (OCR)', type: 'capability' },
    { id: '3', name: 'Audio Transcription', type: 'capability' },
  ]);

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

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <h1 className="font-semibold text-foreground">
            {activeSolution?.title} &gt; {activeChat?.name}
          </h1>
          <div className="text-sm text-muted-foreground">
            {activeTools.length} tool(s) active
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

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome message or chat content would go here */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
              <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Ready to Process Invoices
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your active tools are ready to help analyze and extract data from your documents.
              </p>
            </div>
          </div>
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
