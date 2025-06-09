
import React from 'react';
import { Grid3X3, Zap, Bot, Database, Cloud, Settings, Code, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Connection {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  status: 'connected' | 'available' | 'coming-soon';
}

const connections: Connection[] = [
  {
    id: 'power-automate',
    name: 'Power Automate',
    icon: Workflow,
    description: 'Microsoft automation platform',
    status: 'connected'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: Zap,
    description: 'Automation workflows',
    status: 'available'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: Bot,
    description: 'AI models and APIs',
    status: 'connected'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: Database,
    description: 'Backend as a service',
    status: 'available'
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: Cloud,
    description: 'Amazon Web Services',
    status: 'coming-soon'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Code,
    description: 'Version control & CI/CD',
    status: 'available'
  },
  {
    id: 'custom-api',
    name: 'Custom API',
    icon: Settings,
    description: 'Your own integrations',
    status: 'available'
  }
];

export const AppLauncherDropdown = () => {
  const handleConnectionClick = (connection: Connection) => {
    console.log('Opening connection settings for:', connection.name);
    // This would typically open a configuration modal or navigate to settings
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-accent"
          title="App Launcher - Connections"
        >
          <Grid3X3 size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Connections</h3>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              Manage All
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {connections.map((connection) => {
              const IconComponent = connection.icon;
              return (
                <button
                  key={connection.id}
                  onClick={() => handleConnectionClick(connection)}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-accent/50 transition-colors group relative"
                  disabled={connection.status === 'coming-soon'}
                >
                  <div className={`p-2 rounded-lg mb-2 ${
                    connection.status === 'connected' 
                      ? 'bg-primary/10 text-primary' 
                      : connection.status === 'available'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted/50 text-muted-foreground/50'
                  }`}>
                    <IconComponent size={20} />
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${
                    connection.status === 'coming-soon' 
                      ? 'text-muted-foreground/50' 
                      : 'text-foreground'
                  }`}>
                    {connection.name}
                  </span>
                  
                  {connection.status === 'connected' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                  
                  {connection.status === 'coming-soon' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                      <span className="text-xs text-muted-foreground font-medium">Soon</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Connect external services to enhance your AI workflows
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
