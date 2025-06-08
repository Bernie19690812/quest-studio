
import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const MainChatArea = () => {
  const [message, setMessage] = useState('');

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

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center px-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">AI</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Quest AI Studio</h1>
            <p className="text-sm text-muted-foreground">Ready to assist you</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary font-bold text-xl">Q</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Quest AI Studio</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your intelligent workspace for creating, managing, and deploying AI solutions. How can I help you today?
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Create New Solution</h3>
              <p className="text-sm text-muted-foreground">Start building a new AI solution from scratch</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Browse Templates</h3>
              <p className="text-sm text-muted-foreground">Explore pre-built solutions and templates</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Import Project</h3>
              <p className="text-sm text-muted-foreground">Upload and configure existing projects</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Get Help</h3>
              <p className="text-sm text-muted-foreground">Learn how to use Quest AI effectively</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-2">
            <Button variant="outline" size="icon" className="mb-2">
              <Paperclip size={18} />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Quest AI anything..."
                className="pr-12 min-h-[44px] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={!message.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
            <Button variant="outline" size="icon" className="mb-2">
              <Mic size={18} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Quest AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};
