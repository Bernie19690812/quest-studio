import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, User, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { FullPageCart } from '@/components/marketplace/FullPageCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { MarketplaceItem } from './Marketplace';

const MyItems = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isFullPageCartOpen, setIsFullPageCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  
  // Mock purchased items - in real app this would come from user's purchase history
  const [purchasedItems] = useState<MarketplaceItem[]>([]);

  const addToCart = (item: MarketplaceItem) => {
    setCartItems(prev => [...prev.filter(i => i.id !== item.id), item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const toggleFavorite = (item: MarketplaceItem) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorited = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  const handleOpenModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    // Implementation would go here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold text-foreground">Quest AI</div>
            </div>
            <nav className="flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => navigate('/marketplace')}
                className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Marketplace</span>
              </Button>
              <Button
                variant="ghost"
                className="text-foreground font-medium"
              >
                My Items
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search my items..."
                className="pl-10 w-64 bg-secondary border-border"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavoritesOpen(true)}
              className="border-border hover:bg-accent"
            >
              <Star size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullPageCartOpen(true)}
              className="relative border-border hover:bg-accent"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent flex items-center space-x-2 px-3"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                  <ChevronDown size={12} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem>Request Agent</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* My Items Content */}
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Items</h1>
          <p className="text-muted-foreground">
            {purchasedItems.length} items purchased
          </p>
        </div>

        {purchasedItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-foreground mb-4">No items purchased yet</h2>
            <p className="text-muted-foreground mb-8">Browse our marketplace to find amazing products and services</p>
            <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {purchasedItems.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onOpenModal={handleOpenModal}
                isFavorited={isFavorited(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <MarketplaceItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favorites}
        onAddToCart={addToCart}
        onRemoveFavorite={(itemId) => 
          setFavorites(prev => prev.filter(i => i.id !== itemId))
        }
      />

      <FullPageCart
        isOpen={isFullPageCartOpen}
        onClose={() => setIsFullPageCartOpen(false)}
        items={cartItems}
        allItems={[]} // Would be all marketplace items in real app
        onRemoveItem={removeFromCart}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        onOpenModal={handleOpenModal}
        onCheckout={handleCheckout}
        isFavorited={isFavorited}
      />
    </div>
  );
};

export default MyItems;
