
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, User, Search, ChevronDown, Play, ExternalLink, Filter } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock purchased items
  const [purchasedItems] = useState<MarketplaceItem[]>([
    {
      id: 'purchased-1',
      name: 'Advanced React Components',
      description: 'Premium component library with 50+ components',
      category: 'capabilities',
      type: 'product',
      price: 99,
      rating: 4.8,
      reviewCount: 125,
      tags: ['React', 'TypeScript', 'Components'],
      featured: true
    },
    {
      id: 'purchased-2',
      name: 'AI-Powered Analytics Dashboard',
      description: 'Complete analytics solution with machine learning insights',
      category: 'solutions',
      type: 'product',
      price: 299,
      rating: 4.9,
      reviewCount: 89,
      tags: ['Analytics', 'AI', 'Dashboard'],
      featured: false
    },
    {
      id: 'purchased-3',
      name: 'Sarah Mitchell',
      description: 'Senior Frontend Developer specializing in React and Vue.js',
      category: 'individuals',
      type: 'service',
      price: 85,
      rating: 4.7,
      reviewCount: 42,
      tags: ['React', 'Vue.js', 'JavaScript'],
      featured: false,
      level: 'Senior'
    },
    {
      id: 'purchased-4',
      name: 'W4D Squad',
      description: 'Cross-functional development team specializing in web applications',
      category: 'teams',
      type: 'service',
      price: 150,
      rating: 4.8,
      reviewCount: 28,
      tags: ['Full-stack', 'Agile', 'React', 'Node.js'],
      featured: true
    }
  ]);

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

  const handleViewItem = (item: MarketplaceItem) => {
    console.log('Viewing item:', item.name);
  };

  const handleLaunchItem = (item: MarketplaceItem) => {
    console.log('Launching item:', item.name);
  };

  // Filter items based on category and search
  const filteredItems = purchasedItems.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group items by category
  const groupedItems = {
    solutions: filteredItems.filter(item => item.category === 'solutions'),
    capabilities: filteredItems.filter(item => item.category === 'capabilities'),
    individuals: filteredItems.filter(item => item.category === 'individuals'),
    teams: filteredItems.filter(item => item.category === 'teams')
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">John Doe</span>
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

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="solutions">Solutions</SelectItem>
              <SelectItem value="capabilities">Capabilities</SelectItem>
              <SelectItem value="individuals">Individuals</SelectItem>
              <SelectItem value="teams">Teams</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {purchasedItems.length === 0 ? 'No items purchased yet' : 'No items match your filters'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {purchasedItems.length === 0 
                ? 'Browse our marketplace to find amazing products and services'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {purchasedItems.length === 0 && (
              <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Solutions */}
            {groupedItems.solutions.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.solutions.map((item) => (
                    <div key={item.id} className="relative group">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewItem(item)}
                          className="w-full"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleLaunchItem(item)}
                          className="w-full"
                        >
                          <Play size={14} className="mr-1" />
                          Launch
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities */}
            {groupedItems.capabilities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.capabilities.map((item) => (
                    <div key={item.id} className="relative group">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewItem(item)}
                          className="w-full"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleLaunchItem(item)}
                          className="w-full"
                        >
                          <Play size={14} className="mr-1" />
                          Launch
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Individuals */}
            {groupedItems.individuals.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Individuals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.individuals.map((item) => (
                    <div key={item.id} className="relative group">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewItem(item)}
                          className="w-full"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teams */}
            {groupedItems.teams.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Teams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {groupedItems.teams.map((item) => (
                    <div key={item.id} className="relative group">
                      <MarketplaceCard
                        item={item}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        onOpenModal={handleOpenModal}
                        isFavorited={isFavorited(item.id)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewItem(item)}
                          className="w-full"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Contact
                        </Button>
                      </div>
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
        allItems={[]}
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
