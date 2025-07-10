import React, { useState } from 'react';
import { Plus, MessageSquare, FileText, MoreHorizontal, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Solution, Chat } from './StudioLayout';
import { NewChatModal } from './NewChatModal';

interface SolutionsListProps {
  onSolutionSelect: (solution: Solution) => void;
  onChatSelect: (chat: Chat, solution: Solution) => void;
  onFileSelect: (file: any, solution: Solution) => void;
}

// Mock data for solutions with chats and files
const mockSolutions: Solution[] = [
  {
    id: '1',
    title: 'Customer Support Bot',
    description: 'AI-powered customer service solution',
    dateModified: new Date('2024-06-07'),
    status: 'active',
    isPurchased: true,
  },
  {
    id: '2',
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and insights',
    dateModified: new Date('2024-06-06'),
    status: 'draft',
    isPurchased: false,
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Marketing content creation assistant',
    dateModified: new Date('2024-06-05'),
    status: 'active',
    isPurchased: true,
  },
];

const mockChats: Record<string, Chat[]> = {
  '1': [
    { id: 'c1', name: 'Customer Query Analysis', dateModified: new Date('2024-06-07') },
    { id: 'c2', name: 'Response Templates', dateModified: new Date('2024-06-06') },
  ],
  '2': [
    { id: 'c3', name: 'Sales Data Review', dateModified: new Date('2024-06-06') },
  ],
  '3': [
    { id: 'c4', name: 'Blog Post Ideas', dateModified: new Date('2024-06-05') },
    { id: 'c5', name: 'Social Media Content', dateModified: new Date('2024-06-04') },
  ],
};

const mockFiles: Record<string, any[]> = {
  '1': [
    { id: 'f1', name: 'training_data.csv', type: 'csv', size: '2.4 MB' },
    { id: 'f2', name: 'customer_feedback.pdf', type: 'pdf', size: '1.8 MB' },
  ],
  '2': [
    { id: 'f3', name: 'sales_report.xlsx', type: 'xlsx', size: '5.2 MB' },
  ],
  '3': [
    { id: 'f4', name: 'brand_guidelines.pdf', type: 'pdf', size: '3.1 MB' },
  ],
};

export const SolutionsList = ({ onSolutionSelect, onChatSelect, onFileSelect }: SolutionsListProps) => {
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chats' | 'files'>('chats');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedSolutionForChat, setSelectedSolutionForChat] = useState<Solution | null>(null);

  // Filter to show only purchased solutions
  const purchasedSolutions = mockSolutions.filter(solution => solution.isPurchased);

  const handleSolutionClick = (solution: Solution) => {
    if (!solution.isPurchased) return;
    
    if (expandedSolution === solution.id) {
      setExpandedSolution(null);
    } else {
      setExpandedSolution(solution.id);
      setActiveTab('chats');
    }
  };

  const handleCreateChat = (solutionId: string) => {
    const solution = mockSolutions.find(s => s.id === solutionId);
    if (solution) {
      setSelectedSolutionForChat(solution);
      setShowNewChatModal(true);
    }
  };

  const handleNewChatCreate = (chatName: string) => {
    if (selectedSolutionForChat) {
      const newChat: Chat = {
        id: `c${Date.now()}`,
        name: chatName,
        dateModified: new Date(),
        messages: [],
      };
      onChatSelect(newChat, selectedSolutionForChat);
    }
    setShowNewChatModal(false);
    setSelectedSolutionForChat(null);
  };

  const getStatusColor = (status: Solution['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  return (
    <>
      <div className="space-y-3">
        {purchasedSolutions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No purchased solutions yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Visit the Marketplace to purchase solutions and start building.
            </p>
          </div>
        ) : (
          purchasedSolutions.map((solution) => (
            <div key={solution.id} className="border border-border rounded-lg overflow-hidden">
              {/* Solution Header */}
              <div 
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleSolutionClick(solution)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-foreground">{solution.title}</h4>
                      <Badge className={cn("text-xs", getStatusColor(solution.status))}>
                        {solution.status}
                      </Badge>
                    </div>
                    {solution.description && (
                      <p className="text-sm text-muted-foreground mb-2">{solution.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(solution.dateModified)}
                      </span>
                      <span>{mockChats[solution.id]?.length || 0} chats</span>
                      <span>{mockFiles[solution.id]?.length || 0} files</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSolutionSelect(solution);
                    }}
                  >
                    Open
                  </Button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSolution === solution.id && (
                <div className="border-t border-border">
                  {/* Tabs */}
                  <div className="flex border-b border-border">
                    <button
                      onClick={() => setActiveTab('chats')}
                      className={cn(
                        "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                        activeTab === 'chats'
                          ? "bg-accent text-accent-foreground border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Chats ({mockChats[solution.id]?.length || 0})
                    </button>
                    <button
                      onClick={() => setActiveTab('files')}
                      className={cn(
                        "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                        activeTab === 'files'
                          ? "bg-accent text-accent-foreground border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Files ({mockFiles[solution.id]?.length || 0})
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-4">
                    {activeTab === 'chats' && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-sm font-medium text-foreground">Recent Chats</h5>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCreateChat(solution.id)}
                            className="h-7 text-xs"
                          >
                            <Plus size={12} className="mr-1" />
                            New Chat
                          </Button>
                        </div>
                        {mockChats[solution.id]?.map((chat) => (
                          <div
                            key={chat.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 cursor-pointer"
                            onClick={() => onChatSelect(chat, solution)}
                          >
                            <div className="flex items-center gap-2">
                              <MessageSquare size={14} className="text-muted-foreground" />
                              <span className="text-sm text-foreground">{chat.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(chat.dateModified)}
                            </span>
                          </div>
                        )) || (
                          <p className="text-sm text-muted-foreground py-4 text-center">
                            No chats yet. Create your first chat to get started.
                          </p>
                        )}
                      </div>
                    )}

                    {activeTab === 'files' && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-sm font-medium text-foreground">Solution Files</h5>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                          >
                            <Plus size={12} className="mr-1" />
                            Upload
                          </Button>
                        </div>
                        {mockFiles[solution.id]?.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 cursor-pointer"
                            onClick={() => onFileSelect(file, solution)}
                          >
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-muted-foreground" />
                              <div>
                                <span className="text-sm text-foreground">{file.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">({file.size})</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal size={12} />
                            </Button>
                          </div>
                        )) || (
                          <p className="text-sm text-muted-foreground py-4 text-center">
                            No files uploaded. Upload files to use with this solution.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <NewChatModal
        open={showNewChatModal}
        onOpenChange={setShowNewChatModal}
        onCreateChat={handleNewChatCreate}
      />
    </>
  );
};
