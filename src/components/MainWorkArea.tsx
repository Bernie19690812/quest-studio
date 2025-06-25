import React, { useState, useEffect } from 'react';
import { Send, Paperclip, Plus, X, Trash2, Wrench, Brain, Zap, MessageSquarePlus, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditableField } from './EditableField';
import { AppLauncherDropdown } from './AppLauncherDropdown';
import { NewChatModal } from './NewChatModal';
import { Solution, Chat } from './StudioLayout';

interface ActiveComponent {
  id: string;
  name: string;
  type: 'capability' | 'solution' | 'template';
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MainWorkAreaProps {
  activeSolution: Solution | null;
  activeChat: Chat | null;
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

// Mock GPT response generator
const generateGPTResponse = (userMessage: string): string => {
  const responses = [
    `I understand you're asking about "${userMessage}". Let me help you with that. Based on the components you've added, I can assist with processing and analyzing your request.`,
    `Great question! Regarding "${userMessage}", I can leverage the available capabilities to provide you with a comprehensive solution. Would you like me to break this down into steps?`,
    `Thank you for your message about "${userMessage}". I'm analyzing this with the current solution context and can provide several approaches to address this.`,
    `I see you're working on "${userMessage}". With the tools and capabilities currently active, I can help you implement this efficiently. Let me walk you through the process.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const MainWorkArea = ({ activeSolution, activeChat, onCreateSolution }: MainWorkAreaProps) => {
  const [message, setMessage] = useState('');
  const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>([]);
  const [currentChatName, setCurrentChatName] = useState('Chat name in solution');
  const [solutionName, setSolutionName] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');

  // Mock chats data
  const mockChats = [
    { id: '1', name: 'Data Analysis Chat', dateModified: new Date(), messages: [] },
    { id: '2', name: 'Model Training Discussion', dateModified: new Date(), messages: [] },
    { id: '3', name: 'API Integration Help', dateModified: new Date(), messages: [] },
  ];

  // Mock tools data
  const mockTools = [
    { id: 't1', name: 'Field Detector', type: 'capability' as const, description: 'Automatically detect and extract form fields' },
    { id: 't2', name: 'Text Extractor (OCR)', type: 'template' as const, description: 'Extract text from images and documents' },
    { id: 't3', name: 'Data Validator', type: 'capability' as const, description: 'Validate data format and integrity' },
    { id: 't4', name: 'Report Generator', type: 'solution' as const, description: 'Generate automated reports' },
  ];

  // Update state when activeChat or activeSolution changes
  useEffect(() => {
    if (activeChat) {
      setCurrentChatName(activeChat.name);
      setChatMessages(activeChat.messages || []);
    } else if (activeSolution) {
      setCurrentChatName('New Chat');
      setChatMessages([]);
    } else {
      setCurrentChatName('Chat name in solution');
      setChatMessages([]);
    }
  }, [activeChat, activeSolution]);

  useEffect(() => {
    if (activeSolution) {
      setSolutionName(activeSolution.title);
    } else {
      setSolutionName('');
    }
  }, [activeSolution]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      
      // Generate and add GPT response after a short delay
      setTimeout(() => {
        const gptResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: generateGPTResponse(message.trim()),
          isUser: false,
          timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, gptResponse]);
      }, 1000);
      
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
        Array.from(files).forEach(file => {
          console.log('File uploaded:', file.name);
          // Add file upload message to chat
          const fileMessage: ChatMessage = {
            id: Date.now().toString(),
            text: `📎 Uploaded file: ${file.name}`,
            isUser: true,
            timestamp: new Date(),
          };
          setChatMessages(prev => [...prev, fileMessage]);
        });
      }
    };
    input.click();
  };

  const removeComponent = (componentId: string) => {
    setActiveComponents(prev => prev.filter(comp => comp.id !== componentId));
  };

  const clearAllComponents = () => {
    setActiveComponents([]);
  };

  const handleNewChat = (chatName?: string) => {
    const newChatName = chatName || `New Chat ${Date.now()}`;
    setCurrentChatName(newChatName);
    setActiveComponents([]);
    setChatMessages([]);
    setIsNewChatModalOpen(false);
    console.log('Created new chat:', newChatName);
  };

  const handleSolutionNameChange = (newName: string) => {
    setSolutionName(newName || 'Untitled Solution');
    console.log('Solution name changed to:', newName);
  };

  const handleChatNameChange = (newName: string) => {
    setCurrentChatName(newName || 'Untitled Chat');
    console.log('Chat name changed to:', newName);
  };

  const handleToolAdd = (tool: typeof mockTools[0]) => {
    const component: ActiveComponent = {
      id: tool.id,
      name: tool.name,
      type: tool.type
    };
    handleDrop(component);
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
    <div className="flex-1 flex">
      {/* Left Panel - Tabs for Chats and Tools */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="h-16 border-b border-border flex items-center px-4">
          <EditableField
            value={solutionName}
            onChange={handleSolutionNameChange}
            placeholder="Untitled Solution"
            className="text-lg font-medium text-foreground"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="flex-1 overflow-hidden m-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Conversations</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsNewChatModalOpen(true)}
                  className="h-8 w-8"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {mockChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors ${
                        activeChat?.id === chat.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setCurrentChatName(chat.name)}
                    >
                      <h4 className="font-medium text-sm text-foreground">{chat.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {chat.dateModified.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="flex-1 overflow-hidden m-0">
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-4">Available Tools</h3>
              <ScrollArea className="flex-1">
                <div className="space-y-3">
                  {mockTools.map((tool) => {
                    const IconComponent = getComponentIcon(tool.type);
                    const isActive = activeComponents.some(comp => comp.id === tool.id);
                    
                    return (
                      <div
                        key={tool.id}
                        className={`p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors ${
                          isActive ? 'bg-accent border-primary' : ''
                        }`}
                        onClick={() => handleToolAdd(tool)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            tool.type === 'capability' ? 'bg-blue-50 dark:bg-blue-950/30' :
                            tool.type === 'solution' ? 'bg-emerald-50 dark:bg-emerald-950/30' :
                            'bg-amber-50 dark:bg-amber-950/30'
                          }`}>
                            <IconComponent size={16} className={
                              tool.type === 'capability' ? 'text-blue-600 dark:text-blue-400' :
                              tool.type === 'solution' ? 'text-emerald-600 dark:text-emerald-400' :
                              'text-amber-600 dark:text-amber-400'
                            } />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-foreground">{tool.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {tool.description}
                            </p>
                            <Badge variant="outline" className={`mt-2 text-xs ${
                              tool.type === 'capability' ? 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300' :
                              tool.type === 'solution' ? 'border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300' :
                              'border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300'
                            }`}>
                              {tool.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header with Chat Name and Actions */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <EditableField
              value={currentChatName}
              onChange={handleChatNameChange}
              placeholder="Untitled Chat"
              className="text-lg font-medium text-foreground"
            />
          </div>
          <div className="flex items-center space-x-2">
            <AppLauncherDropdown />
          </div>
        </div>

        {/* Active Components */}
        {activeComponents.length > 0 && (
          <div className="px-6 py-3 border-b border-border bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Active Components: {activeComponents.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllComponents}
                className="flex items-center gap-1 text-muted-foreground hover:text-destructive h-6 text-xs"
              >
                Clear All <Trash2 size={12} />
              </Button>
            </div>
            
            <ScrollArea className="w-full">
              <div className="flex items-center gap-2 pb-1">
                {activeComponents.map((component) => {
                  const IconComponent = getComponentIcon(component.type);
                  return (
                    <Badge
                      key={component.id}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1.5 whitespace-nowrap bg-secondary border border-border rounded-full"
                    >
                      <IconComponent size={12} />
                      <span className="text-xs">{component.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 hover:bg-destructive/20 rounded-full"
                        onClick={() => removeComponent(component.id)}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {chatMessages.length === 0 ? (
              <>
                {/* Welcome Message for Active Solution */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center mx-auto">
                    <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {activeChat ? `Chat: ${activeChat.name}` : `Working on: ${solutionName}`}
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {activeChat 
                        ? `Continue your conversation in "${activeChat.name}"`
                        : activeSolution?.description || 'Your AI workspace is ready. How can I help you with this solution?'
                      }
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                {activeComponents.length === 0 && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Add tools from the sidebar to get started
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground border border-border'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Input Area */}
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

      {/* New Chat Modal */}
      <NewChatModal
        open={isNewChatModalOpen}
        onOpenChange={setIsNewChatModalOpen}
        onCreateChat={handleNewChat}
      />
    </div>
  );
};
