
import React, { useState } from 'react';
import { Search, ShoppingCart, Star, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CategorySection } from '@/components/marketplace/CategorySection';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { FullPageCart } from '@/components/marketplace/FullPageCart';
import { FilterBar } from '@/components/marketplace/FilterBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'capabilities' | 'solutions' | 'individuals' | 'teams';
  type: 'product' | 'service';
  price: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  level?: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isFullPageCartOpen, setIsFullPageCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<any[]>([]);

  // Mock data with featured property added
  const mockItems: MarketplaceItem[] = [
    // Capabilities
    {
      id: 'cap-1',
      name: 'Advanced Form Builder',
      description: 'Drag-and-drop form builder with advanced validation',
      category: 'capabilities',
      type: 'product',
      price: 49,
      rating: 4.8,
      reviewCount: 156,
      tags: ['Forms', 'Validation', 'React'],
      featured: true
    },
    {
      id: 'cap-2',
      name: 'Data Visualization Toolkit',
      description: 'Interactive charts and graphs for data analysis',
      category: 'capabilities',
      type: 'product',
      price: 79,
      rating: 4.6,
      reviewCount: 92,
      tags: ['Charts', 'Graphs', 'Data Analysis'],
      featured: false
    },
    {
      id: 'cap-3',
      name: 'AI-Powered Chatbot',
      description: 'Smart chatbot for customer support and engagement',
      category: 'capabilities',
      type: 'product',
      price: 99,
      rating: 4.9,
      reviewCount: 210,
      tags: ['Chatbot', 'AI', 'Customer Support'],
      featured: false
    },
    // Solutions
    {
      id: 'sol-1',
      name: 'E-commerce Platform',
      description: 'Complete e-commerce solution with storefront and payment gateway',
      category: 'solutions',
      type: 'product',
      price: 299,
      rating: 4.7,
      reviewCount: 78,
      tags: ['E-commerce', 'Storefront', 'Payments'],
      featured: false
    },
    {
      id: 'sol-2',
      name: 'Project Management Tool',
      description: 'Collaborative project management tool for teams',
      category: 'solutions',
      type: 'product',
      price: 199,
      rating: 4.5,
      reviewCount: 112,
      tags: ['Project Management', 'Collaboration', 'Teams'],
      featured: false
    },
    // Individuals
    {
      id: 'ind-1',
      name: 'John Doe',
      description: 'Senior Frontend Developer specializing in React',
      category: 'individuals',
      type: 'service',
      price: 75,
      rating: 4.9,
      reviewCount: 54,
      tags: ['React', 'JavaScript', 'Frontend'],
      featured: false,
      level: 'Senior'
    },
    {
      id: 'ind-2',
      name: 'Alice Smith',
      description: 'Experienced Backend Developer proficient in Node.js',
      category: 'individuals',
      type: 'service',
      price: 80,
      rating: 4.6,
      reviewCount: 32,
      tags: ['Node.js', 'Backend', 'JavaScript'],
      featured: false,
      level: 'Mid-level'
    },
    // Teams
    {
      id: 'team-1',
      name: 'W4D Squad',
      description: 'Cross-functional team specializing in web development',
      category: 'teams',
      type: 'service',
      price: 150,
      rating: 4.8,
      reviewCount: 45,
      tags: ['Web Development', 'Full-stack', 'Agile'],
      featured: true
    },
    {
      id: 'team-2',
      name: 'BuildForce',
      description: 'Expert team for mobile app development',
      category: 'teams',
      type: 'service',
      price: 180,
      rating: 4.7,
      reviewCount: 67,
      tags: ['Mobile App', 'iOS', 'Android'],
      featured: false
    },
    {
      id: 'team-3',
      name: 'SprintCore',
      description: 'Dedicated team for AI and machine learning solutions',
      category: 'teams',
      type: 'service',
      price: 200,
      rating: 4.9,
      reviewCount: 89,
      tags: ['AI', 'Machine Learning', 'Data Science'],
      featured: false
    },
    {
      id: 'team-4',
      name: 'DevOps Elite',
      description: 'Dedicated team for AI and machine learning solutions',
      category: 'teams',
      type: 'service',
      price: 120,
      rating: 4.9,
      reviewCount: 89,
      tags: ['AI', 'Machine Learning', 'Data Science'],
      featured: false
    },
    {
      id: 'team-5',
      name: 'CodeCrafters',
      description: 'Dedicated team for AI and machine learning solutions',
      category: 'teams',
      type: 'service',
      price: 220,
      rating: 4.9,
      reviewCount: 89,
      tags: ['AI', 'Machine Learning', 'Data Science'],
      featured: false
    },
    {
      id: 'team-6',
      name: 'AgileFlow',
      description: 'Dedicated team for AI and machine learning solutions',
      category: 'teams',
      type: 'service',
      price: 190,
      rating: 4.9,
      reviewCount: 89,
      tags: ['AI', 'Machine Learning', 'Data Science'],
      featured: false
    },
  ];

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    // Implementation would go here
  };

  const handleSeeMore = (category: string) => {
    // Implementation would go here
  };

  const handleFilterToggle = (filter: any) => {
    setActiveFilters(prev => {
      const exists = prev.find(f => f.id === filter.id);
      if (exists) {
        return prev.filter(f => f.id !== filter.id);
      }
      return [...prev, filter];
    });
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

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
              <Button
                variant="ghost"
                onClick={() => navigate('/my-items')}
                className="text-muted-foreground hover:text-foreground"
              >
                My Items
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search marketplace..."
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

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">
            Explore our curated selection of AI capabilities, solutions, and talent
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          category="all"
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          onClearFilters={handleClearFilters}
        />

        {/* Featured Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured</h2>
          <CategorySection
            items={filteredItems.filter(item => item.featured)}
            category="featured"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeMore}
            isFavorited={isFavorited}
          />
        </div>

        {/* Capabilities Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Capabilities</h2>
          <CategorySection
            items={filteredItems.filter(item => item.category === 'capabilities' && !item.featured)}
            category="capabilities"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeMore}
            isFavorited={isFavorited}
          />
        </div>

        {/* Solutions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Solutions</h2>
          <CategorySection
            items={filteredItems.filter(item => item.category === 'solutions' && !item.featured)}
            category="solutions"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeMore}
            isFavorited={isFavorited}
          />
        </div>

        {/* Individuals Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Individuals</h2>
          <CategorySection
            items={filteredItems.filter(item => item.category === 'individuals' && !item.featured)}
            category="individuals"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeMore}
            isFavorited={isFavorited}
          />
        </div>

        {/* Teams Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Teams</h2>
          <CategorySection
            items={filteredItems.filter(item => item.category === 'teams' && !item.featured)}
            category="teams"
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
            onSeeMore={handleSeeMore}
            isFavorited={isFavorited}
          />
        </div>
      </main>

      {/* Modals */}
      <MarketplaceItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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
        allItems={mockItems}
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

export default Marketplace;
