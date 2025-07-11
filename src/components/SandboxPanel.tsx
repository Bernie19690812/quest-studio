
import React, { useState } from 'react';
import { X, Send, Trash2, Play, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SandboxTool } from './StudioLayout';

interface SandboxPanelProps {
  isOpen: boolean;
  tools: SandboxTool[];
  onClose: () => void;
  onRemoveTool: (toolId: string) => void;
}

interface SandboxMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const SandboxPanel = ({ isOpen, tools, onClose, onRemoveTool }: SandboxPanelProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<SandboxMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: SandboxMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: SandboxMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm experimenting with the ${tools.map(t => t.name).join(', ')} ${tools.length === 1 ? 'capability' : 'capabilities'} you've added to the sandbox. ${message}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearSandbox = () => {
    setMessages([]);
    tools.forEach(tool => onRemoveTool(tool.id));
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <FlaskConical size={20} className="text-primary" />
          <h2 className="font-semibold text-foreground">Sandbox</h2>
        </div>
        <div className="flex items-center space-x-2">
          {tools.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSandbox}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Active Tools */}
      {tools.length > 0 && (
        <div className="p-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active:</span>
            {tools.map((tool) => (
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
                  onClick={() => onRemoveTool(tool.id)}
                >
                  <X size={8} />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {tools.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                <FlaskConical size={32} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Sandbox Ready
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Drag and drop capabilities from the Tools panel to experiment with them here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Start experimenting with your selected capabilities
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        {/* Input Area */}
        {tools.length > 0 && (
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Experiment with your capabilities..."
                  className="rounded-full bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-12"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                  disabled={!message.trim() || isLoading}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
