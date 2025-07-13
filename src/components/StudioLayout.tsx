
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { LeftSidebar } from './LeftSidebar';
import { MainWorkArea } from './MainWorkArea';
import { ContextualDrawer } from './ContextualDrawer';



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


  const handleDropToSandbox = (tool: SandboxTool) => {
    // Only add to sandbox if sandbox solution is active
    if (activeSolution?.id === 'sandbox') {
      setSandboxTools(prev => {
        const exists = prev.find(t => t.id === tool.id);
        if (exists) return prev;
        return [...prev, tool];
      });
    }
  };

  const handleRemoveFromSandbox = (toolId: string) => {
    setSandboxTools(prev => prev.filter(t => t.id !== toolId));
  };

  const handleMoveFromSandbox = (tool: SandboxTool) => {
    // Remove from sandbox when moved to active solution
    handleRemoveFromSandbox(tool.id);
  };

  return (
    <div className="h-screen flex bg-background relative">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
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
      
      <MainWorkArea 
        activeSolution={activeSolution}
        activeChat={activeChat}
        onCreateSolution={handleCreateSolution}
        onDropToSandbox={handleDropToSandbox}
        sandboxTools={activeSolution?.id === 'sandbox' ? sandboxTools : []}
        onMoveFromSandbox={handleMoveFromSandbox}
      />
    </div>
  );
};
