
import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainWorkArea } from './MainWorkArea';
import { ContextualDrawer } from './ContextualDrawer';

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
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      window.open('/marketplace', '_blank');
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
    setActiveSection('solutions');
  };

  return (
    <div className="h-screen flex bg-background">
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
      />
      <MainWorkArea 
        activeSolution={activeSolution}
        activeChat={activeChat}
        onCreateSolution={handleCreateSolution}
      />
    </div>
  );
};
