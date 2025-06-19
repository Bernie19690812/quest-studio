
import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Plus, User, CalendarIcon, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MarketplaceItem } from '@/pages/Marketplace';
import { ContactModal } from './ContactModal';
import { CalendarBookingModal } from './CalendarBookingModal';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onAddToCart: (item: MarketplaceItem) => void;
  onToggleFavorite: (item: MarketplaceItem) => void;
  onOpenModal: (item: MarketplaceItem) => void;
  isFavorited: boolean;
}

export const MarketplaceCard = ({
  item,
  onAddToCart,
  onToggleFavorite,
  onOpenModal,
  isFavorited
}: MarketplaceCardProps) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} size={12} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} />);
  };

  const showContactUs = item.category === 'solutions' || item.category === 'individuals' || item.category === 'teams';

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.category === 'solutions') {
      setContactModalOpen(true);
    } else {
      setCalendarModalOpen(true);
    }
  };

  const getTeamContent = () => {
    if (item.category === 'teams') {
      const teamNames = ['4WD Squad', 'Alpha Team', 'Phoenix Squad', 'Delta Force', 'Nexus Team'];
      const roleDescriptions = ['This innovation centered team comprises a frontend developer, scrum master, backend engineer, and DevOps specialist', 'Cross-functional squad with product manager, full-stack developers, and UX designer', 'Agile team featuring frontend specialist, backend architect, QA engineer, and team lead', 'High-performance squad with React developer, Node.js expert, cloud engineer, and project coordinator', 'Collaborative team including UI/UX designer, full-stack engineer, database specialist, and scrum master'];
      const index = Math.abs(item.name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % teamNames.length;
      return {
        teamName: teamNames[index],
        roleComposition: roleDescriptions[index]
      };
    }
    return null;
  };

  const teamContent = getTeamContent();

  return <TooltipProvider>
      <Card className="netflix-card min-w-[280px] max-w-[280px] cursor-pointer group">
        <div onClick={() => onOpenModal(item)} className="p-0">
          {/* Image Area */}
          <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
            {item.featured && <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Featured
              </Badge>}
            <div className="text-center space-y-2">
              {item.category === 'individuals' ? <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div> : <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center">
                  <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-8 h-8" />
                </div>}
            </div>
            
            {/* Overlay with actions on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Button variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
                View Details
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-tight">
                {item.category === 'teams' && teamContent ? teamContent.teamName : item.name}
              </h3>
              {item.category === 'individuals' && <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-primary">Frontend Developer</p>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {item.level || 'Senior'}
                  </Badge>
                </div>}
              {item.category === 'teams' && teamContent && <p className="text-xs mt-1 text-gray-400">{teamContent.roleComposition}</p>}
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag, index) => <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                  {tag}
                </Badge>)}
              {item.tags.length > 2 && <Badge variant="outline" className="text-xs px-2 py-0">
                  +{item.tags.length - 2}
                </Badge>}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {renderStars(Math.floor(item.rating))}
              <span className="text-xs text-muted-foreground ml-1">
                {item.rating} ({item.reviewCount})
              </span>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold text-foreground">
                  ${item.price}
                </span>
                {item.type === 'service' && <span className="text-xs text-muted-foreground">/hr</span>}
              </div>
              
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" onClick={e => {
                e.stopPropagation();
                onToggleFavorite(item);
              }} className={`h-8 w-8 rounded-full ${isFavorited ? 'text-red-500' : 'text-muted-foreground'}`}>
                  <Heart size={14} className={isFavorited ? 'fill-current' : ''} />
                </Button>
                
                {showContactUs ? <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleContactClick} className="h-8 w-8 rounded-full border-border hover:bg-accent">
                        {item.category === 'solutions' ? <MessageCircle size={14} /> : <CalendarIcon size={14} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.category === 'solutions' ? 'Send Message' : 'Schedule a Meeting'}</p>
                    </TooltipContent>
                  </Tooltip> : <Button variant="outline" size="icon" onClick={e => {
                e.stopPropagation();
                onAddToCart(item);
              }} className="h-8 w-8 rounded-full border-border hover:bg-accent">
                    <Plus size={14} />
                  </Button>}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
        itemName={item.category === 'teams' && teamContent ? teamContent.teamName : item.name} 
        itemType={item.category as 'team' | 'individual' | 'solution'} 
      />

      <CalendarBookingModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        itemName={item.category === 'teams' && teamContent ? teamContent.teamName : item.name}
        itemType={item.category === 'teams' ? 'team' : 'individual'}
      />
    </TooltipProvider>;
};
