
import React from 'react';
import { Grid3X3, Share, FileText, Database, Cloud, Settings, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Connection {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

const connections: Connection[] = [
  {
    id: 'sharepoint',
    name: 'SharePoint',
    icon: Share,
    description: 'Connect to Microsoft SharePoint',
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: FileText,
    description: 'Integrate with Notion workspace',
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    description: 'Connect to databases',
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    icon: Cloud,
    description: 'Connect to cloud storage',
  },
  {
    id: 'automation',
    name: 'Power Automate',
    icon: Settings,
    description: 'Workflow automation',
  },
];

export const AppLauncherDropdown = () => {
  const handleConnectionClick = (connection: Connection) => {
    console.log(`Opening connection: ${connection.name}`);
    // TODO: Implement connection configuration
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-accent"
          title="App Launcher - Available Connections"
        >
          <Grid3X3 size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Available Connections</h3>
          <div className="grid grid-cols-2 gap-3">
            {connections.map((connection) => {
              const IconComponent = connection.icon;
              return (
                <button
                  key={connection.id}
                  onClick={() => handleConnectionClick(connection)}
                  className="flex flex-col items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors text-center"
                >
                  <IconComponent size={24} className="text-foreground mb-2" />
                  <span className="text-sm font-medium text-foreground">{connection.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">{connection.description}</span>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
