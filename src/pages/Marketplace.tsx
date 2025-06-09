
import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { CategorySection } from '@/components/marketplace/CategorySection';

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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Quest AI Marketplace</h1>
              <p className="text-sm text-muted-foreground">
                Discover capabilities, solutions, and talent
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavoritesOpen(true)}
            >
              <Star size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Featured Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🌟 Featured</h2>
          <CategorySection
            items={mockData.filter(item => item.featured)}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        </section>

        {/* Capabilities */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">🔧 Capabilities</h2>
            <Button variant="ghost" size="sm">
              <Eye size={16} className="mr-2" />
              View All
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">🧩 Solutions</h2>
            <Button variant="ghost" size="sm">
              <Eye size={16} className="mr-2" />
              View All
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">👥 Teams</h2>
            <Button variant="ghost" size="sm">
              <Eye size={16} className="mr-2" />
              View All
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">🧑‍💼 Individuals</h2>
            <Button variant="ghost" size="sm">
              <Eye size={16} className="mr-2" />
              View All
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
