
import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainWorkArea } from './MainWorkArea';
import { ContextualDrawer } from './ContextualDrawer';

export type ActiveSection = 'solutions' | 'sandbox' | 'tools' | 'marketplace' | 'profile' | null;

export interface Solution {
  id: string;
  title: string;
  description?: string;
  dateModified: Date;
  status: 'active' | 'draft' | 'archived';
  isPurchased: boolean;
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
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      window.location.href = '/marketplace';
      return;
    }

    if (section === 'sandbox') {
      setIsSandboxMode(true);
      setActiveSolution(null);
      setActiveChat(null);
      setActiveSection(null);
      return;
    }

    if (section === activeSection) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      setIsSandboxMode(false);
    }
  };

  const handleSolutionSelect = (solution: Solution) => {
    if (!solution.isPurchased) {
      // Redirect to marketplace to purchase
      window.location.href = '/marketplace';
      return;
    }
    
    setActiveSolution(solution);
    setActiveChat(null);
    setActiveSection(null);
    setIsSandboxMode(false);
  };

  const handleChatSelect = (chat: Chat, solution: Solution) => {
    if (!solution.isPurchased) return;
    
    setActiveSolution(solution);
    setActiveChat(chat);
    setActiveSection(null);
    setIsSandboxMode(false);
  };

  const handleExitSandbox = () => {
    setIsSandboxMode(false);
  };

  return (
    <div className="h-screen flex bg-background">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
        isSandboxActive={isSandboxMode}
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
        isSandboxMode={isSandboxMode}
        onExitSandbox={handleExitSandbox}
      />
    </div>
  );
};
