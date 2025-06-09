import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Plus, Eye, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { CategorySection } from '@/components/marketplace/CategorySection';
import { useNavigate } from 'react-router-dom';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'capabilities' | 'solutions' | 'teams' | 'individuals';
  type: 'product' | 'service';
  price: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  image?: string;
  featured?: boolean;
}

const mockData: MarketplaceItem[] = [
  {
    id: '1',
    name: 'GPT-4 Integration',
    description: 'Advanced AI language model integration for your solutions',
    category: 'capabilities',
    type: 'product',
    price: 29.99,
    rating: 4.8,
    reviewCount: 142,
    tags: ['AI Model', 'Language Processing'],
    featured: true,
  },
  {
    id: '2',
    name: 'E-commerce Solution',
    description: 'Complete e-commerce platform with payment integration',
    category: 'solutions',
    type: 'product',
    price: 99.99,
    rating: 4.6,
    reviewCount: 89,
    tags: ['E-commerce', 'Payments', 'Catalog'],
  },
  {
    id: '3',
    name: 'DevOps Team',
    description: 'Expert DevOps team for infrastructure and deployment',
    category: 'teams',
    type: 'service',
    price: 150,
    rating: 4.9,
    reviewCount: 67,
    tags: ['DevOps', 'Infrastructure', 'CI/CD'],
  },
  {
    id: '4',
    name: 'Frontend Developer',
    description: 'Experienced React/Vue developer for UI/UX projects',
    category: 'individuals',
    type: 'service',
    price: 75,
    rating: 4.7,
    reviewCount: 94,
    tags: ['Frontend', 'React', 'Vue'],
  },
  {
    id: '5',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    category: 'capabilities',
    type: 'product',
    price: 49.99,
    rating: 4.5,
    reviewCount: 156,
    tags: ['Analytics', 'Dashboard', 'Real-time'],
  },
  {
    id: '6',
    name: 'QA Testing Team',
    description: 'Comprehensive quality assurance and testing services',
    category: 'teams',
    type: 'service',
    price: 120,
    rating: 4.8,
    reviewCount: 78,
    tags: ['QA', 'Testing', 'Automation'],
  },
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

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

  const categorizedData = {
    capabilities: mockData.filter(item => item.category === 'capabilities'),
    solutions: mockData.filter(item => item.category === 'solutions'),
    teams: mockData.filter(item => item.category === 'teams'),
    individuals: mockData.filter(item => item.category === 'individuals'),
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
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                Studio
              </Button>
              <Button
                variant="ghost"
                className="text-foreground font-medium"
              >
                Marketplace
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search marketplace..."
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
              onClick={() => setIsCartOpen(true)}
              className="relative border-border hover:bg-accent"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-border hover:bg-accent"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 quest-gradient opacity-20"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-4">Welcome to Quest AI</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Whether it's automating workflows, enhancing decision-making, 
            or optimizing complex processes, Quest AI offers a range of AI 
            agents, consultants and teams to help you achieve your goals.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90"
          >
            Go to quest studio
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-6 space-y-12 pb-12">
        {/* Capabilities */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Capabilities</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.capabilities}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        </section>

        {/* Solutions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Solutions</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.solutions}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        </section>

        {/* Teams */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Teams</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.teams}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        </section>

        {/* Individuals */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Individuals</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              See all
            </Button>
          </div>
          <CategorySection
            items={categorizedData.individuals}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favorites}
        onAddToCart={addToCart}
        onRemoveFavorite={(itemId) => 
          setFavorites(prev => prev.filter(i => i.id !== itemId))
        }
      />
    </div>
  );
};

export default Marketplace;
