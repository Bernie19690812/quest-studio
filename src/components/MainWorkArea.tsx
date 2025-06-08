
import React, { useState } from 'react';
import { Send, Paperclip, Mic, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Solution } from './StudioLayout';

interface MainWorkAreaProps {
  activeSolution: Solution | null;
  onCreateSolution: () => void;
}

export const MainWorkArea = ({ activeSolution, onCreateSolution }: MainWorkAreaProps) => {
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

  // Show prompt when no solution is selected
  if (!activeSolution) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">Q</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Quest AI Studio</h1>
              <p className="text-sm text-muted-foreground">Select or create a solution to begin</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary font-bold text-3xl">Q</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Quest AI Studio</h2>
              <p className="text-muted-foreground mb-6">
                Create or select a solution to start building your AI-powered applications.
              </p>
              <Button onClick={onCreateSolution} size="lg">
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
    <div className="flex-1 flex flex-col">
      {/* Header with Active Solution */}
      <div className="h-16 border-b border-border flex items-center px-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">Q</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">{activeSolution.title}</h1>
            <p className="text-sm text-muted-foreground">
              {activeSolution.description || 'Ready to assist you'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Message for Active Solution */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary font-bold text-xl">Q</span>
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
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Start New Chat</h3>
              <p className="text-sm text-muted-foreground">Begin a conversation about this solution</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <h3 className="font-medium text-foreground mb-1">Upload Files</h3>
              <p className="text-sm text-muted-foreground">Add documents and resources to this solution</p>
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
                placeholder={`Ask Quest AI about ${activeSolution.title}...`}
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
