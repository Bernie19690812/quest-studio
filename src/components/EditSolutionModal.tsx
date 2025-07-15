import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
export const EditSolutionModal = ({
  isOpen,
  onClose,
  solution,
  onSave
}: EditSolutionModalProps) => {
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
    setSettings(prev => ({
      ...prev,
      [field]: value[0]
    }));
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        

        <Tabs defaultValue="personality" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="personality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Personality</CardTitle>
                  <CardDescription>
                    Define how the AI should behave and respond to users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="persona">Persona</Label>
                    <Input id="persona" value={settings.persona} onChange={e => setSettings(prev => ({
                    ...prev,
                    persona: e.target.value
                  }))} placeholder="e.g., Professional Assistant, Creative Writer, Technical Expert" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={settings.tone} onValueChange={value => setSettings(prev => ({
                    ...prev,
                    tone: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="calm">Calm & Measured</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response-style">Response Style</Label>
                    <Select value={settings.responseStyle} onValueChange={value => setSettings(prev => ({
                    ...prev,
                    responseStyle: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="structured">Structured & Organized</SelectItem>
                        <SelectItem value="bullet-points">Bullet Points</SelectItem>
                        <SelectItem value="step-by-step">Step-by-Step</SelectItem>
                        <SelectItem value="narrative">Narrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verbosity">Verbosity</Label>
                    <Select value={settings.verbosity} onValueChange={value => setSettings(prev => ({
                    ...prev,
                    verbosity: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Parameters</CardTitle>
                  <CardDescription>
                    Fine-tune specific aspects of the AI's behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="agreeability">Agreeability</Label>
                      <span className="text-sm text-muted-foreground">{settings.agreeability}%</span>
                    </div>
                    <Slider value={[settings.agreeability]} onValueChange={value => handleSliderChange('agreeability', value)} max={100} step={5} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      How likely the AI is to agree with user requests vs. providing alternative perspectives
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="creativity">Creativity</Label>
                      <span className="text-sm text-muted-foreground">{settings.creativity}%</span>
                    </div>
                    <Slider value={[settings.creativity]} onValueChange={value => handleSliderChange('creativity', value)} max={100} step={5} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      How creative and novel the AI's responses should be vs. staying factual and conservative
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prompts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Prompt</CardTitle>
                  <CardDescription>
                    The core instructions that define the AI's role and behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea value={settings.systemPrompt} onChange={e => setSettings(prev => ({
                  ...prev,
                  systemPrompt: e.target.value
                }))} rows={8} placeholder="Enter the system prompt that defines the AI's role, personality, and core instructions..." />
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
                  <Textarea value={settings.constraints} onChange={e => setSettings(prev => ({
                  ...prev,
                  constraints: e.target.value
                }))} rows={6} placeholder="Enter specific constraints, limitations, or guidelines the AI should follow..." />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Example Interactions</CardTitle>
                  <CardDescription>
                    Provide examples of how the AI should respond to typical user queries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea value={settings.examples} onChange={e => setSettings(prev => ({
                  ...prev,
                  examples: e.target.value
                }))} rows={12} placeholder="Provide example conversations showing the desired interaction style:

User: [Example user input]
Assistant: [Example AI response]

User: [Another example]
Assistant: [Another response]" />
                  <p className="text-xs text-muted-foreground mt-2">
                    These examples help the AI understand the expected interaction style and response format.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
};