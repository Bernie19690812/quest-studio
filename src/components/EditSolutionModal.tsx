import React, { useState } from 'react';
import { Settings, User, Puzzle, Shield, Key, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Solution } from './StudioLayout';

interface EditSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: Solution;
  onSave: (updatedSolution: Solution) => void;
}

interface SolutionSettings {
  name: string;
  description: string;
  aiModel: string;
  systemPrompt: string;
  constraints: string;
  apiKeys: { name: string; value: string; }[];
}

type TabType = 'general' | 'personality' | 'components' | 'advanced';

export const EditSolutionModal = ({ isOpen, onClose, solution, onSave }: EditSolutionModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [settings, setSettings] = useState<SolutionSettings>({
    name: solution.title,
    description: solution.description || 'The General Agent is an autonomous task executor with access to a variety of specialized tools.',
    aiModel: 'gpt-4o',
    systemPrompt: `You are a helpful AI assistant designed to provide accurate and relevant responses. Always be respectful, professional, and aim to be as helpful as possible while staying within appropriate boundaries.`,
    constraints: 'Do not provide harmful, illegal, or inappropriate content. Always verify information when possible.',
    apiKeys: []
  });

  const handleSave = () => {
    console.log('Saving solution settings:', settings);
    onSave({ ...solution, title: settings.name, description: settings.description });
    onClose();
  };

  const addApiKey = () => {
    setSettings(prev => ({
      ...prev,
      apiKeys: [...prev.apiKeys, { name: '', value: '' }]
    }));
  };

  const updateApiKey = (index: number, field: 'name' | 'value', value: string) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.map((key, i) => 
        i === index ? { ...key, [field]: value } : key
      )
    }));
  };

  const removeApiKey = (index: number) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.filter((_, i) => i !== index)
    }));
  };

  const sidebarTabs = [
    { id: 'general' as TabType, label: 'General', icon: Settings },
    { id: 'personality' as TabType, label: 'Personality', icon: User },
    { id: 'components' as TabType, label: 'Components', icon: Puzzle },
    { id: 'advanced' as TabType, label: 'Advanced', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="solution-name" className="text-sm font-medium">
                Solution Name
              </Label>
              <Input
                id="solution-name"
                value={settings.name}
                onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">AI Model</Label>
              <RadioGroup
                value={settings.aiModel}
                onValueChange={(value) => setSettings(prev => ({ ...prev, aiModel: value }))}
                className="mt-3 space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="gpt-4o" id="gpt-4o" />
                  <div className="flex-1">
                    <Label htmlFor="gpt-4o" className="font-medium cursor-pointer">GPT-4o</Label>
                    <p className="text-sm text-muted-foreground">Most capable model</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="gpt-4o-mini" id="gpt-4o-mini" />
                  <div className="flex-1">
                    <Label htmlFor="gpt-4o-mini" className="font-medium cursor-pointer">GPT-4o Mini</Label>
                    <p className="text-sm text-muted-foreground">Faster responses</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="claude-3.5-sonnet" id="claude-3.5-sonnet" />
                  <div className="flex-1">
                    <Label htmlFor="claude-3.5-sonnet" className="font-medium cursor-pointer">Claude 3.5 Sonnet</Label>
                    <p className="text-sm text-muted-foreground">Excellent reasoning</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 'personality':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Prompt</CardTitle>
                <CardDescription>
                  The core instructions that define the AI's role and behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={settings.systemPrompt}
                  onChange={(e) => setSettings(prev => ({ ...prev, systemPrompt: e.target.value }))}
                  rows={8}
                  placeholder="Enter the system prompt that defines the AI's role, personality, and core instructions..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Constraints & Guidelines</CardTitle>
                <CardDescription>
                  Specific limitations and guidelines the AI should follow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={settings.constraints}
                  onChange={(e) => setSettings(prev => ({ ...prev, constraints: e.target.value }))}
                  rows={6}
                  placeholder="Enter specific constraints, limitations, or guidelines the AI should follow..."
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'components':
        return (
          <div className="space-y-6">
            <div className="text-center py-12 text-muted-foreground">
              <Puzzle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Components configuration coming soon</p>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key size={20} />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Configure API keys for external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.apiKeys.map((apiKey, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="API Key Name (e.g., OpenAI, Anthropic)"
                        value={apiKey.name}
                        onChange={(e) => updateApiKey(index, 'name', e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="API Key Value"
                        value={apiKey.value}
                        onChange={(e) => updateApiKey(index, 'value', e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeApiKey(index)}
                      className="mt-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addApiKey}
                  className="w-full"
                >
                  <Key size={16} className="mr-2" />
                  Add API Key
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-muted/30 border-r flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Settings size={20} />
                <h2 className="font-semibold">Solution Settings</h2>
              </div>
              <p className="text-sm text-muted-foreground">Configure your solution</p>
            </div>
            
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {sidebarTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold capitalize">{activeTab} Settings</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>

            <div className="border-t p-6 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};