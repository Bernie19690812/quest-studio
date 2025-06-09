
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MessageSquare, FileText, Image, FileIcon, PdfIcon, Plus, MoreHorizontal, Star, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Solution } from './StudioLayout';

interface Chat {
  id: string;
  name: string;
  dateModified: Date;
}

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'text' | 'other';
  size: string;
  dateModified: Date;
}

interface ExtendedSolution extends Solution {
  chats: Chat[];
  files: FileItem[];
  isFavorite?: boolean;
}

interface SolutionsListProps {
  onSolutionSelect: (solution: Solution) => void;
  onClose: () => void;
}

// Mock data with chats and files
const mockSolutionsWithData: ExtendedSolution[] = [
  {
    id: '1',
    title: 'Customer Support Bot',
    description: 'AI-powered customer service solution',
    dateModified: new Date('2024-06-07'),
    status: 'active',
    isFavorite: true,
    chats: [
      { id: 'chat-1', name: 'Initial Setup', dateModified: new Date('2024-06-07') },
      { id: 'chat-2', name: 'Bot Training', dateModified: new Date('2024-06-06') },
      { id: 'chat-3', name: 'Testing Phase', dateModified: new Date('2024-06-05') },
    ],
    files: [
      { id: 'file-1', name: 'training_data.pdf', type: 'pdf', size: '2.4 MB', dateModified: new Date('2024-06-07') },
      { id: 'file-2', name: 'bot_responses.txt', type: 'text', size: '156 KB', dateModified: new Date('2024-06-06') },
      { id: 'file-3', name: 'ui_mockup.png', type: 'image', size: '892 KB', dateModified: new Date('2024-06-05') },
    ],
  },
  {
    id: '2',
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and insights',
    dateModified: new Date('2024-06-06'),
    status: 'draft',
    chats: [
      { id: 'chat-4', name: 'Data Pipeline Setup', dateModified: new Date('2024-06-06') },
    ],
    files: [
      { id: 'file-4', name: 'sample_data.csv', type: 'other', size: '15.2 MB', dateModified: new Date('2024-06-06') },
    ],
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Marketing content creation assistant',
    dateModified: new Date('2024-06-05'),
    status: 'active',
    chats: [],
    files: [],
  },
];

const getFileIcon = (type: FileItem['type']) => {
  switch (type) {
    case 'pdf':
      return PdfIcon;
    case 'image':
      return Image;
    case 'doc':
      return FileText;
    case 'text':
      return FileText;
    default:
      return FileIcon;
  }
};

const SolutionItem = ({ 
  solution, 
  onSolutionSelect, 
  onChatSelect, 
  onClose 
}: { 
  solution: ExtendedSolution; 
  onSolutionSelect: (solution: Solution) => void;
  onChatSelect: (chat: Chat, solution: Solution) => void;
  onClose: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatsExpanded, setChatsExpanded] = useState(false);
  const [filesExpanded, setFilesExpanded] = useState(false);

  const handleSolutionClick = () => {
    onSolutionSelect(solution);
    onClose();
  };

  const handleChatClick = (chat: Chat) => {
    onChatSelect(chat, solution);
    onClose();
  };

  const handleSolutionAction = (action: string) => {
    console.log(`${action} solution:`, solution.title);
    // TODO: Implement actual actions
  };

  return (
    <div className="border border-border rounded-lg">
      <div className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors">
        <div className="flex items-center flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 mr-2 flex-shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
          
          <div className="flex-1 min-w-0 cursor-pointer" onClick={handleSolutionClick}>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground truncate">{solution.title}</h4>
              {solution.isFavorite && <Star size={12} className="text-yellow-500 fill-current flex-shrink-0" />}
            </div>
            {solution.description && (
              <p className="text-sm text-muted-foreground truncate">{solution.description}</p>
            )}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">
                {solution.dateModified.toLocaleDateString()}
              </span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                solution.status === 'active' 
                  ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                  : solution.status === 'draft'
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
              )}>
                {solution.status}
              </span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSolutionAction('rename')}>
              <Edit size={14} className="mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSolutionAction('favorite')}>
              <Star size={14} className="mr-2" />
              {solution.isFavorite ? 'Unfavorite' : 'Favorite'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSolutionAction('delete')} className="text-destructive">
              <Trash2 size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isExpanded && (
        <div className="border-t border-border bg-accent/20">
          {/* Chats Section */}
          <Collapsible open={chatsExpanded} onOpenChange={setChatsExpanded}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  {chatsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <MessageSquare size={14} />
                  <span className="text-sm font-medium">Chats ({solution.chats.length})</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Create new chat for solution:', solution.title);
                  }}
                >
                  <Plus size={12} />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pl-8 pr-3 pb-2">
                {solution.chats.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-2">No chats created yet</p>
                ) : (
                  <div className="space-y-1">
                    {solution.chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleChatClick(chat)}
                        className="flex items-center justify-between p-2 rounded hover:bg-accent/50 transition-colors cursor-pointer group"
                      >
                        <div>
                          <p className="text-sm text-foreground">{chat.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {chat.dateModified.toLocaleDateString()}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal size={12} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log('Rename chat:', chat.name)}>
                              <Edit size={12} className="mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Delete chat:', chat.name)} className="text-destructive">
                              <Trash2 size={12} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Files Section */}
          <Collapsible open={filesExpanded} onOpenChange={setFilesExpanded}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors cursor-pointer border-t border-border">
                <div className="flex items-center gap-2">
                  {filesExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <FileText size={14} />
                  <span className="text-sm font-medium">Files ({solution.files.length})</span>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pl-8 pr-3 pb-2">
                {solution.files.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-2">No files uploaded yet</p>
                ) : (
                  <div className="space-y-1">
                    {solution.files.map((file) => {
                      const IconComponent = getFileIcon(file.type);
                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-2 rounded hover:bg-accent/50 transition-colors cursor-pointer group"
                          onClick={() => console.log('Open file:', file.name)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <IconComponent size={14} className="flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.size} • {file.dateModified.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal size={12} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => console.log('Download file:', file.name)}>
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log('Rename file:', file.name)}>
                                <Edit size={12} className="mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log('Delete file:', file.name)} className="text-destructive">
                                <Trash2 size={12} className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
};

export const SolutionsList = ({ onSolutionSelect, onClose }: SolutionsListProps) => {
  const handleChatSelect = (chat: Chat, solution: Solution) => {
    // TODO: Update the main work area to show this specific chat
    console.log('Selected chat:', chat.name, 'from solution:', solution.title);
    onSolutionSelect(solution);
  };

  return (
    <div className="space-y-3">
      {mockSolutionsWithData.map((solution) => (
        <SolutionItem
          key={solution.id}
          solution={solution}
          onSolutionSelect={onSolutionSelect}
          onChatSelect={handleChatSelect}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
