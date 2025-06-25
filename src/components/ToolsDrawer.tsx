
import React from 'react';
import { X, Brain, Wrench, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ToolsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const capabilities = [
  { id: '1', name: 'Image Annotator', icon: Brain, type: 'capability' as const },
  { id: '2', name: 'Document Understanding', icon: Brain, type: 'capability' as const },
  { id: '3', name: 'Audio Transcription', icon: Brain, type: 'capability' as const },
  { id: '4', name: 'Data Extraction', icon: Brain, type: 'capability' as const },
];

const solutions = [
  { id: '5', name: 'Text Processor', icon: Wrench, type: 'solution' as const },
  { id: '6', name: 'Report Generator', icon: Wrench, type: 'solution' as const },
];

const getIconColor = (type: 'capability' | 'solution' | 'template') => {
  switch (type) {
    case 'capability':
      return 'text-blue-400';
    case 'solution':
      return 'text-emerald-400';
    default:
      return 'text-amber-400';
  }
};

export const ToolsDrawer = ({ isOpen, onClose }: ToolsDrawerProps) => {
  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 overflow-hidden",
      isOpen ? "w-80" : "w-0"
    )}>
      {isOpen && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            <h2 className="font-semibold text-foreground">My Tools</h2>
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
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="capabilities" className="flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="capabilities" className="flex-1 overflow-hidden m-0 p-4 pt-4">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {capabilities.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <div
                          key={tool.id}
                          className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-grab transition-colors"
                          draggable
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                              <IconComponent size={16} className={getIconColor(tool.type)} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-foreground">{tool.name}</h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="solutions" className="flex-1 overflow-hidden m-0 p-4 pt-4">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {solutions.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <div
                          key={tool.id}
                          className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-grab transition-colors"
                          draggable
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                              <IconComponent size={16} className={getIconColor(tool.type)} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-foreground">{tool.name}</h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};
