import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterBar, FilterOption } from '@/components/marketplace/FilterBar';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'product' | 'service';
  category: 'capabilities' | 'solutions' | 'teams' | 'individuals';
  tags: string[];
  rating: number;
  reviewCount: number;
  level?: 'Junior' | 'Mid-level' | 'Senior';
  role?: string;
  featured?: boolean;
}

const mockData: { [key: string]: MarketplaceItem[] } = {
  capabilities: [
    {
      id: '1',
      name: 'AI-Powered Automation',
      description: 'Automate repetitive tasks with AI. Boost efficiency and reduce errors.',
      price: 499,
      type: 'product',
      category: 'capabilities',
      tags: ['AI', 'Automation', 'Machine Learning'],
      rating: 4.5,
      reviewCount: 62,
    },
    {
      id: '2',
      name: 'Data Analytics Dashboard',
      description: 'Visualize your data with interactive dashboards. Make informed decisions faster.',
      price: 299,
      type: 'product',
      category: 'capabilities',
      tags: ['Data Analytics', 'Dashboard', 'Visualization'],
      rating: 4.2,
      reviewCount: 48,
    },
    {
      id: '3',
      name: 'Cloud Integration Service',
      description: 'Seamlessly integrate your systems with the cloud. Enhance scalability and security.',
      price: 799,
      type: 'service',
      category: 'capabilities',
      tags: ['Cloud', 'Integration', 'Security'],
      rating: 4.8,
      reviewCount: 75,
    },
  ],
  solutions: [
    {
      id: '4',
      name: 'E-commerce Platform',
      description: 'Launch your online store with our e-commerce platform. Easy setup and customization.',
      price: 999,
      type: 'product',
      category: 'solutions',
      tags: ['E-commerce', 'Platform', 'Online Store'],
      rating: 4.6,
      reviewCount: 55,
    },
    {
      id: '5',
      name: 'SaaS CRM Solution',
      description: 'Manage your customer relationships with our SaaS CRM solution. Improve sales and service.',
      price: 599,
      type: 'product',
      category: 'solutions',
      tags: ['SaaS', 'CRM', 'Customer Management'],
      rating: 4.3,
      reviewCount: 39,
    },
    {
      id: '6',
      name: 'Enterprise Resource Planning',
      description: 'Streamline your business processes with our ERP system. Increase efficiency and reduce costs.',
      price: 1499,
      type: 'product',
      category: 'solutions',
      tags: ['Enterprise', 'ERP', 'Resource Planning'],
      rating: 4.7,
      reviewCount: 68,
    },
  ],
  teams: [
    {
      id: '7',
      name: 'Web Development Team',
      description: 'Hire our expert web development team. Custom websites and applications.',
      price: 2500,
      type: 'service',
      category: 'teams',
      tags: ['Web Development', 'Team', 'Custom Websites'],
      rating: 4.9,
      reviewCount: 82,
    },
    {
      id: '8',
      name: 'Mobile App Development Team',
      description: 'Build your mobile app with our experienced team. iOS and Android platforms.',
      price: 3000,
      type: 'service',
      category: 'teams',
      tags: ['Mobile App', 'Development', 'iOS', 'Android'],
      rating: 4.4,
      reviewCount: 45,
    },
    {
      id: '9',
      name: 'UI/UX Design Team',
      description: 'Create stunning user interfaces with our design team. Enhance user experience.',
      price: 1800,
      type: 'service',
      category: 'teams',
      tags: ['UI', 'UX', 'Design', 'User Experience'],
      rating: 4.6,
      reviewCount: 59,
    },
  ],
  individuals: [
    {
      id: '10',
      name: 'John Smith',
      description: 'Experienced full-stack developer with a passion for creating innovative web applications.',
      price: 75,
      type: 'service',
      category: 'individuals',
      tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
      rating: 4.7,
      reviewCount: 70,
      level: 'Senior',
      role: 'Full-stack Developer',
    },
    {
      id: '11',
      name: 'Alice Johnson',
      description: 'Creative UI/UX designer with a focus on user-centered design and intuitive interfaces.',
      price: 60,
      type: 'service',
      category: 'individuals',
      tags: ['UI', 'UX', 'Design', 'Figma', 'Adobe XD'],
      rating: 4.5,
      reviewCount: 52,
      level: 'Mid-level',
      role: 'UI/UX Designer',
    },
    {
      id: '12',
      name: 'Bob Williams',
      description: 'Data scientist with expertise in machine learning and statistical analysis.',
      price: 90,
      type: 'service',
      category: 'individuals',
      tags: ['Data Science', 'Machine Learning', 'Python', 'R'],
      rating: 4.8,
      reviewCount: 65,
      level: 'Senior',
      role: 'Data Scientist',
    },
  ],
};

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<MarketplaceItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const handleFilterToggle = (filter: FilterOption) => {
    setActiveFilters(prevFilters => {
      const isFilterActive = prevFilters.some(f => f.id === filter.id);
      if (isFilterActive) {
        return prevFilters.filter(f => f.id !== filter.id);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const handleAddToCart = (item: MarketplaceItem) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const handleToggleFavorite = (item: MarketplaceItem) => {
    setFavoriteItems(prevItems => {
      const isFavorite = prevItems.some(favItem => favItem.id === item.id);
      if (isFavorite) {
        return prevItems.filter(favItem => favItem.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleRemoveFromCart = (item: MarketplaceItem) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    setFavoriteItems(prevItems => prevItems.filter(favItem => favItem.id !== itemId));
  };

  const handleUpdateCartQuantity = (item: MarketplaceItem, quantity: number) => {
    // Implement quantity update logic here
  };

  const renderIndividualsGrid = () => {
    const roleFilters = [
      { id: 'frontend', label: 'Frontend Developer', category: 'role' },
      { id: 'backend', label: 'Backend Developer', category: 'role' },
      { id: 'fullstack', label: 'Full-stack Developer', category: 'role' },
      { id: 'designer', label: 'UI/UX Designer', category: 'role' },
      { id: 'data-scientist', label: 'Data Scientist', category: 'role' },
      { id: 'mobile', label: 'Mobile Developer', category: 'role' },
      { id: 'devops', label: 'DevOps Engineer', category: 'role' },
      { id: 'qa', label: 'QA Engineer', category: 'role' },
    ];

    const filteredIndividuals = mockData.individuals.filter(item => {
      if (activeFilters.length === 0) return true;
      return activeFilters.some(filter => 
        item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase())) ||
        item.role?.toLowerCase().includes(filter.label.toLowerCase())
      );
    });

    return (
      <div className="space-y-6">
        {/* Role Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {roleFilters.map((role) => {
            const isActive = activeFilters.some(f => f.id === role.id);
            return (
              <Button
                key={role.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterToggle(role)}
                className="rounded-full"
              >
                {role.label}
              </Button>
            );
          })}
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground rounded-full"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {filteredIndividuals.map((item) => (
            <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4" onClick={() => setSelectedItem(item)}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full quest-gradient mx-auto flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                    <p className="text-lg font-bold text-primary">${item.price}/hr</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({item.reviewCount})
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderSolutionsGrid = () => {
    const filteredSolutions = mockData.solutions.filter(item => {
      if (activeFilters.length === 0) return true;
      return activeFilters.some(filter => 
        item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase()))
      );
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {filteredSolutions.map((item) => (
          <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-4" onClick={() => setSelectedItem(item)}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-primary">${item.price}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({item.reviewCount})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderCapabilitiesGrid = () => {
    const filteredCapabilities = mockData.capabilities.filter(item => {
      if (activeFilters.length === 0) return true;
      return activeFilters.some(filter => 
        item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase()))
      );
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {filteredCapabilities.map((item) => (
          <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-4" onClick={() => setSelectedItem(item)}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-primary">${item.price}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({item.reviewCount})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderTeamsGrid = () => {
    const filteredTeams = mockData.teams.filter(item => {
      if (activeFilters.length === 0) return true;
      return activeFilters.some(filter => 
        item.tags.some(tag => tag.toLowerCase().includes(filter.label.toLowerCase()))
      );
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {filteredTeams.map((item) => (
          <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4" onClick={() => setSelectedItem(item)}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg quest-gradient flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-primary">${item.price}/project</p>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({item.reviewCount})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg quest-gradient flex items-center justify-center">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Quest Marketplace</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search marketplace..." 
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavoritesOpen(true)}
                className="relative"
              >
                <Heart className="w-4 h-4" />
                {favoriteItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteItems.length}
                  </span>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="Profile" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    Request Agent
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {['All', 'Capabilities', 'Solutions', 'Teams', 'Individuals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab !== 'individuals' && (
          <FilterBar 
            category={activeTab}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
            onClearFilters={handleClearFilters}
          />
        )}

        {activeTab === 'all' && (
          <div className="space-y-12">
            {/* All categories content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {mockData.individuals.slice(0, 6).map((item) => (
                <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4" onClick={() => setSelectedItem(item)}>
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-full quest-gradient mx-auto flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.role}</p>
                        <p className="text-lg font-bold text-primary">${item.price}/hr</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'capabilities' && renderCapabilitiesGrid()}
        {activeTab === 'solutions' && renderSolutionsGrid()}
        {activeTab === 'teams' && renderTeamsGrid()}
        {activeTab === 'individuals' && renderIndividualsGrid()}
      </main>

      {/* Modals and Drawers */}
      <MarketplaceItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorited={favoriteItems.some(item => item.id === selectedItem?.id)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favoriteItems}
        onAddToCart={handleAddToCart}
        onRemoveFavorite={handleRemoveFromFavorites}
      />
    </div>
  );
};

export default Marketplace;
