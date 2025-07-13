
import React, { useState } from 'react';
import { X, Search, User, Zap, Brain, Mic, Camera, FileText, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ActiveSection, Solution, Chat, SandboxTool } from './StudioLayout';
import { CreateSolutionModal } from './CreateSolutionModal';
import { EditSolutionModal } from './EditSolutionModal';

interface ContextualDrawerProps {
  isOpen: boolean;
  activeSection: ActiveSection;
  activeSolution: Solution | null;
  onClose: () => void;
  onSolutionSelect: (solution: Solution) => void;
  onChatSelect?: (chat: Chat, solution: Solution) => void;
  onDropToSandbox: (tool: SandboxTool) => void;
}

// Fixed Sandbox solution
const sandboxSolution: Solution = {
  id: 'sandbox',
  title: 'Sandbox',
  description: 'Experimental workspace for testing ideas',
  dateModified: new Date(),
  status: 'active',
  isPurchased: true,
};

// Mock data for solutions - removed status indicators
const mockSolutions: Solution[] = [
  {
    id: '1',
    title: 'Customer Support Bot',
    description: 'AI-powered customer service solution',
    dateModified: new Date('2024-06-07'),
    status: 'active',
    isPurchased: true,
  },
  {
    id: '2',
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and insights',
    dateModified: new Date('2024-06-06'),
    status: 'draft',
    isPurchased: true,
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Marketing content creation assistant',
    dateModified: new Date('2024-06-05'),
    status: 'active',
    isPurchased: true,
  },
];

// Updated capabilities - marketplace-style capabilities
const mockCapabilities = [
  { id: 'cap1', name: 'Voice Recognition', description: 'Advanced speech-to-text processing', category: 'Audio', icon: Mic },
  { id: 'cap2', name: 'Image Analysis', description: 'Computer vision and image understanding', category: 'Vision', icon: Camera },
  { id: 'cap3', name: 'Natural Language Processing', description: 'Text understanding and generation', category: 'Language', icon: MessageSquare },
  { id: 'cap4', name: 'Document Processing', description: 'Extract insights from documents', category: 'Document', icon: FileText },
  { id: 'cap5', name: 'Sentiment Analysis', description: 'Analyze emotional tone and sentiment', category: 'Language', icon: Brain },
  { id: 'cap6', name: 'Data Visualization', description: 'Create charts and visual representations', category: 'Analytics', icon: Zap },
  { id: 'cap7', name: 'Translation Services', description: 'Multi-language translation capabilities', category: 'Language', icon: MessageSquare },
  { id: 'cap8', name: 'Anomaly Detection', description: 'Identify unusual patterns in data', category: 'Analytics', icon: Zap },
];

const ToolsContent = ({ 
  onDropToSandbox, 
  onSolutionSelect, 
  onChatSelect, 
  onClose 
}: { 
  onDropToSandbox: (tool: SandboxTool) => void;
  onSolutionSelect: (solution: Solution) => void;
  onChatSelect?: (chat: Chat, solution: Solution) => void;
  onClose: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);

  const filteredSolutions = mockSolutions.filter(solution =>
    solution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (solution.description && solution.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCapabilities = mockCapabilities.filter(capability =>
    capability.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    capability.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSolutionClick = (solution: Solution) => {
    onSolutionSelect(solution);
    onClose();
  };

  const handleEditSolution = (e: React.MouseEvent, solution: Solution) => {
    e.stopPropagation(); // Prevent solution selection
    setEditingSolution(solution);
  };

  const handleSaveEditedSolution = (updatedSolution: Solution) => {
    // In a real implementation, you would update the solution in your data store
    console.log('Updated solution:', updatedSolution);
    setEditingSolution(null);
  };

  const handleCapabilityDragStart = (e: React.DragEvent, capability: any) => {
    const sandboxTool: SandboxTool = {
      id: capability.id,
      name: capability.name,
      type: 'capability',
      description: capability.description,
      category: capability.category,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(sandboxTool));
  };

  const handleCapabilityDoubleClick = (capability: any) => {
    const sandboxTool: SandboxTool = {
      id: capability.id,
      name: capability.name,
      type: 'capability',
      description: capability.description,
      category: capability.category,
    };
    onDropToSandbox(sandboxTool);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Purchased Assets</h3>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="solutions" className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solutions" className="flex-1 overflow-hidden mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              {filteredSolutions.length + 1} purchased solutions
            </span>
          </div>
          
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {/* Fixed Sandbox solution */}
              <div
                key={sandboxSolution.id}
                className="p-3 rounded-lg border border-purple-300 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => handleSolutionClick(sandboxSolution)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{sandboxSolution.title}</h4>
                    {sandboxSolution.description && (
                      <p className="text-sm text-muted-foreground mt-1">{sandboxSolution.description}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Regular solutions */}
              {filteredSolutions.map((solution) => (
                <div
                  key={solution.id}
                  className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors group"
                  onClick={() => handleSolutionClick(solution)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{solution.title}</h4>
                      {solution.description && (
                        <p className="text-sm text-muted-foreground mt-1">{solution.description}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleEditSolution(e, solution)}
                    >
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="capabilities" className="flex-1 overflow-hidden mt-4">
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md mb-4">
            💡 Drag to Sandbox or Solution, or double-click to experiment
          </div>
          
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {filteredCapabilities.map((capability) => {
                const IconComponent = capability.icon;
                return (
                  <div
                    key={capability.id}
                    className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-grab active:cursor-grabbing select-none"
                    draggable
                    onDragStart={(e) => handleCapabilityDragStart(e, capability)}
                    onDoubleClick={() => handleCapabilityDoubleClick(capability)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground">{capability.name}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{capability.description}</p>
                        <span className="text-xs text-muted-foreground">{capability.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Edit Solution Modal */}
      {editingSolution && (
        <EditSolutionModal
          isOpen={!!editingSolution}
          onClose={() => setEditingSolution(null)}
          solution={editingSolution}
          onSave={handleSaveEditedSolution}
        />
      )}
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
        return <ToolsContent onDropToSandbox={onDropToSandbox} onSolutionSelect={onSolutionSelect} onChatSelect={onChatSelect} onClose={onClose} />;
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
                {activeSection === 'tools' && 'Purchased Assets'}
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
