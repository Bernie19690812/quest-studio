
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface CalendarBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: 'team' | 'individual';
}

// Mock available time slots for demonstration
const mockTimeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export const CalendarBookingModal = ({
  isOpen,
  onClose,
  itemName,
  itemType
}: CalendarBookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Both date and time are required to schedule a meeting.",
        variant: "destructive"
      });
      return;
    }

    setIsConfirming(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsConfirmed(true);
      setIsConfirming(false);
      
      toast({
        title: "Meeting Scheduled!",
        description: `Your meeting with ${itemName} has been scheduled for ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime}.`,
      });
    }, 1500);
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime('');
    setMessage('');
    setIsConfirmed(false);
    setIsConfirming(false);
    onClose();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isWeekend(date);
  };

  if (isConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4 py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Meeting Scheduled!</h3>
              <p className="text-muted-foreground">
                Your meeting with <span className="font-medium">{itemName}</span> has been confirmed for{' '}
                <span className="font-medium">
                  {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                </span>
              </p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Schedule Meeting with {itemName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meeting Type Badge */}
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <Badge variant="outline" className="capitalize">
              {itemType} Meeting
            </Badge>
          </div>

          {/* Calendar and Time Selection - Side by Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Date Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Date</Label>
              <div className="border rounded-lg p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className={cn("w-full pointer-events-auto")}
                  initialFocus
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Available Monday through Friday. Weekends are not available.
              </p>
            </div>

            {/* Right Side - Time Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Available Time Slots</span>
              </Label>
              
              {selectedDate ? (
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Available times for <span className="font-medium text-foreground">
                        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                      </span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {mockTimeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-sm justify-center"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-muted rounded-lg">
                  <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Please select a date to view available time slots
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message/Agenda */}
          {selectedDate && selectedTime && (
            <div className="space-y-3">
              <Label htmlFor="message" className="text-sm font-medium">
                Meeting Agenda (Optional)
              </Label>
              <Textarea
                id="message"
                placeholder={`Brief description of what you'd like to discuss with ${itemName}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={250}
              />
              <p className="text-xs text-muted-foreground">
                {message.length}/250 characters
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmBooking} 
              disabled={!selectedDate || !selectedTime || isConfirming}
              className="flex-1"
            >
              {isConfirming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Scheduling...
                </>
              ) : (
                'Confirm Meeting'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
