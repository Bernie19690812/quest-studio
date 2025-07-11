
import React, { useState } from 'react';
import { X, Plus, Search, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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

// Mock data for solutions
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

// Mock data for capabilities
const mockCapabilities = [
  { id: 'cap1', name: 'Joining a meeting', description: 'Connect to video conferences', category: 'Communication', icon: '🎥' },
  { id: 'cap2', name: 'Listening', description: 'Audio processing and understanding', category: 'Audio', icon: '👂' },
  { id: 'cap3', name: 'Speaking', description: 'Text-to-speech generation', category: 'Audio', icon: '🎤' },
  { id: 'cap4', name: 'Persona Selection', description: 'Choose AI personality', category: 'AI', icon: '👤' },
  { id: 'cap5', name: 'Knowledge Access', description: 'Access to knowledge base', category: 'Data', icon: '📚' },
  { id: 'cap6', name: 'Actively interacting', description: 'Dynamic conversation handling', category: 'AI', icon: '🤝' },
  { id: 'cap7', name: 'Summarization', description: 'Content summarization tools', category: 'Processing', icon: '📝' },
  { id: 'cap8', name: 'Knowledge Transfer', description: 'Share information effectively', category: 'Data', icon: '🔄' },
  { id: 'cap9', name: 'Suggest Other Agent', description: 'Recommend specialized agents', category: 'AI', icon: '🤖' },
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
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleChatSelect = (chat: Chat, solution: Solution) => {
    if (onChatSelect) {
      onChatSelect(chat, solution);
    }
    onClose();
  };

  const handleFileSelect = (file: any, solution: Solution) => {
    console.log('Selected file:', file.name, 'in solution:', solution.title);
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
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">My Tools</h3>
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
                {filteredSolutions.length} purchased solutions
              </span>
              <Button size="sm" onClick={() => setShowCreateModal(true)}>
                <Plus size={16} className="mr-1" />
                New
              </Button>
            </div>
            
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {filteredSolutions.map((solution) => (
                  <div
                    key={solution.id}
                    className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => handleSolutionClick(solution)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{solution.title}</h4>
                        {solution.description && (
                          <p className="text-sm text-muted-foreground mt-1">{solution.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            solution.status === 'active' 
                              ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                          )}>
                            {solution.status}
                          </span>
                          {solution.isPurchased && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400">
                              Purchased
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="capabilities" className="flex-1 overflow-hidden mt-4">
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md mb-4">
              💡 Drag to Sandbox or double-click to experiment
            </div>
            
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {filteredCapabilities.map((capability) => (
                  <div
                    key={capability.id}
                    className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-grab active:cursor-grabbing select-none"
                    draggable
                    onDragStart={(e) => handleCapabilityDragStart(e, capability)}
                    onDoubleClick={() => handleCapabilityDoubleClick(capability)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <span className="text-lg">{capability.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground">{capability.name}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{capability.description}</p>
                        <span className="text-xs text-muted-foreground">{capability.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      <CreateSolutionModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSolutionCreate={(solution) => {
          handleSolutionClick(solution);
          setShowCreateModal(false);
        }}
      />
    </>
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
                {activeSection === 'tools' && 'My Tools'}
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
