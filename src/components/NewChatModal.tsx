
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NewChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChat: (chatName: string) => void;
}

export const NewChatModal = ({ open, onOpenChange, onCreateChat }: NewChatModalProps) => {
  const [chatName, setChatName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatName.trim()) {
      onCreateChat(chatName.trim());
      setChatName('');
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setChatName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chatName">Chat Name</Label>
            <Input
              id="chatName"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder="Enter chat name..."
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!chatName.trim()}>
              Create Chat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
