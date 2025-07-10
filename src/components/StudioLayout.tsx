
import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainWorkArea } from './MainWorkArea';
import { ContextualDrawer } from './ContextualDrawer';

export type ActiveSection = 'solutions' | 'tools' | 'marketplace' | 'profile' | 'sandbox' | null;

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
  solutionId?: string;
}

export interface Capability {
  id: string;
  name: string;
  description?: string;
  isPurchased: boolean;
}

export const StudioLayout = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isSandbox, setIsSandbox] = useState<boolean>(false);
  const [sidebarPinned, setSidebarPinned] = useState<boolean>(true);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      window.location.href = '/marketplace';
      return;
    }

    if (section === 'sandbox') {
      setIsSandbox(true);
      setActiveSolution(null);
      setActiveChat(null);
      setActiveSection(null);
      return;
    }

    if (section === activeSection) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      setIsSandbox(false);
    }
  };

  const handleSolutionSelect = (solution: Solution) => {
    if (!solution.isPurchased) return; // Only allow purchased solutions
    
    setActiveSolution(solution);
    setActiveChat(null);
    setActiveSection(null);
    setIsSandbox(false);
  };

  const handleChatSelect = (chat: Chat, solution: Solution) => {
    if (!solution.isPurchased) return; // Only allow purchased solutions
    
    setActiveSolution(solution);
    setActiveChat(chat);
    setActiveSection(null);
    setIsSandbox(false);
  };

  const handleSandboxToggle = () => {
    setIsSandbox(!isSandbox);
    if (!isSandbox) {
      setActiveSolution(null);
      setActiveChat(null);
      setActiveSection(null);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarPinned(!sidebarPinned);
  };

  return (
    <div className="h-screen flex bg-background">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
        isPinned={sidebarPinned}
        onTogglePin={handleSidebarToggle}
        isSandbox={isSandbox}
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
        isSandbox={isSandbox}
        onSandboxToggle={handleSandboxToggle}
      />
    </div>
  );
};
