
import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainWorkArea } from './MainWorkArea';
import { ContextualDrawer } from './ContextualDrawer';
import { SandboxPanel } from './SandboxPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export type ActiveSection = 'tools' | 'marketplace' | 'profile' | null;

export interface Solution {
  id: string;
  title: string;
  description?: string;
  dateModified: Date;
  status: 'active' | 'draft' | 'archived';
  isPurchased?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  dateModified: Date;
  messages?: any[];
}

export interface SandboxTool {
  id: string;
  name: string;
  type: 'capability' | 'solution';
  description?: string;
  category?: string;
}

export const StudioLayout = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [sandboxTools, setSandboxTools] = useState<SandboxTool[]>([]);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      window.location.href = '/marketplace';
      return;
    }

    if (section === activeSection) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const handleSolutionSelect = (solution: Solution) => {
    setActiveSolution(solution);
    setActiveChat(null);
    setActiveSection(null);
  };

  const handleChatSelect = (chat: Chat, solution: Solution) => {
    setActiveSolution(solution);
    setActiveChat(chat);
    setActiveSection(null);
  };

  const handleCreateSolution = () => {
    window.location.href = '/marketplace';
  };

  const handleSandboxToggle = () => {
    setIsSandboxOpen(!isSandboxOpen);
  };

  const handleDropToSandbox = (tool: SandboxTool) => {
    setSandboxTools(prev => {
      const exists = prev.find(t => t.id === tool.id);
      if (exists) return prev;
      return [...prev, tool];
    });
    setIsSandboxOpen(true);
  };

  const handleRemoveFromSandbox = (toolId: string) => {
    setSandboxTools(prev => prev.filter(t => t.id !== toolId));
  };

  return (
    <div className="h-screen flex bg-background">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
        onSandboxToggle={handleSandboxToggle}
        isSandboxOpen={isSandboxOpen}
      />
      <ContextualDrawer 
        isOpen={activeSection !== null && activeSection !== 'marketplace'}
        activeSection={activeSection}
        activeSolution={activeSolution}
        onClose={() => setActiveSection(null)}
        onSolutionSelect={handleSolutionSelect}
        onChatSelect={handleChatSelect}
        onDropToSandbox={handleDropToSandbox}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={isSandboxOpen ? 70 : 100} minSize={50}>
          <MainWorkArea 
            activeSolution={activeSolution}
            activeChat={activeChat}
            onCreateSolution={handleCreateSolution}
            onDropToSandbox={handleDropToSandbox}
          />
        </ResizablePanel>
        
        {isSandboxOpen && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
              <SandboxPanel
                isOpen={isSandboxOpen}
                tools={sandboxTools}
                onClose={() => setIsSandboxOpen(false)}
                onRemoveTool={handleRemoveFromSandbox}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
