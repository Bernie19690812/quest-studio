import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, User, Search, ChevronDown, Brain, Wrench, Zap } from 'lucide-react';
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
  
  // Mock purchased capabilities and tools
  const [purchasedItems] = useState<MarketplaceItem[]>([
    {
      id: 'cap-1',
      name: 'Advanced Text Analysis',
      description: 'Comprehensive text processing and sentiment analysis capability',
      price: 299,
      originalPrice: 399,
      category: 'AI & Machine Learning',
      subcategory: 'Text Processing',
      rating: 4.8,
      reviews: 127,
      image: '/placeholder.svg',
      seller: {
        name: 'AI Solutions Inc',
        avatar: '/placeholder.svg',
        verified: true
      },
      type: 'capability',
      featured: true,
      isNew: false,
      tags: ['NLP', 'Sentiment Analysis', 'Text Mining']
    },
    {
      id: 'cap-2',
      name: 'Data Validator Pro',
      description: 'Validate data format, integrity, and compliance across multiple formats',
      price: 199,
      category: 'Data & Analytics',
      subcategory: 'Data Quality',
      rating: 4.6,
      reviews: 89,
      image: '/placeholder.svg',
      seller: {
        name: 'DataTech Solutions',
        avatar: '/placeholder.svg',
        verified: true
      },
      type: 'capability',
      featured: false,
      isNew: false,
      tags: ['Validation', 'Data Quality', 'Compliance']
    },
    {
      id: 'tool-1',
      name: 'Report Generator Suite',
      description: 'Complete solution for automated report generation with templates',
      price: 449,
      originalPrice: 599,
      category: 'Business Tools',
      subcategory: 'Reporting',
      rating: 4.9,
      reviews: 203,
      image: '/placeholder.svg',
      seller: {
        name: 'Business Automation Co',
        avatar: '/placeholder.svg',
        verified: true
      },
      type: 'solution',
      featured: true,
      isNew: false,
      tags: ['Reports', 'Automation', 'Templates']
    },
    {
      id: 'cap-3',
      name: 'Image Recognition AI',
      description: 'Advanced computer vision for object detection and classification',
      price: 359,
      category: 'AI & Machine Learning',
      subcategory: 'Computer Vision',
      rating: 4.7,
      reviews: 156,
      image: '/placeholder.svg',
      seller: {
        name: 'Vision AI Labs',
        avatar: '/placeholder.svg',
        verified: true
      },
      type: 'capability',
      featured: false,
      isNew: true,
      tags: ['Computer Vision', 'Object Detection', 'AI']
    },
    {
      id: 'temp-1',
      name: 'Invoice Processing Template',
      description: 'Ready-to-use template for automated invoice processing and extraction',
      price: 129,
      category: 'Templates',
      subcategory: 'Document Processing',
      rating: 4.5,
      reviews: 78,
      image: '/placeholder.svg',
      seller: {
        name: 'Template Masters',
        avatar: '/placeholder.svg',
        verified: true
      },
      type: 'template',
      featured: false,
      isNew: false,
      tags: ['Invoice', 'OCR', 'Automation']
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'capability':
        return Brain;
      case 'solution':
        return Wrench;
      case 'template':
        return Zap;
      default:
        return Brain;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'capability':
        return 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'solution':
        return 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'template':
        return 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  // Group items by type
  const capabilities = purchasedItems.filter(item => item.type === 'capability');
  const solutions = purchasedItems.filter(item => item.type === 'solution');
  const templates = purchasedItems.filter(item => item.type === 'template');

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
            {purchasedItems.length} items purchased • {capabilities.length} capabilities • {solutions.length} solutions • {templates.length} templates
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
            {/* Capabilities Section */}
            {capabilities.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${getTypeColor('capability')}`}>
                    <Brain size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Capabilities ({capabilities.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {capabilities.map((item) => (
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
              </div>
            )}

            {/* Solutions Section */}
            {solutions.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${getTypeColor('solution')}`}>
                    <Wrench size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Solutions ({solutions.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {solutions.map((item) => (
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
              </div>
            )}

            {/* Templates Section */}
            {templates.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${getTypeColor('template')}`}>
                    <Zap size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Templates ({templates.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {templates.map((item) => (
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
