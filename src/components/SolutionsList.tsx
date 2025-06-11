
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MessageSquare, FileText, Image, FileIcon, MoreHorizontal, Star, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Solution } from './StudioLayout';

interface Chat {
  id: string;
  name: string;
  dateModified: Date;
}

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

// Mock data with chats and files
const mockSolutionsWithDetails: SolutionWithDetails[] = [
  {
    id: '1',
    title: 'Customer Support Bot',
    description: 'AI-powered customer service solution',
    dateModified: new Date('2024-06-07'),
    status: 'active',
    isFavorite: true,
    chats: [
      { id: 'c1', name: 'Initial Setup Discussion', dateModified: new Date('2024-06-07') },
      { id: 'c2', name: 'Bot Training Questions', dateModified: new Date('2024-06-06') },
    ],
    files: [
      { id: 'f1', name: 'requirements.pdf', type: 'pdf', dateUploaded: new Date('2024-06-05') },
      { id: 'f2', name: 'wireframe.png', type: 'image', dateUploaded: new Date('2024-06-04') },
    ],
  },
  {
    id: '2',
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and insights',
    dateModified: new Date('2024-06-06'),
    status: 'draft',
    chats: [],
    files: [
      { id: 'f3', name: 'dataset.csv', type: 'other', dateUploaded: new Date('2024-06-03') },
    ],
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Marketing content creation assistant',
    dateModified: new Date('2024-06-05'),
    status: 'active',
    chats: [
      { id: 'c3', name: 'Content Strategy', dateModified: new Date('2024-06-05') },
    ],
    files: [],
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
                    <div className="ml-6 mt-1 space-y-1">
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
                    <div className="ml-6 mt-1 space-y-1">
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
