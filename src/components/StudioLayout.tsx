
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

export const StudioLayout = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === 'marketplace') {
      // Open marketplace in new tab
      window.open('https://marketplace.quest.ai', '_blank');
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
      />
      <MainWorkArea 
        activeSolution={activeSolution}
        onCreateSolution={() => {
          setActiveSection('solutions');
          setIsDrawerOpen(true);
        }}
      />
    </div>
  );
};
