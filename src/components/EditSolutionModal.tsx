import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Solution } from './StudioLayout';

interface EditSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: Solution;
  onSave: (updatedSolution: Solution) => void;
}

interface SolutionSettings {
  persona: string;
  tone: string;
  agreeability: number;
  creativity: number;
  verbosity: string;
  responseStyle: string;
  systemPrompt: string;
  constraints: string;
  examples: string;
}

export const EditSolutionModal = ({ isOpen, onClose, solution, onSave }: EditSolutionModalProps) => {
  const [settings, setSettings] = useState<SolutionSettings>({
    persona: 'Professional Assistant',
    tone: 'friendly',
    agreeability: 75,
    creativity: 50,
    verbosity: 'balanced',
    responseStyle: 'conversational',
    systemPrompt: `You are a helpful AI assistant designed to provide accurate and relevant responses. Always be respectful, professional, and aim to be as helpful as possible while staying within appropriate boundaries.`,
    constraints: 'Do not provide harmful, illegal, or inappropriate content. Always verify information when possible.',
    examples: 'User: "Help me with customer service"\nAssistant: "I\'d be happy to help you with customer service! Could you tell me more about the specific situation or challenge you\'re facing?"'
  });

  const handleSave = () => {
    // In a real implementation, you would save these settings to the solution
    console.log('Saving solution settings:', settings);
    onSave(solution);
    onClose();
  };

  const handleSliderChange = (field: 'agreeability' | 'creativity', value: number[]) => {
    setSettings(prev => ({ ...prev, [field]: value[0] }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Settings size={20} />
            Edit Solution: {solution.title}
          </DialogTitle>
          <DialogDescription>
            Customize the AI personality, behavior, and response style for this solution.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">

          <div className="flex-1 overflow-y-auto mt-4">
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
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};