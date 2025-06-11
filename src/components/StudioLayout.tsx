
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      // Navigate to marketplace page
      window.location.href = '/marketplace';
      return;
    }

    if (section === activeSection && isDrawerOpen) {
      setIsDrawerOpen(false);
      setActiveSection(null);
    } else {
      setActiveSection(section);
      setIsDrawerOpen(true);
    }
  };

  const handleSolutionSelect = (solution: Solution) => {
    setActiveSolution(solution);
    setActiveChat(null); // Reset chat when switching solutions
    setIsDrawerOpen(false);
    setActiveSection(null);
  };

  const handleChatSelect = (chat: Chat, solution: Solution) => {
    setActiveSolution(solution);
    setActiveChat(chat);
    setIsDrawerOpen(false);
    setActiveSection(null);
  };

  return (
    <div className="h-screen flex bg-background">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
      />
      <ContextualDrawer 
        isOpen={isDrawerOpen}
        activeSection={activeSection}
        activeSolution={activeSolution}
        onClose={() => {
          setIsDrawerOpen(false);
          setActiveSection(null);
        }}
        onSolutionSelect={handleSolutionSelect}
        onChatSelect={handleChatSelect}
      />
      <MainWorkArea 
        activeSolution={activeSolution}
        activeChat={activeChat}
        onCreateSolution={() => {
          setActiveSection('solutions');
          setIsDrawerOpen(true);
        }}
      />
    </div>
  );
};
