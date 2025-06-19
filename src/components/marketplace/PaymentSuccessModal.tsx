
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { MarketplaceItem } from '@/pages/Marketplace';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchasedItems: MarketplaceItem[];
  onGoToStudio: () => void;
}

export const PaymentSuccessModal = ({ 
  isOpen, 
  onClose, 
  purchasedItems, 
  onGoToStudio 
}: PaymentSuccessModalProps) => {
  const solutions = purchasedItems.filter(item => item.category === 'solutions');
  const services = purchasedItems.filter(item => item.category === 'teams' || item.category === 'individuals');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-green-600">
            <CheckCircle size={20} />
            <span>Payment Successful!</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Thank you for your purchase! Your items are ready to use.
            </p>
          </div>

          {/* Purchased Items Summary */}
          <div className="space-y-4">
            {solutions.length > 0 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h3 className="font-medium text-sm mb-2 text-blue-800 dark:text-blue-200">
                  Solutions Added to My Solutions
                </h3>
                <div className="space-y-1">
                  {solutions.map(item => (
                    <p key={item.id} className="text-xs text-blue-700 dark:text-blue-300">
                      • {item.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {services.length > 0 && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <h3 className="font-medium text-sm mb-2 text-purple-800 dark:text-purple-200">
                  Engagement Requests Sent
                </h3>
                <div className="space-y-1">
                  {services.map(item => (
                    <p key={item.id} className="text-xs text-purple-700 dark:text-purple-300">
                      • {item.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Stay in Marketplace
            </Button>
            <Button onClick={onGoToStudio} className="flex-1">
              Go to Studio
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
