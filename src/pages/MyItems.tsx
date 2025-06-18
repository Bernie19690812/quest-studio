
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  
  // Mock purchased items organized by category
  const [purchasedItems] = useState<MarketplaceItem[]>([
    {
      id: '1',
      name: 'AI-Powered Analytics Dashboard',
      description: 'Complete analytics solution with real-time insights',
      price: 299,
      rating: 4.8,
      reviewCount: 156,
      category: 'solutions',
      type: 'service',
      tags: ['Analytics', 'AI', 'Dashboard'],
      featured: true
    },
    {
      id: '2',
      name: 'React Component Library',
      description: 'Professional UI component library for React applications',
      price: 49,
      rating: 4.6,
      reviewCount: 89,
      category: 'capabilities',
      type: 'product',
      tags: ['React', 'Components', 'UI'],
      featured: false
    },
    {
      id: '3',
      name: 'Alex Thompson',
      description: 'Senior Full-Stack Developer with expertise in React and Node.js',
      price: 85,
      rating: 4.9,
      reviewCount: 47,
      category: 'individuals',
      type: 'service',
      tags: ['React', 'Node.js', 'TypeScript'],
      level: 'Senior',
      featured: false
    },
    {
      id: '4',
      name: 'W4D Squad',
      description: 'Cross-functional development team specializing in web applications',
      price: 450,
      rating: 4.7,
      reviewCount: 23,
      category: 'teams',
      type: 'service',
      tags: ['Full-Stack', 'React', 'DevOps'],
      featured: false
    }
  ]);

  const userName = "John Doe"; // This would come from user context in real app

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

  const handleLaunchItem = (item: MarketplaceItem) => {
    console.log('Launching item:', item.name);
    // Implementation for launching/viewing items would go here
  };

  const groupedItems = {
    solutions: purchasedItems.filter(item => item.category === 'solutions'),
    capabilities: purchasedItems.filter(item => item.category === 'capabilities'),
    individuals: purchasedItems.filter(item => item.category === 'individuals'),
    teams: purchasedItems.filter(item => item.category === 'teams')
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
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-accent"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs font-medium">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{userName}</span>
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
          <div className="space-y-8">
            {/* Solutions */}
            {groupedItems.solutions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Solutions</h2>
                  <Badge variant="outline">{groupedItems.solutions.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.solutions.map((item) => (
                    <div key={item.id} className="relative">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleLaunchItem(item)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Launch
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities */}
            {groupedItems.capabilities.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Capabilities</h2>
                  <Badge variant="outline">{groupedItems.capabilities.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.capabilities.map((item) => (
                    <div key={item.id} className="relative">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleLaunchItem(item)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Individuals */}
            {groupedItems.individuals.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Individuals</h2>
                  <Badge variant="outline">{groupedItems.individuals.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.individuals.map((item) => (
                    <div key={item.id} className="relative">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleLaunchItem(item)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teams */}
            {groupedItems.teams.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Teams</h2>
                  <Badge variant="outline">{groupedItems.teams.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.teams.map((item) => (
                    <div key={item.id} className="relative">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleLaunchItem(item)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
