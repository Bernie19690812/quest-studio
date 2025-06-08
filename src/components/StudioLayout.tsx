
import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainChatArea } from './MainChatArea';
import { RightPanel } from './RightPanel';

export type ActiveSection = 'solutions' | 'items' | 'marketplace' | 'profile' | null;

export const StudioLayout = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const handleSectionClick = (section: ActiveSection) => {
    if (section === activeSection && isRightPanelOpen) {
      setIsRightPanelOpen(false);
      setActiveSection(null);
    } else {
      setActiveSection(section);
      setIsRightPanelOpen(true);
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick}
      />
      <MainChatArea />
      <RightPanel 
        isOpen={isRightPanelOpen}
        activeSection={activeSection}
        onClose={() => {
          setIsRightPanelOpen(false);
          setActiveSection(null);
        }}
      />
    </div>
  );
};
