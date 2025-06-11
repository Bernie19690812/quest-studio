
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MessageSquare, FileText, Image, FileIcon, MoreHorizontal, Star, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Solution, Chat } from './StudioLayout';

interface File {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
  dateUploaded: Date;
}

interface SolutionWithDetails extends Solution {
  chats: Chat[];
  files: File[];
  isFavorite?: boolean;
}

interface SolutionsListProps {
  onSolutionSelect: (solution: Solution) => void;
  onChatSelect?: (chat: Chat, solution: Solution) => void;
  onFileSelect?: (file: File, solution: Solution) => void;
}

// Enhanced mock data with one solution having many chats and files
const mockSolutionsWithDetails: SolutionWithDetails[] = [
  {
    id: '1',
    title: 'Customer Support Bot',
    description: 'AI-powered customer service solution',
    dateModified: new Date('2024-06-07'),
    status: 'active',
    isFavorite: true,
    chats: [
      { id: 'c1', name: 'Initial Setup Discussion', dateModified: new Date('2024-06-07'), messages: [] },
      { id: 'c2', name: 'Bot Training Questions', dateModified: new Date('2024-06-06'), messages: [] },
      { id: 'c3', name: 'Customer Journey Mapping', dateModified: new Date('2024-06-05'), messages: [] },
      { id: 'c4', name: 'Integration Planning', dateModified: new Date('2024-06-04'), messages: [] },
      { id: 'c5', name: 'Testing Scenarios', dateModified: new Date('2024-06-03'), messages: [] },
      { id: 'c6', name: 'Performance Optimization', dateModified: new Date('2024-06-02'), messages: [] },
      { id: 'c7', name: 'User Feedback Analysis', dateModified: new Date('2024-06-01'), messages: [] },
      { id: 'c8', name: 'Knowledge Base Setup', dateModified: new Date('2024-05-31'), messages: [] },
      { id: 'c9', name: 'Escalation Workflows', dateModified: new Date('2024-05-30'), messages: [] },
      { id: 'c10', name: 'Multi-language Support', dateModified: new Date('2024-05-29'), messages: [] },
      { id: 'c11', name: 'API Configuration', dateModified: new Date('2024-05-28'), messages: [] },
      { id: 'c12', name: 'Security & Privacy', dateModified: new Date('2024-05-27'), messages: [] },
      { id: 'c13', name: 'Analytics Dashboard', dateModified: new Date('2024-05-26'), messages: [] },
      { id: 'c14', name: 'Mobile Optimization', dateModified: new Date('2024-05-25'), messages: [] },
      { id: 'c15', name: 'A/B Testing Strategy', dateModified: new Date('2024-05-24'), messages: [] },
      { id: 'c16', name: 'Voice Integration', dateModified: new Date('2024-05-23'), messages: [] },
      { id: 'c17', name: 'Sentiment Analysis', dateModified: new Date('2024-05-22'), messages: [] },
      { id: 'c18', name: 'Custom Training Data', dateModified: new Date('2024-05-21'), messages: [] },
      { id: 'c19', name: 'Deployment Checklist', dateModified: new Date('2024-05-20'), messages: [] },
      { id: 'c20', name: 'Maintenance Schedule', dateModified: new Date('2024-05-19'), messages: [] },
      { id: 'c21', name: 'User Training Materials', dateModified: new Date('2024-05-18'), messages: [] },
      { id: 'c22', name: 'Backup & Recovery', dateModified: new Date('2024-05-17'), messages: [] },
      { id: 'c23', name: 'Cost Optimization', dateModified: new Date('2024-05-16'), messages: [] },
      { id: 'c24', name: 'Compliance Review', dateModified: new Date('2024-05-15'), messages: [] },
      { id: 'c25', name: 'Launch Strategy', dateModified: new Date('2024-05-14'), messages: [] },
    ],
    files: [
      { id: 'f1', name: 'requirements.pdf', type: 'pdf', dateUploaded: new Date('2024-06-05') },
      { id: 'f2', name: 'wireframe.png', type: 'image', dateUploaded: new Date('2024-06-04') },
      { id: 'f3', name: 'user-personas.doc', type: 'doc', dateUploaded: new Date('2024-06-03') },
      { id: 'f4', name: 'api-documentation.pdf', type: 'pdf', dateUploaded: new Date('2024-06-02') },
      { id: 'f5', name: 'flow-diagram.png', type: 'image', dateUploaded: new Date('2024-06-01') },
      { id: 'f6', name: 'training-data.csv', type: 'other', dateUploaded: new Date('2024-05-31') },
      { id: 'f7', name: 'test-scripts.doc', type: 'doc', dateUploaded: new Date('2024-05-30') },
      { id: 'f8', name: 'ui-mockups.png', type: 'image', dateUploaded: new Date('2024-05-29') },
      { id: 'f9', name: 'deployment-guide.pdf', type: 'pdf', dateUploaded: new Date('2024-05-28') },
      { id: 'f10', name: 'security-checklist.doc', type: 'doc', dateUploaded: new Date('2024-05-27') },
      { id: 'f11', name: 'analytics-setup.pdf', type: 'pdf', dateUploaded: new Date('2024-05-26') },
      { id: 'f12', name: 'brand-assets.zip', type: 'other', dateUploaded: new Date('2024-05-25') },
      { id: 'f13', name: 'user-feedback.csv', type: 'other', dateUploaded: new Date('2024-05-24') },
      { id: 'f14', name: 'performance-metrics.pdf', type: 'pdf', dateUploaded: new Date('2024-05-23') },
      { id: 'f15', name: 'integration-diagram.png', type: 'image', dateUploaded: new Date('2024-05-22') },
    ],
  },
  {
    id: '2',
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and insights',
    dateModified: new Date('2024-06-06'),
    status: 'draft',
    chats: [
      { id: 'c26', name: 'Data Source Planning', dateModified: new Date('2024-06-06'), messages: [] },
      { id: 'c27', name: 'Pipeline Architecture', dateModified: new Date('2024-06-05'), messages: [] },
    ],
    files: [
      { id: 'f16', name: 'dataset.csv', type: 'other', dateUploaded: new Date('2024-06-03') },
      { id: 'f17', name: 'schema-design.pdf', type: 'pdf', dateUploaded: new Date('2024-06-02') },
    ],
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Marketing content creation assistant',
    dateModified: new Date('2024-06-05'),
    status: 'active',
    chats: [
      { id: 'c28', name: 'Content Strategy', dateModified: new Date('2024-06-05'), messages: [] },
      { id: 'c29', name: 'Template Design', dateModified: new Date('2024-06-04'), messages: [] },
    ],
    files: [
      { id: 'f18', name: 'brand-guidelines.pdf', type: 'pdf', dateUploaded: new Date('2024-06-01') },
    ],
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return FileText;
    case 'image':
      return Image;
    case 'doc':
      return FileIcon;
    default:
      return FileIcon;
  }
};

export const SolutionsList = ({ onSolutionSelect, onChatSelect, onFileSelect }: SolutionsListProps) => {
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSolution = (solutionId: string) => {
    const newExpanded = new Set(expandedSolutions);
    if (newExpanded.has(solutionId)) {
      newExpanded.delete(solutionId);
    } else {
      newExpanded.add(solutionId);
    }
    setExpandedSolutions(newExpanded);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="space-y-2">
      {mockSolutionsWithDetails.map((solution) => {
        const isExpanded = expandedSolutions.has(solution.id);
        const chatsExpanded = expandedSections.has(`${solution.id}-chats`);
        const filesExpanded = expandedSections.has(`${solution.id}-files`);

        return (
          <div key={solution.id} className="border border-border rounded-lg">
            {/* Solution Header */}
            <div className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleSolution(solution.id)}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </Button>
                
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => onSolutionSelect(solution)}
                >
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{solution.title}</h4>
                    {solution.isFavorite && <Star size={12} className="text-yellow-500 fill-current" />}
                  </div>
                  {solution.description && (
                    <p className="text-sm text-muted-foreground mt-1">{solution.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    solution.status === 'active' 
                      ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                      : solution.status === 'draft'
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                  )}>
                    {solution.status}
                  </span>
                  
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal size={12} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t border-border bg-accent/20">
                {/* Chats Section */}
                <div className="p-2">
                  <div className="flex items-center gap-2 p-2 hover:bg-accent/30 rounded cursor-pointer"
                       onClick={() => toggleSection(`${solution.id}-chats`)}>
                    {chatsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <MessageSquare size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium">Chats ({solution.chats.length})</span>
                  </div>
                  
                  {chatsExpanded && (
                    <div className="ml-6 mt-1 space-y-1 max-h-48 overflow-y-auto">
                      {solution.chats.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">No chats created yet</p>
                      ) : (
                        solution.chats.map((chat) => (
                          <div
                            key={chat.id}
                            className="flex items-center justify-between p-2 hover:bg-accent/50 rounded cursor-pointer group"
                            onClick={() => onChatSelect?.(chat, solution)}
                          >
                            <span className="text-sm text-foreground">{chat.name}</span>
                            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-5 w-5">
                                <Edit2 size={10} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-5 w-5">
                                <Trash2 size={10} />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Files Section */}
                <div className="p-2 border-t border-border/50">
                  <div className="flex items-center gap-2 p-2 hover:bg-accent/30 rounded cursor-pointer"
                       onClick={() => toggleSection(`${solution.id}-files`)}>
                    {filesExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <FileIcon size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium">Files ({solution.files.length})</span>
                  </div>
                  
                  {filesExpanded && (
                    <div className="ml-6 mt-1 space-y-1 max-h-48 overflow-y-auto">
                      {solution.files.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">No files uploaded yet</p>
                      ) : (
                        solution.files.map((file) => {
                          const FileIconComponent = getFileIcon(file.type);
                          return (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-2 hover:bg-accent/50 rounded cursor-pointer group"
                              onClick={() => onFileSelect?.(file, solution)}
                            >
                              <div className="flex items-center gap-2">
                                <FileIconComponent size={14} className="text-muted-foreground" />
                                <span className="text-sm text-foreground">{file.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {file.dateUploaded.toLocaleDateString()}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
