
import React, { useState } from 'react';
import { X, Plus, Search, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ActiveSection, Solution } from './StudioLayout';
import { CreateSolutionModal } from './CreateSolutionModal';

interface ContextualDrawerProps {
  isOpen: boolean;
  activeSection: ActiveSection;
  activeSolution: Solution | null;
  onClose: () => void;
  onSolutionSelect: (solution: Solution) => void;
}

// Mock data for solutions
const mockSolutions: Solution[] = [
  {
    id: '1',
    title: 'Customer Support Bot',
    description: 'AI-powered customer service solution',
    dateModified: new Date('2024-06-07'),
    status: 'active',
  },
  {
    id: '2',
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and insights',
    dateModified: new Date('2024-06-06'),
    status: 'draft',
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Marketing content creation assistant',
    dateModified: new Date('2024-06-05'),
    status: 'active',
  },
];

// Mock data for tools
const mockTools = {
  capabilities: [
    { id: '1', name: 'GPT-4 Integration', description: 'Advanced language model', category: 'AI Models' },
    { id: '2', name: 'Vision API', description: 'Image and video analysis', category: 'AI Models' },
    { id: '3', name: 'Speech Recognition', description: 'Convert speech to text', category: 'Audio' },
  ],
  solutions: [
    { id: '4', name: 'Email Template Generator', description: 'Create professional emails', category: 'Templates' },
    { id: '5', name: 'Code Review Assistant', description: 'Automated code analysis', category: 'Development' },
  ],
};

const SolutionsContent = ({ onSolutionSelect, onClose }: { onSolutionSelect: (solution: Solution) => void; onClose: () => void }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSolutionClick = (solution: Solution) => {
    onSolutionSelect(solution);
    onClose();
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">My Solutions</h3>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} className="mr-1" />
            New
          </Button>
        </div>

        <div className="space-y-3">
          {mockSolutions.map((solution) => (
            <div
              key={solution.id}
              onClick={() => handleSolutionClick(solution)}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{solution.title}</h4>
                  {solution.description && (
                    <p className="text-sm text-muted-foreground mt-1">{solution.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {solution.dateModified.toLocaleDateString()}
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      solution.status === 'active' 
                        ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                        : solution.status === 'draft'
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                    )}>
                      {solution.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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

const ToolsContent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapabilities = mockTools.capabilities.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSolutions = mockTools.solutions.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Tag size={14} />
            Capabilities
          </h4>
          <div className="space-y-2">
            {filteredCapabilities.map((tool) => (
              <div
                key={tool.id}
                className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-grab"
                draggable
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
            Solutions
          </h4>
          <div className="space-y-2">
            {filteredSolutions.map((tool) => (
              <div
                key={tool.id}
                className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-grab"
                draggable
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
  onSolutionSelect 
}: ContextualDrawerProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'solutions':
        return <SolutionsContent onSolutionSelect={onSolutionSelect} onClose={onClose} />;
      case 'tools':
        return <ToolsContent />;
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
                {activeSection === 'solutions' && 'Solutions'}
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
