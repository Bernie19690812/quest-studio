
import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainWorkArea } from './MainWorkArea';
import { ToolsDrawer } from './ToolsDrawer';

export type ActiveSection = 'solutions' | 'tools' | 'marketplace' | 'profile' | null;

export interface Solution {
  id: string;
  title: string;
  description?: string;
  dateModified: Date;
  status: 'active' | 'draft' | 'archived';
}

export interface Chat {
  id: string;
  name: string;
  dateModified: Date;
  messages?: any[];
}

export const StudioLayout = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [isToolsDrawerOpen, setIsToolsDrawerOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState<Solution | null>({
    id: '1',
    title: 'Finance Analyzer',
    description: 'Financial document processing solution',
    dateModified: new Date(),
    status: 'active'
  });
  const [activeChat, setActiveChat] = useState<Chat | null>({
    id: '1',
    name: 'Invoice Processing Chat',
    dateModified: new Date(),
    messages: []
  });

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      window.location.href = '/marketplace';
      return;
    }

    if (section === 'tools') {
      setIsToolsDrawerOpen(!isToolsDrawerOpen);
      setActiveSection(isToolsDrawerOpen ? null : section);
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

  return (
    <div className="h-screen flex bg-background">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
        isToolsDrawerOpen={isToolsDrawerOpen}
      />
      <ToolsDrawer 
        isOpen={isToolsDrawerOpen}
        onClose={() => {
          setIsToolsDrawerOpen(false);
          setActiveSection(null);
        }}
      />
      <MainWorkArea 
        activeSolution={activeSolution}
        activeChat={activeChat}
        onCreateSolution={() => {
          setActiveSection('solutions');
        }}
      />
    </div>
  );
};
