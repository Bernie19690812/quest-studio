
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Solution } from './StudioLayout';

interface CreateSolutionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSolutionCreate: (solution: Solution) => void;
}

export const CreateSolutionModal = ({ open, onOpenChange, onSolutionCreate }: CreateSolutionModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSolution: Solution = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      dateModified: new Date(),
      status: 'draft',
      isPurchased: false, // Default to false since manual creation shouldn't create purchased solutions
    };

    onSolutionCreate(newSolution);
    setTitle('');
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Solution</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Solution Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter solution name..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this solution does..."
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Solution</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
