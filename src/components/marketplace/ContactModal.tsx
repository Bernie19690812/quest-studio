import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: 'team' | 'individual' | 'solution';
}
export const ContactModal = ({
  isOpen,
  onClose,
  itemName,
  itemType
}: ContactModalProps) => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Show success toast
    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${itemName}. They will get back to you soon.`
    });

    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
    onClose();
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const getModalTitle = () => {
    switch (itemType) {
      case 'team':
        return `Contact ${itemName}`;
      case 'individual':
        return `Message ${itemName}`;
      case 'solution':
        return `Request Access to ${itemName}`;
      default:
        return `Contact ${itemName}`;
    }
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Your full name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="your.email@company.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={formData.company} onChange={e => handleInputChange('company', e.target.value)} placeholder="Your company name (optional)" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" value={formData.message} onChange={e => handleInputChange('message', e.target.value)} placeholder={`Tell ${itemName} about your project requirements...`} rows={4} required />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">Request Access</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};