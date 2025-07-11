
import React, { useState } from 'react';
import { X, Plus, Search, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ActiveSection, Solution, Chat, SandboxTool } from './StudioLayout';
import { CreateSolutionModal } from './CreateSolutionModal';
import { SolutionsList } from './SolutionsList';

interface ContextualDrawerProps {
  isOpen: boolean;
  activeSection: ActiveSection;
  activeSolution: Solution | null;
  onClose: () => void;
  onSolutionSelect: (solution: Solution) => void;
  onChatSelect?: (chat: Chat, solution: Solution) => void;
  onDropToSandbox: (tool: SandboxTool) => void;
}

// Mock data for tools
const mockTools = {
  capabilities: [
    { id: '1', name: 'GPT-4 Integration', description: 'Advanced language model', category: 'AI Models' },
    { id: '2', name: 'Vision API', description: 'Image and video analysis', category: 'AI Models' },
    { id: '3', name: 'Speech Recognition', description: 'Convert speech to text', category: 'Audio' },
    { id: '4', name: 'Document Scanner', description: 'Extract text from documents', category: 'OCR' },
    { id: '5', name: 'Sentiment Analysis', description: 'Analyze text sentiment', category: 'NLP' },
  ],
  solutions: [
    { id: '6', name: 'Email Template Generator', description: 'Create professional emails', category: 'Templates' },
    { id: '7', name: 'Code Review Assistant', description: 'Automated code analysis', category: 'Development' },
    { id: '8', name: 'Report Builder', description: 'Generate structured reports', category: 'Business' },
  ],
};

const ToolsContent = ({ onDropToSandbox }: { onDropToSandbox: (tool: SandboxTool) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapabilities = mockTools.capabilities.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSolutions = mockTools.solutions.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, tool: any, type: 'capability' | 'solution') => {
    const sandboxTool: SandboxTool = {
      id: tool.id,
      name: tool.name,
      type,
      description: tool.description,
      category: tool.category,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(sandboxTool));
  };

  const handleDoubleClick = (tool: any, type: 'capability' | 'solution') => {
    const sandboxTool: SandboxTool = {
      id: tool.id,
      name: tool.name,
      type,
      description: tool.description,
      category: tool.category,
    };
    onDropToSandbox(sandboxTool);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">My Tools</h3>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
        💡 Drag to Sandbox or double-click to experiment
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Tag size={14} />
            Capabilities ({filteredCapabilities.length})
          </h4>
          <div className="space-y-2">
            {filteredCapabilities.map((tool) => (
              <div
                key={tool.id}
                className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-grab active:cursor-grabbing select-none"
                draggable
                onDragStart={(e) => handleDragStart(e, tool, 'capability')}
                onDoubleClick={() => handleDoubleClick(tool, 'capability')}
              >
                <h5 className="font-medium text-foreground">{tool.name}</h5>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                <span className="text-xs text-muted-foreground">{tool.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Tag size={14} />
            Solutions ({filteredSolutions.length})
          </h4>
          <div className="space-y-2">
            {filteredSolutions.map((tool) => (
              <div
                key={tool.id}
                className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-grab active:cursor-grabbing select-none"
                draggable
                onDragStart={(e) => handleDragStart(e, tool, 'solution')}
                onDoubleClick={() => handleDoubleClick(tool, 'solution')}
              >
                <h5 className="font-medium text-foreground">{tool.name}</h5>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                <span className="text-xs text-muted-foreground">{tool.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileContent = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Profile</h3>
    <div className="text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
        <User size={32} className="text-primary" />
      </div>
      <h4 className="font-medium text-foreground">John Doe</h4>
      <p className="text-sm text-muted-foreground">john@example.com</p>
    </div>
    
    <div className="space-y-3">
      <div className="p-3 border border-border rounded-lg">
        <h5 className="font-medium text-foreground">Usage</h5>
        <p className="text-sm text-muted-foreground mt-1">1,250 / 5,000 credits used</p>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
        </div>
      </div>
      <div className="p-3 border border-border rounded-lg">
        <h5 className="font-medium text-foreground">Plan</h5>
        <p className="text-sm text-muted-foreground mt-1">Pro Plan - $49/month</p>
      </div>
    </div>
    
    <div className="space-y-2">
      <Button className="w-full" variant="outline">Account Settings</Button>
      <Button className="w-full" variant="outline">Billing</Button>
    </div>
  </div>
);

export const ContextualDrawer = ({ 
  isOpen, 
  activeSection, 
  activeSolution,
  onClose, 
  onSolutionSelect,
  onChatSelect,
  onDropToSandbox
}: ContextualDrawerProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'tools':
        return <ToolsContent onDropToSandbox={onDropToSandbox} />;
      case 'profile':
        return <ProfileContent />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 overflow-hidden",
      isOpen ? "w-80" : "w-0"
    )}>
      {isOpen && activeSection && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-foreground">
                {activeSection === 'tools' && 'Tools'}
                {activeSection === 'profile' && 'Profile'}
              </h2>
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
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextualDrawer;
